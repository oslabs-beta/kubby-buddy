-- -- CREATE TYPE
-- DROP TYPE IF EXISTS genre;
-- CREATE TYPE genre AS ENUM (
--     'ADVENTURE',
--     'HORROR',
--     'COMEDY',
--     'ACTION',
--     'SPORTS'
-- );

-- -- CREATE TABLE
-- DROP TABLE IF EXISTS movies;
-- CREATE TABLE movies (
--     id SERIAL PRIMARY KEY,
--     title VARCHAR NOT NULL,
--     release_year SMALLINT,
--     genre genre,
--     price NUMERIC(4, 2)
-- );

-- CREAT TABLE

DROP TABLE IF EXISTS image_data;
CREATE TABLE image_data (
  cpu_per NUMERIC(,2),
  mem_per NUMERIC(,2),
  image_id TEXT,
  num_entries INTEGER
);