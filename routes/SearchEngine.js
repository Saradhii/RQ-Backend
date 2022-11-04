const { Client } = require("@elastic/elasticsearch");
const client = new Client({
  node: "https://9a77-2401-4900-1c27-5b1b-106a-7224-f89a-d701.in.ngrok.io/",
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
