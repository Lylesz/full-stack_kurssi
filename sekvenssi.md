sekvenssiKaavio
    osallistuja selain
    osallistuja palvelin

    selain->>palvelin: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    selain->>palvelin: GET https://studies.cs.helsinki.fi/exampleapp/notes
    aktivoi palvelin
    palvelin-->>selain: HTML-dokumentti
    deaktivoi palvelin
    
    selain->>palvelin: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    aktivoi palvelin
    palvelin-->>selain: CSS-tiedosto
    deaktivoi palvelin
    
    selain->>palvelin: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    aktivoi palvelin
    palvelin-->>selain: JavaScript-tiedosto
    deaktivoi palvelin
    
    Teksti selaimen oikealla puolella: Selain alkaa suorittaa JavaScript-koodia, joka noutaa JSON-tiedoston palvelimelta.
    
    selain->>palvelin: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    aktivoi palvelin
    palvelin-->>selain: [{ "content": "a", "date": "2024-04-08T14:58:30.839Z" }, ... ]
    deaktivoi server    

    Teksti selaimen oikealla puolella: Suorittaa callback-funktion, joka renderöi muistiinpanot.
