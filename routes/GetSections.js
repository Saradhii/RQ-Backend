const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "http://54.178.33.146:9200/",
});

const phraseSearch = async (_index) => {

  // only string values are searchable
  const searchResult = await client
    .search({
      index: _index,
      aggs:{
        "section":{
            terms:{
                field:"section.keyword",
                min_doc_count:1,
                size:100
            },
            aggs:{
                "section&chapters":{
                    terms:{
                        field:"chapter.keyword",
                        min_doc_count:1,
                        size:100
                    },
                }
            }
        }
      }
    })
    .catch((e) => console.log("errr", e));
  return searchResult;
};

module.exports = {
  phraseSearch,
};
