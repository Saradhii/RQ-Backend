const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "http://54.178.33.146:9200/",
});

const phraseSearch = async (_index) => {

  // only string values are searchable
  const searchResult = await client
    .search({
      index: _index,
      size: 7000,
      _source: ["section","chapter"]
    })
    .catch((e) => console.log("errr", e));
  return searchResult;
};

module.exports = {
  phraseSearch,
};
