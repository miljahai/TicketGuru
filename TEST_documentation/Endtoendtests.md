### End-to-end-testit	
End-to-end-testit suoritettiin lippujen tarkastukselle tutkivalla testauksella. Koska testauksen kohde ei ollut kovin laaja, päätettiin testata kaikkien toimintojen sujuvuus. Tarkoitus oli selvittää, tapahtuuko toiminnoissa virheitä, jotka olisi syytä korjata. 

 

Testi | Tulos | Huomiot
----- | ----- | -----
Autentikointi ja H2 lippujen tiedot Postmanissa | <span style="color:green"> OK</span> | 
Reactissa yhden lipun tarkastus koodin avulla | <span style="color:green"> OK</span> | 
Lipun tiedot vastaavat H2 | <span style="color:green"> OK</span> |  hinta? 
QR-koodin generoiminen | <span style="color:green"> OK</span> |
Lipun merkitseminen käytetyksi | <span style="color:green"> OK</span> |  Postmanissa aikaleima 
Virheellinen koodi | <span style="color:green"> OK</span> | error-viesti 



#### Ongelmat/havainnot: 

Input-kenttä voisi tyhjentyä, kun lipun tiedot on etsitty. 

Jos seuraavaa lippua hakee suoraa edellisen lipun tietojen jälkeen, näkyy uudellakin lipulla valmiina aikaleima. Tämä ei päivittynyt Postmaniin vaan ainoastaan Reactiin. Ongelmaa ei esiintynyt, jos kävi välillä etusivulla tai jos sivun latasi uudelleen. 

Tällä hetkellä H2-tiedoissa lipulla on yksi hinta, joka on eri kuin lipputyypin hinta, joka taas tulee vastauksena Reactissa. Tämä selkeytynee, kun lipunmyynti ominaisuus on rakennettu. 