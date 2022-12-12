const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "http://54.178.33.146:9200/",
});

const phraseSearch6 = async (_index, phrase) => {
  if (_index == "htshs") {
    var phrase = phrase.slice(0, 4) + "." + phrase.slice(4);
    const searchResult = await client
      .search({
        index: _index,
        size: 10000,
        query: {
          match_phrase_prefix: {
            htsno: {
              query: phrase,
            },
          },
        },
      })
      .catch((e) => console.log("errr", e));
    return searchResult;
  } else {
    const searchResult = await client
      .search({
        index: _index,
        size: 10000,
        query: {
          match_phrase_prefix: {
            itc_hscode: {
              query: phrase,
            },
          },
        },
      })
      .catch((e) => console.log("errr", e));
    return searchResult;
  }
};

module.exports = {
  phraseSearch6,
};
