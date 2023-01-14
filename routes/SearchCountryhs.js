const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "http://54.178.33.146:9200/",
});

const phraseSearch6 = async (_index, phrase) => {
  if (_index == "us") {
    var phrase = phrase.slice(0, 4) + "." + phrase.slice(4);
    const searchResult = await client
      .search({
        index: "htshs",
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
  } else if(_index == "in") {
    const searchResult = await client
      .search({
        index: "indianhs",
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
