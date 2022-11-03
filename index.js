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
app.use(
  cors({
    origin: ["http://localhost:3000","https://request-quote-intoglo.netlify.app","https://intoglo.netlify.app","https://intoglo-page.netlify.app/requestquote","https://intoglo-page.netlify.app"],
  })
);
app.use("/quote", RequestQoutesRoute);
app.use("/search", FindHSRoute);
app.use("/city",CityRoute);

app.get('/search/:index', async (req, res) => {
  const { phraseSearch } = require('./routes/SearchEngine');
  const data = await phraseSearch(req.params.index, req.query.q);
  res.json(data);
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
