import http from "http";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 5000;
import getReq  from "./methods/get-request.js"; 
import postReq from "./methods/post-request.js";
import putReq from "./methods/put-request.js";
import deleteReq from "./methods/delete-request.js";
import { readFile } from "fs/promises";
const movies =JSON.parse(
  await readFile(
    new URL( "./data/movies.json",import.meta.url)
  )
)
 
const server = http.createServer((req, res) => {
  req.movies = movies;
 switch(req.method) {
   case "GET":
     console.log("GET");
     getReq(req, res);
     break;
   case "POST":
     console.log("POST");
     postReq(req, res);
     break;
   case "PUT":
     console.log("PUT");
     putReq(req, res);
     break;
   case "DELETE":
     console.log("DELETE");
     deleteReq(req, res);
     break;
   default:
    res.statusCode = 404;
    // res.setHeader("Content-Type", "text/plain");
    res.setHeader("Content-Type", "application/json");
    // res.end("Hello World");
    res.write(JSON.stringify({ title:"Not Found",message: "Route not found" }));
    res.end();
 }
 
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

server.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});