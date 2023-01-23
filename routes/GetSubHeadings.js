const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "http://54.178.33.146:9200/",
});

const phraseSearch = async (_index,phrase) => {
 if(phrase.includes("."))
 {
  var str = phrase.replace('.','');
  console.log(str);
  console.log("phrase",phrase);
  const searchResult = await client
    .search({
      index: _index,
      size: 7000,
      query: {
        multi_match:
        {
         query: str,
         type: "phrase_prefix",
         fields: ["heading_no","hscode",]
        }
      },
    })
    .catch((e) => console.log("errr", e));
  return searchResult;
 }
 else
 {
  const searchResult = await client
    .search({
      index: _index,
      size: 7000,
      query: {
        multi_match:
        {
         query: phrase,
         type: "phrase_prefix",
         fields: ["heading_no","hscode",]
        }
      },
    })
    .catch((e) => console.log("errr", e));
  return searchResult;
 }
};

module.exports = {
  phraseSearch,
};
