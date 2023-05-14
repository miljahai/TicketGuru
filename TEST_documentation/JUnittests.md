### JUnit-testit	

JUnit –testeillä testattiin Ticket-luokan toimivuutta erilaisten tapausten ja metodien osalta. Ticket-luokan olemassa olevia attribuutteja testattiin syöttämällä niille niin sallittuja kuin virheellisiä arvoja.  

Kaikki testit toimivat. Lombok –kirjaston kautta tulevat getterit ja setterit on testattu jo lombok –kirjaston toimesta, eikä tästä syystä niitä päästy testaamaan muiden JUnit –testien yhteydessä. 

 

 

Testi/metodi | Selite | Tulos 
------ | ------ | ------
testTicketCreation | Luodaan uusi ticket annetuilla arvoilla | <span style="color:green"> OK</span> 
testTicketCode | Luodaan uusi lippu ja testataan onko sen 'koodi' validi  UUID | <span style="color:green"> OK</span> 
testTicketUsed | Luodaan uusi lippu ja syötetään sille 'used' -kenttään aika jolloin lippu on käytetty ja testataan kentän 'used' arvo | <span style="color:green"> OK</span> 
testTicketDeleted | Luodaan uusi lippu ja syltetään sen 'deleted' arvoksi true ja testataan arvo |<span style="color:green"> OK</span> 
testTicketToString | Luodaan uusi lippu ja testataan sen toString -metodia odotetun arvon (expectedString) kanssa | <span style="color:green"> OK</span> 
testTicketPriceNegative | Luodaan uusi lippu ja syötetään sille hinnaksi negatiivinen arvo. Haetaan Validatorin avulla virheviesti ja testataan odtetun arvon kanssa |<span style="color:green"> OK</span> 
testInvalidPriceInput | Luodaan uusi lippu ja syötetään sille hinta väärässä muodossa. Testataan ettei Ticket hyväksy hinnaksi String -muotoista arvoa | <span style="color:green"> OK</span> 

 