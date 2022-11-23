const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "http://54.178.33.146:9200/"
});

const phraseSearch = async (_index,_category,phrase) => {
  const hits = [];

  // only string values are searchable
  if(phrase.includes(" "))
  {
    const words = phrase.split(" ");
    const searchResult = await client
    .search({
      index: _index,
      query:
        {bool:
         { must:
           [ 
            { multi_match: 
              { 
               query: _category,
               type: "phrase_prefix",
               fields: ["section"]
              }
            },

             { multi_match:
               {
                query: words[0],
                type: "phrase_prefix",
                fields: ["name","description"]
               }
            }, 
            
            { multi_match: 
              { 
               query: words[1],
               type: "phrase_prefix",
               fields: ["name","description"]
              }
            },
            
          ]
        }
      }
    })
    .catch((e) => console.log("errr", e));
  return searchResult;
  }
  else
  {
    const searchResult = await client
    .search({
      index: _index,
      query:
        {bool:
         { must:
           [ 
             { multi_match:
               {
                query: _category,
                type: "phrase_prefix",
                fields: ["section"]
               }
            }, 
            
            { multi_match: 
              { 
               query: phrase,
               type: "phrase_prefix",
               fields: ["name","description"]
              }
            },
            
          ]
        }
      }
    })
    .catch((e) => console.log("errr", e));
  return searchResult;
  }
};



module.exports = {
  phraseSearch,
};
