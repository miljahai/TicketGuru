SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS eventrecord;
DROP TABLE IF EXISTS salesevent;
DROP TABLE IF EXISTS tickettype;
DROP TABLE IF EXISTS ticket;
DROP TABLE IF EXISTS userrole;
DROP TABLE IF EXISTS appuser;
SET FOREIGN_KEY_CHECKS=1;

CREATE TABLE userrole ( 
userRole VARCHAR(10) NOT NULL PRIMARY KEY );
INSERT INTO userrole VALUES ('ADMIN'), ('SALES'), ('EVENTS');
CREATE TABLE appuser (
appuser_id INTEGER NOT NULL AUTO_INCREMENT UNIQUE , firstname CHAR(100) NOT NULL, lastname CHAR(100) NOT NULL, email VARCHAR(100) NOT NULL, password VARCHAR(200) NOT NULL, deleted BOOLEAN DEFAULT false, userrole VARCHAR(10) NOT NULL, PRIMARY KEY (appuser_id), FOREIGN KEY (userrole) REFERENCES userrole (userrole)
);

CREATE TABLE eventrecord (
eventrecord_id INTEGER NOT NULL AUTO_INCREMENT UNIQUE , eventrecord_name VARCHAR(100) NOT NULL, venue VARCHAR(100), city CHAR(100), ticketsmax INTEGER, event_starttime DATETIME NOT NULL, event_endtime DATETIME, deleted BOOLEAN DEFAULT false, PRIMARY KEY (eventrecord_id) 
);

CREATE TABLE salesevent ( 
salesevent_id INTEGER NOT NULL AUTO_INCREMENT UNIQUE , sale_date TIMESTAMP NOT NULL, final_price DOUBLE NOT NULL, appuser_id INTEGER NOT NULL, deleted BOOLEAN DEFAULT false, PRIMARY KEY (salesevent_id), FOREIGN KEY (appuser_id) REFERENCES appuser (appuser_id) 
);

CREATE TABLE tickettype ( 
ticket_type_id INTEGER NOT NULL AUTO_INCREMENT UNIQUE , ticket_type_name VARCHAR(20) NOT NULL, price DOUBLE NOT NULL, eventrecord_id INTEGER, deleted BOOLEAN DEFAULT false, PRIMARY KEY (ticket_type_id), FOREIGN KEY (eventrecord_id) REFERENCES eventrecord (eventrecord_id)
);

CREATE TABLE ticket ( 
ticket_id INTEGER NOT NULL AUTO_INCREMENT UNIQUE , ticket_code VARCHAR(50), ticket_type_id INTEGER NOT NULL, deleted BOOLEAN DEFAULT false, used BOOLEAN DEFAULT false, price DOUBLE NOT NULL, salesevent_id INTEGER NOT NULL, PRIMARY KEY (ticket_id), FOREIGN KEY (ticket_type_id) REFERENCES tickettype (ticket_type_id), FOREIGN KEY (salesevent_id) REFERENCES salesevent (salesevent_id)
);

SELECT * FROM ticket;
SELECT * FROM eventrecord;
SELECT * FROM tickettype;
SELECT * FROM salesevent;
SELECT * FROM userrole;
SELECT * FROM appuser;
