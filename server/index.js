const express = require("express");
const morgan = require("morgan");
const pg = require("pg");
const cors = require("cors");
const bodyParser = require("body-parser");
const { data } = require("jquery");
require("dotenv").config();

const app = express();
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({extended:true}));
const db = new pg.Client({
    database: "finance_tracker",
    host: "localhost",
    port: 5432,
    user:"postgres",
    password:"ShyamSeenu10"
});
db.connect().then(()=>{
    console.log("Database Connected!");
});
app.get("/", (req, res)=>{
    res.send("Hello world");
})

app.post("/add", async(req,res)=>{
    const data = req.body;
    await db.query('INSERT INTO history(description, mode, amount) values($1, $2, $3)', [data.description, data.mode, data.amount]);
    res.status(201).send("Record Inserted");
})

app.get("/transaction")

app.listen(3001, ()=>{
    console.log('Server started at PORT 3001');
})
