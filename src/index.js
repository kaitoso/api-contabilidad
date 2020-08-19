import app from "./server.js";
import "@babel/polyfill";
import { conexion } from "./database.js";

async function main() {
  await app.listen(app.get("port"));
  await conexion();
  console.log("api corriendo en el puerto", app.get("port"));
}

main();
