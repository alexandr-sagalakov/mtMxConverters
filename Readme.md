Installation Guide

1. Clone the repository using git clone 
```git clone https://github.com/Spiral-Memory/mtMxConverters.git```
2. Install npm dependencies in each folder "gateway", "uploadMicro" "verify" "mxmessage" using 
```npm install ```
3. Run ```npm start``` in all folders

API ENDPOINTS 

```http://localhost:5000/api/mtmx/upload/uploadMT``` (POST -> Upload MT Message)<br>
```http://localhost:5000/api/mtmx/verify/:fname``` (GET-> Validate MT Message)<br>
```http://localhost:5000/api/mtmx/getMX/:fname``` (GET -> Fetch MX Message)


