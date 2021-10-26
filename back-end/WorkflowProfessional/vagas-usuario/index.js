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

app.get("/obterTodasVagasUsuario", (req, res) => {  
  let mysql = 'call vagas_obter_todas_sps()';
  db.query(mysql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/obterVagasTop20", (req, res) => {  
  let mysql = 'call vaga_obter_por_top_20_sps()';
  db.query(mysql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/obterVagasAreaMais", (req, res) => {  
  let mysql = 'call vaga_obter_por_area_mais_sps()';
  db.query(mysql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/obterVagaPorId/:id", (req, res) => {
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

app.get("/obterVagaPorUsuarioId/:id", (req, res) => {
  const { id } = req.params;
  let mysql = 'call vagas_por_usuario_id_sps(?)';
  db.query(mysql, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/obterVagasFiltroNome", (req, res) => {
  const { filtro } = req.body;
  let mysql = 'call vagas_filtro_por_nome_sps(?)';
  db.query(mysql, [filtro], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/obterVagasFiltroDescricao", (req, res) => {
  const { filtro } = req.body;
  let mysql = 'call vagas_filtro_por_descricao_sps(?)';
  db.query(mysql, [filtro], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/candidatarVagaUsuario", (req, res) => {
  const { id_vaga } = req.body;
  const { id_usuario } = req.body;
  let mysql = 'call vaga_usuario_candidatar_spi(?,?)';
  db.query(mysql, [id_vaga,id_usuario], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(6000, () => {
    console.log("rodando na porta 6000");
});