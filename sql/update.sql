CREATE TABLE profiles (
	id serial PRIMARY KEY,
    user_id uuid DEFAULT uuid_generate_v4(),
	first_name varchar (100) NOT NULL,
    second_name varchar (100) NOT NULL,
	birthdate varchar (100) NOT NULL,
	biography varchar (100) NOT NULL,
	city varchar (100) NOT NULL,
	password varchar (100) NOT NULL
);

ALTER TABLE profiles ADD CONSTRAINT user_id_unique_constraint UNIQUE (user_id);


-- DEMO DATA --
insert into profiles (first_name, second_name, birthdate, biography, city, password) VALUES
('Иван', 'Диванов', '07.07.07', 'Люблю диваны и другую мебель', 'МосКВА', md5('secret')),
('Егор', 'Коридоров', '31.12.1981', 'Ах уж эти корридоры', 'Пенза', md5('987654321')),
('Рулон', 'Обоев', '14.11.87', 'Ни дня без новых обоев!!!', 'Санкт-Петербург', md5('12345')),
('Олег', 'Побегов', '23.03.97', 'Люблю путешествия^^', 'Париж', md5('qwerty'));


-- EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
