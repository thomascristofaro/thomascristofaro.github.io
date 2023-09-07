
# Posting

## Tipi di tabelle

Business Central archivia i dati in tabelle. Da un punto di vista tecnico, tutte le tabelle sono uguali, ma da un punto di vista funzionale, esistono diversi tipi di tabelle per scopi diversi. Il diagramma seguente mostra quali tipologie di tabelle esistono in una tipica area dell'applicativo e che relazioni hanno tra loro:

![Table Relations](/img/bc-posting-table_relations.png#center)


### Configuration tables
Le Configuration tables sono tabelle statiche o che cambiano lentamente in cui gli utenti immettono le informazioni una volta e poi le modificano raramente, se non mai più. L'applicazione usa queste tabelle durante la creazione, la modifica o l'eliminazione di record in altre tabelle, come quelle delle transazioni. Queste tabelle vengono spesso controllate da vari processi, come la registrazione. La modifica delle informazioni in queste tabelle cambia il modo in cui i dati vengono elaborati o altera altri aspetti della funzionalità di un'area di applicazione.

* **Master table**: contiene informazioni sulle entità più importanti di un'area funzionale. Es. i clienti per la contabilità clienti e gli articoli per il magazzino.
* **Supplemental/Subsidiary table**: servono per arricchire i le tabelle master con dati supplementari. Es. le tabelle Currency e Language.
* **Setup table**: servono per organizzare i dati delle impostazioni e configurare la soluzione creata. Es. le tabelle G/L Setup e Sales & Receivables Setup.


### Operational transaction tables
Le Operational transaction tables sono le tabelle di lavoro principali per gli utenti. Gli utenti immettono regolarmente le informazioni in queste tabelle. L'aggiunta, la modifica o l'eliminazione delle informazioni in queste tabelle in genere non influisce sull'applicazione né sul business.

* **Journal table**: tutte le transazioni sono registrate tramite registrazioni, quindi è la tabella primaria dei movimenti transazionali. Es. Purchase Journal e Item Journal.
* **Document table**: quando si immettono transazioni, sono necessari documenti come un'offerta/ordine di vendita. Le tabelle document sono tabelle transazionali secondarie e sono sempre costituite da due tabelle: una con le informazioni dell'intestazione e una con i dettagli della riga. Es. Sales Header e Sales Line che contengono informazioni sugli ordini e offerte di vendita.


### Posted transaction tables
Con le Posted transaction tables, le informazioni vengono generate automaticamente dall'applicazione durante la registrazione (o processi simili). Gli utenti non possono creare nuovi record in queste tabelle e non possono modificare né eliminare i record. Esistono alcune eccezioni in cui gli utenti possono modificare o eliminare le informazioni. Tutti questi casi hanno una chiara giustificazione nella logica di business.

* **Register table**: è un sommario delle tabelle di contabilità generale corrispondenti. Registra tipi di informazioni storiche e transazionali. Es. le tabelle G/L Register e Item Register.
* **Ledger table**: nelle tabelle di contabilità generale è possibile trovare le informazioni transazionali di un dominio funzionale. Es. tabelle Cust. Ledger Entry e Item Ledger Entry.
* **Document history table**: queste tabelle sono versioni storiche delle tabelle documenti. Quando si registra dalla Document table, i documenti passano attraverso una Journal table e finiscono in una Document history table. Es. Sales Invoice Header e Sales Invoice Line

Conoscendo questi principi e patterns, sarà più semplice personalizzare l'applicazione e creare nuove aree mantenendo un'esperienza coerente con lo standard.


## Business Central process flow

I flussi di dati, come ordini di vendita, acquisto, produzione e transazioni finanziarie, vengono processati attraverso Business Central nel seguente modo:

![Process Flow](/img/bc-posting-process_flow.png#center)

* **Setup iniziale**: Qui vengono inseriti i dati principali, i dati di riferimento e i dati di controllo e configurazioni essenziali. La maggior parte di questa fase viene effettuata quando il sistema (o una nuova applicazione) viene preparato per l'uso in produzione.
* **Inserimento delle transazioni**: Le transazioni vengono inserite in documenti e successivamente trasferite come parte di una sequenza di registrazione in una Journal table o i dati possono essere inseriti direttamente in una Journal table. I dati vengono preliminarmente convalidati durante l'inserimento, facendo riferimento alle tabelle master e subsidiary. L'inserimento può avvenire mediante inserimento manuale, un processo automatizzato di generazione delle transazioni o una funzione di importazione che porta i dati delle transazioni da un altro sistema.
* **Validate**: prima di sottoporli a registrazione, i dati delle transazioni vengono convalidati con ulteriori operazioni di verifica di integrità e completezza. Quando una transazione Journal non passa la validazione, può succedere che questa venga bypassata e vengano registrate le transazioni valide oppure l'intero Journal batch viene rifiutato finchè il problema non viene risolto, dipende dall'applicazione.
* **Posting**: Questo passaggio registra un Journal batch che include: la convalida completa dei dati delle transazioni, aggiunge movimenti a una o più tabelle di Ledger e, in alcuni casi, anche in una Document history table.
Quando una Journal Entry è registrata all'interno di un Ledger, essa diventa parte del registro contabile permanente. I dati nelle tabelle di Ledger non possono più essere modificati o eliminati.
Solitamente aggiorna anche una tabella di Register, salvando i range di ID delle ledger registrate e in quale batch.
Questo contribuisce alla trasparenza del sistema per le verifiche e le analisi.
* **Utilizzo**: In questa fase accediamo ai dati tramite pagine, query e/o report, compresi quelli che alimentano servizi web e altri consumatori di dati. In questo momento, esiste una flessibilità totale. Dovrebbero essere utilizzati gli strumenti più appropriati per le esigenze degli utenti, che siano interni a Business Central o esterni (come di Business Intelligence).
* **Manutenzione**: manutenzione continua, nel modo più appropiato, di tutti i dati di Business Central


## Posting Schema

Ogni transizione inizia con un journal. Quando registriamo un journal, le modifiche vengono memorizzate in una entry table e viene mantenuta una register per tutte le righe del journal, consentendo agli ispettori di verificare se le transazioni sono coerenti. Questi sono i blocchi di base di Business Central. I più importanti journal, register e entry sono i seguenti:

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


## Documenti

### Struttura di un documento
Un documento di Business Central ha sempre una testata e delle righe (header e lines). La testata contiene le informazioni di base sulla transazione come date di spedizione, indirizzi, e termini di pagamento.
Le righe contengono informazioni su cosa è stato venduto o comprato. Questo può essere a qualcosa come un item, una risorsa o un G/L account.

### Transazioni da documento
I documenti possono iniziare delle transazioni. Quando un documento è processato, i journal necessari sono automaticamente popolati. Per esempio quando un ordine è spedito il materiale lascia il magazzino, quindi un item journal è creata e registrata per essere gestita. Quando una fattura è registrata, un Generla Journal è generato per creare delle G/L Entries e delle Customer/Vendor ledger entries.

### Esempi di documenti

* **Vendita/Acquisto**: hanno diverse fasi, dipende dal tipo di transazione. Solitamente il punto di inizio è l'offerta. Quando questa viene approvata, può diventare ordine che verrà poi spedito e fatturato.
* **Jobs**: Un progetto potrebbe essere più completo di un semplice documento di acquisto/vendita. Potrebbe durare da settimane a anni e richiedere più documenti. Business Central ti da la possibilità di gestire questa situazione: ogni documento e transazione journal può essere collegata ad un job, semplificando il processo di pianificazione e analisi del profitto.
* **Manufacturing**: Consente di gestire il processo di produzione dei prodotti finali. Consente di creare un articolo a partire da altri articoli e risorse.

![Sales Example](/img/bc-posting-sales.png)
![Jobs Example](/img/bc-posting-jobs.png)
![Manufacturing Example](/img/bc-posting-manufacturing.png)

## Design
- Business Central development projects – general guidance p.1162 - questo parla più del design - non dice granchè
- NAV 2009 capitolo 2 - es. design di un'applicazione - questo molto meglio

## Esercizio


## Link utili
- [Uso degli standard di sviluppo essenziali per Microsoft Dynamics 365 Business Central](https://learn.microsoft.com/it-it/training/paths/essential-development-standards/)
- Microsoft Dynamics NAV 2009 Application Design
- Programming Microsoft Dynamics 365 Business Central
