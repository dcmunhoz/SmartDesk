CREATE DATABASE db_smartdesk DEFAULT CHARSET 'UTF8' DEFAULT COLLATE 'utf8_general_ci';
USE db_smartdesk;
CREATE USER 'smart'@'localhost' IDENTIFIED BY 'smart';
CREATE USER 'smart'@'%' IDENTIFIED BY 'smart';
CREATE USER 'smart'@'127.0.0.1' IDENTIFIED BY 'smart';
GRANT ALL PRIVILEGES ON db_smartdesk.* TO 'smart'@'localhost';
GRANT ALL PRIVILEGES ON db_smartdesk.* TO 'smart'@'127.0.0.1';
GRANT ALL PRIVILEGES ON db_smartdesk.* TO 'smart'@'%';

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

INSERT INTO tb_profiles(profile_name, profile_description, administrator)
VALUES('Administrador', 'Perfil de administração do sistema.', true);

INSERT INTO tb_profiles(profile_name, profile_description, administrator)
VALUES('Padrão', 'Perfil padrão de usuário', false);

ALTER TABLE tb_users ADD CONSTRAINT fk_profiles_users FOREIGN KEY (id_profile) REFERENCES tb_profiles(id_profile);

INSERT INTO tb_users(username, passw, email, active, id_profile)
VALUES('admin', md5('admin'), 'admin@admin.com', true, (SELECT id_profile FROM tb_profiles WHERE profile_name = 'Administrador' ));

CREATE TABLE tb_persons(
	id_person 		INT NOT NULL AUTO_INCREMENT, 	# Id da pessoa. 
    full_name 		VARCHAR(100) NOT NULL,			# Nome completo.
    dt_creation 	DATETIME DEFAULT NOW(),			# Data de criação.
    dt_alteration 	DATETIME, 						# Data de alteração.
    id_user			INT NOT NULL UNIQUE, 			# Id do usuário referente a esta pessoa.
    id_company		INT,					# Id da empresa.
    id_place		INT,					# Id do local de atuação.
    id_sector	 	INT,					# Id do setor de atuação.
    CONSTRAINT pk_person PRIMARY KEY (id_person)
) DEFAULT CHARACTER SET 'UTF8';

CREATE TABLE tb_cities(
	id_city		INT NOT NULL AUTO_INCREMENT,	# Id da cidade.
    city_name   VARCHAR(200) NOT NULL UNIQUE,	# Nome da cidade.
	CONSTRAINT pk_city PRIMARY KEY (id_city)
)DEFAULT CHARACTER SET 'UTF8';

CREATE TABLE tb_companies(
	id_company INT NOT NULL AUTO_INCREMENT,		# Id da empresa.
    company_name VARCHAR(100) NOT NULL UNIQUE,	# Nome da empresa.
    CONSTRAINT pk_company PRIMARY KEY (id_company)
)DEFAULT CHARACTER SET 'UTF8';

CREATE TABLE tb_places(
	id_place INT NOT NULL AUTO_INCREMENT,		# Id do local de atuação.
    local_name VARCHAR(100) NOT NULL UNIQUE,	# Nome do local de atuação.
    id_company INT NOT NULL,					# Id da compania que este local pertence.
    id_city INT NOT NULL,						# Id da cidade que este local esta situado.
    CONSTRAINT pk_place PRIMARY KEY (id_place)
)DEFAULT CHARACTER SET 'UTF8';

CREATE TABLE tb_sectors(
	id_sector INT NOT NULL AUTO_INCREMENT,		# Id do setor.
    sector_name VARCHAR(100) NOT NULL UNIQUE,	# Nome do setor.
    id_company INT NOT NULL,					# Id da compania que este setor pertence.
    CONSTRAINT pk_sector PRIMARY KEY (id_sector)
)DEFAULT CHARACTER SET 'UTF8';

ALTER TABLE tb_persons ADD CONSTRAINT fk_users_persons FOREIGN KEY (id_user) REFERENCES tb_users(id_user);
ALTER TABLE tb_persons ADD CONSTRAINT fk_companies_persons FOREIGN KEY (id_company) REFERENCES tb_companies(id_company);
ALTER TABLE tb_persons ADD CONSTRAINT fk_places_persons FOREIGN KEY (id_place) REFERENCES tb_places(id_place);
ALTER TABLE tb_persons ADD CONSTRAINT fk_sectors_persons FOREIGN KEY (id_sector) REFERENCES tb_sectors(id_sector);

ALTER TABLE tb_places ADD CONSTRAINT fk_company_places FOREIGN KEY (id_company) REFERENCES tb_companies(id_company);
ALTER TABLE tb_places ADD CONSTRAINT fk_city_places FOREIGN KEY (id_city) REFERENCES tb_cities(id_city);
ALTER TABLE tb_sectors ADD CONSTRAINT fk_company_sectors FOREIGN KEY (id_company) REFERENCES tb_companies(id_company);

DELIMITER $
CREATE PROCEDURE proc_save_user(
piduser INT,
pusername VARCHAR(16),
pfullname VARCHAR(100),
ppassw VARCHAR(255),
pemail VARCHAR(255),
pactive BOOL,
pidprofile INT
)BEGIN

	DECLARE lastUserId INT;
	
	IF piduser >= 1 THEN
		UPDATE tb_users
        SET username = pusername,
			email = pemail,
            active = pactive
		WHERE id_user = piduser;
        
        SELECT piduser INTO lastUserId;
	ELSE
		
        INSERT INTO tb_users (username, passw, email, active, id_profile)
        VALUES (pusername, md5(ppassw), pemail, pactive, pidprofile);
        
        SELECT LAST_INSERT_ID() INTO lastUserId;
        
        INSERT INTO tb_persons (full_name, id_user)
        VALUES (pfullname, lastUserId);
        
        
    END IF;
    
    SELECT * FROM tb_users WHERE id_user = lastUserId;
    
END$	
DELIMITER ;