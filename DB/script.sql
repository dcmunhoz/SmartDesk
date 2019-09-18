CREATE USER 'desk'@'localhost' IDENTIFIED BY 'desk';
CREATE USER 'desk'@'%' IDENTIFIED BY 'desk';
CREATE USER 'desk'@'127.0.0.1' IDENTIFIED BY 'desk';

DROP DATABASE IF EXISTS db_idesk;

CREATE DATABASE db_idesk DEFAULT CHARSET 'UTF8' DEFAULT COLLATE 'utf8_general_ci';
USE db_idesk;

GRANT ALL PRIVILEGES ON db_idesk.* TO 'desk'@'localhost';
GRANT ALL PRIVILEGES ON db_idesk.* TO 'desk'@'127.0.0.1';
GRANT ALL PRIVILEGES ON db_idesk.* TO 'desk'@'%';

CREATE TABLE tb_users(
	id_user 	 	INT NOT NULL AUTO_INCREMENT,	# Id do usuário.
    username 	VARCHAR(16) NOT NULL UNIQUE,		# Usuário.
    passw	 	VARCHAR(255) NOT NULL,				# Senha.
    email		VARCHAR(255) NOT NULL,				# E-mail.
    active 		BOOL NOT NULL DEFAULT TRUE,			# Ativo ou inativo.
    id_profile 	INT NOT NULL,						# Id do perfil de acesso.
    CONSTRAINT pk_user PRIMARY KEY (id_user)
) DEFAULT CHARACTER SET 'UTF8';

CREATE TABLE tb_profiles(
	id_profile 				INT NOT NULL AUTO_INCREMENT, # Id do perfil. 
    profile_name 			VARCHAR(30) NOT NULL,		 # Nome do perfil.
    profile_description		VARCHAR(100),				 # Descrição do perfil.
    administrator			BOOL NOT NULL DEFAULT TRUE,	 # Perfil com direitos administrativos.
    CONSTRAINT pk_profile PRIMARY KEY (id_profile)
)DEFAULT CHARACTER SET 'UTF8';

ALTER TABLE tb_users ADD CONSTRAINT fk_profiles_users FOREIGN KEY (id_profile) REFERENCES tb_profiles(id_profile);

INSERT INTO tb_profiles(profile_name, profile_description, administrator)
VALUES('Administrador', 'Perfil de administração do sistema.', true);

INSERT INTO tb_profiles(profile_name, profile_description, administrator)
VALUES('Padrão', 'Perfil padrão de usuário', false);

INSERT INTO tb_profiles(profile_name, profile_description, administrator)
VALUES('Colaborador', 'Perfil usuário técnico', false);

INSERT INTO tb_users(username, passw, email, active, id_profile)
VALUES('administrator', md5('administrator'), 'admin@admin.com', true, (SELECT id_profile FROM tb_profiles WHERE profile_name = 'Administrador' ));

CREATE TABLE tb_persons(
	id_person 		INT NOT NULL AUTO_INCREMENT, 	# Id da pessoa. 
    full_name 		VARCHAR(100) NOT NULL,			# Nome completo.
    dt_creation 	DATETIME DEFAULT NOW(),			# Data de criação.
    dt_alteration 	DATETIME, 						# Data de alteração.
    id_user			INT NOT NULL UNIQUE, 			# Id do usuário referente a esta pessoa.
    id_company		INT,							# Id da empresa.
    id_local		INT,							# Id do local de atuação.
    id_sector	 	INT,							# Id do setor de atuação.
    need_updates	BOOl DEFAULT TRUE,				# Precisa atualizar o cadastro.
    CONSTRAINT pk_person PRIMARY KEY (id_person)
) DEFAULT CHARACTER SET 'UTF8';

INSERT INTO tb_persons(full_name, id_user, id_company, id_local, id_sector, need_updates) VALUES("iDesk Admin", 1, 1, 1, 1, 0);

CREATE TABLE tb_cities(
	id_city		INT NOT NULL AUTO_INCREMENT,	# Id da cidade.
    city_name   VARCHAR(200) NOT NULL UNIQUE,	# Nome da cidade.
    city_cep    INT(10) NOT NULL UNIQUE,         # CEP da cidade.
	CONSTRAINT pk_city PRIMARY KEY (id_city)
)DEFAULT CHARACTER SET 'UTF8';

INSERT INTO tb_cities(city_name, city_cep) VALUES('Default City', 00000000);

CREATE TABLE tb_companies(
	id_company INT NOT NULL AUTO_INCREMENT,		# Id da empresa.
    company_name VARCHAR(100) NOT NULL UNIQUE,	# Nome da empresa.
    CONSTRAINT pk_company PRIMARY KEY (id_company)
)DEFAULT CHARACTER SET 'UTF8';

insert into tb_companies(company_name) values("Default Companie");

CREATE TABLE tb_locals(
	id_local INT NOT NULL AUTO_INCREMENT,		# Id do local de atuação.
    local_name VARCHAR(100) NOT NULL,	        # Nome do local de atuação.
    id_company INT NOT NULL,					# Id da compania que este local pertence.
    id_city INT NOT NULL,						# Id da cidade que este local esta situado.
    CONSTRAINT pk_local PRIMARY KEY (id_local)
)DEFAULT CHARACTER SET 'UTF8';

insert into tb_locals(local_name, id_company, id_city) values('Default Local', 1, 1);

CREATE TABLE tb_sectors(
	id_sector INT NOT NULL AUTO_INCREMENT,		# Id do setor.
    sector_name VARCHAR(100) NOT NULL,		    # Nome do setor.
    id_local INT NOT NULL,					    # Id do local que este setor pertence.
    CONSTRAINT pk_sector PRIMARY KEY (id_sector)
)DEFAULT CHARACTER SET 'UTF8';

insert into tb_sectors(sector_name, id_local) values('Default Sector', 1);

ALTER TABLE tb_persons ADD CONSTRAINT fk_users_persons FOREIGN KEY (id_user) REFERENCES tb_users(id_user);
ALTER TABLE tb_persons ADD CONSTRAINT fk_companies_persons FOREIGN KEY (id_company) REFERENCES tb_companies(id_company);
ALTER TABLE tb_persons ADD CONSTRAINT fk_locals_persons FOREIGN KEY (id_local) REFERENCES tb_locals(id_local);
ALTER TABLE tb_persons ADD CONSTRAINT fk_sectors_persons FOREIGN KEY (id_sector) REFERENCES tb_sectors(id_sector);

ALTER TABLE tb_locals ADD CONSTRAINT fk_company_locals FOREIGN KEY (id_company) REFERENCES tb_companies(id_company);
ALTER TABLE tb_locals ADD CONSTRAINT fk_city_locals FOREIGN KEY (id_city) REFERENCES tb_cities(id_city);
ALTER TABLE tb_sectors ADD CONSTRAINT fk_local_sectors FOREIGN KEY (id_local) REFERENCES tb_locals(id_local);

CREATE TABLE tb_tickets(
	id_ticket INT NOT NULL AUTO_INCREMENT,		# Id do ticket
    ticket_title VARCHAR(255) NOT NULL,			# Titulo do ticket
    ticket_details TEXT NOT NULL,				# Detalhes do ticket
    id_user INT NOT NULL,						# Id do usuário que abriu o ticket
    dt_creation DATETIME DEFAULT NOW(),			# Data de criação do ticket,
    dt_updates DATETIME DEFAULT NOW(),			# Ultima atualização (mensagem/status)
    id_status INT NOT NULL,						# Status do ticket
    id_priority INT NOT NULL,					# Id da prioridade
    CONSTRAINT pk_ticket PRIMARY KEY (id_ticket)
)DEFAULT CHARACTER SET 'UTF8';

CREATE TABLE tb_priorities(
	id_priority 	INT NOT NULL AUTO_INCREMENT,
    priority_name   VARCHAR(24) NOT NULL,
    priority_color  VARCHAR(7) NOT NULL DEFAULT '#F5F5F5',
    CONSTRAINT pk_priority PRIMARY KEY(id_priority)
)DEFAULT CHARACTER SET 'UTF8';

ALTER TABLE tb_tickets ADD CONSTRAINT fk_priority_ticket FOREIGN KEY(id_priority) REFERENCES tb_priorities(id_priority);

INSERT INTO tb_priorities (priority_name) values('Neutra');
INSERT INTO tb_priorities (priority_name) values('Baixa');
INSERT INTO tb_priorities (priority_name) values('Média');
INSERT INTO tb_priorities (priority_name) values('Alta');
INSERT INTO tb_priorities (priority_name) values('Urgente');

CREATE TABLE tb_status(
	id_status  		INT NOT NULL AUTO_INCREMENT,
    status_name 	VARCHAR(100) NOT NULL,
    CONSTRAINT pk_status PRIMARY KEY(id_status)
)DEFAULT CHARACTER SET 'UTF8';

ALTER TABLE tb_tickets ADD CONSTRAINT fk_status_ticket FOREIGN KEY (id_status) REFERENCES tb_status(id_status);
ALTER TABLE tb_tickets ADD CONSTRAINT fk_user_ticket FOREIGN KEY (id_user) REFERENCES tb_users(id_user);

INSERT INTO tb_status (status_name) VALUES('Aberto');
INSERT INTO tb_status (status_name) VALUES('Pendente Usuário');
INSERT INTO tb_status (status_name) VALUES('Pendente Colaborador');
INSERT INTO tb_status (status_name) VALUES('Solucionado');
INSERT INTO tb_status (status_name) VALUES('Encerrado');

CREATE TABLE tb_ticket_messages(
	id_ticket_message 	INT NOT NULL AUTO_INCREMENT,
    id_ticket 	INT NOT NULL,
    id_user 	INT NOT NULL,
    message 	TEXT NOT NULL,
    message_type CHAR(1) NOT NULL,
    dt_send		DATETIME DEFAULT NOW(),
    CONSTRAINT pk_ticket_message PRIMARY KEY(id_ticket_message)
)DEFAULT CHARACTER SET 'UTF8';

ALTER TABLE tb_ticket_messages ADD CONSTRAINT fk_ticket_ticketmessage FOREIGN KEY (id_ticket) REFERENCES tb_tickets(id_ticket);
ALTER TABLE tb_ticket_messages ADD CONSTRAINT fk_user_ticketmessage FOREIGN KEY (id_user) REFERENCES tb_users(id_user);

CREATE TABLE tb_ticket_assignment(
	id_ticket_assignment INT NOT NULL AUTO_INCREMENT,
    id_ticket INT NOT NULL,
    id_user INT NOT NULL,
    dt_assignment DATETIME DEFAULT NOW(),
    CONSTRAINT pk_ticket_assignment PRIMARY KEY(id_ticket_assignment)
)DEFAULT CHARACTER SET 'UTF8';

ALTER TABLE tb_ticket_assignment ADD CONSTRAINT fk_ticket_ticketassignment FOREIGN KEY(id_ticket) REFERENCES tb_tickets(id_ticket);
ALTER TABLE tb_ticket_assignment ADD CONSTRAINT fk_user_ticketassignment FOREIGN KEY(id_user) REFERENCES tb_users(id_user);

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_save_user`(
piduser INT,
pusername VARCHAR(16),
pfullname VARCHAR(100),
ppassw VARCHAR(255),
pemail VARCHAR(255),
pactive BOOL,
pidprofile INT,
pidcompany INT,
pidlocal INT,
pidsector INT,
pneedup	INT
)
BEGIN

	DECLARE lastUserId INT;
	
	IF piduser >= 1 THEN
		UPDATE tb_users
        SET username = pusername,
			email = pemail,
            active = pactive,
            id_profile = pidprofile,
            passw = md5(ppassw)
		WHERE id_user = piduser;
        
        UPDATE tb_persons
        SET full_name = pfullname,
			id_company = pidcompany,
            id_local = pidlocal,
            id_sector = pidsector,
            need_updates = pneedup
		WHERE id_user = piduser;
        
        SELECT piduser INTO lastUserId;
	ELSE
		
        INSERT INTO tb_users (username, passw, email, active, id_profile)
        VALUES (pusername, md5(ppassw), pemail, pactive, pidprofile);
        
        SELECT LAST_INSERT_ID() INTO lastUserId;
        
        INSERT INTO tb_persons (full_name, id_user, id_company, id_local, id_sector, need_updates)
        VALUES (pfullname, lastUserId, pidcompany, pidlocal, pidsector, pneedup);
        
    END IF;
    
    SELECT * FROM tb_users WHERE id_user = lastUserId;
    
END$$
DELIMITER ;

DROP procedure PROC_SAVE_TICKET;
DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_save_ticket`(
	pidticket 	INT,
    piduser  	INT,
    ptitle 		VARCHAR(255),
    pdesc  		TEXT,
    pidpriority INT
)
BEGIN
	
	DECLARE lastTicket INT;
        
    IF pidticket >= 1 THEN
		#UPDATE
        UPDATE tb_tickets SET
			ticket_title = ptitle,
			id_priority  = pidpriority,
			id_user 	 = piduser
        WHERE id_ticket = pidticket;      
        
        SELECT pidticket INTO lastTicket;
        
    ELSE
		#INSERT
    
		INSERT INTO tb_tickets (ticket_title, ticket_details, id_user, id_status, id_priority)
		VALUES(ptitle, pdesc, piduser, 1, pidpriority);
		
		SELECT LAST_INSERT_ID() INTO lastTicket;
		
		INSERT INTO tb_ticket_messages (id_ticket, id_user, message, message_type)
		VALUES(lastTicket, piduser, pdesc, 'M');
        
    END IF;

	SELECT * FROM tb_tickets WHERE id_ticket = lastTicket;

END$$
DELIMITER ;


DELIMITER $
CREATE PROCEDURE proc_save_message(
	pid_ticket  INT,
    pid_user	INT,
    pmessage	TEXT,
    pmtype      TEXT
)
BEGIN
	
    DECLARE lastMessageId INT;
    
    INSERT INTO tb_ticket_messages (id_ticket, id_user, message, message_type) VALUES(pid_ticket, pid_user, pmessage, pmtype);
    
    SELECT LAST_INSERT_ID() INTO lastMessageId;
		
    SELECT lastMessageId as id_message;    
END$
DELIMITER ;

DELIMITER $
CREATE PROCEDURE proc_save_company(
	pidcompany INT,
    pname	   TEXT
)
BEGIN
	
    DECLARE lastCompanyId INT;
        
    IF pidcompany >= 1 THEN
		
		UPDATE tb_companies
        SET company_name = pname
        WHERE id_company = pidcompany;
        
    ELSE
		
		INSERT INTO tb_companies (company_name)
        VALUES (pname);
        
        SELECT LAST_INSERT_ID() INTO lastCompanyId;
        
    END IF;
    
	SELECT * FROM tb_companies WHERE id_company = lastCompanyId;
    
END $
DELIMITER ; 

DELIMITER $
CREATE DEFINER=`root`@`localhost` PROCEDURE `proc_save_local`(
	pidlocal   INT,
    plocalname TEXT,
    pidcompany INT,
    pcitycep   INT,
    pcityname  TEXT
)
BEGIN
	
    DECLARE lastLocalId INT;
    DECLARE lastCityId  INT;
    DECLARE cityQtt		INT;	
   	
   	SELECT COUNT(*) INTO cityQtt FROM tb_cities WHERE city_name = pcityname;
    	
    IF cityQtt > 0 THEN
    	
    	SELECT id_city INTO lastCityId FROM tb_cities WHERE city_name = pcityname;   
    
    ELSE
    	
    	INSERT INTO tb_cities(city_name, city_cep) VALUES(pcityname, pcitycep);
    
    	SELECT LAST_INSERT_ID() INTO lastCityId;   
       
    END IF;    
     
    IF pidlocal >= 1 THEN
		
		UPDATE 
			tb_locals
        SET 
        	local_name = plocalname,
        	id_company = pidcompany,
        	id_city	   = lastCityId        	
        WHERE 
        	id_local = pidlocal;
        
        SELECT pidlocal INTO lastLocalId;
    ELSE
		
		INSERT INTO tb_locals (local_name, id_company, id_city)
        VALUES (plocalname, pidcompany, lastCityId);
        
        SELECT LAST_INSERT_ID() INTO lastLocalId;
        
    END IF;
    
	SELECT * FROM tb_locals WHERE id_local = lastLocalId;
    
END $
DELIMITER ;

DELIMITER $
CREATE PROCEDURE proc_save_sector(
	pidsector	INT,
	psectorname TEXT,
	pidlocal	INT
)
BEGIN
	DECLARE lastSectorId INT;
	
	IF pidsector >= 1 THEN
			
		UPDATE tb_sectors
		SET
			sector_name = psectorname,
			id_local    = pidlocal
		WHERE
			id_sector	= pidsector;
			
		SELECT pidsector INTO lastSectorId;
			
	ELSE
	
		INSERT INTO tb_sectors (sector_name, id_local)
		VALUES (psectorname, pidlocal);
		
		SELECT LAST_INSERT_ID() INTO lastSectorId;
	
	END IF;
		
	SELECT * FROM tb_sectors WHERE id_sector = lastSectorId; 

END$
DELIMITER ;

DELIMITER $
CREATE PROCEDURE proc_save_priority(
	pidpriority	   INT,
	ppriorityname  TEXT,
	pprioritycolor TEXT
)BEGIN
	
	DECLARE lastPriorityId INT;
	
	IF pidpriority >= 1 THEN
		
		UPDATE tb_priorities
		SET
			priority_name  = ppriorityname,
			priority_color = pprioritycolor 
		WHERE
			id_priority = pidpriority;
			
		SELECT pidpriority INTO lastPriorityId;			
		
	ELSE
		
		INSERT INTO tb_priorities (priority_name, priority_color)
		VALUES (ppriorityname, pprioritycolor);
		
		SELECT LAST_INSERT_ID() INTO lastPriorityId;	
		
	END IF;
	
	SELECT * FROM tb_priorities WHERE id_priority = lastPriorityId;	
	
END$
DELIMITER ;
