---
sidebar_label: 'Esercizio'
---

# Designing a Squash Court app

Creiamo una struttura personalizzata in Microsoft Business Central. Gestiremo un'azienda che noleggia campi da squash. Per prima cosa dobbiamo definire le modifiche e le espansioni al prodotto, per farlo dobbiamo effettuare una **Fit-gap analysis**: esaminiamo i processi dell'azienda e definiamo cosa possiamo e cosa non possiamo fare con il pacchetto standard. Quando un processo aziendale può essere gestito con il software standard, lo chiamiamo "aderente" (**Fit**). Quando non è possibile farlo, si tratta di uno "scostamento" (**Gap**), possiamo colmare un gap sviluppando una soluzione personalizzata o acquistando un componente aggiuntivo.

#### Fit-gap analysis
Il processo di base di un'azienda che gestisce campi da squash consiste nel noleggio dei campi ai giocatori di squash, sia ai membri che ai non membri. Esiste un processo di prenotazione e fatturazione che gestisce tariffe diverse per i membri e i non membri.

In Business Central, i dati master dei clienti e dei fornitori vengono gestiti utilizzando il "Relationship Management" (RM). Per la nostra soluzione, creeremo una nuova master table per i giocatori di squash e saranno integrati con il RM.

Per progettare la tabella "Squash Court", esamineremo la progettazione degli Item del pacchetto standard. 
La "Squash Court" sarà il prodotto dell'applicazione, con un journal per creare movimenti di prenotazione, che potremo poi fatturare. Per il processo di fatturazione, utilizzeremo e integreremo la parte delle vendite di Business Central.

#### Posting schema

Dopo aver deciso quale sarà il design della nostra applicazione, possiamo disegnare le tabelle e definire le procedure di registrazione. Questo ci guiderà attraverso il processo di sviluppo.

![Example Posting Schema](/img/bc-posting-example-design.png#center)

Gli oggetti in Relationship Management e Sales sono oggetti standard che potremmo dover modificare. Gli oggetti per l'applicazione di Squash sono nuovi, ma basati su oggetti simili dello standard.

#### The Project approach

Per tenere traccia del nostro progetto, suddivideremo le modifiche in task più piccole: 
1. Modificare il Relationship Management: creare un giocatore di squash da un contatto. 
2. Processo di prenotazione di un campo da squash. 
3. Processo di fatturazione delle prenotazioni.

### Relationship Management

Dobbiamo avere la possibilità di creare un giocatore di squash da un contatto proprio come avviene per un cliente o fornitore.
Cerchiamo di capire come funziona il metodo standard per la creazione e lo adattiamo al nostro caso d'uso.
Bisogna quindi analizzare la funzione che troviamo nella pagina `Contact Card` chiamata `CreateCustomer`

Analizzando la funzione, vedremo che avremo bisogno di:
* **Squash Setup**: Squash Player Nos. e Squash Court Nos.
![Squash Setup](/img/bc-posting-image-6.png)

* **Squash Player** master table: prendiamo la esempi dalla tabella Contact perchè c'è il transferfield + nel campo "Series No." aggiungere TableRelation con "Series No."
![Squash Player](/img/bc-posting-image-7.png)

Aggiungere ora il codice per la gestione del numeratore:
```al
    field(_; "No."; Code[20])
    {
        trigger OnValidate();
        begin
            IF "No." <> xRec."No." THEN BEGIN
                SquashSetup.GET;
                NoSeriesMgt.TestManual(SquashSetup."Squash Player Nos.");
                "No. Series" := '';
            END;
        end;
    }

    TRIGGER OnInsert()
    BEGIN
        IF "No." = '' THEN BEGIN
            SquashSetup.GET;
            SquashSetup.TESTFIELD("Squash Player Nos.");
            NoSeriesMgt.InitSeries(SquashSetup."Squash Player Nos.", xRec."No. Series",0D,"No.","No. Series");
        END;
    END;
```
* Nella tabella `Contact Business Relation` campo `Link to Table` aggiungere `Squash Player` + la TableRelation nel campo `No.`
* Aggiungere il campo `Bus. Rel. Code for Squash Player` in `Marketing Setup`

Adesso possiamo sviluppare la funzione per creare il Player a partire dal contatto:
```al
// prendendo esempio dalla CreateCustomer
procedure CreateSquashPlayer()
begin
    TESTFIELD(Type, Type::Person);
    RMSetup.GET;
    RMSetup.TESTFIELD("Bus. Rel. Code for Squash Pl.");
    CLEAR(SquashPlayer);
    SquashPlayer.INSERT(TRUE);

    ContBusRel."Contact No." := Cont."No.";
    ContBusRel."Business Relation Code" := RMSetup."Bus. Rel. Code for Squash Pl.";
    ContBusRel."Link to Table" := ContBusRel."Link to Table"::"Squash Player";
    ContBusRel."No." := SquashPlayer."No.";
    ContBusRel.INSERT(TRUE);
    
    UpdateCustVendBank.UpdateSquashPlayer(Cont,ContBusRel);
    MESSAGE(Text009,SquashPlayer.TABLECAPTION,SquashPlayer."No.");
end;

// prendendo esempio dalla UpdateCustomer
procedure UpdateSquashPlayer()
begin
    WITH SquashPlayer DO BEGIN
        GET(ContBusRel."No.");
        xRecRef.GETTABLE(SquashPlayer);
        NoSerie := "No. Series";
        TRANSFERFIELDS(Cont);
        "No." := ContBusRel."No.";
        "No. Series" := NoSerie;
        MODIFY;
        RecRef.GETTABLE(SquashPlayer);
        ChangeLogMgt.LogModification(RecRef,xRecRef);
    END;
end;
```

### Processo di prenotazione
Per costruire un flusso di registrazione prenderemo esempio dalla gestione delle `Resource` in Business Central, questo perchè le risorse hanno un processo semplice da capire come per gli item, ma a differenza di questi sono anche più semplici da utilizzare.

#### Squash Court
Questa tabella master è simile alle risorse, quindi possiamo andare a copiare le sue funzionalità. 
Utilizzeremo però il numero di serie inserito nella Squash Setup.

![Squash Court](/img/bc-posting-image.png)

Come obiettivo dell'esercizio vogliamo essere in grado di tenere traccia delle prenotazioni.
Creeremo quindi uno Squash Journal per creare movimenti di prenotazioni che potranno essere fatturati.
Un journal ha bisogno di una struttura complessa, per questo la creeremo a partire da una già esistente. Copieremo quindi le `Resource Journals`:

![Resource Journals](/img/bc-posting-image-1.png)

Tutti i journal hanno la stessa struttura: 
* il Template, Batch e la Register table sono quasi sempre uguali in ogni struttura
* la Journal Line e la Ledger Entry invece contengono campi specifici di funzione 

#### Journal Template

![Journal Template](/img/bc-posting-image-2.png)

- **Name**: Il nome univoco del template. È possibile definire tanti modelli quanti ne sono necessari, ma di solito un Template per Page ID e uno per Recurring sono sufficienti. Se si desiderano journals con diversi codici di origine, è necessario avere più modelli.
- **Description**
- **Page ID**: Per alcune journals, servono più oggetti UI. Per esempio, le General Journals hanno una pagina sia per la banca che per i pagamenti.
- **Source Code**: un codice di traccia per tutte le registrazioni fatte tramite questo template.
- **Reason Code**: simile al source code.
- **Recurring**: Ogni volta che si registrano righe da un registro ricorrente, vengono create automaticamente nuove righe con una data di registrazione definita nella formula di data ricorrente
- **No. Series**: il document no. nella journal line viene automaticamente popolato con un nuovo numero da questa serie di numeri

Vedere esempio pagina `Def. registrazioni COGE`

#### Journal Batch

![Journal Batch](/img/bc-posting-image-3.png)

- **Journal Template Name**: collegamento al Template
- **Name** : Codice del Batch
- **Description**
- **Reason Code**: Se inserito, sovrascrive quello del Template
- **No. Series**: Se inserito, sovrascrive quello del Template

#### Register

![Register](/img/bc-posting-image-4.png)

- **No.**: Campo automaticamente incrementato per ogni transazione del journal.
- **From Entry No.**: La prima Ledger Entry creata con questa transizione.
- **To Entry No.**: L'ultima Ledger Entry creata con questa transizione.
- **Creation Date**: Compilata sempre con la data reale di quando è stata registrata la transizione.
- **User ID**: L'ID dell'utente che ha registrato la transazione

#### Journal Line

Le journal line hanno un numero di campi obbligatori che sono richiesti per tutti i journals e alcuni campi che sono richiesti per le sue funzionalità di design.
Il processo di reservation richiede di conoscere il codice del campo da Squash, la data e l'ora della prenotazione. Salveremo anche per quanto tempo vogliono giocare e il codice del giocatore.
Per la fatturazione abbiamo bisogno del prezzo da fatturare e il costo. 

![Journal Line](/img/bc-posting-image-5.png)

- **Journal Template Name**: collegamento al Template.
- **Line No.** : Ogni Journal ha, virtualmente, un numero illimitato di righe. Questo numero è automaticamente incrementato di 10000, per poter creare delle righe in mezzo.
- **Entry Type**: Reservation o Invoice.
- **Document No.**: Questo numero può essere dato al giocatore come numero della prenotazione. Quando il tipo del movimento è fattura allora è il numero della fattura.
- **Posting Date**: è la data della prenotazione, ma quando il movimento è fattura allora può essere la data della fattura.
- **Squash Player No.**: chi ha fatto la prenorazione.
- **Squash Court No.**: il campo da utilizzare.
- **Description**: aggiornamento automaticamente con il numero del campo, la data e l'ora della prenotazione, può essere modificata dall'utente.
- **Reservation Date**: data della prenotazione.
- **From Time**: Ora di inizio della prenotazione. Possiamo inserire solo ore intere o mezz'ore.
- **To Time**: Ora di fine della prenotazione.  Possiamo inserire solo ore intere o mezz'ore. Inserita in automatico quando inseriamo una quantità.
- **Quantity**: Numero di ore di gioco, possiamo inserire solo unità di 0.5, è calcolata in autoamtico quando i campi time sono inseriti.
- **Unit Cost**: Il costo di gestione del campo per un'ora di gioco.
- **Total Cost**: Costo della prenotazione.
- **Unit Price**: Prezzo della fattura per ora per la prenotazione, questo dipende se il giocatore è un membro del circolo o no.
- **Total Price**: Prezzo totale della fattura per questa prenotazione.
- **Applies-to Entry No.**: Quando una prenotazione è fatturata, questo campo contiene il numero Squash Entry No. della prenotazione.
- **Source Code**: Ereditato dalla tabella batch o template e usato in fase di registrazione.
- **Chargeable**: Quando questa opzione è usata, non ci sarà una fattura per questa prenotazione.
- **Journal Batch Name**: Collegamento al Batch.
- **Reason Code**: Ereditato dalla tabella batch o template e usato in fase di registrazione.
- **Bill-to Customer No.**: Determina chi paga per la prenotazione. Ereditato dallo Squash Player.
- **Gen. Bus. Posting Group**: la combinazione di general business e product posting group determina il Conto COGE (contabilità generale) su cui fare il giroconto quando fattureremo la prenotazione. Gen. Bus. Posting Group è ereditato dal bill-to customer.
- **Gen. Prod. Posting Group**: Ereditato dallo squash court.
- **External Document No.**: Quando un giocatore vuole che ci annotiamo un numero di riferimento.
- **Recurring Method**: Quando il registro è un registro ricorrente, è possibile utilizzare questo campo per determinare se il campo dell'importo viene cancellato dopo la registrazione delle righe.
- **Recurring Frequency**: Questo campo determina la nuova data di registrazione dopo che le righe ricorrenti sono state registrate.
- **Posting No. Series**: Quando il template ha un posting no. series, lo si utilizza per popolare questo campo quando si registra.

Prima di partire con il processo di registrazione dobbiamo ancora fare in modo che:
- I campi Time devono essere calcolati per non inserire valori errati
- Lo Unit Price deve essere calcolato
- I campi Unit Cost, Posting groups, and Bill-to Customer No. devono essere ereditati

#### Time calculation

Vogliamo specificare solo il tempo di inizio e fine. Il campo da squash può essere usato solo in blocchi da 30 minuti. Il campo quantità dovrebbe essere calcolato sulla base dei tempi inseriti e vice versa. Per farlo creeremo una nuova tabella con i tempi di inizio e fine permessi. Questa tabella avrà solo due campi come in figura:

![Time calculation](/img/bc-posting-image-8.png)

![Time calculation 2](/img/bc-posting-image-9.png)

I campi time nella journal avranno una relazione con la tabella per prevenire che l'utente inserisca valori non permessi.
Ora inseriamo del codice che calcoli la quantità:
```al
// campo From Time 
trigger OnValidate()
begin
    CalcQty;
end;

// campo To Time 
trigger OnValidate()
begin
    CalcQty;
end;

procedure CalcQty()
begin
    IF ("From Time" <> 0T) AND ("To Time" <> 0T) THEN BEGIN
        IF "To Time" <= "From Time" THEN
            FIELDERROR("To Time");
        ResTime.SETFILTER("Reservation Time", '>=%1&<%2', "From Time", "To Time")
        ResTime.CALCSUMS(Duration);
        VALIDATE(Quantity, ResTime.Duration);
    END;
end;
```

#### Price Management

Questo scenario potrebbe essere più complesso, ma al momento gestiremo solo due campi sulla tabella Squash Court che ci indica il prezzo per i Member e not Member.

#### Inherited data

Aggiungiamo i seguenti campi presi dalla Resource table alla nostra Squash Court:

![Inherited data](/img/bc-posting-image-10.png)

Sono stati aggiunti i campi Unit Code, Unit Price, Gen. Prod. Posting Group, and VAT Prod. Posting Group.
Adesso nel campo "Squash Court No." della Journal Line andiamo ad inserire il validate:

```al
// campo Squash Court No. 
trigger OnValidate()
begin
    IF SquashCourt.GET("Squash Court No.") THEN BEGIN
        Description := SquashCourt.Description;
        "Unit Cost" := SquashCourt."Unit Cost";
        "Gen. Prod. Posting Group" := SquashCourt."Gen. Prod. Posting Group";
        FindSquashPlayerPrice; // trovare il prezzo
    END;
end;
```

Gestiamo l'ereditarietà del campo Bill-to Customer No. dallo squash player e del campo Gen. Bus. Posting Group.

#### The posting process

Ora dobbiamo implementare il posting code, prendendo esempio dalle codeunit delle Resource:

![The posting process](/img/bc-posting-image-11.png)

La filosofia di Microsoft Business Central è semplice: *Test near, Test far, Do-it, Clean up*

Che significa:
1. Test near: Dobbiamo testare i campi nella journal line table
2. Test far: Leggiamo i dati delle tabelle esterne per vedere se tutto è ok
3. Do-it: registriamo le righe 
4. Clean up: eliminiamo i dati dalla journal table.

#### Check line

Possiamo vedere chiaramente che i campi nella nostra tabella sono prima controllati e poi c'è la validazione delle date (e poi ci sarebbe il controllo delle dimensioni).

```al
procedure RunCheck()
begin
    WITH SquashJnlLine DO BEGIN
        IF EmptyLine THEN
            EXIT;
        TESTFIELD("Squash Player No.");
        TESTFIELD("Squash Court No.");
        TESTFIELD("Posting Date");
        TESTFIELD("Gen. Prod. Posting Group");
        TESTFIELD("From Time");
        TESTFIELD("To Time");
        TESTFIELD("Reservation Date");
        TESTFIELD("Bill-to Customer No.");
        IF "Entry Type" = "Entry Type"::Invoice THEN
            TESTFIELD("Applies-to Entry No.");
        IF "Applies-to Entry No." <> 0 THEN
            TESTFIELD("Entry Type", "Entry Type"::Invoice);
        IF "Posting Date" <> NORMALDATE("Posting Date") THEN
            FIELDERROR("Posting Date",Text000);
        IF (AllowPostingFrom = 0D) AND (AllowPostingTo = 0D) THEN
            ...
        END;
    END;
end;
```

#### Post line

Il codice del posting è semplice. I valori sono controllati e poi un record della Register è creato o aggiornato, infine viene scritta la ledger.

```al
procedure Code()
begin
    WITH SquashJnlLine DO BEGIN
        IF EmptyLine THEN
            EXIT;
        SquashJnlCheckLine.RunCheck(SquashJnlLine,TempJnlLineDim);
        IF NextEntryNo = 0 THEN BEGIN
            SquashLedgEntry.LOCKTABLE;
            IF SquashLedgEntry.FIND('+') THEN
                NextEntryNo := SquashLedgEntry."Entry No.";
            NextEntryNo := NextEntryNo + 1;
        END;
        IF SquashReg."No." = 0 THEN BEGIN
            SquashReg.LOCKTABLE;
            IF (NOT SquashReg.FIND('+')) OR ... THEN BEGIN
                SquashReg.INIT;
                SquashReg."No." := SquashReg."No." + 1;
                ...
                SquashReg.INSERT;
            END;
        END;
        SquashReg."To Entry No." := NextEntryNo;
        SquashReg.MODIFY;
        SquashPlayer.GET("Squash Player No.");
        SquashPlayer.TESTFIELD(Blocked,FALSE);
        IF (GenPostingSetup."Gen. Bus. Posting Group" <> "Gen. Bus. Posting Group") OR
            (GenPostingSetup."Gen. Prod. Posting Group" <> "Gen. Prod. Posting Group")
        THEN
            GenPostingSetup.GET("Gen. Bus. Posting Group", "Gen. Prod. Posting Group");
        SquashLedgEntry.INIT;
        SquashLedgEntry."Entry Type" := "Entry Type";
        SquashLedgEntry."Document No." := "Document No.";
        ...
        SquashLedgEntry."No. Series" := "Posting No. Series";
        SquashLedgEntry.INSERT;
    END;
end;
```

### Processo di fatturazione

