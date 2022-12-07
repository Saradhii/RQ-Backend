const connection = require("./db/db");
const express = require("express");
const cors = require("cors");
const RequestQoutesRoute = require("./routes/RequestQuotesRoute");
const FindHSRoute = require("./routes/FindHSRoute");
const CityRoute = require("./routes/CityRoutes");

const app = express();
//Needed middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// {
//     origin: [
//       "http://localhost:3000",
//       "https://request-quote-intoglo.netlify.app",
//       "https://intoglo.netlify.app",
//       "https://intoglo-page.netlify.app/requestquote",
//       "https://intoglo-page.netlify.app",
//       "https://intoglo-eta.vercel.app/requestquote",
//     ],
//   }

app.use("/quote", RequestQoutesRoute);
app.use("/search", FindHSRoute);
app.use("/city", CityRoute);

app.get("/searchcity/:index", async (req, res) => {
  const { phraseSearch } = require("./routes/SearchCity");
  const data = await phraseSearch(req.params.index, req.query.q);
  res.json(data);
});

app.get("/searchall/:index", async (req, res) => {
  const { phraseSearch } = require("./routes/GetAllHs");
  const data = await phraseSearch(req.params.index);
  res.json(data);
});

app.get("/searchcategory/:index/", async (req, res) => {
  // console.log(req.params.index, req.query.category);
  console.log(req.query);
  const { phraseSearch } = require("./routes/SearchCategoty");
  const data = await phraseSearch(
    req.params.index,
    req.query.category,
    req.query.q
  );
  res.json(data);
});

app.get("/searchincountry/:index", async (req, res) => {
  const { phraseSearch } = require("./routes/SearchInCountry");
  const data = await phraseSearch(req.params.index, req.query.globalhs);
  res.json(data);
});

app.get("/search/:index", async (req, res) => {
  const { phraseSearch } = require("./routes/SearchEngine");
  const data = await phraseSearch(req.params.index, req.query.q);
  res.json(data);
});

app.get("/searchglobal/:index", async (req, res) => {
  const { phraseSearch } = require("./routes/Globalhs");
  const data = await phraseSearch(req.params.index, req.query.q);
  // const arr = data.hits.hits;
  // var india = [];
  // var usa = [];
  // for(var i=0;i<arr.length;i++)
  // {
  //   const itc = await phraseSearch("indianhs", arr[i]._source.hscode);
  //   const hts = await phraseSearch("htshs",arr[i]._source.hscode);
  //   india.push(itc);
  //   usa.push(hts);
  // }
  const indian = await phraseSearch("indianhs", req.query.q);
  const usa = await phraseSearch("htshs", req.query.q);
  // res.json(data);
  res.send({ data: data, indian: indian, usa: usa });
});

app.get("/", (req, res) => {
  res.send("Request Quote backend working....");
});

// starting the server && checking db connection
const PORT = process.env.PORT || 8060;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to Database Successfully &");
  } catch (err) {
    console.log(err);
  }
  console.log(`Backend is working http://localhost:${PORT}/`);
});
