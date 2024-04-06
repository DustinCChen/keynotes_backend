import crypto from "crypto";
import bodyParser from "../utils/body-parser.js";
import writeToFile from "../utils/write-to-file.js";
export default async function postReq(req, res) {
  if (req.url === "/api/movies") {
    try {
      /*
    let body = bodyParser(req)
   如果没有await关键字，那么返回的是一个Promise对象
   Request Body: Promise { <pending> }
   */
      let body = await bodyParser(req);
      body.id = crypto.randomUUID();
      req.movies.push(body);
      writeToFile("movies.json", req.movies);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(body));
      // console.log("Request Body:", body);
    } catch (error) {
      // return {
      //   message: "Server Error",
      //   error: error.message,
      // };
      console.log(error);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ 
       title: "Validation Error",
       message: "Request body is not valid", 
       error: error.message }));
    }
  }
}
