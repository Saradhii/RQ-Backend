const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "http://54.178.33.146:9200/",
});

const phraseSearch = async (_index, _category, phrase) => {
  const hits = [];

  // only string values are searchable
  if (phrase) {
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
  } else {
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
