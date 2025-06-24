-- init.sql
--
-- Fil Rouge 401 Basketball
--
-- creation de la base de donnee
--
create database if not exists admin;
--
-- utilisation de la base de donnee
--
use admin;
--
-- creation d'une table
--
create table if not exists user(
    id int auto_increment primary key,
    identifiant text(50) not null,
    password text(50) not null
);
--
--
--
insert into user(identifiant, password)
values
("root", "password");
--
--
--

