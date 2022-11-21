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

  // if(phrase.includes(" "))
  // {
  //   const searchResult = await client
  //   .search({
  //     index: _index,
  //     query: {
  //       multi_match: {
  //         query: phrase,
  //         fields: ["name","description"],
  //         type: "best_fields",
  //       },
  //     },
  //   })
  //   .catch((e) => console.log("errr", e));
  // return searchResult;
  // }
  // else
  // {
  //   const searchResult = await client
  //   .search({
  //     index: _index,
  //     query: {
  //       multi_match: {
  //         query: phrase,
  //         fields: ["name","description"],
  //         type: "phrase_prefix",
  //       },
  //     },
  //   })
  //   .catch((e) => console.log("errr", e));
  // return searchResult;
  // }
};

module.exports = {
  phraseSearch,
};
