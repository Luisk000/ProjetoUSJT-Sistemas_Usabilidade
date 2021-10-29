const db = require('../mysql').db;

exports.ObterTodas = (req, res) => {  
  db.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    let mysql = 'call vagas_obter_todas_sps()';
    conn.query(mysql, (error, result, field) => {
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

exports.ObterTop20 = (req, res) => {  
  db.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    let mysql = 'call vaga_obter_por_top_20_sps()';
    conn.query(mysql, (error, result, field) => {
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

exports.ObterAreaMais = (req, res) => {  
  db.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    let mysql = 'call vaga_obter_por_area_mais_sps()';
    conn.query(mysql, (error, result, field) => {
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

exports.ObterPorId = (req, res) => {  
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

exports.ObterPorUsuarioId = (req, res) => {  
  db.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    const { id_usuario } = req.params;
    let mysql = 'call vagas_por_usuario_id_sps(?)';
    conn.query(mysql, [id_usuario], (error, result, field) => {
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
              qtdVagas: vagas.quantidade,
              empresa: vagas.empresa
            }            
          }) 
        }
      } 
      return res.status(200).send(response);            
    });
  })  
}

exports.ObterFiltroNome = (req, res) => {  
  db.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    const { filtro } = req.body;
    let mysql = 'call vagas_filtro_por_nome_sps(?)';
    conn.query(mysql, [filtro], (error, result, field) => {
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

exports.ObterFiltroDescricao = (req, res) => {  
  db.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    const { filtro } = req.body;
    let mysql = 'call vagas_filtro_por_descricao_sps(?)';
    conn.query(mysql, [filtro], (error, result, field) => {
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

exports.Candidatar = (req, res) => {  
  db.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    const { id_vaga } = req.body;
    const { id_usuario } = req.body;
    let mysql = 'call vaga_usuario_candidatar_spi(?,?)';
    conn.query(mysql, [id_vaga,id_usuario], (error, result, field) => {
      conn.release();
      if (error) { return res.status(500).send({ error: error, data: null }) } 
      let response = {}
      if (result.affectedRows > 0) { 
        response = { data: { dados: 'Candidatura realizada com sucesso!' } } 
      }
      else { response = { data: { dados: null } } }
      return res.status(201).send(response);            
    });
  })  
}

exports.ObterVagaCandidato = (req, res) => {  
  db.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    const { id_vaga } = req.body;
    const { id_usuario } = req.body;
    let mysql = 'call vaga_usuario_inscrito_sps(?,?)';
    conn.query(mysql, [id_vaga, id_usuario], (error, result, field) => {
      conn.release();
      if (error) { return res.status(500).send({ error: error, data: null }) }
      const response = {
        dados: result[0].map(vagas => {
          return {
            idVaga: vagas.id_vaga,
            idUsuario: vagas.id_usuario
          }            
        })
      }
      let eCandidado = false;
      if (response.dados[0] != null) { eCandidado = true; }
      else { eCandidado = false }  
      return res.status(200).send(eCandidado);   
    });
  })  
}