-- DROP TABLE IF EXISTS image_stats;
CREATE TABLE image_stats (
  cpu_per NUMERIC(10,2),
  mem_per NUMERIC(10,2),
  image_id VARCHAR(12) UNIQUE,
  num_entries INTEGER
);