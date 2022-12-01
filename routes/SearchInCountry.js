const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "http://54.178.33.146:9200/",
});

const phraseSearch = async (_index, phrase) => {
  console.log(phrase);

  // only string values are searchable
  if (_index == "htshs") {
    if (phrase.length % 2 === 1) {
      phrase = "0" + phrase;
    }
    console.log(phrase);
    var phrase = phrase.slice(0, 4) + "." + phrase.slice(4);
    const searchResult = await client
      .search({
        index: _index,
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
  phraseSearch,
};
