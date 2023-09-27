
# Progetto

L'esame intermedio sarà un progetto autonomo da consegnare e presentare entro una data scadenza.

Obiettivo: strutturare una nuova area all'interno di Business Central, compreso un flusso di registrazione.

Richiesta:
Una scuola richiede un software gestionale per gestire le lezioni all'interno della struttura.
* La scuola gestisce diverse aule, più corsi, molti docenti e studenti. Si vuole avere la possibilità di inserire queste informazioni all'interno del gestionale.
* Corsi:
    * Sono formati da una struttura testata-riga
    * La testata sarà formata dalle informazioni del Codice e Nome del corso, ci sarà l'aula di default dove si svolgono le lezioni e il docente incaricato del corso.
    * Le righe contengono le informazioni degli studenti che frequenteranno le lezioni.
    * Utilizzare uno stato per bloccare la modifica una volta organizzato il corso.
    * Per questa parte si consiglia di vedere la pagina 99000786 "Production BOM", la sua composizione in testata righe e il suo utilizzo dello stato (nuovo, sviluppo e certificato)
* Registrazione: si vuole avere la possibilità di registrare le ore di effettiva presenza del professore e degli allievi. Questo dovrà essere fatto tramite un processo di Journal.
    * Si possono registrare le ore solo per i corsi in stato Certificato
    * La compilazione della Journal deve avere delle automazioni di ereditarietà dei campi a partire dal corso, e deve lasciare liberta di modificare aula e docente (l'aula potrebbe cambiare o ci potrebbe essere un docente in sostituzione)
    * Le gestione Docente/Allievo nella Journal deve essere fatta tramite campi Source Type / Source No., vedere la tabella Gen. Journal Line
    * Le Entry create avranno l'Entry Type chiamato "Presenza"
    * Possono essere fatturate solo le ore dei docenti, tramite fattura di acquisto. Crea un movimento con Entry Type Invoice
    * Il calcolo del costo nella Journal è = costo aula + costo docente * N ore
    * Le ore sono solo intere, dalle 8 alle 17
