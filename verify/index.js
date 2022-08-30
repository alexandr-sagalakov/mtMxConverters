const express = require("express");
const fs = require("fs");
const bracketBreaker = require("./validations/blockBreaker");
const basicHeaderVer = require("./validations/basicHeaderValid");
const applicationHeaderVer = require("./validations/applicationHeader");
const userHeaderVer = require("./validations/userHeader");
const textHeaderVer = require("./validations/textHeader");
const trailerHeaderVer = require("./validations/trailerHeader");
const HttpError = require("./httpError");

const app = express();
app.use(express.json());

app.get("/:fname", (req, res, next) => {
  const allErrors = [];
  const filename = req.params.fname;

  try {
    readData = fs
      .readFileSync(`../uploadMicro/uploads/${filename}`, "utf8")
      .replace(/[\r]/gm, " ");
  } catch {
    const Error = new HttpError("No Such file present in directory", 404);
    throw Error;
  }

  const reqString = bracketBreaker(readData);
  const basicHeaderReturn = basicHeaderVer(reqString[0]);
  if (!basicHeaderReturn[0]) {
    console.log("Error in basic header");
  }
  console.log(basicHeaderReturn);
  allErrors.push(basicHeaderReturn);

  const applicationHeaderReturn = applicationHeaderVer(reqString[1]);
  if (!applicationHeaderReturn[0]) {
    console.log("Error in application header");
  }

  console.log(applicationHeaderReturn);
  allErrors.push(applicationHeaderReturn);
  userHeaderReturn = userHeaderVer(reqString[2]);
  if (!userHeaderReturn[0]) {
    console.log("Error in userHeader");
  }

  console.log(userHeaderReturn);
  allErrors.push(userHeaderReturn);

  textHeaderReturn = textHeaderVer(reqString[3], filename);
  if (!textHeaderReturn[0]) {
    console.log("Error in textHeader");
  }

  console.log(textHeaderReturn);
  allErrors.push(textHeaderReturn);

  trailerHeaderReturn = trailerHeaderVer(reqString[4]);
  if (!trailerHeaderReturn[0]) {
    console.log("Error in trailer header");
  }

  console.log(trailerHeaderReturn);
  allErrors.push(trailerHeaderReturn);

  res.json({ Verification_Status: allErrors });
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

const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(`server is listening on port ${port} `);
});
