const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "http://54.178.33.146:9200/",
});

const phraseSearch = async (_index, phrase, from) => {
  phrase = phrase.trim();
  if (phrase.includes(" ")) {
    phrase = phrase.replace(/\s+/g, " ");
    const words = phrase.split(" ");
    const searchResult = await client
      .search({
        index: _index,
        size: 5,
        from: from,
        query: {
          bool: {
            must: [
              {
                multi_match: {
                  query: words[0],
                  type: "phrase_prefix",
                  fields: ["hscode", "description", "htsno", "itc_hscode"],
                },
              },

              {
                multi_match: {
                  query: words[1],
                  type: "phrase_prefix",
                  fields: ["hscode", "description", "htsno", "itc_hscode"],
                },
              },
            ],
          },
        },
      })
      .catch((e) => console.log("errr", e));
    return searchResult;
  } else {
    
    if(!isNaN(phrase) && (phrase.length<=10))
    {
      phrase = phrase.slice(0,5);
    }
    // console.log(phrase);
    const searchResult = await client
      .search({
        index: _index,
        size: 5,
        from: from,
        query: {
          dis_max: {
            queries: [
              {
                multi_match: {
                  query: phrase,
                  type: "phrase_prefix",
                  fields: ["hscode", "description", "htsno", "itc_hscode"],
                  minimum_should_match: "50%",
                },
              },
              {
                fuzzy: {
                  description: {
                    value: phrase,
                    fuzziness: "AUTO",
                  },
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
