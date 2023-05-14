# TicketGuru

Tiimi: De Lorme Heli, Haiko Milja, Koivisto Janina, Pulli Topi, Sirviö Jukka-Pekka
> Kirjoittamisen avuksi, poistetaan tämä lopullisesta versiosta:
> https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet


## Johdanto

Projektin aiheena on myyntipisteessä käytettävä lipunmyyntijärjestelmä. Asiakas on antanut sovellukselle nimen TicketGuru.

Asiakkaana on lipputoimisto, joka määrittelee tapahtumat, joihin lippuja myydään. Sovelluksella hallinnoidaan ja seurataan lipunmyyntiä.  Sovellus on tarkoitettu lipunmyyjien ja toimiston omaan käyttöön. Asiakas ei pysty itse ostamaan lippua suoraan järjestelmästä.  Tapahtumia voi lisätä ja muokata sekä nille voi luoda erilaisia lipputyyppejä.

Lippuja pitää voida myydä ja tulostaa sekä lippujen on sisällettävä helposti tarkastettava yksilöivä koodi, jotta lippu voidaan merkitä käytetyksi. Ennakkomyynnin jälkeen jäljellä olevat liput tulee pystyä tulostamaan, jotta ne voidaan myydä ovella. 

Myytyjen lippujen määrää voidaan seurata raporteilta tapahtumakohtaisesti.

Järjestelmä toteutetaan palvelinpuolen osalta Javalla, Spring Boot -viitekehyksellä. Käyttöliittymä rakennetaan Reactilla. Tavoitteena on, että käyttöliittymä olisi käytettävissä kaikilla tavanomaisilla päätelaitteilla (puhelin, taulutietokone, tietokone).

## Järjestelmän määrittely

TicketGuru-sovelluksen määrittely on kuvattu alla käyttäjäryhminä, käyttötapauskaavioin ja käyttötapauksin. Määrittelyjä on tehty myös käyttäjätarinoina, jotka löytyvät Githubin Projectista. linkki? 

### Käyttäjäryhmät ja -roolit

*Myyjä* = henkilö, joka toimii asiakasrajapinnassa, syöttää ostoja/tilauksia sovellukseen. Pystyy myös tarkistamaan lipun.

*Ylläpitäjä* = henkilö, joka syöttää tapahtumatietoja sovellukseen.

*Asiakas* = henkilö, joka ostaa lipun. Ei ole sovelluksen käyttäjä., koska myyntitapahtumassa asiakkalla ei ole pääsyä sovellukseen.

*Pääkäyttäjä* = Sovelluksen pääkäyttäjä, joka voi lisätä, muokata ja poistaa käyttäjäoikeuksia.

*Tilaaja* = Lipputoimisto, joka on tilannut järjestelmän

### Käyttötapauskaavio

[Lucidchart: Käyttötapauskaavio](https://lucid.app/lucidchart/71f2e8a8-ce9b-40b4-b3ee-a7a8fe56947b/edit?viewport_loc=-23%2C54%2C2072%2C1035%2C0_0&invitationId=inv_9bd0a9fd-a896-43e9-8b23-7e40b79d7f51)

<img src ="images/usecases.png" width="700" alt="Käyttötapauskaavio">

### Käyttäjätarinat

Käyttäjätarinat löytyvät projektista.

https://github.com/users/miljahai/projects/1/views/1

## Käyttöliittymä

<img src="https://github.com/miljahai/TicketGuru/blob/develop/images/K%C3%A4ytt%C3%B6liittym%C3%A4kaavio.jpeg?raw=true" width="700" alt="käyttöliittymäkaavio">

Käyttöliittymäkaaviossa on kuvattuna käyttäjätyypin tarkistus kirjautumisen yhteydessä. Pää/aloitussivun näkymä riippuu käyttäjän oikeuksista muokata tietoja ja tapahtumia. 
Myyjällä ei pääsyä muiden tietoihin tai myyntiraportteihin. Vain pääkäyttäjä pääsee muokkaamaan tai lsiäämään käyttäjätietoja.

Lippujen myyntitilanteessa avoimet kohteet listataan selattavaksi ja saatavuus tarkistetaan uudelleen ennen vahvistusta. 

## Tietokanta

### Tietokantamalli

<img src="https://github.com/miljahai/TicketGuru/blob/develop/images/tietokantamalli.jpg?raw=true" width="700" alt="Tietokantamalli_korjattu">


### EventRecord
EventRecord-taulu sisältää Tapahtumat, joille lippuja myydään. EventRecordista on OneToMany-viittaus Ticket-tauluun ja OneToMany-viittaus TicketTypes-tauluun. Taulu on nimetty muotoon EventRecord, koska Event on varattu sana Javassa.

Kenttä | Tyyppi | Kuvaus
------ | ------ | ------
eventrecord_id | int PK | Tapahtuman id
eventrecord_name | varchar(100) |  Tapahtuman nimi
venue | varchar(100) | Tapahtumapaikan nimi 
city | char(100) | Tapahtumapaikan kaupunki
ticketsmax | int | Lippujen maksimimäärä
eventrecord_starttime | DateTime | Tapahtuman aloitusaika
eventrecord_endtime | DateTime | Tapahtuman päättymisaika
deleted | boolean | Poistomerkintä. Oletuksena false. Jos tapahtuma poistetaan, muutetaan trueksi.

### Ticket
Ticket-taulu sisältää myytävät liput. Sisältää ManyToOne- viittaukset TicketType- ja SalesEvent-tauluihin.

Kenttä | Tyyppi | Kuvaus
----- | ----- | -----
ticket_id | int PK | Lipun id
ticket_code | varchar(50) | Tarkistuskoodi
price | double | Lipun hinta
deleted | boolean | Poistomerkintä. Oletuksena false. Jos tapahtuma poistetaan, muutetaan trueksi.
used | DateTime | Onko lippu käytetty. Oletuksena null. Kun lippu on tarkastettu, lisätään tarkastuksen ajankohta.
salesevent_id | int FK | Viittaus myyntitapahtumaan SalesEvent-taulussa
ticket_type_id | int FK | Viittaus lipputyyppiin TicketType-taulussa

### TicketType
TicketType-taulu sisältää lipputyypit. Sisältää OneToMany-viittauksen Ticket-tauluun ja ManyToOne-viittauksen EventRecord-tauluun.

Kenttä | Tyyppi | Kuvaus
----- | ----- | -----
ticket_type_id | int PK | Lipputyypin id
ticket_type_name | varchar(20) | Lipputyypin nimi
price | double | Lipputyypin hinta
deleted | boolean | Poistomerkintä. Oletuksena false. Jos tapahtuma poistetaan, muutetaan trueksi.
eventrecord_id | int FK | Viittaus tapahtumaan EventRecord-taulussa

### SalesEvent
SalesEvent-taulu sisältää ostotapahtuman tiedot. SalesEventistä on OneToMany-viittaus SalesEventTickets-tauluun ja AppUser-tauluun.

Kenttä | Tyyppi | Kuvaus
------ | ------ | ------
salesevent_id | int PK | Ostotapahtuman id
sale_date | DateTime (timestamp) |  Ostotapahtuman päivämäärä ja kellonaika
final_price | double | Ostotapahtuman kokonaissumma
appuser_id | int FK | Ostotapahtuman myyjän käyttäjä id
deleted | boolean | Poistomerkintä. Oletuksena false. Jos tapahtuma poistetaan, muutetaan trueksi.

### AppUser

Kenttä | Tyyppi | Kuvaus
------ | ------ | ------
appuser_id | int PK | Käyttäjän id
first_name | varchar(100) | Käyttäjän etunimi
last_name | varchar(100) | Käyttäjän sukunimi
email | varchar(100) | Käyttäjän sähköposti
password | varchar(200) | Käyttäjän salasana
deleted | boolean | Poistomerkintä. Oletuksena false. Jos tapahtuma poistetaan, muutetaan trueksi.
userrole | varchar(50)/enum | Viittaus rooliin UserRole-taulussa


## Tekninen kuvaus

### REST-rajapinta

### Auth
[POST /auth/authenticate](./API%20documentation/auth/post_authenticate.md)<br>
[POST /auth/register](./API%20documentation/auth/post_register.md)<br>
<br>

### Events
[GET /events](./API%20documentation/events/get.md)<br>
[GET /events/{id}](./API%20documentation/events/getbyid.md)<br>
[POST /events](./API%20documentation/events/post.md)<br>
[PUT /events/{id}](./API%20documentation/events/putbyid.md)<br>
[DELETE /events/{id}](./API%20documentation/events/deletebyid.md)<br>
<br>

### Salesevents
[GET /salesevents](./API%20documentation/salesevents/get.md)<br>
[GET /salesevents/{id}](./API%20documentation/salesevents/getbyid.md)<br>
[POST /salesevents](./API%20documentation/salesevents/post.md)<br>
[PUT /salesevents/{id}](./API%20documentation/salesevents/putbyid.md)<br>
[DELETE /salesevents/{id}](./API%20documentation/salesevents/deletebyid.md)<br>
<br>

### Tickets
[GET /tickets](./API%20documentation/tickets/get.md)<br>
[GET /tickets/{id}](./API%20documentation/tickets/getbyid.md)<br>
[POST /tickets](./API%20documentation/tickets/post.md)<br>
[PUT /tickets/{id}](./API%20documentation/tickets/putbyid.md)<br>
[PATCH /tickets/{id}](./API%20documentation/tickets/patchbyid.md)<br>
[DELETE /tickets/{id}](./API%20documentation/tickets/deletebyid.md)<br>

<br>

### QR Code
[GET /grcode/code](./API%20documentation/qrcode/getbycode.md)
<br>

### Tickettypes
[GET /tickettypes](./API%20documentation/tickettypes/get.md)<br>
[GET /tickettypes/{id}](./API%20documentation/tickets/getbyid.md)<br>
[POST /tickettypes](./API%20documentation/tickettypes/post.md)<br>
[PUT /tickettypes/{id}](./API%20documentation/tickettypes/putbyid.md)<br>
[DELETE /tickettypes/{id}](./API%20documentation/tickettypes/deletebyid.md)<br>
<br>

### Users
[GET /users](./API%20documentation/users/get.md)<br>
[GET /users/{id}](./API%20documentation/users/getbyid.md)<br>
[PUT /users/{id}](./API%20documentation/users/putbyid.md)<br>
[DELETE /users/{id}](./API%20documentation/users/deletebyid.md)<br>

<br>


> Teknisessä kuvauksessa esitetään järjestelmän toteutuksen suunnittelussa tehdyt tekniset
> ratkaisut, esim.
> 
> -   Missä mikäkin järjestelmän komponentti ajetaan (tietokone, palvelinohjelma)
>     ja komponenttien väliset yhteydet (vaikkapa tähän tyyliin:
>     https://security.ufl.edu/it-workers/risk-assessment/creating-an-information-systemdata-flow-diagram/)
> -   Palvelintoteutuksen yleiskuvaus: teknologiat, deployment-ratkaisut yms.
> -   Keskeisten rajapintojen kuvaukset, esimerkit REST-rajapinta. Tarvittaessa voidaan rajapinnan käyttöä täsmentää
>     UML-sekvenssikaavioilla.
> -   Toteutuksen yleisiä ratkaisuja, esim. turvallisuus.
> 
> Tämän lisäksi
> 
> -   ohjelmakoodin tulee olla kommentoitua
> -   luokkien, metodien ja muuttujien tulee olla kuvaavasti nimettyjä ja noudattaa
>     johdonmukaisia nimeämiskäytäntöjä
> -   ohjelmiston pitää olla organisoitu komponentteihin niin, että turhalta toistolta
>     vältytään
> 
## Testaus
Ohjelmistolle on suoritettu JUnit-testit & integraatiotestit ticket-luokalle, sekä end-to-end – testit lipun tarkastukselle

### Dokumentaatio
[JUnit-testit](./TEST_documentation/JUnittests.md)<br>
[Integraatiotestit](./TEST_documentation/Integrationtests.md)<br>
[End-to-end -testit](./TEST_documentation/Endtoendtests.md)<br>
<br>
> 
> ## Asennustiedot
> 
> Järjestelmän asennus on syytä dokumentoida kahdesta näkökulmasta:
> 
> -   järjestelmän kehitysympäristö: miten järjestelmän kehitysympäristön saisi
>     rakennettua johonkin toiseen koneeseen
> 
> -   järjestelmän asentaminen tuotantoympäristöön: miten järjestelmän saisi
>     asennettua johonkin uuteen ympäristöön.
> 
> Asennusohjeesta tulisi ainakin käydä ilmi, miten käytettävä tietokanta ja
> käyttäjät tulee ohjelmistoa asentaessa määritellä (käytettävä tietokanta,
> käyttäjätunnus, salasana, tietokannan luonti yms.).
> 
> ## Käynnistys- ja käyttöohje
> 
> Tyypillisesti tässä riittää kertoa ohjelman käynnistykseen tarvittava URL sekä
> mahdolliset kirjautumiseen tarvittavat tunnukset. Jos järjestelmän
> käynnistämiseen tai käyttöön liittyy joitain muita toimenpiteitä tai toimintajärjestykseen liittyviä asioita, nekin kerrotaan tässä yhteydessä.
> 
> Usko tai älä, tulet tarvitsemaan tätä itsekin, kun tauon jälkeen palaat
> järjestelmän pariin !
