const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "http://54.178.33.146:9200/",
});

const phraseSearchhs = async (_index, phrase, from) => {
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
    if(_index=="htshs" && !isNaN(phrase))
    {
        if(!phrase.includes("."))
        {
            if(phrase.length<=6)
        {
            phrase= phrase.slice(0, 4) + '.' + phrase.slice(4);  
        }
        else if(phrase.length<=8)
        {
            phrase= phrase.slice(0, 4) + '.' + phrase.slice(4);
            phrase = phrase.slice(0, 7) + '.' + phrase.slice(7);
        }
        else{
            phrase= phrase.slice(0, 4) + '.' + phrase.slice(4);
            phrase = phrase.slice(0, 7) + '.' + phrase.slice(7);
            phrase = phrase.slice(0, 10) + '.' + phrase.slice(10); 
        }
        }
    }
    else if(phrase.includes("."))
    {
        phrase = phrase;
    }
    console.log(phrase);
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
  phraseSearchhs,
};
