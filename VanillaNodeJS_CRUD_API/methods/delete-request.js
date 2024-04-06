import writeToFile from "../utils/write-to-file.js";

export default async function deleteReq(req, res) {
  let baseURL = req.url.substr(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/").pop();
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
    const index = req.movies.findIndex((m) => {
      return m.id === id;
    });
    if (index === -1) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ title: "Not Found", message: "Route not found" })
      );
    } else {
      req.movies.splice(index, 1);
      res.writeHead(204, { "Content-Type": "application/json" });
      const basicInfo = {
        title: "Success",
        message: "Movie deleted successfully",
      };
      const response = {
        basicInfo: basicInfo,
        movies: req.movies,
      };
      res.end(JSON.stringify(response));
      writeToFile("movies.json", req.movies);
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" }));
  }
}
