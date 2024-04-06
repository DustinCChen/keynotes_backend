import writeToFile from "../utils/write-to-file.js";
import bodyParser from "../utils/body-parser.js";

export default async function putReq(req, res) {
  const baseURL = req.url.substr(0, req.url.lastIndexOf("/") + 1);
  const id = req.url.split("/").pop();
  const regexV4 = new RegExp(
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  );
  if (!regexV4.test(id)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation Error",
        message: "UUID is not valid",
      })
    ); // Convert object to JSON string
  } else if (baseURL === "/api/movies/" && regexV4.test(id)) {
    let body = await bodyParser(req);
    const index = req.movies.findIndex((m) => {
      return m.id === id;
    });
    if (index === -1) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ title: "Not Found", message: "Movie not found" })
      );
    } else {
      // req.movies[index] = { ...req.movies[index], ...body };
      req.movies[index] = { id, ...body };
      const basicInfo = {
       title: "Success",
       message: "Movie updated successfully",
      };
      const response = {
       basicInfo: basicInfo,
       movies: req.movies[index],
      };
      // res.end(JSON.stringify(response));
      writeToFile("movies.json", req.movies);
      /*
      - Use status code 200 when you want to indicate that 
      the server successfully processed the request and is returning content in the response.
     - It is commonly used for successful GET requests where 
     the server successfully processes the request and returns the requested data.

      - Use status code 204 when the server successfully processed the request, 
      but there is no content to return in the response body.
      - It is commonly used for requests that don't require a response body, 
      such as successful DELETE requests or POST requests that don't need to return any data.

      - The HTTP status code 400 indicates that the server cannot process the client's request 
      due to a client error, such as malformed syntax or invalid parameters in the request.
      -  It is used when the server perceives the request as invalid or unable to be processed.
      - Missing required parameters, invalid data format, or syntactically incorrect requests.
      
      - The HTTP status code 404 signifies that the server cannot find the requested resource, 
      indicating that the URL or endpoint does not exist on the server.
      - It is commonly used when the client requests a resource that is not available on the server.
      - Accessing a non-existent endpoint, requesting a resource that has been deleted or moved, 
      or mistyping the URL.

      - The HTTP status code 500 indicates that an unexpected error occurred on the server while 
      processing the request, leading to an internal server error.
      -  Database connection failure, unhandled exceptions in server-side code, 
      or unexpected errors during request processing.
      */
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(response));
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
}

