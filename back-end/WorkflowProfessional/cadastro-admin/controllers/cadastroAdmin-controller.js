const db = require('../mysql').db;
const { v4: uuidv4 } = require('uuid');

exports.ObterPorEmail = (req, res) => {
  db.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    const { email } = req.params;
    let mysql = 'call cadastro_admin_obter_email_sps(?)';
    conn.query(mysql, [email], (error, result, field) => {
      conn.release();
      if (error) { return res.status(500).send({ error: error, data: { dados: null } }) } 
      const response = {
        data: {
          totalRegistros: result[0].length,
          dados: result[0].map(cadastro => {
            return {
              id: cadastro.id,
              nome: cadastro.nome,
              email: cadastro.email,
              empresa: cadastro.empresa,
              cargo: cadastro.cargo
            }            
          }) 
        }
      } 
      return res.status(200).send(response);            
    });
  })
}

exports.Cadastrar = (req, res) => {
  db.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    const id = uuidv4();
    const { nome } = req.body;
    const { email } = req.body;
    const { empresa } = req.body;
    const { cargo } = req.body;
    let mysql = "call cadastro_admin_incluir_spi(?,?,?,?,?)";
    conn.query(mysql, [id, nome, email, empresa, cargo], (error, result, field) => {
      conn.release();
      if (error) { return res.status(500).send({ error: error, data: null }) } 
      let response = {}
      if (result.affectedRows > 0) { 
        response = { data: { dados: 'Dados cadastrados com sucesso!' } } 
      }
      else { response = { data: { dados: null } } }
      return res.status(201).send(response);            
    });
  })  
}

exports.Atualizar = (req, res) => {
  db.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    const { id } = req.params;    
    const { nome } = req.body;
    const { email } = req.body;
    const { empresa } = req.body;
    const { cargo } = req.body;
    let mysql = "call cadastro_admin_alterar_spi(?,?,?,?,?)";
    conn.query(mysql, [id, nome, email, empresa, cargo], (error, result, field) => {
      conn.release();
      if (error) { return res.status(500).send({ error: error, data: null }) }
      let response = {}
      if (result.affectedRows > 0) { 
        response = { data: { dados: 'Dados atualizados com sucesso!' } } 
      }
      else { response = { data: { dados: null } } }
      return res.status(201).send(response);            
    });
  })
}