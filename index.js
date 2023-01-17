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

app.get("/getSectionsChapters/:index", async (req, res) => {
  const { phraseSearch } = require("./routes/GetSections");
  const data = await phraseSearch(req.params.index);
  res.json(data);
});


app.get("/backend/getsections/:index", async (req, res) => {
  const { phraseSearch } = require("./routes/GetSections");
  const data = await phraseSearch(req.params.index);
  res.json(data);
});


app.get("/backend/getheadings/:index", async (req, res) => {
  const { phraseSearch } = require("./routes/GetHeadings");
  const data = await phraseSearch(req.params.index,req.query.q);
  let new_data = data.hits.hits;
  let newArray = [];
  let uniqueObject = {};
  for (let i in new_data) 
  {
     objTitle = new_data[i]._source.heading_no;
     uniqueObject[objTitle] = new_data[i];
  }
  for (i in uniqueObject) 
  {
    newArray.push(uniqueObject[i]);
  }
  res.json(newArray);
});

app.get("/backend/getsection/:index", async (req, res) => {
  const { phraseSearch } = require("./routes/GetSection");
  const data = await phraseSearch(req.params.index,req.query.q);
  res.json(data);
});



app.get("/backend/getsubheadings/:index", async (req, res) => {
  const { phraseSearch } = require("./routes/GetSubHeadings");
  const data = await phraseSearch(req.params.index,req.query.q);
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
  const { phraseSearch6 } = require("./routes/SearchInCountry");
  const data = await phraseSearch6(req.params.index, req.query.q);
  res.json(data);
});

app.get("/search/:index", async (req, res) => {
  const { phraseSearch } = require("./routes/SearchEngine");
  const data = await phraseSearch(req.params.index, req.query.q);
  res.json(data);
});

app.get("/backend/searchglobalres/:index", async(req,res)=>{
  const { phraseSearch } = require("./routes/Globalcount");
  const data = await phraseSearch(req.params.index, req.query.q);
  res.send(data);
});

app.get("/backend/searchglobal/:index", async (req, res) => {
  const { phraseSearch } = require("./routes/Globalhs");
  const { phraseSearch6 } = require("./routes/SearchInCountry");
  const data = await phraseSearch(req.params.index, req.query.q, req.query.n);
  const arr = data.hits.hits;
  for (var i = 0; i < arr.length; i++) {
    let indianData = await phraseSearch6("indianhs", arr[i]._source.hscode);
    let usaData = await phraseSearch6("htshs", arr[i]._source.hscode);
    arr[i].indiaData = indianData?.hits?.hits;
    arr[i].usaData = usaData?.hits?.hits;
  }
  // const indian = await phraseSearch("indianhs", req.query.q);
  // const usa = await phraseSearch("htshs", req.query.q);
  res.send(arr);
  // // res.json(data);
  // res.send({data: data, indian: indian, usa: usa});
});

app.get("/backend/searchhscountry/:index", async (req, res) => {
  const { phraseSearch } = require("./routes/Globalhs");
  const { phraseSearch6 } = require("./routes/SearchCountryhs");
  const data = await phraseSearch(req.params.index, req.query.q, req.query.n);
  const arr = data.hits.hits;
  for (var i = 0; i < arr.length; i++) {
    let countrydata = await phraseSearch6(req.query.c, arr[i]._source.hscode);
    arr[i].countrydata = countrydata?.hits?.hits;
  }
  res.send(arr);
});



app.get("/backend", (req, res) => {
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
