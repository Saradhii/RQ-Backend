const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "http://54.178.33.146:9200/",
});

const phraseSearch = async (_index, _category, phrase) => {
  const hits = [];

  //  console.log(_category.length);
  // only string values are searchable
  if (phrase && _category? _category[0]!=" ": null) {
    if(phrase.includes(" "))
    {
      const words = phrase.split(" ");
      const searchResult = await client.search({
          index: _index,
          query:
          {bool:
           { must:
             [ 
              {
                match_phrase: {
                  section: _category,
                },
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
          size: 4500,
          query: {
            bool: {
              must: [
                {
                  match_phrase: {
                    section: _category,
                  },
                },
  
                {
                  multi_match: {
                    query: phrase,
                    type: "phrase_prefix",
                    fields: ["name", "description"],
                  },
                },
              ],
            },
          },
        })
        .catch((e) => console.log("errr", e));
      return searchResult;
       }


  }else if(phrase){
    if(phrase.includes(" "))
  {
    const words = phrase.split(" ");
    const searchResult = await client.search({
        index: _index,
        query:
        {bool:
         { must:
           [ 
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
        query: {
          dis_max: {
            queries: [
              {
                multi_match : {
                  query: phrase,
                  type:       "phrase_prefix",
                  fields: ["name","description"],
                  minimum_should_match: "50%" 
                }
              },
              {
                fuzzy: {
                  description: {
                    value: phrase,
                    fuzziness:"AUTO"
                  },
              }, 
              }
            ]
          }
        },
      })
      .catch((e) => console.log("errr", e));
    return searchResult;
    }
   
  }
   else {
    const searchResult = await client
      .search({
        index: _index,
        size: 4500,
        query: {
          bool: {
            must: [
              {
                match_phrase: {
                  section: _category,
                },
              },
            ],
          },
        },
      })
      .catch((e) => console.log("errr", e));
    return searchResult;
  }
};

module.exports = {
  phraseSearch,
};
