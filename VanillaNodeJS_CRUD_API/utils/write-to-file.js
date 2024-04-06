import fs from "fs";
import path from "path";

export default function writeToFile(fileName, data) {
 console.log("the data to wrtie in file :", data)
 const filePath = path.join(process.cwd(), "data", fileName);
 console.log(filePath)
 try {
  fs.writeFileSync(filePath, JSON.stringify(data),"utf-8");
 } catch (err) {
  console.error(err);
 }
}