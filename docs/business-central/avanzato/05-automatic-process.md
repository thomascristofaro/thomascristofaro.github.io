
# Processi Automatici

Business central ha un sistema di temporizzazione di processi automatici che permette di automatizzare alcune operazioni. Questi processi sono chiamati Codeunit e sono dei moduli che contengono del codice che viene eseguito quando viene chiamato il metodo Run. 

In questa pagina vedremo un caso di esempio: proveremo a creare un processo automatico che ogni giorno alle 18:00 registri tutte le journal squash create durante la giornata.

Riutilizzeremo il codice che abbiamo scritto nell'[esercizio del posting](./posting/exercise) per creare il nostro processo automatico.

## Funzione da lanciare
Per prima cosa dobbiamo creare la codeunit che conterrà il codice che verrà eseguito. 

Riutilizzando lo stesso codice dell'esercizio, abbiamo già la codeunit ```50100 "Squash Management"```. 

Abbiamo però bisogno di aggiungere il trigger ```OnRun```, questo sarà il metodo che verrà eseguito quando il processo automatico viene avviato. 

All'interno di questo trigger dobbiamo mettere il codice che ci serve per registrare i journal squash. Dobbiamo cercare una journal squash line sulla base di una coppia template-batch journal e andare a lanciare la codeunit di posting con il record trovato:

```al
    trigger OnRun()
    var
        SquashJnlLine: Record "Squash Journal Line";
    begin
        SquashJnlLine.SetRange("Journal Template Name", 'SQUASH');
        SquashJnlLine.SetRange("Journal Batch Name", 'DEFAULT');
        if SquashJnlLine.FindFirst() then
            CODEUNIT.Run(CODEUNIT::"Squash Jnl.-Post", SquashJnlLine);
    end;
```

Ora che abbiamo la codeunit con il codice OnRun che ci serve, dobbiamo creare il processo automatico che la lancerà.

## Movimenti coda processi
Andiamo a cercare la pagina ```Movimenti coda processi``` in Business Central:

![AUT1](/img/AUT1.png)

Questa pagina contiene tutti i processi automatici che sono stati creati. 

Ogni record ha una stato, che può essere:
* "In attesa": se il processo automatico è stato creato ma non è stato ancora schedulato
* "Pronto": se il processo automatico è stato schedulato e sta aspettando di essere eseguito
* "In esecuzione": se il processo automatico è in esecuzione in quel momento
* "Errore": se il processo automatico ha generato un errore e quindi si è bloccato

## Creazione del processo automatico
Andiamo a creare un nuovo record, con i seguenti dati:

![AUT2](/img/AUT2.png)

Impostiamo la codeunit che abbiamo creato come codeunit da lanciare e impostiamo la frequenza di esecuzione ad una volta al giorno (1440 minuti) alle 18:00.

Torniamo nella schermata precedente e vedremo il nuovo record creato, ma in stato "In attesa". Selezionare il record e cliccare su "Imposta stato su Pronto" per schedulare il processo automatico alla prima ora disponibile.

## Verifica esecuzione
Per verificare le esecuzioni di un processo automatico, possiamo andare nella pagina ```Voci Log```:
![AUT3](/img/AUT3.png)