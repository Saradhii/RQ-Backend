const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "http://54.178.33.146:9200/"
});

const phraseSearch = async (_index, phrase) => {
  const hits = [];

  // only string values are searchable
  const searchResult = await client
    .search({
      index: _index,
      query: {
        multi_match: {
          query: phrase,
          fields: ["name"],
          type: "phrase_prefix",
        },
      },
    })
    .catch((e) => console.log("errr", e));
  return searchResult;
};

module.exports = {
  phraseSearch,
};
