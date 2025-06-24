--
-- truncate.sql
--
ALTER TABLE couleurs_equipes DROP CONSTRAINT fk_id_equipe;
--
--
--
ALTER TABLE couleurs_equipes DROP CONSTRAINT fk_id_couleur;
--
--
--
ALTER TABLE joueurs DROP CONSTRAINT fk_equipe_id;
--
--
--
TRUNCATE TABLE joueurs;
--
--
--
TRUNCATE TABLE couleurs_equipes;
--
--
--
TRUNCATE TABLE equipes;
--
--
--
TRUNCATE TABLE couleurs;
--
--
--
ALTER TABLE couleurs_equipes ADD CONSTRAINT fk_id_equipe FOREIGN KEY(id_equipe) REFERENCES equipes(id) ON DELETE CASCADE;
--
--
--
ALTER TABLE couleurs_equipes ADD CONSTRAINT fk_id_couleur FOREIGN KEY(id_couleur) REFERENCES couleurs(id) ON DELETE CASCADE;
--
--
--
ALTER TABLE joueurs ADD CONSTRAINT fk_equipe_id FOREIGN KEY(equipe) REFERENCES equipes(id) ON DELETE CASCADE;
--
--
--
