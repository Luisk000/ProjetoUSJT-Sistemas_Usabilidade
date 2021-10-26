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

app.get("/obterCadastroUsuarioPorEmail/:email", (req, res) => {
    const { email } = req.params;
    let mysql = 'call cadastro_usuario_obter_email_sps(?)';
    db.query(mysql, [email], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
});

app.post("/cadastrarUsuario", (req, res) => {
    const { id } = req.body;
    const { nome } = req.body;
    const { email } = req.body;
    const { data_nascimento } = req.body;
    const { profissao } = req.body;
    const { experiencia } = req.body;
    const { cursos } = req.body;

    let mysql = "call cadastro_usuario_incluir_spi(?,?,?,?,?,?,?)";
    db.query(mysql, [id, nome, email, data_nascimento, profissao, experiencia, cursos], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put("/atualizarUsuario/:id", (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    const { email } = req.body;
    const { data_nascimento } = req.body;
    const { profissao } = req.body;
    const { experiencia } = req.body;
    const { cursos } = req.body;
  
    let mysql = "call cadastro_usuario_alterar_spi(?,?,?,?,?,?,?)";
    db.query(mysql, [id, nome, email, data_nascimento, profissao, experiencia, cursos], (err, result) => {
      if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
    });
});

app.listen(4000, () => {
  console.log("rodando na porta 4000");
});