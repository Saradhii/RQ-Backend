const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "http://54.178.33.146:9200/",
});

const phraseSearch = async (_index, phrase) => {

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
                fields: ["hscode","description"]
               }
            }, 
            
            { multi_match: 
              { 
               query: words[1],
               type: "phrase_prefix",
               fields: ["hscode","description"]
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
                fields: ["hscode","description"],
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
};

module.exports = {
  phraseSearch,
};
