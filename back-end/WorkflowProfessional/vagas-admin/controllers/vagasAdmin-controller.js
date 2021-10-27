const db = require('../mysql').db;

exports.ObterVagasPorIdAdmin = (req, res) => {
  db.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    const { admin_id } = req.params;
    let mysql = 'call vaga_obter_por_admin_id_sps(?)';
    conn.query(mysql, [admin_id], (error, result, field) => {
      conn.release();
      if (error) { return res.status(500).send({ error: error, data: null }) } 
      const response = {
        data: {
          totalRegistros: result[0].length,
          dados: result[0].map(vagas => {
            return {
              id: vagas.id,
              adminId: vagas.admin_id,
              funcao: vagas.funcao,
              descricao: vagas.descricao,
              area: vagas.area,
              horario: vagas.horario,
              salario: vagas.salario,
              beneficios: vagas.beneficios,
              qtdVagas: vagas.quantidade
            }            
          }) 
        }
      }
      return res.status(200).send(response);
    });
  })  
}

exports.ObterVagaPorId = (req, res) => {
  db.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    const { id } = req.params;
    let mysql = 'call vaga_obter_por_id_sps(?)';
    conn.query(mysql, [id], (error, result, field) => {
      conn.release();
      if (error) { return res.status(500).send({ error: error, data: null }) } 
      const response = {
        data: {
          totalRegistros: result[0].length,
          dados: result[0].map(vagas => {
            return {
              id: vagas.id,
              adminId: vagas.admin_id,
              funcao: vagas.funcao,
              descricao: vagas.descricao,
              area: vagas.area,
              horario: vagas.horario,
              salario: vagas.salario,
              beneficios: vagas.beneficios,
              qtdVagas: vagas.quantidade
            }            
          }) 
        }
      }
      return res.status(200).send(response);          
    });
  })  
}

exports.CadastrarVaga = (req, res) => {
  db.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
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
    conn.query(mysql, [id, admin_id, funcao, descricao, area, horario, salario, beneficios, quantidade], (error, result, field) => {
      conn.release();
      if (error) { return res.status(500).send({ error: error, data: null }) } 
      const response = {
        data: { dados: 'Vaga cadastrada com sucesso!' }
      } 
      return res.status(201).send(response);            
    });
  })  
}

exports.AtualizarVaga = (req, res) => {
  db.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
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
    conn.query(mysql, [id, admin_id, funcao, descricao, area, horario, salario, beneficios, quantidade], (error, result, field) => {
      conn.release();
      if (error) { return res.status(500).send({ error: error, data: null }) } 
      const response = {
        data: { dados: 'Vaga atualizada com sucesso!' }
      } 
      return res.status(201).send(response);            
    });
  })  
}

exports.ExcluirAdmin = (req, res) => {
  db.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    const { id } = req.params;
    let mysql = "call vaga_admin_excluir_spi(?)";
    conn.query(mysql, [id], (error, result, field) => {
      conn.release();
      if (error) { return res.status(500).send({ error: error, data: null }) } 
      const response = {
        data: { dados: 'Vaga excluida com sucesso!' }
      } 
      return res.status(201).send(response);            
    });
  })  
}