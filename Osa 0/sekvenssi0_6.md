```mermaid
sequenceDiagram
    participant selain
    participant palvelin

    selain->>palvelin: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of selain: Sivun JavaScript-koodi luo muistiinpanon ja uudelleenohjauksia tai -latauksia ei tarvita.
    
    
   
