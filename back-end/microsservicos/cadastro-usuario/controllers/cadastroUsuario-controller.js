const db = require('../mysql').db;

exports.ObterPorEmail = (req, res) => {
  db.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    const { email } = req.params;
    let mysql = 'call cadastro_usuario_obter_email_sps(?)';
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
              dataNascimento: cadastro.data_nascimento,
              profissao: cadastro.profissao,
              experiencia: cadastro.experiencia,
              cursos: cadastro.cursos
            }            
          }) 
        }
      } 
      return res.status(200).send(response);            
    });
  })
}

exports.ObterPorId = (req, res) => {
  db.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    const { id } = req.params;
    let mysql = 'call cadastro_usuario_obter_id_sps(?)';
    conn.query(mysql, [id], (error, result, field) => {
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
              dataNascimento: cadastro.data_nascimento,
              profissao: cadastro.profissao,
              experiencia: cadastro.experiencia,
              cursos: cadastro.cursos
            }            
          }) 
        }
      } 
      return res.status(200).send(response);            
    });
  })
}

exports.Atualizar = (req, res) => {
  db.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    const { id } = req.params;
    const { nome } = req.body;
    const { email } = req.body;
    const { data_nascimento } = req.body;
    const { profissao } = req.body;
    const { experiencia } = req.body;
    const { cursos } = req.body;  
    let mysql = "call cadastro_usuario_alterar_spi(?,?,?,?,?,?,?)";
    conn.query(mysql, [id, nome, email, data_nascimento, profissao, experiencia, cursos], (error, result, field) => {
      conn.release();
      if (error) { return res.status(500).send({ error: error, data: { dados: null } }) } 
      let response = {}
      if (result.affectedRows > 0) { 
        response = { data: { dados: 'Dados atualizados com sucesso!' } } 
      }
      else { response = { data: { dados: null } } }
      return res.status(201).send(response);            
    });
  })
}