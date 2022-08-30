const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MT-MX Conversion App",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://3.238.172.106:5000",
      },
    ],
  },
  apis: ["./index.js"],
};

const swaggerSpec = swaggerJSDoc(options);
/**
 * @swagger
 * /api/mtmx/verify/{fname}:
 *   get:
 *     summary: To verify the MT Format
 *     description: This API will verify details of MT103 which has been already uploaded, It will show errors in the MT File uploaded
 *     parameters:
 *          - in: path
 *            name: fname
 *            required: true
 *            descripton: Enter filename
 *            schema:
 *                type: string
 *     responses:
 *       200:
 *         description: Success
 *
 *
 */

/**
 * @swagger
 * /api/mtmx/getMX/{fname}:
 *   get:
 *     summary: To get the MX Format File
 *     description: This API will process the MT Format file and converts it into MX format as per XML documentation
 *     parameters:
 *          - in: path
 *            name: fname
 *            required: true
 *            descripton: Enter filename
 *            schema:
 *                type: string
 *     responses:
 *       200:
 *         description: Success
 *
 *
 */


/**
 * @swagger
* /api/mtmx/upload/uploadMT:
*   post:
*     summary: File upload
*     content:
*       - multipart/form-data
*     parameters:
*       - in: formData
*         name: mtfile
*         type: file
*         description: Uploads a MT File here to verify and convert to MX
*     responses:
*       "200":
*         description: Success
 */



app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.use("/api/mtmx/upload", proxy("http://3.238.172.106:5001"));
app.use("/api/mtmx/verify", proxy("http://3.238.172.106:5002"));
app.use("/api/mtmx/getMX", proxy("http://3.238.172.106:5003"));

app.use('/',(req,res)=>{
  res.send(`<h1>Welcome to MT-MX Converter</h1><br><h2><a href = "http://3.238.172.106:5000/api-docs">Go to API DOCS</a></h2>`);
})
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is listening on port ${port} `);
});
