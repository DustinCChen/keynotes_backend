// export  default function bodyParser(req, res, next) {
//  if (req.headers["content-type"] === "application/json") {
//   let body = [];
//   req.on("data", (chunk) => {
//    body.push(chunk);
//   });
//   req.on("end", () => {
//    req.body = Buffer.concat(body).toString();
//    next();
//   });
//  } else {
//   next();
//  }
// }

export default async function bodyParser(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk;
      });
      req.on("end", () => {
        req.body = JSON.parse(body);
        resolve(req.body);
        // resolve(JSON.parse(body));
      });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
}
