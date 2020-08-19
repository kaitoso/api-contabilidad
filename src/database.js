import * as firebase from "firebase-admin";
import * as cuenta from "./contabilidad-e6f45-firebase-adminsdk-plcbl-947d0e7ce8.json";

firebase.default.initializeApp({
  credential: firebase.default.credential.cert(cuenta.default),
  databaseURL: "https://contabilidad-e6f45.firebaseio.com",
});

export async function conexion() {
  try {
    console.log("base de datos conectada");

    return firebase.default.database();
  } catch (error) {
    console.log("Ocurrio un error en la conexion a la base de datos: ", error);
  }
}
