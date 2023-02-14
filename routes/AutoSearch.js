const { Client } = require("@elastic/elasticsearch");
// const client = new Client({
//   node: "http://localhost:9200/",
//   auth: {
//     username: "elastic",
//     password: "+cdPcJ40Hu4yivklTq8f",
//   },
// });

const client = new Client({
  node: "http://54.178.33.146:9200/",
});

const phraseSearch = async (_index, phrase) => {
  const hits = [];

  // only string values are searchable

  if(phrase.includes(" "))
  {
    const words = phrase.split(" ");
    const searchResult = await client.search({
        index: _index,
        size:20,
        query:
        {bool:
         { must:
           [ 
             { multi_match:
               {
                query: words[0],
                type: "phrase_prefix",
                fields: ["heading","description"]
               }
            }, 
            
            { multi_match: 
              { 
               query: words[1],
               type: "phrase_prefix",
               fields: ["heading","description"]
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
      if(isNaN(phrase))
      {
        const searchResult = await client
    .search({
      index: _index,
      size:20,
      query: {
        dis_max: {
          queries: [
            {
              multi_match : {
                query: phrase,
                type:       "phrase_prefix",
                fields: ["section","chapter","heading","description","hscode"],
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
      else{
    phrase = phrase.slice(0,6);
    console.log(phrase);
    const searchResult = await client
    .search({
      index: _index,
      query: {
        match: {
          hscode: {
            query: phrase
          }
        }
      },
    })
    .catch((e) => console.log("errr", e));
  return searchResult;
      }
    }
    
};

module.exports = {
  phraseSearch,
};
