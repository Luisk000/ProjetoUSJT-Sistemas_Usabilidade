-- Criar Banco
drop database if exists wkprofessional;
CREATE DATABASE wkprofessional;

USE wkprofessional;

-- Criar Tabelas
drop table if exists registro_admin_tb;
CREATE TABLE registro_admin_tb
(
  id varchar(50) NOT NULL,  
  email varchar(150) NOT NULL UNIQUE,
  senha varchar(150) NOT NULL,
  data_criacao DATETIME NOT NULL DEFAULT(CURDATE()),
  CONSTRAINT PK_RegistroAdmin PRIMARY KEY (id)
);

drop table if exists registro_usuario_tb;
CREATE TABLE registro_usuario_tb
(
  id varchar(50) NOT NULL,  
  email varchar(150) NOT NULL UNIQUE,
  senha varchar(150) NOT NULL,
  data_criacao DATETIME NOT NULL DEFAULT(CURDATE()),
  CONSTRAINT PK_UsuarioAdmin PRIMARY KEY (id)
);

drop table if exists cadastro_admin_tb;
CREATE TABLE cadastro_admin_tb
(
  id varchar(50) NOT NULL,
  nome varchar(150) NULL,
  email varchar(150) NOT NULL UNIQUE,
  empresa varchar(150) NULL,
  cargo varchar(150) NULL,    
  data_criacao DATETIME NOT NULL DEFAULT(CURDATE()),
  CONSTRAINT PK_CadastroAdmin PRIMARY KEY (id)
);

drop table if exists cadastro_usuario_tb;
CREATE TABLE cadastro_usuario_tb
(
  id varchar(50) NOT NULL,
  nome varchar(150) NULL,
  email varchar(150) NOT NULL UNIQUE,
  data_nascimento DATETIME NULL DEFAULT(CURDATE()),
  profissao varchar(150) NULL,
  experiencia varchar(500) NULL,
  cursos varchar(500) NULL,    
  data_criacao DATETIME NOT NULL DEFAULT(CURDATE()),
  CONSTRAINT PK_CadastroUsuario PRIMARY KEY (id)
);

drop table if exists vaga_tb;
CREATE TABLE vaga_tb
(
  id varchar(50) NOT NULL,
  admin_id varchar(50) NOT NULL,
  funcao varchar(150) NOT NULL,
  descricao varchar(500) NOT NULL,
  area varchar(150) NOT NULL,
  horario varchar(250) NULL,
  salario decimal(8,2) NULL,
  beneficios varchar(500) NULL,
  quantidade int NOT NULL,    
  data_criacao DATETIME NOT NULL DEFAULT(CURDATE()),
  CONSTRAINT PK_Vaga PRIMARY KEY (id),
  CONSTRAINT FK_Admin_Vaga_adminId FOREIGN KEY (admin_id) REFERENCES cadastro_admin_tb (id)
);

drop table if exists vaga_usuario_tb;
CREATE TABLE vaga_usuario_tb
(    
  id_vaga varchar(50) NOT NULL,
  id_usuario varchar(50) NOT NULL,    
  data_criacao DATETIME NOT NULL DEFAULT(CURDATE()),
  CONSTRAINT PK_VagaUsuario PRIMARY KEY (id_vaga, id_usuario),
  CONSTRAINT FK_Vaga_VagasTb FOREIGN KEY (id_vaga) REFERENCES vaga_tb (id),
  CONSTRAINT FK_Vaga_UsuarioTb FOREIGN KEY (id_usuario) REFERENCES cadastro_usuario_tb (id)
);

-- Criar StoredProcedure
drop procedure if exists registro_admin_incluir_spi;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `registro_admin_incluir_spi`(
  id varchar(50),
  email varchar(150),
  senha varchar(150)
)
BEGIN
  insert into registro_admin_tb(id,email,senha)
  values(id,email,senha);
  insert into cadastro_admin_tb(id,email)
  values(id,email);
END ;;
DELIMITER ;

drop procedure if exists registro_admin_obter_email_sps;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `registro_admin_obter_email_sps`(
  email varchar(150)
)
BEGIN
  select rA.id, rA.email, rA.senha 
  from registro_admin_tb rA
  where rA.email=email;
END ;;
DELIMITER ;

drop procedure if exists cadastro_admin_alterar_spi;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `cadastro_admin_alterar_spi`(
  id varchar(50),
  nome varchar(150),
  email varchar(150),
  empresa varchar(150),
  cargo varchar(150)
)
BEGIN 
 update cadastro_admin_tb cA
 set  cA.nome=nome,
      cA.email=email,
      cA.empresa=empresa,
      cA.cargo=cargo
 where cA.id=id;
END ;;
DELIMITER ;

drop procedure if exists cadastro_admin_obter_id_sps;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `cadastro_admin_obter_id_sps`(
  id varchar(50)
)
BEGIN
  select cA.id, cA.nome, cA.email, cA.empresa, cA.cargo, cA.data_criacao 
  from cadastro_admin_tb cA
  where cA.id=id;
END ;;
DELIMITER ;

drop procedure if exists registro_usuario_incluir_spi;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `registro_usuario_incluir_spi`(
  id varchar(50),  
  email varchar(150),
  senha varchar(150)
)
BEGIN
  insert into registro_usuario_tb(id,email,senha)
  values(id,email,senha);
  insert into cadastro_usuario_tb(id,email)
  values(id,email);
END ;;
DELIMITER ;

drop procedure if exists registro_usuario_obter_email_sps;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `registro_usuario_obter_email_sps`(
  email varchar(150)
)
BEGIN
  select rUser.id, rUser.email, rUser.senha 
  from registro_usuario_tb rUser
  where rUser.email=email;
END ;;
DELIMITER ;

-- drop procedure if exists cadastro_usuario_incluir_spi;
-- DELIMITER ;;
-- CREATE DEFINER=`root`@`localhost` PROCEDURE `cadastro_usuario_incluir_spi`(
--   id varchar(50),  
--   email varchar(150)
-- )
-- BEGIN
--   insert into cadastro_usuario_tb(id,email)
--   values(id,email);
-- END ;;
-- DELIMITER ;

drop procedure if exists cadastro_usuario_alterar_spi;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `cadastro_usuario_alterar_spi`(
  id varchar(50),
  nome varchar(150),
  email varchar(150),
  data_nascimento DATETIME,
  profissao varchar(150),
  experiencia varchar(500),
  cursos varchar(500)
)
BEGIN 
 update cadastro_usuario_tb cUser
 set  cUser.nome=nome,
      cUser.email=email,
      cUser.data_nascimento=data_nascimento,
      cUser.profissao=profissao,
      cUser.experiencia=experiencia,
      cUser.cursos=cursos
 where cUser.id=id;
END ;;
DELIMITER ;

drop procedure if exists cadastro_usuario_obter_id_sps;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `cadastro_usuario_obter_id_sps`(
  id varchar(50)
)
BEGIN
  select cUser.id, cUser.nome, cUser.email, cUser.data_nascimento, cUser.profissao, cUser.experiencia, cUser.cursos 
  from cadastro_usuario_tb cUser
  where cUser.id=id;
END ;;
DELIMITER ;

drop procedure if exists cadastro_usuario_obter_email_sps;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `cadastro_usuario_obter_email_sps`(
  email varchar(150)
)
BEGIN
  select cUser.id, cUser.nome, cUser.email, cUser.data_nascimento, cUser.profissao, cUser.experiencia, cUser.cursos 
  from cadastro_usuario_tb cUser
  where cUser.email=email;
END ;;
DELIMITER ;

drop procedure if exists vaga_admin_incluir_spi;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `vaga_admin_incluir_spi`(
  id varchar(50),
  admin_id varchar(50),
  funcao varchar(150),
  descricao varchar(500),
  area varchar(150),
  horario varchar(250),
  salario decimal(8,2),
  beneficios varchar(500),
  quantidade int
)
BEGIN
  insert into vaga_tb (id,admin_id,funcao,descricao,area,horario,salario,beneficios,quantidade)
  values(id,admin_id,funcao,descricao,area,horario,salario,beneficios,quantidade);
END ;;
DELIMITER ;

drop procedure if exists vaga_admin_alterar_spi;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `vaga_admin_alterar_spi`(
  id varchar(50),
  admin_id varchar(50),
  funcao varchar(150),
  descricao varchar(500),
  area varchar(150),
  horario varchar(250),
  salario decimal(8,2),
  beneficios varchar(500),
  quantidade int
)
BEGIN 
 update vaga_tb vAdmin
 set  vAdmin.admin_id=admin_id,
      vAdmin.funcao=funcao,
      vAdmin.descricao=descricao,
      vAdmin.area=area,
      vAdmin.horario=horario,
      vAdmin.salario=salario,
      vAdmin.beneficios=beneficios,
      vAdmin.quantidade=quantidade
 where vAdmin.id=id;
END ;;
DELIMITER ;

drop procedure if exists vaga_obter_por_id_sps;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `vaga_obter_por_id_sps`(
  id varchar(50)
)
BEGIN
  select v.id, v.admin_id, v.funcao, v.descricao, v.area, v.horario, v.salario, v.beneficios, v.quantidade 
  from vaga_tb v
  where v.id=id;
END ;;
DELIMITER ;

drop procedure if exists vagas_obter_todas_sps;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `vagas_obter_todas_sps`()
BEGIN
  select v.id, v.admin_id, v.funcao, v.descricao, v.area, v.horario, v.salario, v.beneficios, v.quantidade 
  from vaga_tb v;
END ;;
DELIMITER ;

drop procedure if exists vaga_admin_excluir_spi;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `vaga_admin_excluir_spi`(
  id varchar(50)
)
BEGIN
  delete from vaga_tb v 
  where v.id=id;
END ;;
DELIMITER ;

drop procedure if exists vaga_obter_por_admin_id_sps;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `vaga_obter_por_admin_id_sps`(
  admin_id varchar(50)
)
BEGIN
  select v.id, v.admin_id, v.funcao, v.descricao, v.area, v.horario, v.salario, v.beneficios, v.quantidade 
  from vaga_tb v
  where v.admin_id=admin_id;
END ;;
DELIMITER ;

drop procedure if exists vagas_por_usuario_id_sps;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `vagas_por_usuario_id_sps`(
  id_usuario varchar(50)
)
BEGIN
  select v.id, v.admin_id, v.funcao, v.descricao, v.area, v.horario, v.salario, v.beneficios, v.quantidade, cA.empresa
  from vaga_tb v
  inner join cadastro_admin_tb cA on cA.id = v.admin_id
  where v.id in (select vUser.id_vaga from vaga_usuario_tb vUser where vUser.id_usuario=id_usuario);
END ;;
DELIMITER ;

drop procedure if exists vagas_filtro_por_nome_sps;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `vagas_filtro_por_nome_sps`(
  vaga_filtro_nome varchar(50)
)
BEGIN
  select v.id, v.admin_id, v.funcao, v.descricao, v.area, v.horario, v.salario, v.beneficios, v.quantidade
  from vaga_tb v
  where v.funcao like CONCAT('%', vaga_filtro_nome , '%');
END ;;
DELIMITER ;

drop procedure if exists vagas_filtro_por_descricao_sps;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `vagas_filtro_por_descricao_sps`(
  vaga_filtro_descricao varchar(50)
)
BEGIN
  select v.id, v.admin_id, v.funcao, v.descricao, v.area, v.horario, v.salario, v.beneficios, v.quantidade
  from vaga_tb v
  where v.descricao like CONCAT('%', vaga_filtro_descricao , '%');
END ;;
DELIMITER ;

drop procedure if exists vaga_usuario_candidatar_spi;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `vaga_usuario_candidatar_spi`(
  id_vaga varchar(50),
  id_usuario varchar(50)
)
BEGIN
  insert into vaga_usuario_tb (id_vaga,id_usuario)
  values(id_vaga,id_usuario);
END ;;
DELIMITER ;

drop procedure if exists vaga_obter_por_area_mais_sps;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `vaga_obter_por_area_mais_sps`()
BEGIN
  select v.area, SUM(v.quantidade) as Quantidade
  from vaga_tb v
  group by v.area
  order by Quantidade desc limit 10;
END ;;
DELIMITER ;

drop procedure if exists vaga_obter_por_top_20_sps;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `vaga_obter_por_top_20_sps`()
BEGIN
  select v.id, v.admin_id, v.funcao, v.descricao, v.area, v.horario, v.salario, v.beneficios, v.quantidade 
  from vaga_tb v
  order by v.quantidade desc limit 20;
END ;;
DELIMITER ;

drop procedure if exists vaga_usuario_inscrito_sps;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `vaga_usuario_inscrito_sps`(
  id_vaga varchar(50),
  id_usuario varchar(50)
)
BEGIN
  select v.id_vaga, v.id_usuario
  from vaga_usuario_tb v
  where v.id_vaga=id_vaga and v.id_usuario=id_usuario;
END ;;
DELIMITER ;

drop procedure if exists vagas_inscritas_por_admin_id_sps;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `vagas_inscritas_por_admin_id_sps`(
  admin_id varchar(50)
)
BEGIN
  select vUser.id_vaga, v.funcao, v.descricao, v.area, v.horario, v.salario, v.beneficios, v.quantidade,
  v.admin_id, vUser.id_usuario, cA.nome, cA.email, cA.data_nascimento, cA.profissao, cA.experiencia, cA.cursos
  from vaga_tb v
  inner join vaga_usuario_tb vUser on vUser.id_vaga=v.id
  inner join cadastro_usuario_tb cA on cA.id=vUser.id_usuario
  where v.admin_id=admin_id;
END ;;
DELIMITER ;