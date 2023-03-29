
DROP TABLE IF EXISTS EventRecord;
DROP TABLE IF EXISTS SalesEvent;
DROP TABLE IF EXISTS TicketType;
DROP TABLE IF EXISTS Ticket;
DROP TABLE IF EXISTS UserRole;
DROP TABLE IF EXISTS AppUser;



CREATE TABLE EventRecord
(
eventrecord_id INTEGER NOT NULL AUTO_INCREMENT  UNIQUE ,
eventrecord_name VARCHAR(100) NOT NULL,
venue VARCHAR(100),
city CHAR(100),
ticketsmax INTEGER,
eventrecord_starttime LOCALDATETIME NOT NULL,
eventrecord_endtime LOCALDATETIME,
deleted BOOLEAN DEFAULT 'false',
CONSTRAINT EventRecord_pkey PRIMARY KEY (eventrecord_id)
);

CREATE TABLE SalesEvent
(
sales_event_id INTEGER NOT NULL AUTO_INCREMENT  UNIQUE ,
sale_date LOCALDATETIME NOT NULL,
final_price DOUBLE NOT NULL,
appuser_id INTEGER NOT NULL,
deleted BOOLEAN DEFAULT 'false',
CONSTRAINT SalesEvent_pkey PRIMARY KEY (sales_event_id)
);

CREATE TABLE TicketType
(
ticket_type_id INTEGER NOT NULL AUTO_INCREMENT  UNIQUE ,
ticket_type_name VARCHAR(20) NOT NULL,
price DOUBLE NOT NULL,
eventrecord_id INTEGER,
deleted BOOLEAN DEFAULT 'false',
CONSTRAINT TicketTypes_pkey PRIMARY KEY (ticket_type_id)
);


CREATE TABLE Ticket
(
ticket_id INTEGER NOT NULL AUTO_INCREMENT  UNIQUE ,
ticket_code VARCHAR(50),
ticket_type_id INTEGER NOT NULL,
deleted BOOLEAN DEFAULT 'false',
used BOOLEAN DEFAULT 'false',
price DOUBLE NOT NULL,
sales_event_id INTEGER NOT NULL,
CONSTRAINT Ticket_pkey PRIMARY KEY (ticket_id)
);

CREATE TABLE UserRole
(
userRole VARCHAR(10) NOT NULL PRIMARY KEY
);

INSERT INTO UserRole VALUES ('ADMIN'), ('SALES'), ('EVENTS');

CREATE TABLE AppUser
(
appuser_id INTEGER NOT NULL AUTO_INCREMENT  UNIQUE ,
firstname CHAR(100) NOT NULL,
lastname CHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL,
password VARCHAR(50) NOT NULL,
deleted BOOLEAN DEFAULT 'false',
userRole VARCHAR(10) NOT NULL,
CONSTRAINT AppUser_pkey PRIMARY KEY (appuser_id)
);

ALTER TABLE SalesEvent ADD FOREIGN KEY (appuser_id) REFERENCES AppUser (appuser_id);

ALTER TABLE TicketTypes ADD FOREIGN KEY (eventrecord_id) REFERENCES EventRecord (eventrecord_id);

ALTER TABLE Ticket ADD FOREIGN KEY (ticket_type_id) REFERENCES TicketTypes (ticket_type_id);

ALTER TABLE Ticket ADD FOREIGN KEY (sales_event_id) REFERENCES SalesEvent (sales_event_id);

ALTER TABLE AppUser ADD FOREIGN KEY (userRole) REFERENCES UserRole (userRole);
