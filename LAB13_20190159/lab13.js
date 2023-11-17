const express = require("express");
const mysql = require("mysql2");

const app = express();

const conn = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bicicentro"
});

app.get("/trabajadores",(req,res) => {
    let sql = "select * from trabajadores";
    conn.query(sql,(err, result, fields) => {
        if(err) throw err;
        console.log("Conexion");
        res.json(
             result
        );
    });

});

app.get("/trabajadores/:id",(req,res) => {

    let id = req.params["id"];

    let sql = "select t.nombres, t.apellidos, t.correo, t.dni, t.idsede, s.nombreSede from trabajadores  t inner join sedes s on t.idsede = s.idsede where t.dni = ?";

    conn.query(sql,[id], (err, result, fields) => {
        if(err) throw err;

        res.json(result);
    });

});

app.get("/trabajadores/ventas/:id",(req,res) => {

    let id = req.params["id"];

    let sql = "select v.fecha, i.nombre, i.numeroserie, m.nombre as marca from ventas v inner join inventario i on i.idinventario = v.id_inventario inner join marcas m on i.idmarca = m.idmarca inner join trabajadores t on t.dni = v.dniTrabajador where t.dni = ?;";

    conn.query(sql,[id], (err, result, fields) => {
        if(err) throw err;

        res.json(result);
    });

});


app.get("/sedes",(req,res) => {
    let sql = "SELECT * FROM bicicentro.sedes;";
    conn.query(sql,(err, result, fields) => {
        if(err) throw err;
        res.json(
            result
        );
    });

});


app.get("/sedes/:id",(req,res) => {

    let id = req.params["id"];

    let sql = "select * from sedes where idsede = ?";

    conn.query(sql,[id], (err, result, fields) => {
        if(err) throw err;

        res.json(result);
    });

});


app.get("/sedes/trabajadores/:id",(req,res) => {

    let id = req.params["id"];

    let sql = "SELECT * FROM bicicentro.trabajadores where idsede = ?;";

    conn.query(sql,[id], (err, result, fields) => {
        if(err) throw err;

        res.json(result);
    });

});
app.listen(3000,function(){
    console.log("Servidor desplegado correctamente");
});