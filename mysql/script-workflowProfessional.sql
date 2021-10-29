-- Criar Banco
drop database if exists wkprofessional;
CREATE DATABASE wkprofessional;

USE wkprofessional;

-- Criar Tabelas
drop table if exists cadastro_admin_tb;
CREATE TABLE cadastro_admin_tb
(
  id varchar(50) NOT NULL,
  nome varchar(150) NOT NULL,
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
drop procedure if exists cadastro_admin_incluir_spi;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `cadastro_admin_incluir_spi`(
  id varchar(50),
  nome varchar(150),
  email varchar(150),
  empresa varchar(150),
  cargo varchar(150)
)
BEGIN
  insert into cadastro_admin_tb(id,nome,email,empresa,cargo)
  values(id,nome,email,empresa,cargo);
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

drop procedure if exists cadastro_admin_obter_email_sps;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `cadastro_admin_obter_email_sps`(
  email varchar(150)
)
BEGIN
  select cA.id, cA.nome, cA.email, cA.empresa, cA.cargo, cA.data_criacao 
  from cadastro_admin_tb cA
  where cA.email=email;
END ;;
DELIMITER ;

drop procedure if exists cadastro_usuario_incluir_spi;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `cadastro_usuario_incluir_spi`(
  id varchar(50),  
  email varchar(150)
)
BEGIN
  insert into cadastro_usuario_tb(id,email)
  values(id,email);
END ;;
DELIMITER ;

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

-- Inserir Dados

insert into 
  cadastro_admin_tb (id,nome,email,empresa,cargo) 
values
  ("5b5a7d2c-f383-4aa8-8c75-f4b525f92325","Teste A","empresaA@teste.com","Empresa A","Cargo A"),
  ("ec18f70c-4d66-4917-bde6-c1430a328a4f","Teste B","empresaB@teste.com","Empresa B","Cargo B"),
  ("904fb58e-3ca9-4fae-972a-61fb08662393","Teste C","empresaC@teste.com","Empresa C","Cargo C"),
  ("76e795c1-7b59-4170-bdd1-d36586b90ae5","Teste D","empresaD@teste.com","Empresa D","Cargo D"),
  ("45d1c9b6-1748-4c46-9647-b2cb8bd3afcf","Teste E","empresaE@teste.com","Empresa E","Cargo E"),
  ("6df7842e-5924-4b31-8a55-42a260fef8fe","Teste F","empresaF@teste.com","Empresa F","Cargo F");
  
insert into 
  cadastro_usuario_tb (id,nome,email,data_nascimento,profissao,experiencia,cursos) 
values
  ("8f3a8c3d-ef38-4a34-8d6d-6dae917ffd07","Usuario A","empresaA@usuario.com","2021/10/23","Profissão A","Experiência A","Curso A"),
  ("967df90f-420d-4153-ae5d-32b19820d7b4","Usuario B","empresaB@usuario.com","2021/10/23","Profissão B","Experiência B","Curso B"),
  ("a477ab50-437f-424a-853e-e1201ad75eba","Usuario C","empresaC@usuario.com","2021/10/23","Profissão C","Experiência C","Curso C"),
  ("c8ff236d-9d8b-4e89-9214-4291510c6fa0","Usuario D","empresaD@usuario.com","2021/10/23","Profissão D","Experiência D","Curso D"),
  ("d032c6de-77ef-4e65-8983-3e2585c565fd","Usuario E","empresaE@usuario.com","2021/10/23","Profissão E","Experiência E","Curso E"),
  ("0ad9b527-0ba0-437e-9610-bb745c8f2344","Usuario F","empresaF@usuario.com","2021/10/23","Profissão F","Experiência F","Curso F");

insert into 
  vaga_tb (id,admin_id,funcao,descricao,area,horario,salario,beneficios,quantidade)
values
  ("1c5acf3a-8e18-4a7b-b5f2-0255278d052d","5b5a7d2c-f383-4aa8-8c75-f4b525f92325","Função A","Descrição A","Área A","Segunda à sexta-feira das 8:00 às 17:00",3257.48,"Benefício A",2),
  ("17f427b4-4f0d-4a3e-88aa-e0fc4e6a2570","5b5a7d2c-f383-4aa8-8c75-f4b525f92325","Função B","Descrição B","Área B","Segunda à sexta-feira das 8:00 às 17:00",2719.23,"Benefício B",1),
  ("98be044e-7058-4f4f-8f9b-7a40dc562023","5b5a7d2c-f383-4aa8-8c75-f4b525f92325","Função C","Descrição C","Área C","Segunda à sexta-feira das 8:00 às 17:00",5869.17,"Benefício C",4),
  ("2eebb211-2f9d-48c7-b88b-4720c4b35ebe","5b5a7d2c-f383-4aa8-8c75-f4b525f92325","Função D","Descrição D","Área D","Segunda à sexta-feira das 8:00 às 17:00",3354.57,"Benefício D",4),
  ("ddf73669-2395-4c3c-9147-ecc6dc1d5e7a","5b5a7d2c-f383-4aa8-8c75-f4b525f92325","Função A","Descrição A","Área A","Segunda à sexta-feira das 8:00 às 17:00",3257.48,"Benefício A",4),
  ("df95b9be-1bf6-417c-8c5c-f6def3e1094a","5b5a7d2c-f383-4aa8-8c75-f4b525f92325","Função A","Descrição A","Área A","Segunda à sexta-feira das 8:00 às 17:00",3257.48,"Benefício A",3),
  ("78129c45-adf2-463d-a014-0588a5e88caf","5b5a7d2c-f383-4aa8-8c75-f4b525f92325","Função A","Descrição A","Área A","Segunda à sexta-feira das 8:00 às 17:00",3257.48,"Benefício A",1),
  ("a8e73665-c216-4f47-962e-9074f1099ff6","5b5a7d2c-f383-4aa8-8c75-f4b525f92325","Função B","Descrição B","Área B","Segunda à sexta-feira das 8:00 às 17:00",2719.23,"Benefício B",1),
  ("c13e5fbb-3863-4b39-8c92-97cf582422df","5b5a7d2c-f383-4aa8-8c75-f4b525f92325","Função D","Descrição D","Área D","Segunda à sexta-feira das 8:00 às 17:00",3354.57,"Benefício D",1),
  ("13c84c58-06e3-471a-a91c-c38f57de8aa5","5b5a7d2c-f383-4aa8-8c75-f4b525f92325","Função D","Descrição D","Área D","Segunda à sexta-feira das 8:00 às 17:00",3354.57,"Benefício D",1),
  ("6aed150e-9f17-4b57-b80a-f6fa34533331","5b5a7d2c-f383-4aa8-8c75-f4b525f92325","Função D","Descrição D","Área D","Segunda à sexta-feira das 8:00 às 17:00",3354.57,"Benefício D",5),
  ("554324d4-6f16-4688-9ee0-bdade9f96a21","5b5a7d2c-f383-4aa8-8c75-f4b525f92325","Função D","Descrição D","Área D","Segunda à sexta-feira das 8:00 às 17:00",3354.57,"Benefício D",5),
  ("3c7ba974-9bdb-4959-9e52-7c2d4aff47e2","5b5a7d2c-f383-4aa8-8c75-f4b525f92325","Função D","Descrição D","Área D","Segunda à sexta-feira das 8:00 às 17:00",3354.57,"Benefício D",7),
  ("1fa2a77f-8ee0-42cc-8ebc-c6d362d5fd3e","5b5a7d2c-f383-4aa8-8c75-f4b525f92325","Função F","Descrição F","Área F","Segunda à sexta-feira das 8:00 às 17:00",10978.41,"Benefício F",3),
  ("b80de8a5-1ddd-492f-acc0-1a50d869da15","5b5a7d2c-f383-4aa8-8c75-f4b525f92325","Função C","Descrição C","Área C","Segunda à sexta-feira das 8:00 às 17:00",5869.17,"Benefício C",3),
  ("790a7a6c-fc03-46cb-af78-8319fe14403b","ec18f70c-4d66-4917-bde6-c1430a328a4f","Função A","Descrição A","Área A","Segunda à sexta-feira das 8:00 às 17:00",3257.48,"Benefício A",2),
  ("54980415-ae83-4d14-940b-48f630448f34","ec18f70c-4d66-4917-bde6-c1430a328a4f","Função B","Descrição B","Área B","Segunda à sexta-feira das 8:00 às 17:00",2719.23,"Benefício B",10),
  ("5c6c6adc-218e-4fe8-8d9f-d6d2eb778270","ec18f70c-4d66-4917-bde6-c1430a328a4f","Função C","Descrição C","Área C","Segunda à sexta-feira das 8:00 às 17:00",5869.17,"Benefício C",8),
  ("d0f7730a-e00b-4b6a-816a-d204639702b7","ec18f70c-4d66-4917-bde6-c1430a328a4f","Função D","Descrição D","Área D","Segunda à sexta-feira das 8:00 às 17:00",3354.57,"Benefício D",7),
  ("35762e23-30eb-4f0e-91a3-0b14bcc49c59","ec18f70c-4d66-4917-bde6-c1430a328a4f","Função A","Descrição A","Área A","Segunda à sexta-feira das 8:00 às 17:00",3257.48,"Benefício A",4),
  ("8fc08a21-56e7-445f-9fe8-65ae1964426c","ec18f70c-4d66-4917-bde6-c1430a328a4f","Função A","Descrição A","Área A","Segunda à sexta-feira das 8:00 às 17:00",3257.48,"Benefício A",6),
  ("7aaf0c29-0ab1-44f3-97b1-2eb42f8fb9c6","ec18f70c-4d66-4917-bde6-c1430a328a4f","Função A","Descrição A","Área A","Segunda à sexta-feira das 8:00 às 17:00",3257.48,"Benefício A",3),
  ("2718d948-5427-4a24-9eb3-1c47de88ed3c","ec18f70c-4d66-4917-bde6-c1430a328a4f","Função B","Descrição B","Área B","Segunda à sexta-feira das 8:00 às 17:00",2719.23,"Benefício B",2),
  ("69808dc1-2af9-48b9-9a36-3adb9cb66896","ec18f70c-4d66-4917-bde6-c1430a328a4f","Função D","Descrição D","Área D","Segunda à sexta-feira das 8:00 às 17:00",3354.57,"Benefício D",2),
  ("a4251e57-6361-4d92-aa0c-7d6d83797e5c","ec18f70c-4d66-4917-bde6-c1430a328a4f","Função D","Descrição D","Área D","Segunda à sexta-feira das 8:00 às 17:00",3354.57,"Benefício D",2),
  ("fdff4752-275f-4f4b-9503-bbd8d21cb061","ec18f70c-4d66-4917-bde6-c1430a328a4f","Função D","Descrição D","Área D","Segunda à sexta-feira das 8:00 às 17:00",3354.57,"Benefício D",7),
  ("9c3d8fef-4ae9-46e2-a401-3ef557907443","ec18f70c-4d66-4917-bde6-c1430a328a4f","Função D","Descrição D","Área D","Segunda à sexta-feira das 8:00 às 17:00",3354.57,"Benefício D",6),
  ("2c616c3e-fddf-414f-bc74-f80591581523","ec18f70c-4d66-4917-bde6-c1430a328a4f","Função D","Descrição D","Área D","Segunda à sexta-feira das 8:00 às 17:00",3354.57,"Benefício D",9),
  ("a4473a45-e161-4c5f-815c-df3fc076e9a6","ec18f70c-4d66-4917-bde6-c1430a328a4f","Função F","Descrição F","Área F","Segunda à sexta-feira das 8:00 às 17:00",10978.41,"Benefício F",9),
  ("6d580d08-9efc-4a62-b0a5-fe43b44019b4","ec18f70c-4d66-4917-bde6-c1430a328a4f","Função C","Descrição C","Área C","Segunda à sexta-feira das 8:00 às 17:00",5869.17,"Benefício C",7);

insert into 
  vaga_usuario_tb (id_vaga,id_usuario) 
values
  ("69808dc1-2af9-48b9-9a36-3adb9cb66896","8f3a8c3d-ef38-4a34-8d6d-6dae917ffd07"),
  ("2718d948-5427-4a24-9eb3-1c47de88ed3c","8f3a8c3d-ef38-4a34-8d6d-6dae917ffd07"),
  ("13c84c58-06e3-471a-a91c-c38f57de8aa5","8f3a8c3d-ef38-4a34-8d6d-6dae917ffd07"),
  ("ddf73669-2395-4c3c-9147-ecc6dc1d5e7a","8f3a8c3d-ef38-4a34-8d6d-6dae917ffd07"),
  ("2c616c3e-fddf-414f-bc74-f80591581523","967df90f-420d-4153-ae5d-32b19820d7b4"),
  ("3c7ba974-9bdb-4959-9e52-7c2d4aff47e2","967df90f-420d-4153-ae5d-32b19820d7b4");