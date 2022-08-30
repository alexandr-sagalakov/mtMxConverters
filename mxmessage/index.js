const express = require("express");
const app = express();
const xml = require("../verify/conversion/xml");
const HttpError = require("./httpError");

app.get("/:fname", (req, res, next) => {
  const corFileVer = req.params.fname;
  try {
    data = require(`../verify/${corFileVer}.json`);
  } catch {
    const Error = new HttpError("No Such file present in directory", 404);
    throw Error;
  }

  const map = new Map(Object.entries(data));
  const mxOutput = xml(map);
  res.set('Content-Type','text/xml')
  res.send(mxOutput);
});

app.use((res, req, next) => {
  const Error = new HttpError("Could not find the requested route", 404);
  throw Error;
});

app.use((error, req, res, next) => {
  if (req.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An Unknown Error Occured" });
});

const port = process.env.PORT || 5003;
app.listen(port, () => {
  console.log(`server is listening on port ${port} `);
});
