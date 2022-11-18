const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: "https://7f4d-2401-4900-1cb5-52c4-5dc7-562e-faa2-1624.in.ngrok.io/",
  auth: {
    username: "elastic",
    password: "+cdPcJ40Hu4yivklTq8f",
  },
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
          fields: ["hs2", "name", "description"],
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
