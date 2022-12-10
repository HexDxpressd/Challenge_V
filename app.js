const express = require("express")
const mysql = require("mysql")

const app = express()
app.use(express.json())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

const conectBD = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "enyoi_database"
})

app.listen(3443, () => {
    console.log("puerto 3443")
})

app.get("/vehiculo", (req, res) => {
    const sql = 'SELECT * FROM vehiculos'

    conectBD.query(sql, (error, result) => {
        if (error) throw error;

        if (result.length > 0){
            res.json(result)
        } else {
            res.send("Not Result")
        }
    })
})

app.get("/vehiculos/:id", (req, res) => {
    // colocar en el postmat "http://localhost:3443/vehiculos/aqui-el-id-que-solicita"
    const id = req.params.id
    const sql = `SELECT * FROM vehiculos WHERE id = ${id}`

    conectBD.query(sql, (error, result) => {
        if (error) throw error;

        if (result.length > 0){
            res.json(result)
        } else {
            res.send("Not Result")
        }
    })
})

app.post("/addvehiculo", (req, res) => {
    const sql = "INSERT INTO vehiculos SET ?"

    const vehiculoObj = {
        id: req.body.id,
        name: req.body.name,
        year: req.body.year,
        precio: req.body.precio,
        cantidad: req.body.cantidad
    }

    conectBD.query(sql, vehiculoObj, error =>{
        if (error) throw error
        res.send("Vehiculo añadido con exito")
    })
})

app.put("/update/:id", (req, res) => {
    // colocar en el postmat "http://localhost:3443/vehiculos/aqui-el-id-que-va-actualizar"
    const id = req.params.id
    const{name, year, precio, cantidad} = req.body

    const sql = `UPDATE vehiculos SET name = '${name}', year = '${year}', precio = '${precio}', cantidad = '${cantidad}' WHERE id = ${id}`

    conectBD.query(sql, error => {
        if (error) throw error

        res.send(`Vehiculo con el id: ${id}, fue actualizado con exito`)
    })
})