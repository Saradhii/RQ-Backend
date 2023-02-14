const connection = require("./db/db");
const express = require("express");
const cors = require("cors");
const RequestQoutesRoute = require("./routes/RequestQuotesRoute");
const FindHSRoute = require("./routes/FindHSRoute");
const CityRoute = require("./routes/CityRoutes");

const app = express();
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

app.get("/backend/getheadingsindia/:index", async (req, res) => {
  const { phraseSearch } = require("./routes/GetHeadingsIndia");
  const data = await phraseSearch(req.params.index,req.query.q);
  res.send(data);
});


app.get("/backend/getheadings/:index", async (req, res) => {
  const { phraseSearch } = require("./routes/GetHeadings");
  const data = await phraseSearch(req.params.index,req.query.q);
  let new_data = data?.hits?.hits;
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

app.get("/backend/gethscode/:index", async (req, res) => {
  const { phraseSearch6 } = require("./routes/GetSubheadingsByCountry");
  const data = await phraseSearch6(req.params.index,req.query.q);
  res.json(data);
});

app.get("/backend/getsubheadings/:index", async (req, res) => {
  const { phraseSearch } = require("./routes/GetSubHeadings");
  const data = await phraseSearch(req.params.index,req.query.q);
  res.json(data);
});


app.get("/searchcategory/:index/", async (req, res) => {
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

app.get("/backend/searchhs/:index", async (req, res) => {
  let str = req.query.q;
  str = str.trim();
  str = str.replace(/\s+/g, " ");
  str = str.replace(/[^a-zA-Z0-9 ]/g, "");
  console.log(str);
  const { phraseSearch } = require("./routes/AutoSearch");
  const data = await phraseSearch(req.params.index, str);
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

app.get("/backend/searchcountryhscode/:index", async(req,res)=>{

  // console.log(req.params.index,req.query.q,req.query.n);
  const {phraseSearchhs} = require("./routes/CountryHsCode");
  const { phraseSearch } = require("./routes/Globalhs");
  const data = await phraseSearchhs(req.params.index,req.query.q,req.query.n);
  const arr = data?.hits?.hits;
  for(var i=0;i<arr.length;i++)
  {
    if(req.params.index=="indianhs")
    {
      let globalData= await phraseSearch("globalhs", arr[i]._source.itc_hscode);
      arr[i].globalData = globalData?.hits?.hits[0];
    }
    else if (req.params.index=="htshs")
    {
      var txt = arr[i]._source.htsno;
      txt = txt.replace('.','');
      txt = txt.replace('.','');
      txt = txt.replace('.','');
      let globalData= await phraseSearch("globalhs", txt);
      arr[i].globalData = globalData?.hits?.hits[0];
    }
  }
  res.send(arr);
});

app.get("/backend/seo/:index",async(req,res)=>{
  const { phraseSearch } = require("./routes/SEORoute");
  const data = phraseSearch(req.params.index);
  res.send(data);
})
app.get("/backend/searchcountryhs/:index", async (req, res) => {
  if(isNaN(req.query.q) == false)
  { 
    const { phraseSearch_c } = require("./routes/HSCodeSearchForCountry");
    const { phraseSearch } = require("./routes/Globalhs");
    const data = await phraseSearch_c(req.params.index, req.query.q);
    const arr = data?.hits?.hits;
    for (var i = 0; i < arr.length; i++) {
      if(req.params.index == "indianhs")
      {
        let globalData= await phraseSearch("globalhs", req.query.q);
        arr[i].globalData = globalData?.hits?.hits;
      }
      else if(req.params.index == "htshs")
      {
        let globalData= await phraseSearch("globalhs", req.query.q);
        arr[i].globalData = globalData?.hits?.hits;
      }
    }
    res.send(arr); 
  }
  else if(isNaN(req.query.q) == true){
    const { phraseSearch } = require("./routes/Globalhs");
    const { phraseSearch6 } = require("./routes/SearchInCountry");
    const data = await phraseSearch("globalhs", req.query.q, req.query.n);
    const arr = data?.hits?.hits;
    for (var i = 0; i < arr.length; i++) {
      let countryData= await phraseSearch6(req.params.index, arr[i]._source.hscode);
      arr[i].countryData = countryData?.hits?.hits;
    }
    res.send(arr);
  }
});


app.get("/backend/searchglobal/:index", async (req, res) => {
  const { phraseSearch } = require("./routes/Globalhs");
  const { phraseSearch6 } = require("./routes/SearchInCountry");
  const data = await phraseSearch(req.params.index, req.query.q, req.query.n);
  const arr = data?.hits?.hits;
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
  const arr = data?.hits?.hits;
  for (var i = 0; i < arr.length; i++) {
    let countrydata = await phraseSearch6(req.query.c, arr[i]._source.hscode);
    arr[i].countrydata = countrydata?.hits?.hits;
  }
  res.send(arr);
});



app.get("/backend", (req, res) => {
  res.send("Request Quote backend working....");
});


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
