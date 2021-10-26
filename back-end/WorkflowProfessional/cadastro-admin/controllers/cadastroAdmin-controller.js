const db = require('../mysql').db;

exports.ObterPorEmail = (req, res) => {
  const { email } = req.params;
  let mysql = 'call cadastro_admin_obter_email_sps(?)';

  db.getConnection((error, conn) => {
      conn.query(mysql, [email], (error, result, field) => {
          conn.release();
          if (error) {
            return res.status(500).send({
                error: error,
                data: null
            });
          } 
          res.status(200).send({
              mensagem: '',
              data: result
          });            
        });
  })
}

exports.Cadastrar = (req, res) => {
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
          res.status(201).send({
            data: result
          });
      }
  });
}

exports.Atualizar = (req, res) => {
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
        res.status(201).send({
          data: result
        });
      }
  });
}