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

app.get("/obterCadastroAdminPorEmail/:email", (req, res) => {
    const { email } = req.params;
    let mysql = 'call cadastro_admin_obter_email_sps(?)';
    db.query(mysql, [email], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.post("/cadastrarAdmin", (req, res) => {
    const { id } = req.body;
    const { nome } = req.body;
    const { email } = req.body;
    const { empresa } = req.body;
    const { cargo } = req.body;

    let mysql = "call cadastro_admin_incluir_spi(?,?,?,?,?)";
    db.query(mysql, [id, nome, email, empresa, cargo], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put("/atualizarAdmin/:id", (req, res) => {
    const { id } = req.params;    
    const { nome } = req.body;
    const { email } = req.body;
    const { empresa } = req.body;
    const { cargo } = req.body;
  
    let mysql = "call cadastro_admin_alterar_spi(?,?,?,?,?)";
    db.query(mysql, [id, nome, email, empresa, cargo], (err, result) => {
      if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
    });
});

app.listen(3000, () => {
  console.log("rodando na porta 3000");
});