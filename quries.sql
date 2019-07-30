CREATE TABLE userdetails(
id serial PRIMARY KEY,
name VARCHAR,
mother_name VARCHAR,
father_name VARCHAR,
email VARCHAR UNIQUE,
phone VARCHAR,
bloodgroup VARCHAR,
address VARCHAR,
tenth VARCHAR,
tewelth VARCHAR,
ug VARCHAR,
pg VARCHAR,
skill VARCHAR
);

select * from userdetails;

UPDATE userdetails SET skill = '' where id = 1;

DROP TABLE userdetails;


