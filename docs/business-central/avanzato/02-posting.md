
# Posting

Il posting è l’attività che registra i dati rendendoli immutabili, come spesso si dice «scolpendoli nella pietra». Il posting determina cambiamenti nei valori economici del sistema gestionale, tipicamente la contabilità (es. nuovi costi o ricavi).

## Tipi di tabelle

Business Central archivia i dati in tabelle. Da un punto di vista tecnico, tutte le tabelle sono uguali, ma da un punto di vista funzionale, esistono diversi tipi di tabelle per scopi diversi. Il diagramma seguente mostra quali tipologie di tabelle esistono in una tipica area dell'applicativo e che relazioni hanno tra loro:

![Table Relations](/img/bc-posting-table_relations.png#center)


### Configuration tables
Le Configuration tables sono tabelle **statiche** o che cambiano lentamente, in cui gli utenti immettono le informazioni una volta e poi le modificano raramente, se non mai più. 

L'applicazione usa queste tabelle durante la creazione, la modifica o l'eliminazione di record in altre tabelle, come quelle delle transazioni. Queste tabelle vengono spesso controllate da vari processi, come la registrazione. 

La modifica delle informazioni in queste tabelle cambia il modo in cui i dati vengono elaborati o altera altri aspetti della funzionalità di un'area di applicazione.

#### Setup table
Le tabelle di setup contengono i parametri di funzionamento (impostazioni) di una specifica area applicativa. Servono per organizzare i dati delle impostazioni e configurare la soluzione creata. Tipicamente sono tabelle composte da una sola riga in cui ciascuna colonna rappresenta una impostazione.

Esempio:
* Setup Contabilità Clienti
* Setup Contabilità Generale
* Setup Manufacturing

![Setup](/img/bc-posting-setup.png)

#### Master table 
Le tabelle master contengono il dato principale intorno al quale "ruotano" le altre informazioni.
Contiene informazioni sulle entità più importanti di un'area funzionale.
Tipicamente sono tabelle di anagrafica, ad esempio:
* Clienti
* Fornitori
* Articoli
* Commesse

![Master](/img/bc-posting-master.png)

#### Supplemental table
Le tabelle supplemental contengono dati secondari, aggiuntivi, usati in una o più aree dell’applicazione.
Sebbene sia importante, tale tabella non è l'interesse principale di alcuna area.
Anche le tabelle supplemental sono tipicamente anagrafiche, esempio:
* Paesi
* Ubicazioni
* Unità di misura

#### Subsidiary table
Le tabelle subsidiary contengono informazioni aggiuntive su una tabella master o una tabella supplementare a cui rimangono relazionate. Tipicamente, se viene cancellato un dato nella tabella master, vengono cancellati anche tutti quelli da esso derivati nella tabella subsidiary. Esempio:
* Unità di misura articoli
* Item Vendor table
* Indirizzi di spedizione


### Operational transaction tables
Le Operational transaction tables sono le tabelle di lavoro principali per gli utenti. Gli utenti immettono regolarmente le informazioni in queste tabelle. 

L'aggiunta, la modifica o l'eliminazione delle informazioni in queste tabelle in genere non influisce sull'applicazione né sul business.

#### Journal table
Le tabelle journal contengono dati che subiranno un processo di posting. Quindi è la tabella primaria dei movimenti transazionali.

Le tabelle di journal vengono svuotate dopo il posting e i dati trasferiti nelle tabelle posted di cui hanno struttura simile. I dati nel journal si considerano quindi temporanei in attesa di registrazione.

![Journal](/img/bc-posting-journal.png)

#### Document table
Le tabelle document contengono dati provenienti da più tabelle master che saranno sottoposti al processo di posting. Sono sempre formate da testata e righe.

I dati document transitano da uno o più journal automaticamente durante il posting. Sono tabelle transazionali secondarie.

Esempio:
* Ordini di vendita
* Distinte di pagamento

![Document](/img/bc-posting-document.png)

### Posted transaction tables
Con le Posted transaction tables, le informazioni vengono generate automaticamente dall'applicazione durante la registrazione. Gli utenti non possono creare nuovi record in queste tabelle e non possono modificare né eliminare i record. Esistono alcune eccezioni in cui gli utenti possono modificare o eliminare le informazioni. Tutti questi casi hanno una chiara giustificazione nella logica di business.

#### Ledger table
Le tabelle Ledger contengono i dati provenienti dal journal dopo il processo di registrazione.
Sono tabelle in sola lettura, non modificabili e protette.
L’eventuale rimozione dei dati da queste tabelle avviene solo mediante storno, un'operazione opposta e contraria a quella che ha creato il dato.
Tipicamente contengono informazioni di natura monetaria o valori che possono essere sommati e conteggiati.

![Ledger](/img/bc-posting-ledger.png)

#### Register table
è un sommario delle tabelle di contabilità generale corrispondenti. Registra tipi di informazioni storiche e transazionali, ma non alterano documenti o valori contabili del sistema. Es. le tabelle G/L Register e Item Register.

#### Document history table
queste tabelle sono versioni storiche delle tabelle documenti. Quando si registra dalla Document table, i documenti passano attraverso una Journal table e finiscono in una Document history table. Esempio: 
* Spedizione vendita reg.
* Fattura acquisto reg.

Conoscendo questi principi e patterns, sarà più semplice personalizzare l'applicazione e creare nuove aree mantenendo un'esperienza coerente con lo standard.


## Business Central process flow

I flussi di dati, come ordini di vendita, acquisto, produzione e transazioni finanziarie, vengono processati attraverso Business Central nel seguente modo:

![Process Flow](/img/bc-posting-process_flow.png#center)

* **Setup iniziale**: Qui vengono inseriti i dati principali, i dati di riferimento e i dati di controllo e configurazioni essenziali. Questa fase viene effettuata quando il sistema viene preparato per l'uso in produzione.
* **Inserimento delle transazioni**: Le transazioni vengono inserite in documenti e successivamente trasferite come parte di una sequenza di registrazione in una Journal table o i dati possono essere inseriti direttamente in una Journal table. I dati vengono preliminarmente convalidati durante l'inserimento, facendo riferimento alle tabelle master e subsidiary. L'inserimento può avvenire mediante inserimento manuale, un processo automatizzato di generazione delle transazioni o una funzione di importazione che porta i dati delle transazioni da un altro sistema.
* **Posting**: Questo passaggio registra un Journal batch che include: la convalida completa dei dati delle transazioni, aggiunge movimenti a una o più tabelle di Ledger e, in alcuni casi, anche in una Document history table.
Quando una Journal Entry è registrata all'interno di un Ledger, essa diventa parte del registro contabile permanente. I dati nelle tabelle di Ledger non possono più essere modificati o eliminati.
Solitamente aggiorna anche una tabella di Register, salvando i range di ID delle ledger registrate e in quale batch.
Questo contribuisce alla trasparenza del sistema per le verifiche e le analisi.
* **Utilizzo**: In questa fase accediamo ai dati tramite pagine, query e/o report. In questo momento, esiste una flessibilità totale.


## Posting Schema

Ogni transizione inizia con un journal. Quando registriamo un journal, le modifiche vengono memorizzate in una entry table e viene mantenuta una register per tutte le righe del journal. Questi sono i blocchi di base di Business Central. I più importanti journal, register e entry sono i seguenti:

![Posting Schema](/img/bc-posting-schema.png#center)

Ogni journal è responsabile per la creazione delle proprie entries, ma potrebbe lanciare un altro journal se richiesto. 
Una entry table è mantenuta sempre da un solo processo.

Descrizione delle aree:
* Il General Journal è il cuore dell'applicazione in cui vengono create le informazioni finanziarie di base nelle voci di registro. Tutte le informazioni di base si trovano nella G/L entry table, che è raggruppata nella G/L Register, sempre bilanciata. Le Customer, Vendor, VAT, e Bank Account Ledger entries sono tabelle subordinate che fanno sempre riferimento a una G/L register.
* La parte logistica dell'ERP è gestita dalla Item Journal. Ogni articolo che è comprato, prodotto, o venduto è gestito tramite questo journal.
* I servizi sono gestiti attraverso la Resource journal. Una "Resource" può essere una persona o un pezzo di attrezzatura, ad esempio un ascensore.
* Il Job journal è un'astrazione che copre l'intera applicazione. Ti consente di raggruppare le transazioni, facilitando l'analisi dei costi e dei profitti per progetti più grandi.

Come vediamo dallo schema, il processo di posting di un journal ha delle codeunit nella struttura:
* **Jnl.-Check Line**: Controlla se la journal line è valida per la registrazione
* **Jnl.-Post Line**: Questa è la codeunit che crea le ledger entry e le register tables, e chiama altre jnl.-post line se necessario (es. per le General Journal)
* **Jnl.-Post Batch**: cicla attraverso tutte le journal lines di un journal batch e registra tutte le righe. C'è una finestra di dialogo.
* **Jnl.-Post**: Questa è la codeunit che è chiamata dalla pagina. Chiama la codeunit jnl.-post batch e gestisce i messaggi per l'utente.
* **Jnl.-Post+Print**: Fa la stessa cosa della codeunit jnl.-post ma con in più la stampa di un report definito nel journal template.
* **Jnl.-B.Post**: Registra tutte le journal lines che non hanno errori e segna quelle che hanno errori.
* **Jnl.-B.Post+Print**: Fa la stessa cosa della codeunit jnl.-b.post ma con in più la stampa di un report definito nel journal template.

![esempio processo](/img/bc-posting-esempio_processo.png)

### Esempi di processi

* **Vendita/Acquisto**: hanno diverse fasi, dipende dal tipo di transazione. Solitamente il punto di inizio è l'offerta. Quando questa viene approvata, può diventare ordine che verrà poi spedito e fatturato.

![Sales Example](/img/bc-posting-sales.png#center)

* **Jobs**: Un progetto potrebbe essere più completo di un semplice documento di acquisto/vendita. Potrebbe durare da settimane a anni e richiedere più documenti. Business Central ti da la possibilità di gestire questa situazione: ogni documento e transazione journal può essere collegata ad un job, semplificando il processo di pianificazione e analisi del profitto.

![Jobs Example](/img/bc-posting-jobs.png#center)

* **Manufacturing**: Consente di gestire il processo di produzione dei prodotti finali. Consente di creare un articolo a partire da altri articoli e risorse.

![Manufacturing Example](/img/bc-posting-manufacturing.png#center)

## Designing a Squash Court application

Creiamo una struttura personalizzata in Microsoft Business Central. Gestiremo un campo da squash. Per prima cosa dobbiamo definire le modifiche e le espansioni al prodotto, per farlo dobbiamo effettuare una **Fit-gap analysis**: esaminiamo i processi dell'azienda e definiamo cosa possiamo e cosa non possiamo fare con il pacchetto standard. Quando un processo aziendale può essere gestito con il software standard, lo chiamiamo "aderente" (**Fit**). Quando non è possibile farlo, si tratta di uno "scostamento" (**Gap**), possiamo colmare un gap sviluppando una soluzione personalizzata o acquistando un componente aggiuntivo.

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

#### Modificare il Relationship Management

Dobbiamo avere la possibilità di creare un giocatore di squash da un contatto proprio come un cliente o fornitore.
Cerchiamo di capire come funziona il metodo standard per la creazione e lo adattiamo al nostro caso d'uso.
Analizzare la funzione nella pagina "Contact Card" -> CreateCustomer

Vedremo che avremo bisogno di:
* **Squash Setup**: Squash Player Nos. e Squash Court Nos.
![Squash Setup](/img/image-6.png)

* **Squash Player** master table: prendiamo la esempi dalla tabella Contact perchè c'è il transferfield + nel campo "Series No." aggiungere TableRelation con "Series No."
![Squash Player](/img/image-7.png)

Aggiungere ora il codice per la gestione del numeratore:
```AL
    OnInsert()
        IF "No." = '' THEN BEGIN
            SquashSetup.GET;
            SquashSetup.TESTFIELD("Squash Player Nos.");
            NoSeriesMgt.InitSeries(SquashSetup."Squash Player Nos.", xRec."No. Series",0D,"No.","No. Series");
        END;

    No. - OnValidate()
        IF "No." <> xRec."No." THEN BEGIN
            SquashSetup.GET;
            NoSeriesMgt.TestManual(SquashSetup."Squash Player Nos.");
            "No. Series" := '';
        END;

    AssistEdit() : Boolean
        SquashSetup.GET;
        SquashSetup.TESTFIELD("Squash Player Nos.");
        IF NoSeriesMgt.SelectSeries(SquashSetup."Squash Player Nos.", xRec."No. Series","No. Series") THEN BEGIN
            NoSeriesMgt.SetSeries("No.");
            EXIT(TRUE);
        END;
```
* Nella tabella "Contact Business Relation" campo "Link to Table" aggiungere "Squash Player" + la TableRelation nel campo "No."
* Aggiungere il campo "Bus. Rel. Code for Squash Player" in "Marketing Setup"

Adesso possiamo fare la funzione per creare il Player CreateSquashPlayer():
```AL
CreateSquashPlayer()
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

UpdateSquashPlayer()
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
```

#### Processo di prenotazione di un campo da squash
Per questa parte guarderemo le Resources di business central. Le risorse hanno un processo simile agli item ma sono più semplici da utilizzare e capire.

**Squash Court**
questa tabella master è simile alle risorse, quindi possiamo andare a copiare le sue funzionalità. Abbiamo bisogno di un altro numero di serie, quindi ne aggiungiamo un altro alla tabella Squash Setup.

![Squash Court](/img/image.png)

Quando utilizziamo un campo da squash vogliamo essere in grado di tenere traccia delle prenotazioni.
Creeremo quindi uno Squash Journal per creare movimenti di prenotazioni che potranno essere fatturati.
Un journal ha bisogno di una struttura di diversi oggetti. è più semplice creare un journal da una struttura già esistente. In questo esempio copieremo le **Resource Journals**:

![Resource Journals](/img/image-1.png)

Tutti i journal hanno la stessa struttura: il Template, batch e la register table sono quasi sempre le stesse, mentre la journal line e la ledger entry contengono campi specifici di funzione. 

**Journal Template**

![Journal Template](/img/image-2.png)

- **Name**: This is the unique name. It is possible to define as many Templates
as required but usually one Template per Form ID and one for Recurring
will do. If you want journals with different source codes you need to have
more templates.
- **Description**: A readable and understandable description of its purpose.
- **Test Report ID**: All Templates have a test report that allows the user to
check for posting errors.
- **Form ID**: For some journals, more UI objects are required. For example,
the General Journals have a special form for bank and cash.
- **Posting Report ID**: This report is printed when a user selects Post and Print.
- **Force Posting Report**: Use this option when a posting report is mandatory.
- **Source Code**: Here you can enter a Trail Code for all the postings done via
this Journal.
- **Reason Code**: This functionality is similar to source sodes.
- **Recurring**: Whenever you post lines from a recurring journal, new lines
are automatically created with a posting date defined in the recurring
date formula.
- **No. Series**: When you use this feature the Document No. in the Journal Line
is automatically populated with a new number from this Number Series.
- **Posting No. Series**: Use this feature for recurring journals.

**Journal Batch**

![Journal Batch](/img/image-3.png)

- **Journal Template Name**: The name of the Journal Template this batch
refers to
- **Name** : Each batch should have a unique code
- **Description**: A readable and explaining description for this batch
- **Reason Code**: When populated, this Reason Code will overrule the
Reason Code from the Journal Template
- **No. Series**: When populated this No. Series will overrule the No. Series
from the Journal Template
- **Posting No. Series**: When populated this Posting No. Series will overrule
the Posting No. Series from the Journal Template

**Register**

![Register](/img/image-4.png)

- **No.**: This field is automatically and incrementally populated for each
transaction with this journal. There are no gaps between the numbers.
- **From Entry No.**: A reference to the first Ledger Entry created is with
this transaction.
- **To Entry No.**: A reference to the last Ledger Entry is created with
this transaction.
- **Creation Date**: Always populated with the real date when the
transaction was posted.
- **User ID**: The ID of the end user who has posted the transaction.

**Journal Line**

Le journal line hanno un numero di campi obbligatori che sono richiesti per tutti i journals e alcuni campi che sono richiesti per le sue funzionalità di design.
Il processo di reservetion richiede di conoscere il codice dello Squash Court, la data e l'ora, quanto vogliono giocare e il numero della tabella Squash Player.
Per la fatturazione abbiamo bisogno del prezzo da fatturare e il costo. 

![Journal Line](/img/image-5.png)

- **Journal Template Name**: This is a reference to the current journal template.
- **Line No.** : Each journal has virtually unlimited number of lines; this number is
automatically incremented by 10000 allowing lines to be created in between.
- **Entry Type**: Reservation or invoice.
- **Document No.**: This number can be used to give to the squash player as a
reservation number. When the entry type is invoice, it is the invoice number.
- **Posting Date**: Posting date is usually the reservation date but when the entry
type is invoice it might be the date of the invoice which might differ from the
posting date in the general ledger.
- **Squash Player No.**: A reference to the squash player who has made
the reservation.
- **Squash Court No.**: A reference to the squash court.
- **Description**: This is automatically updated with the number of the squash
court, reservation date and times, but can be changed by the user.
- **Reservation Date**: The actual date of the reservation.
- **From Time**: The starting time of the reservation. We allow only whole or
half hours.
- **To Time**: The ending time of the reservation. We only allow whole and half
hours. This is automatically populated when people enter a quantity.
- **Quantity**: The number of hours playing time. We only allow units of 0.5 to be
entered here. This is automatically calculated when the times are populated.
- **Unit Cost**: The cost to run a Squash Court for one hour.
- **Total Cost**: The cost for this reservation.
- **Unit Price**: The invoice price for this reservation per hour. This depends
on whether or not the squash player is a member or not.
- **Total Price**: The total invoice price for this reservation.
- **Applies-to Entry No.**: When a reservation is invoiced, this is the reference
to the squash entry no. of the reservation.
- **Source Code**: Inherited from the journal batch or template and used when
posting the transaction.
- **Chargeable**: When this option is used, there will not be an invoice for
the reservation.
- **Journal Batch Name**: A reference to the journal batch that is used for
this transaction.
- **Reason Code**: Inherited from the journal batch or template, and used when
posting the transaction.
- **Recurring Method**: When the journal is a recurring journal you can use this
field to determine whether the amount field is blanked after posting the lines.
- **Recurring Frequency**: This field determines the new posting date after the
recurring lines are posted.
- **Gen. Bus. Posting Group**: The combination of general business and
product posting group determines the G/L cccount for turnover when
we invoice the reservation. The Gen. Bus. Posting Group is inherited
from the bill-to customer.
- **Gen. Prod. Posting Group**: This will be inherited from the squash player.
- **External Document No.**: When a squash player wants us to note a reference
number we can store it here.
- **Posting No. Series**: When the journal template has a posting no. series it is
populated here to be used when posting.
- **Bill-to Customer No.**: This determines who is paying for the reservation.
We will inherit this from the squash player.

Prima di partire con il processo di registrazione dobbiamo ancora fare in modo che:
- I campi Time devono essere calcolati per non inserire valori errati
- Lo Unit Price deve essere calcolato
- I campi Unit Cost, Posting groups, and Bill-to Customer No. devono essere ereditati

**Time calculation**

Vogliamo specificare solo il tempo di inizio e fine. Il campo da squash può essere usato solo in blocchi da 30 minuti. Il campo quantità dovrebbe essere calcolato sulla base dei tempi inseriti e vice versa. Per farlo creeremo una nuova tabella con i tempi di inizio e fine permessi. Questa tabella avrà solo due campi come in figura:

![Time calculation](/img/image-8.png)

![Time calculation 2](/img/image-9.png)

I campi time nella journal avranno una relazione con la tabella per prevenire che l'utente inserisca valori non permessi.
Ora inseriamo del codice che calcoli la quantità venga calcolata:
```AL
From Time - OnValidate()
    CalcQty;

To Time - OnValidate()
    CalcQty;

CalcQty()
    IF ("From Time" <> 0T) AND ("To Time" <> 0T) THEN BEGIN
        IF "To Time" <= "From Time" THEN
            FIELDERROR("To Time");
        ResTime.SETFILTER("Reservation Time", '>=%1&<%2', "From Time", "To Time")
        ResTime.CALCSUMS(Duration);
        VALIDATE(Quantity, ResTime.Duration);
    END;
```

**Inherited data**
Aggiungiamo i seguenti campi presi dalla Resource table alla nostra Squash Court:

![Inherited data](/img/image-10.png)

Sono stati aggiunti i campi Unit Code, Unit Price, Gen. Prod. Posting Group, and VAT Prod. Posting Group.
Adesso nel campo "Squash Court No." della Journal andiamo ad inserire il validate:

```AL
Squash Court No. - OnValidate()
    IF SquashCourt.GET("Squash Court No.") THEN BEGIN
        Description := SquashCourt.Description;
        "Unit Cost" := SquashCourt."Unit Cost";
        "Gen. Prod. Posting Group" := SquashCourt."Gen. Prod. Posting Group";
        FindSquashPlayerPrice;
    END;
```

**The posting process**

Ora dobbiamo implementare il posting code, prendendo esempio dalla Resource di BC:
![The posting process](/img/image-11.png)

Prima dobbiamo testare i campi nella journal line table, poi leggiamo i dati delle tabelle esterne per vedere se tutto è ok, infine registriamo le righe e eliminiamo i dati dalla journal table.

**Check line**

Possiamo vedere chiaramente che i campi nella nostra tabella sono prima controllati e poi c'è la validazione delle date.

```AL
RunCheck()
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
```

**Post line**

Il codice del posting è semplice. I valori sono controllati e poi una Register è creato o aggiornata, infine viene scritta la ledger.

```AL
Code()
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
```

## Esercizio
Obiettivo: strutturare un flusso di registrazione

Software gestionale di una scuola
* corsi
* docenti
* aule
* iscrizione ai corsi (testata con docente - righe con allievi)
* Rilevazione ore allievi e docenti (registrazione)


## Link utili
- [Uso degli standard di sviluppo essenziali per Microsoft Dynamics 365 Business Central](https://learn.microsoft.com/it-it/training/paths/essential-development-standards/)
- [Post Documents Journals](https://learn.microsoft.com/en-us/dynamics365/business-central/ui-post-documents-journals)
- [Programming Microsoft Dynamics 365 Business Central](https://www.amazon.it/Programming-Microsoft-Dynamics-Business-Central-ebook/dp/B07RJBDX3G/)
- Microsoft Dynamics NAV 2009 Application Design
