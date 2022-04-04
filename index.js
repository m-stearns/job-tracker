const express = require("express");
const path = require("path");

const app = express();
require("./config")(app);
const PORT = process.env.PORT;
const routes = require('./routes');

// serve client bundle
app.use(express.static(path.resolve(__dirname, "./client/build")));

// prefixes all routes with /api
app.use("/api", [...routes]);

// fallback is to always serve react bundle
app.get("*", (_, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});