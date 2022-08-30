const express = require("express");
const app = express();
const fileUpload = require("./middleware/fileupload");
const HttpError = require("./httpError");

const startServer = async () => {
  await app.post(
    "/uploadMT",
    fileUpload.array("mtfile", 10),
    (req, res, next) => {
      console.log(req.files);
      res.send("File Uploaded");
    }
  );

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

  const port = process.env.PORT || 5001;
  app.listen(port, () => {
    console.log(`Server is listening on port ${port} `);
  });
};

startServer();
