const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "http://54.178.33.146:9200/",
});

const phraseSearch_c = async (_index, phrase) => {
  phrase = phrase.trim();
  if(_index=="indianhs")
  {
    const searchResult = await client
    .search({
      index: _index,
      query: {
          match_phrase_prefix: {
            itc_hscode: {
              query: phrase
            }
          }
        }
    })
    .catch((e) => console.log("errr", e));
  return searchResult;
  }
  else if(_index=="htshs")
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
     console.log(phrase);
    const searchResult = await client
    .search({
      index: _index,
      query: {
          match_phrase_prefix: {
            htsno: {
              query: phrase
            }
          }
        }
    })
    .catch((e) => console.log("errr", e));
    return searchResult;
   }
};

module.exports = {
    phraseSearch_c,
};
