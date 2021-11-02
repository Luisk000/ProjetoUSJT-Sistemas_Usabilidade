const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../mysql').db;
const { v4: uuidv4 } = require('uuid');

exports.registroAdmin = (req, res, next) => {
    db.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        let password = req.body.senha;
        const id = uuidv4();
        const { email } = req.body;
        const senha = bcrypt.hashSync(password,10);
        let mysql = 'call registro_admin_obter_email_sps(?)';
        conn.query(mysql, [email], (error, result, field) => {
            conn.release();
            if (error) { return res.status(500).send({ error: error, data: { dados: null } }) }            
            if (result[0].length > 0) {
                return res.status(409).json({ message: "Usuario já cadastrado" })
            }
            else{
                let mysql2 = 'call registro_admin_incluir_spi(?,?,?)';
                conn.query(mysql2, [id,email,senha], (error, result, field) => {
                    conn.release();
                    if (error) { return res.status(500).send({ error: error, data: { dados: null } }) } 
                    let response = {}
                    if (result.affectedRows > 0) { 
                        response = { data: { dados: 'Dados cadastrados com sucesso!' } } 
                    }
                    else { response = { data: { dados: null } } }
                    return res.status(201).send(response);
                });
            }            
        });
    });  
};

exports.LoginAdmin = (req, res, next) => {
    db.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        const { email } = req.body;
        const { senha } = req.body;
        let mysql = 'call registro_admin_obter_email_sps(?)';
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
                            senha: cadastro.senha
                        }            
                    }) 
                }
            }
            if (response.data.totalRegistros < 1) {
                return res.status(401).send({ message: 'Falha na autenticação' })
            }
            if (bcrypt.compareSync(senha, response.data.dados[0].senha)) {
                const token = jwt.sign({
                    userId: response.data.dados[0].id,
                    email: response.data.dados[0].email
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "2h"
                });
                return res.status(200).send({
                    message: 'Autenticado com sucesso',
                    token: token,
                    dados: {
                        userId: response.data.dados[0].id,
                        email: response.data.dados[0].email
                    }
                });
            }
            return res.status(401).send({ message: 'Falha na autenticação' }) 
        });
    });
};

exports.registroUsuario = (req, res, next) => {
    db.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        let password = req.body.senha;
        const id = uuidv4();
        const { email } = req.body;
        const senha = bcrypt.hashSync(password,10);
        let mysql = 'call registro_usuario_obter_email_sps(?)';
        conn.query(mysql, [email], (error, result, field) => {
            conn.release();
            if (error) { return res.status(500).send({ error: error, data: { dados: null } }) }            
            if (result[0].length > 0) {
                return res.status(409).json({ message: "Usuario já cadastrado" })
            }
            else{
                let mysql2 = 'call registro_usuario_incluir_spi(?,?,?)';
                conn.query(mysql2, [id,email,senha], (error, result, field) => {
                    conn.release();
                    if (error) { return res.status(500).send({ error: error, data: { dados: null } }) } 
                    let response = {}
                    if (result.affectedRows > 0) { 
                        response = { data: { dados: 'Dados cadastrados com sucesso!' } } 
                    }
                    else { response = { data: { dados: null } } }
                    return res.status(201).send(response);
                });
            }            
        });
    });  
};

exports.LoginUsuario = (req, res, next) => {
    db.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        const { email } = req.body;
        const { senha } = req.body;
        let mysql = 'call registro_usuario_obter_email_sps(?)';
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
                            senha: cadastro.senha
                        }            
                    }) 
                }
            }
            if (response.data.totalRegistros < 1) {
                return res.status(401).send({ message: 'Falha na autenticação' })
            }
            if (bcrypt.compareSync(senha, response.data.dados[0].senha)) {
                const token = jwt.sign({
                    userId: response.data.dados[0].id,
                    email: response.data.dados[0].email
                },
                process.env.JWT_KEY,
                {
                    expiresIn: "2h"
                });
                return res.status(200).send({
                    message: 'Autenticado com sucesso',
                    token: token,
                    dados: {
                        userId: response.data.dados[0].id,
                        email: response.data.dados[0].email
                    }
                });
            }
            return res.status(401).send({ message: 'Falha na autenticação' }) 
        });
    });
};