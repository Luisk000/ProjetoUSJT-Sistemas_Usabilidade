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

app.get("/obterVagasAdminPorIdAdmin/:admin_id", (req, res) => {
  const { admin_id } = req.params;
  let mysql = 'call vaga_obter_por_admin_id_sps(?)';
  db.query(mysql, [admin_id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/obterVagaAdminPorId/:id", (req, res) => {
  const { id } = req.params;
  let mysql = 'call vaga_obter_por_id_sps(?)';
  db.query(mysql, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/cadastrarVagaAdmin", (req, res) => {
  const { id } = req.body;
  const { admin_id } = req.body;
  const { funcao } = req.body;
  const { descricao } = req.body;
  const { area } = req.body;
  const { horario } = req.body;
  const { salario } = req.body;
  const { beneficios } = req.body;
  const { quantidade } = req.body;

  let mysql = "call vaga_admin_incluir_spi(?,?,?,?,?,?,?,?,?)";
  db.query(mysql, [id, admin_id, funcao, descricao, area, horario, salario, beneficios, quantidade], (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  });
});

app.put("/atualizarVagaAdmin/:id", (req, res) => {
  const { id } = req.params;
  const { admin_id } = req.body;
  const { funcao } = req.body;
  const { descricao } = req.body;
  const { area } = req.body;
  const { horario } = req.body;
  const { salario } = req.body;
  const { beneficios } = req.body;
  const { quantidade } = req.body;

  let mysql = "call vaga_admin_alterar_spi(?,?,?,?,?,?,?,?,?)";
  db.query(mysql, [id, admin_id, funcao, descricao, area, horario, salario, beneficios, quantidade], (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  });
});

app.delete("/excluirVagaAdmin/:id", (req, res) => {
  const { id } = req.params;  

  let mysql = "call vaga_admin_excluir_spi(?)";
  db.query(mysql, [id], (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
  });
});

app.listen(5000, () => {
    console.log("rodando na porta 5000");
});