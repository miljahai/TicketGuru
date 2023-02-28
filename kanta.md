/* SQLEditor (Generic SQL)*/


CREATE TABLE EventRecord
(
eventrecord_id INTEGER NOT NULL AUTO_INCREMENT  UNIQUE ,
eventrecord_name VARCHAR(100) NOT NULL,
eventrecord_starttime LOCALTIME NOT NULL,
eventrecord_endtime LOCALTIME,
deleted BOOLEAN DEFAULT 'false',
CONSTRAINT EventRecord_pkey PRIMARY KEY (eventrecord_id)
);

CREATE TABLE SalesEvent
(
sales_event_id INTEGER NOT NULL AUTO_INCREMENT  UNIQUE ,
sale_date DATE NOT NULL,
sale_time LOCALTIME NOT NULL,
sales_event_price DOUBLE NOT NULL,
appuser_id INTEGER NOT NULL,
deleted BOOLEAN DEFAULT 'false',
CONSTRAINT SalesEvent_pkey PRIMARY KEY (sales_event_id)
);

CREATE TABLE TicketTypes
(
ticket_type_id INTEGER NOT NULL AUTO_INCREMENT  UNIQUE ,
ticket_type_name VARCHAR(50) NOT NULL,
ticket_type_price DOUBLE NOT NULL,
eventrecord_id INTEGER,
deleted BOOLEAN DEFAULT 'false',
CONSTRAINT TicketTypes_pkey PRIMARY KEY (ticket_type_id)
);

CREATE TABLE UserRole
(
userrole_id INTEGER NOT NULL AUTO_INCREMENT  UNIQUE ,
userrole_name CHAR(25) NOT NULL,
CONSTRAINT UserRole_pkey PRIMARY KEY (userrole_id)
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

CREATE TABLE AppUser
(
appuser_id INTEGER NOT NULL AUTO_INCREMENT  UNIQUE ,
first_name CHAR(25) NOT NULL,
last_name CHAR(25) NOT NULL,
email VARCHAR(100) NOT NULL,
password VARCHAR(50) NOT NULL,
deleted BOOLEAN DEFAULT 'false',
role_id INTEGER NOT NULL,
CONSTRAINT AppUser_pkey PRIMARY KEY (appuser_id)
);

ALTER TABLE SalesEvent ADD FOREIGN KEY (appuser_id) REFERENCES AppUser (appuser_id);

ALTER TABLE TicketTypes ADD FOREIGN KEY (eventrecord_id) REFERENCES EventRecord (eventrecord_id);

ALTER TABLE Ticket ADD FOREIGN KEY (eventrecord_id) REFERENCES EventRecord (eventrecord_id);

ALTER TABLE Ticket ADD FOREIGN KEY (ticket_type_id) REFERENCES TicketTypes (ticket_type_id);

ALTER TABLE Ticket ADD FOREIGN KEY (sales_event_id) REFERENCES SalesEvent (sales_event_id);

ALTER TABLE AppUser ADD FOREIGN KEY (role_id) REFERENCES UserRole (userrole_id);
