import Router from "express";
import { conexion } from "../database.js";
const router = Router();

router.get("/productos", async (req, res) => {
  const db = await conexion();

  db.ref("productos").once("value", (snapshot) => {
    res.json(snapshot.val());
  });
});
router.post("/productos", async (req, res) => {
  const db = await conexion();
  console.log(req.body);
  let objetoProducto = {
    nombre: req.body.nombre,
    cantidad: req.body.cantidad,
    descipcion: req.body.descipcion,
    ganancia: req.body.ganancia,
    precio_costo: req.body.precio_costo,
    precio_venta: req.body.precio_venta,
  };
  try {
    await db.ref("productos").push(objetoProducto);
    res.json({ status: "añadido correctamente", data: objetoProducto });
  } catch (error) {
    console.log("error al añadir: ", error);
    res.send("error al añadir");
  }
});
router.put("/productos", async (req, res) => {
  const db = await conexion();
  console.log(req.body);
  let objetoProducto = {
    nombre: req.body.nombre,
    cantidad: req.body.cantidad,
    descipcion: req.body.descipcion,
    ganancia: req.body.ganancia,
    precio_costo: req.body.precio_costo,
    precio_venta: req.body.precio_venta,
  };
  try {
    let productos = {};
    await db.ref("productos").once("value", (snapshot) => {
      productos = snapshot.val();
    });

    for (const key in productos) {
      if (productos.hasOwnProperty(key)) {
        if (productos[key].nombre == req.body.nombre) {
          let productoEditar = { [key]: objetoProducto };
          await db.ref("productos").set(productoEditar);
          return res.json({
            status: "Editado correctamente",
            data: productoEditar,
          });
        }
      }
    }
    return res.json({ status: "Producto no existe", data: "" });

    //   await db.ref("productos").push(objetoProducto);
    //   res.send("añadido correctamente");
  } catch (error) {
    console.log("error al añadir: ", error);
    res.send("error al añadir");
  }
});
router.delete("/productos", async (req, res) => {
  const db = await conexion();
  console.log(req.body);
  let nombreProducto = req.body.nombre;

  try {
    let productos = {};
    await db.ref("productos").once("value", (snapshot) => {
      productos = snapshot.val();
    });

    for (const key in productos) {
      if (productos.hasOwnProperty(key)) {
        if (productos[key].nombre == nombreProducto) {
          await db.ref("productos/" + key).remove();
          return res.json({
            status: "eliminado correctamente",
            data: nombreProducto,
          });
        }
      }
    }
    return res.json({ status: "Producto no exite", data: "" });

    //   await db.ref("productos").push(objetoProducto);
    //   res.send("añadido correctamente");
  } catch (error) {
    console.log("error al añadir: ", error);
    res.send("error al añadir");
  }
});
router.get("/vendidos", async (req, res) => {
  const db = await conexion();

  db.ref("vendidos").once("value", (snapshot) => {
    res.json(snapshot.val());
  });
});

router.post("/vendidos", async (req, res) => {
  const db = await conexion();

  let costo = req.body.total_costo_vendidos;
  let ganancia = req.body.total_ganancias_vendidos;
  let ventas = req.body.total_ventas_vendidos;
  let total_productos_vendidos = req.body.total_productos_vendidos;
  let objetoVendidos = {
    total_costo_vendidos: costo,
    total_ganancias_vendidos: ganancia,
    total_ventas_vendidos: ventas,
    total_productos_vendidos: total_productos_vendidos,
  };

  try {
    console.log(objetoVendidos);
    await db.ref("vendidos").set(objetoVendidos);

    return res.json({
      status: "vendidos actualizado correctamente",
      data: objetoVendidos,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "error al conectar con la base de datos",
      data: "",
    });
  }
});

export default router;
