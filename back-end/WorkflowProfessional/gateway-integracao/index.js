const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Lm@518792",
  database: "wkprofessional",
});

app.use(express.json());
app.use(cors());

app.listen(10000, () => {
    console.log("rodando na porta 10000");
});