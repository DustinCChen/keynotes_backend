export default async function getReq(req, res) {
  let baseURL = req.url.substr(0, req.url.lastIndexOf("/") + 1);
  console.log(baseURL);
  let id = req.url.split("/").pop();
  // console.log(id);
  // console.log(id.pop());
  const regexV4 = new RegExp(
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  );
  // if (regexV4.test(id)) {
  //   const movie = req.movies.find((m) => m.id === id);
  //   if (movie) {
  //     res.statusCode = 200;
  //     res.setHeader("Content-Type", "application/json");
  //     res.end(JSON.stringify(movie)); // Convert object to JSON string
  //   } else {
  //     res.writeHead(404, { "Content-Type": "application/json" });
  //     res.end(JSON.stringify({ title: "Not Found", message: "Route not found" })); // Convert object to JSON string
  //   }
  // }
  if (req.url === "/api/movies") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(req.movies)); // Convert object to JSON string
  } else if (!regexV4.test(id)) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        title: "Validation Error",
        message: "UUID is not valid",
      })
    ); // Convert object to JSON string
  } else if (baseURL === "/api/movies/" && regexV4.test(id)) {
    // let filteredMovie = req.movies.find((m) => m.id === id;);

    let filteredMovie = req.movies.filter((m) => {
      return m.id === id;
    });
    if (filteredMovie.length > 0) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(filteredMovie));
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ title: "Not Found", message: "Movie not found" })
      );
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ title: "Not Found", message: "Route not found" })); // Convert object to JSON string
  }
}
