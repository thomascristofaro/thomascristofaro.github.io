
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
1. Modificare il Relationship Management per poter creare un giocatore di squash da un contatto. 
2. Creare i campi da squash.
3. Processo di prenotazione. 
4. Processo di fatturazione.

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
