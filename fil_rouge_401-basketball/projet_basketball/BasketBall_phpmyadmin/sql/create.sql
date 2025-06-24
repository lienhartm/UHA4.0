--
-- create.sql
--
-- Fil Rouge 401 Basketball
--
-- creation de la base de donnee
--
create database if not exists basketball;
--
-- utilisation de la base de donnee
--
use basketball;
--
-- creation d'une table
--
create table if not exists equipes(
    id int auto_increment,
    nom varchar(100) not null,
    localisations varchar(100) not null,
    division varchar(100) not null,
    creation varchar(100) not null, 
    logo varchar(255) not null,
    primary key(id)
) ENGINE=InnoDB DEFAULT CHARSET='utf8';
--
-- creation d'une table
--
create table if not exists couleurs(
    id int auto_increment primary key,
    nom varchar(100)
) ENGINE=InnoDB DEFAULT CHARSET='utf8';
--
-- creation d'une table
--
create table if not exists couleurs_equipes(
    id int auto_increment primary key,
    id_couleur int,
    id_equipe int,
    CONSTRAINT fk_id_equipe foreign key(id_equipe) references equipes(id) on delete cascade,
    CONSTRAINT fk_id_couleur foreign key(id_couleur) references couleurs(id) on delete cascade
) ENGINE=InnoDB DEFAULT CHARSET='utf8';
--
-- creation d'une table
--
create table if not exists joueurs(
    id int auto_increment,
    nom varchar(100) not null,
    position varchar(100) not null,
    No int not null,
    equipe int not null,
    taille float(2) not null,
    poid int not null,
    primary key(id),
    CONSTRAINT fk_equipe_id foreign key(equipe) references equipes(id) on delete cascade
) ENGINE=InnoDB DEFAULT CHARSET='utf8';
--
-- creation d'une table
--
create table if not exists courriels(
    id int auto_increment,
    courriel varchar(100) not null,
    primary key(id)
) ENGINE=InnoDB DEFAULT CHARSET='utf8';
--
--
--

--
-- EOF
--