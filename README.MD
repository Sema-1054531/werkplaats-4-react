# Enquêtemanager door groep One Piece
Benodigde software: Node.js

Om React server te starten: 
``` 
cd one_piece
npm install package.json
> Dit installeert de rest van de bestanden die nodig zijn.
npm start
```

Om de database te laden: 
``` 
> Open een tweede terminal.
cd one_piece/server
node server.js
```

Om de server af te sluiten: 
``` 
> Druk op Ctrl-C.
> Druk op Y bij de vraag en druk op enter.
```

# Inloggen
Hierin kun je inloggegevens invullen en nieuwe accounts aanmaken.
(Wegens een defect kun je niet inloggen. Je kunt verder als je '/home' aan de URL toevoegt.)

# Navigatiebar
Na het inloggen word je doorverwezen naar de homepage.
Bovenin zie je een navigatiebar.
Hieronder beschrijven we wat elke pagina bevat.

Enquêteoverzicht
``` 
> Je krijgt een overzicht van alle enquêttes die geactiveerd zijn.
> Klik op de 'Bekijk' knop om de vragen van een enquête te zien.
>> Daarin kunt u vragen beantwoorden door op de 'Beantwoorden' knop te klikken.
>>> Als de vraag niet anoniem is moet je een user ID toevoegen.
>>> Als alles ingevuld is klik je op de 'Beantwoorden' knop.
```

Bouw enquêttes
``` 
> Je krijgt een overzicht van alle enquêttes die nog geactiveerd moet worden.
> Klik op de 'Vragen toevoegen' knop om vragen aan een enquête toe te voegen.
>> Klik op de 'Vraag toevoegen' knop om een selectie te krijgen voor een vraag. De knop kan meerdere keren worden geklikt.
>> De vraag heeft een verwijderknop om het te verwijderen.
>> Als je wijzigingen klaar zijn klik je op Opslaan.
> Klik op de 'Opslaan' knop en bevestig om een enquête te activeren. Het is nu zichtbaar in de Enquêteoverzicht.
> Klik op de 'Verwijden' knop en bevestig om een enquête te verwijderen.
> Klik op de 'Nieuwe enquête' knop om een enquête aan te maken.
>> Je geeft een titel, anonimiteit en optioneel een beschrijving.
>> Vervolgens klik je op 'Opslaan' om de enquête te maken.
> De 'Nieuwe vraag' knop wordt in de volgende sectie uitgelegd.
```

Bouw vragen
``` 
> Je krijgt een overzicht van alle vragen.
> Klik op de 'Wijzig' knop om een vraag beschikbaar te stellen om toe te voegen aan een enquête.
> Klik op de 'Nieuwe vraag' knop om een vraag toe te voegen die de enquêttes kunnen gebruiken.
>> Je geeft een titel, actief of non-actief en de vraagtype.
>> Vervolgens klik je op de 'Vraag toevoegen' knop om de vraag aan te maken.
```
 Bronnen
 ```
> ChatGPT Bij voornamelijk ERRORS
```