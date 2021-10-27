const db = require('../mysql').db;

exports.ObterTodas = (req, res) => {
  let mysql = 'call vagas_obter_todas_sps()';
  db.getConnection((error, conn) => {
    conn.query(mysql, (error, result, field) => {
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

exports.ObterTop20 = (req, res) => {
  let mysql = 'call vaga_obter_por_top_20_sps()';
  db.getConnection((error, conn) => {
    conn.query(mysql, (error, result, field) => {
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

exports.ObterAreaMais = (req, res) => {
  let mysql = 'call vaga_obter_por_area_mais_sps()';
  db.getConnection((error, conn) => {
    conn.query(mysql, (error, result, field) => {
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

exports.ObterPorId = (req, res) => {
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

exports.ObterPorUsuarioId = (req, res) => {
  const { id_usuario } = req.params;
  let mysql = 'call vagas_por_usuario_id_sps(?)';
  db.getConnection((error, conn) => {
    conn.query(mysql, [id_usuario], (error, result, field) => {
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

exports.ObterFiltroNome = (req, res) => {
  const { filtro } = req.body;
  let mysql = 'call vagas_filtro_por_nome_sps(?)';
  db.getConnection((error, conn) => {
    conn.query(mysql, [filtro], (error, result, field) => {
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

exports.ObterFiltroDescricao = (req, res) => {
  const { filtro } = req.body;
  let mysql = 'call vagas_filtro_por_descricao_sps(?)';
  db.getConnection((error, conn) => {
    conn.query(mysql, [filtro], (error, result, field) => {
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

exports.Candidatar = (req, res) => {
  const { id_vaga } = req.body;
  const { id_usuario } = req.body;
  let mysql = 'call vaga_usuario_candidatar_spi(?,?)';
  db.getConnection((error, conn) => {
    conn.query(mysql, [id_vaga,id_usuario], (error, result, field) => {
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