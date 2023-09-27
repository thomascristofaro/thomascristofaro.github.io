
# Reporting

:::caution Attenzione

**In fase di creazione**.

:::

## Cosa sono i Report

Un report viene utilizzato per stampare o visualizzare informazioni da un database. Quindi, è uno strumento che serve a organizzare, elaborare e presentare dati in un formato adatto per la loro visualizzazione da parte dell'utente. Questi report possono essere visualizzati direttamente sullo schermo in modalità Anteprima, esportati in vari formati di file come Word, Excel o PDF, inviati via email o stampati su carta.

Una volta che il report è stato creato, i dati al suo interno diventano statici, il che significa che non cambiano. Tutte le specifiche per i criteri di selezione dei dati del report devono essere stabilite all'inizio dell'esecuzione del report, prima che la vista del report venga generata.

In linea di massima, i report sono associati a una o più tabelle di dati. Anche se è possibile creare un report senza associazioni esterne a tabelle specifiche, questa è un'eccezione. Anche quando un report è collegato a una tabella particolare, ha la flessibilità di accedere e mostrare dati da altre tabelle di riferimento.

Sulla base del layout possiamo identificare due tipi di report:
* **List**: è usata per mostrare grandi volumi di dati in un formato tabulare. Es: lista dei clienti o delle General Ledger Entries
![Inventory - List](/img/bc-reporting-inventory.png)

* **Document**: è formattato in modo simile a un modulo pre-stampato, dove una pagina (o più pagine) contiene una sezione di intestazione, delle righe di dettaglio e un piè di pagina. Es: una stampa di ordine di acquisto o di una fattura di vendita
![Sales Invoice](/img/bc-reporting-invoice.png)

## Struttura
La struttura generale di un report di Business Central è composta dai seguenti elementi:

![Report Structure](/img/bc-reporting-structure.png)

I componenti più importanti della precedente figura sono: 
* Data items: sono i componenti che gestiscono i dati con il quale viene costruito il dataset, il set di dati inviato al layout per essere mostrato all'utente.
* Layout: determina il contenuto e il formato di un report quando viene visualizzato e stampato.

### Dataset

Il dataset di un report si costruisce dai data items, esso corrisponde ad una tabella. Quando il report viene eseguito, ogni data item viene iterato per tutti i record della tabella sottostante. 
Se un report si basa su più di una tabella, è necessario stabilire una gerarchia di data item per controllare come vengono raccolte le informazioni. Si utilizza l'indentazione per stabilire la gerarchia.

Per esempio, per creare un report che stampa una lista di clienti e gli ordini che sono stati creati per ogni cliente, devi definire:
* un data item che corrisponde alla tabella Customer
* un data item, indentato all'interno del precedente, che corrisponde alla tabella Sales Header

I data item sono formati da colonne, una colonna può essere una delle seguenti entità:
* Un campo di una tabella
* Una variabile
* Un'espressione
* Una didascalia non correlata a una tabella specifica

### Layout

Il layout visivo determina il contenuto e il formato di un report quando viene visualizzato e stampato.
Si crea il layout di un report disponendo colonne ed elementi di dati e specificando il formato generale, ad esempio il carattere e la dimensione del testo.
Esistono tre tipi di layout di report:
* Layout che usano Report Definition Language (RDL)
* Layout di report di Word
* Layout di report di Excel
LAYOUT REPORT RDL
Per creare un report con layout RDL, usare Generatore report di Microsoft o Generatore report di Microsoft SQL Server Reporting Services.
LAYOUT REPORT WORD
È possibile creare layout di Word usando un documento Word. I layout di Word si basano su un documento di Word che include una parte XML personalizzata che rappresenta il set di dati del report.
LAYOUT REPORT EXCEL
I layout di report di Excel si basano su un documento di Excel (.xlsx) e possono sfruttare le funzionalità di Excel come i dispositivi di scorrimento, i diagrammi, i grafici, le tabelle pivot e PowerQuery nella progettazione del report.


## Flusso dati


## Creazione di un report


## Processing-only report

In Business Central, report objects can be classified as processing
only, such as report 795 Adjust Cost - Item Entries, by setting the correct
report property, that is, by setting the ProcessingOnly property to Yes. A
processing only report will not display data to the user—it will simply
process and update data in the tables. Report objects are convenient
to use for processing because the report's automatic read-processwrite
loop and the built-in request page reduce coding that would
otherwise be required. A report can add, change, or delete data in
tables, regardless of whether the report is processing only or a
typical report that generates output for viewing.


## Esercizio

Lista partecipanti, certificato, fatturazione

## Link utili
- [Creazione di report per Microsoft Dynamics 365 Business Central](https://learn.microsoft.com/it-it/training/paths/build-reports/)
- [Programming Microsoft Dynamics 365 Business Central](https://www.amazon.it/Programming-Microsoft-Dynamics-Business-Central-ebook/dp/B07RJBDX3G/)
