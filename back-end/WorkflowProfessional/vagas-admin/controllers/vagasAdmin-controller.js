const db = require('../mysql').db;

exports.ObterVagasPorIdAdmin = (req, res) => {
  const { admin_id } = req.params;
  let mysql = 'call vaga_obter_por_admin_id_sps(?)';

  db.getConnection((error, conn) => {
    conn.query(mysql, [admin_id], (error, result, field) => {
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

exports.ObterVagaPorId = (req, res) => {
  const { id } = req.params;
  let mysql = 'call vaga_obter_por_id_sps(?)';

  db.getConnection((error, conn) => {
    conn.query(mysql, [id], (error, result, field) => {
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

exports.CadastrarVaga = (req, res) => {
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

  db.getConnection((error, conn) => {
    conn.query(mysql, [id, admin_id, funcao, descricao, area, horario, salario, beneficios, quantidade], (error, result, field) => {
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

exports.AtualizarVaga = (req, res) => {
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

  db.getConnection((error, conn) => {
    conn.query(mysql, [id, admin_id, funcao, descricao, area, horario, salario, beneficios, quantidade], (error, result, field) => {
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

exports.ExcluirAdmin = (req, res) => {
  const { id } = req.params;
  let mysql = "call vaga_admin_excluir_spi(?)";

  db.getConnection((error, conn) => {
    conn.query(mysql, [id], (error, result, field) => {
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