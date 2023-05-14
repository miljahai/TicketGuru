### Integraatiotestit	
Integraatiotestauksessa testattiin Ticket-luokan REST API -rajapinnan toimivuutta testaamalla Postmanilla Ticket-luokan controllerissa olevat mappaukset. Rajapinnan palautuksia verrattiin projektin API-dokumentaatioon, joka on Githubissa. Puute- ja virhehavainnoista kirjattiin projektille uudet tiketit. 

Merkittävin havainto on se, että useista virheellisistä kutsuista tulee oletuspalautus 500. Tiimissä pitäisi miettiä, pitäisikö näille tehdä tilannekohtaiset palautukset. Todellisesti merkittävin ongelma on se, että virhepalautukset ovat kirjaamatta API-dokumentaatioon. 

Testit tehtiin tässä tapauksessa käsin Postmanilla, mutta näistä kannattaisi rakentaa valmiit testiskriptit jatkotestauksen helpottamiseksi. 

 

Kutsu | Selite | Tulos | Huomiot 
------ | ------ | ------ | -----
POST | Kaikki pyynnöt backendiin edellyttävät autentikointia | <span style="color:green"> OK</span>  | 
GET /tickets | | <span style="color:green"> OK</span>  | Palauttaa 200 OK + json-muodossa kaikki ticket-oliot 
GET /tickets/6 | Kannassa oleva Ticket.id | <span style="color:green"> OK</span>  | Palauttaa 200 OK + json-muodossa ticket-olion, jonka ticket_id on 6. 
GET /tickets/66 | Ticket.id jota ei ole olemassa | <span style="color:green"> OK</span>  | Palauttaa 404 + json-muodossa 404 ”Ticket not found with id 66” 
GET /tickets/aa | Väärän muotoinen Ticket.id | <span style="color:red"> NOK</span>  |Palauttaa 500 + json-muodossa 500 ”Failed to convert value of…” - Dokumentoimatta, Response asetettava? 
GET /tickets?code= 12cfd18f-4824-44d0-a78a-6bea68af349e | Kannassa oleva Ticket.code | <span style="color:green"> OK</span>  | Palauttaa 200 OK + json-muodossa ticket-olion, jonka ticket_code on 12cfd18f-4824-44d0-a78a-6bea68af349e. 
GET /tickets?code= 12cfd18f | Ticket.code, jota ei ole olemassa | <span style="color:green"> OK</span>  |Palauttaa json-muodossa 404 ”Ticket not found with code 12cfd18f” 
POST /tickets {"deleted": false, "price": 200.0, "ticketType": { "ticket_type_id": 2}, "eventRecord": { "eventrecord_id": 4}, "salesEvent": { "salesevent_id": 2 } } | Dokumentaation mukainen body. (Minimissään on  oltava ticketType ja salesEvent) | <span style="color:green"> OK</span>  |Palauttaa 201 Created + json-muodossa luodun Ticketin tiedot. 
POST /tickets {} | Tyhjä body | <span style="color:red"> NOK</span>  |Palauttaa 500 + json-muodossa 500  | "Cannot invoke \"OP1RKS.TicketGuru.domain.TicketType.getTicket_type_id()\" because the return value of \"OP1RKS.TicketGuru.domain.Ticket.getTicketType()\" is null" -Dokumentoimatta, Response asetettava? 
PUT /tickets | Ei ticket.id -arvoa, ei bodyä | <span style="color:green"> OK</span>  |Palauttaa 401 Unauthorized 
PUT /tickets/7 | Ei bodyä | <span style="color:red"> <span style="color:green"> OK</span> </span>  | Palauttaa 500 + json-muodossa 500  | "Cannot invoke \"OP1RKS.TicketGuru.domain.TicketType.getTicket_type_id()\" because the return value of \"OP1RKS.TicketGuru.domain.Ticket.getTicketType()\" is null" -Dokumentoimatta, Response asetettava? 
PUT /tickets/7  { "ticket_id": 7, "price": 20000.0, "ticketType": { "ticket_type_id": 2 }, "eventRecord": { "eventrecord_id": 4 }, "salesEvent": { "salesevent_id": 3 } } | Dokumentaation mukainen body. | <span style="color:green"> OK</span>  |Palauttaa 200 OK + json-muodossa muutetun Ticketin tiedot. 
PUT /tickets/7  { "price": 20000.0 } | Puutteellinen body. (Minimissään on oltava ticketType ja salesEvent) | <span style="color:red"> NOK</span>  |Palauttaa 500 + json-muodossa 500  | "Cannot invoke \"OP1RKS.TicketGuru.domain.TicketType.getTicket_type_id()\" because the return value of \"OP1RKS.TicketGuru.domain.Ticket.getTicketType()\" is null" -Dokumentoimatta, Response asetettava? 
PUT /tickets/aa | Väärän muotoinen Ticket.id | <span style="color:red"> NOK</span>  |Palauttaa 500 + json-muodossa 500  "Required request body is missing: public OP1RKS.TicketGuru.domain.Ticket OP1RKS.TicketGuru.web.RestTicketController.editTicket(OP1RKS.TicketGuru.domain.Ticket,java.lang.Long,org.springframework.validation.BindingResult) throws org.springframework.web.bind.MethodArgumentNotValidException"  -Dokumentoimatta,Response asetettava? 
PATCH /tickets | Ticket.id puuttuu | <span style="color:red"> NOK</span>  | Palauttaa 500 + json-muodossa 500  "Request method 'PATCH' is not supported" -Dokumentoimatta, Response asetettava? 
PATCH /tickets/5 | Kannassa oleva Ticket.id, ei bodyä | <span style="color:red"> NOK</span>  | Palauttaa 500 + json-muodossa 500 "Required request body is missing: public OP1RKS.TicketGuru.domain.Ticket OP1RKS.TicketGuru.web.RestTicketController.useTicket(OP1RKS.TicketGuru.domain.Ticket,java.lang.Long,org.springframework.validation.BindingResult) throws org.springframework.web.bind.MethodArgumentNotValidException" -Dokumentoimatta, Response asetettava? 
PATCH /tickets/6 { "ticket_id": 6} | Kannassa oleva Ticket.id, dokumentaation mukainen body | <span style="color:green"> OK</span>  | Palauttaa 200 OK + json-muotoisena Ticketin tiedot. Ticket.used on muuttunut null -> LocalDateTimeksi. 
PATCH /tickets/aa | Väärän muotoinen Ticket.id | <span style="color:red"> NOK</span>  | Palauttaa 500 + json-muodossa 500 "Required request body is missing: public OP1RKS.TicketGuru.domain.Ticket OP1RKS.TicketGuru.web.RestTicketController.useTicket(OP1RKS.TicketGuru.domain.Ticket,java.lang.Long,org.springframework.validation.BindingResult) throws org.springframework.web.bind.MethodArgumentNotValidException" -Dokumentoimatta,Response asetettava? 
DELETE /tickets | Ticket.id puuttuu | <span style="color:red"> NOK</span>  |Palauttaa 500 + json-muodossa 500 "Request method 'DELETE' is not supported" -Dokumentoimatta, Response asetettava? 
DELETE /tickets/4 | Kannassa oleva Ticket.id | <span style="color:green"> OK</span>  | Palauttaa 200 OK 
DELETE /tickets/44 | Ticket.id jota ei ole olemassa | <span style="color:green"> OK</span>  | Palauttaa 404 + json-muodossa 404 ”Ticket not found with id 44” 
DELETE /tickets/aa | Väärän muotoinen Ticket.id | <span style="color:red"> NOK</span>  | Palauttaa 500 + json-muodossa 500  "Failed to convert value of type 'java.lang.String' to required type 'java.lang.Long'; For input string: \"aa\" -Dokumentoimatta, Response asetettava? 
GET /qrcode /5935d736-da84-4640-befd-ef7f42b197c2 | Kannassa oleva Ticket.code |<span style="color:green"> OK</span>  | Palauttaa 200 OK + png-muotoisen QR-koodin 
GET /qrcode/5935d736 | Ticket.code, jota ei ole olemassa | <span style="color:green"> OK</span>  | Palauttaa 200 OK + png-muotoisen QR-koodin (endpoint luo qr-koodin mistä vain tekstijonosta) 


