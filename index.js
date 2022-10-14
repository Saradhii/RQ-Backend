const connection = require("./db/db");
const express = require("express");
const cors = require("cors");
const RequestQoutesRoute = require("./routes/RequestQuotesRoute");
const FindHSRoute = require("./routes/FindHSRoute");
// App creation
const app = express();
//Needed middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use("/requestquote", RequestQoutesRoute);
app.use("/hsroute", FindHSRoute);
//testing
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
  console.log(`Backend is working at ${PORT}`);
});
