/* SQLEditor (Generic SQL)*/


CREATE TABLE EventRecord
(
eventrecord_id INTEGER NOT NULL AUTO_INCREMENT  UNIQUE ,
eventrecord_name VARCHAR(100) NOT NULL,
eventrecord_date DATE NOT NULL,
eventrecord_starttime LOCALTIME NOT NULL,
eventrecord_endtime LOCALTIME,
deleted BOOLEAN DEFAULT 'false',
CONSTRAINT EventRecord_pkey PRIMARY KEY (eventrecord_id)
);

CREATE TABLE 'Role'
(
role_id INTEGER NOT NULL AUTO_INCREMENT  UNIQUE ,
role_name CHAR(25) NOT NULL,
CONSTRAINT Role_pkey PRIMARY KEY (role_id)
);

CREATE TABLE TicketTypes
(
ticket_type_id INTEGER NOT NULL AUTO_INCREMENT  UNIQUE ,
ticket_type_name VARCHAR(50) NOT NULL,
ticket_type_price DOUBLE NOT NULL,
deleted BOOLEAN DEFAULT 'false',
CONSTRAINT TicketTypes_pkey PRIMARY KEY (ticket_type_id)
);

CREATE TABLE Ticket
(
ticket_id INTEGER NOT NULL AUTO_INCREMENT  UNIQUE ,
eventrecord_id INTEGER NOT NULL,
ticket_code VARCHAR(50) NOT NULL,
ticket_type_id INTEGER NOT NULL,
deleted BOOLEAN DEFAULT 'false',
ticket_price DOUBLE NOT NULL,
sales_event_id INTEGER,
CONSTRAINT Ticket_pkey PRIMARY KEY (ticket_id)
);

CREATE TABLE EventTicketTypes
(
eventrecord_id INTEGER NOT NULL,
ticket_type_id INTEGER NOT NULL,
CONSTRAINT EventTicketTypes_pkey PRIMARY KEY (eventrecord_id,ticket_type_id)
);

CREATE TABLE 'User'
(
user_id INTEGER NOT NULL AUTO_INCREMENT  UNIQUE ,
first_name CHAR(25) NOT NULL,
last_name CHAR(25) NOT NULL,
email VARCHAR(100) NOT NULL,
password VARCHAR(50) NOT NULL,
deleted BOOLEAN DEFAULT 'false',
role_id INTEGER NOT NULL,
CONSTRAINT User_pkey PRIMARY KEY (user_id)
);

CREATE TABLE SalesEvent
(
sales_event_id INTEGER NOT NULL AUTO_INCREMENT  UNIQUE ,
sale_date DATE NOT NULL,
sale_time LOCALTIME NOT NULL,
sales_event_price DOUBLE NOT NULL,
user_id INTEGER NOT NULL,
deleted BOOLEAN DEFAULT 'false',
CONSTRAINT SalesEvent_pkey PRIMARY KEY (sales_event_id)
);

ALTER TABLE Ticket ADD FOREIGN KEY (eventrecord_id) REFERENCES EventRecord (eventrecord_id);

ALTER TABLE Ticket ADD FOREIGN KEY (ticket_type_id) REFERENCES TicketTypes (ticket_type_id);

ALTER TABLE Ticket ADD FOREIGN KEY (sales_event_id) REFERENCES SalesEvent (sales_event_id);

ALTER TABLE EventTicketTypes ADD FOREIGN KEY (eventrecord_id) REFERENCES EventRecord (eventrecord_id);

ALTER TABLE EventTicketTypes ADD FOREIGN KEY (ticket_type_id) REFERENCES TicketTypes (ticket_type_id);

ALTER TABLE 'User' ADD FOREIGN KEY (role_id) REFERENCES 'Role' (role_id);

ALTER TABLE SalesEvent ADD FOREIGN KEY (user_id) REFERENCES 'User' (user_id);

