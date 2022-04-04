const cors = require("cors");

module.exports = (app) => {
  if (process.env.NODE_ENV == "development") {
    require("dotenv").config({
      path: `env.${process.env.NODE_ENV}`,
    });  

    app.use(cors());
  }
}