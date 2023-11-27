
# Reporting

## Cosa sono i Report

Un report viene utilizzato per stampare o **visualizzare informazioni** da un database. Quindi, è uno strumento che serve a organizzare, elaborare e **presentare dati** in un formato adatto per la loro visualizzazione da parte dell'utente. Questi report possono essere visualizzati direttamente sullo schermo in modalità Anteprima, esportati in vari formati di file come Word, Excel o PDF, inviati via email o stampati su carta.

Una volta che il report è stato creato, i dati al suo interno diventano statici, non cambiano. Tutte le specifiche per i criteri di selezione dei dati del report devono essere stabilite all'inizio dell'esecuzione del report, prima che la vista del report venga generata.

In linea di massima, i report sono associati a una o più tabelle di dati. Anche se è possibile creare un report senza associazioni esterne a tabelle specifiche, questa è un'eccezione. Anche quando un report è collegato a una tabella particolare, ha la flessibilità di accedere e mostrare dati da altre tabelle di riferimento.

Sulla base del layout grafico possiamo identificare due tipi di report:
* **List**: è usata per mostrare grandi volumi di dati in un formato tabulare. Es: lista dei clienti o inventario
![Inventory - List](/img/bc-reporting-inventory.png)

* **Document**: è formattato in modo simile a un modulo pre-stampato, dove una pagina (o più pagine) contiene una sezione di intestazione, delle righe di dettaglio e un piè di pagina. Es: una stampa di ordine di acquisto o di una fattura di vendita
![Sales Invoice](/img/bc-reporting-invoice.png)

## Struttura
La struttura generale di un report di Business Central è composta dai seguenti elementi:

![Report Structure](/img/bc-reporting-structure.png)

I componenti principali sono: 
* **Dataset**: i data items sono i componenti che gestiscono i dati con il quale viene costruito il dataset. Esso è il set di dati inviato al layout per essere mostrato all'utente.
* **Layout**: determina il contenuto e il formato di un report quando viene visualizzato e stampato.
* **Request page**: viene mostrata solo all'inizio dell'esecuzione di un report. Il suo scopo è quello di consentire all'utente di inserire informazioni per controllare il report. Le informazioni di controllo che vengono inserite attraverso una request page possono includere filtri, date di controllo, altri parametri e specifiche, nonché opzioni di formattazione o di elaborazione da utilizzare per la relativa esecuzione del report.

![Request Page](/img/bc-reporting-request-page.png)

Sulla base di questi 3 elementi, il processo di design di un report viene diviso in 3 distinte fasi:
* **Definizione della struttura logica**: definizione dei data items e delle colonne
* **Creazione della request page**: definizione dei filtri e dei parametri
* **Design degli elementi visivi**: definizione del layout visivo

## Dataset

La progettazione di un report in Business Central richiede la creazione di un dataset ben strutturato, composto da elementi di dati e colonne. Questo dataset determina quali tabelle e campi saranno disponibili nel layout del report e costituisce la base per la creazione del report.

La progettazione logica del report implica la definizione del modello di dati, che comprende 
* la selezione delle tabelle da utilizzare
* la definizione delle relazioni tra tali tabelle
* la specifica di chiavi di ordinamento e filtri
* il raggruppamento dei dati
* il calcolo di subtotali e totali.

I **dataitem e le colonne nel report corrispondono alle tabelle e ai campi** delle tabelle. Durante l'esecuzione del report, ogni dataitem viene iterato per tutti i record nella tabella corrispondente, applicando filtri, e creando il dataset. Se il report si basa su più tabelle, è necessario stabilire relazioni tra gli elementi di dati per organizzare e limitare i dati letti.

Le colonne di un dataitem possono essere un campo di tabella, una variabile o una costante di testo. Raccomandiamo di aggiungere solo le colonne necessarie per il layout del report. Aggiungere più colonne di quelle necessarie aumenterà la dimensione del dataset e avrà un impatto negativo sulle prestazioni del report. Ogni dataitem e colonna richiede un **nome univoco**.

La logica interna del report funziona come una "scatola nera" che attraversa automaticamente i DataItem, leggendo ed elaborando un record alla volta. Di conseguenza, ogni volta che abbiamo la necessità di elaborare un set di dati record per record, spesso è più conveniente sfruttare un oggetto report.

Un dataitem ha la seguente struttura:

```al
report 50100 MyReport
{
    dataset
    {
        dataitem(DataItemName; SourceTableName)
        {
            column(ColumnName; SourceFieldName)
            {
                IncludeCaption = true; // proprietà opzionale - aggiunge in automatico anche la caption del campo
            }
            // ...
        }
    }
}
```

La struttura del flusso dati del report ci permette di creare una struttura gerarchica, in cui possiamo annidare i DataItem per formare una relazione di tipo ancestor, parent e child. Se il DataItem2 è annidato all'interno del DataItem1 e ha una relazione con il DataItem1, allora ogni volta che viene elaborato un record nel DataItem1, vengono automaticamente elaborati tutti i record correlati nel DataItem2.

Il seguente diagramma mostra il flusso dati per una struttura a DataItem annidati:

![Data Flow](/img/bc-reporting-data-flow.png)

I blocchi illustrano visivamente come l'annidamento dei DataItem controlla il flusso dei dati. Come possiamo vedere, l'intero processo di elaborazione per il DataItem2 si verifica per ogni record del DataItem1. A sua volta, l'intero processo di elaborazione per il DataItem3 si verifica per ogni record del DataItem2.

### Come visualizzare il dataset

Lanciare il report di cui vogliamo salvare il dataset e, nella finestra di dialogo che si aprirà, selezionare l'opzione *Send to*:

![Save dataset](/img/bc-reporting-save-dataset.png)

Scegliere *Microsoft Excel Document (data only)*:

![Save Excel](/img/bc-reporting-save-excel.png)

### More Dataitems

[Patterns dove si utilizzano più dataitems](https://learn.microsoft.com/en-us/training/modules/design-data-model-report/4-link-order-indent-data-items)

### Report triggers

```al
report 50100 MyReport
{
    trigger OnInitReport()
    begin
        // ...
    end;

    trigger OnPreReport()
    begin
        // ...
    end;

    trigger OnPostReport()
    begin
        // ...
    end;
}
```

* OnInitReport(): Eseguito una volta quando il report viene aperto.
* OnPreReport(): Eseguito una volta dopo che la request page viene completata. Tutta l'elaborazione dei DataItem segue questo trigger.
* OnPostReport(): questo trigger è eseguito una volta alla fine di tutta l'elaborazione del report, se il report viene completato normalmente. Se il report termina con un errore, questo trigger non viene eseguito. Tutto il processing dei DataItem precede questo trigger.

### DataItem triggers

Ogni DataItem ha i seguenti trigger:

```al
report 50100 MyReport
{
    dataset
    {
        dataitem(DataItemName; SourceTableName)
        {
            column(ColumnName; SourceFieldName)
            {

            }
            // ...

            trigger OnPreDataItem()
            begin
                // ...
            end;

            trigger OnAfterGetRecord()
            begin
                // ...
            end;

            trigger OnPostDataItem()
            begin
                // ...
            end;
        }
    }
}
```

Nei trigger dei DataItem viene inserita la maggior parte della logica di flusso per un report:

* OnPreDataItem(): Questo è il luogo logico per qualsiasi pre-elaborazione che non può essere gestita nelle proprietà del report o del DataItem o nei due trigger di pre-elaborazione del report.
* OnAfterGetRecord(): Questo è il ciclo di lettura e di elaborazione dei dati. Il codice inserito qui ha pieno accesso ai dati di ogni record, un record alla volta. Questo trigger viene ripetutamente elaborato fino al raggiungimento della fine logica della tabella per questo DataItem. Questo trigger è rappresentato sul diagramma di flusso dati del report come una delle caselle etichettate come Data Item processing Loop.
* OnPostDataItem(): Questo viene eseguito dopo che tutti i record per questo DataItem sono stati elaborati, a meno che il report non sia terminato da un utente, annullato dall'esecuzione di una funzione AL come BREAK o QUIT, o da un errore.

### Esempi di dataset

* Lista di clienti e fornitori
* Lista di articoli e quantità disponibili per magazzino
* Lista delle righe di una fattura di vendita con campi di testata
* Lista di fornitori con somma totale delle righe di ordine di acquisto

## Layout

Il layout visivo determina il contenuto e il formato di un report quando viene visualizzato e stampato, ad esempio il carattere e la dimensione del testo.
Il layout include l'intestazione di pagina, il corpo e il piè di pagina. All'interno del corpo del report, possono esserci più righe di dettaglio. Le righe di dettaglio sono la definizione della visualizzazione dei dati primari e ripetitivi (es. il dettaglio delle righe di un ordine).

Esistono tre tipi di layout di report:
* Report Definition Language (RDL): bisogna usare il Generatore report di Microsoft SQL Server Reporting Services.
* Word: È possibile creare layout di Word usando un documento Word. I layout di Word si basano su un documento di Word che include una parte XML personalizzata che rappresenta il set di dati del report.


## Report Word

I report Word sono basati su un documento Word che include una parte XML personalizzata che rappresenta il set di dati del report. Si inizia impostando la tipologia di layout all'interno del dataset. Si può fare in due modi:

Utilizzare la proprietà **WordLayout**:

```al
report 50100 "Report Test"
{
    DefaultLayout = Word;
    RDLCLayout = 'path/reportRDL.rdl';
    WordLayout = 'path/reportWORD.docx';
}
```

Oppure utilizzare la proprietà **DefaultRenderingLayout**:

```al
report 50100 "Report Test"
{
    DefaultRenderingLayout = WordLayout;
    
    // ... dopo la request page:
    
    rendering
    {
        layout(WordLayout)
        {
            Type = Word;
            LayoutFile = 'path/reportWORD.docx';
        }
    }
}
```
A questo punto compilare l'app e vedrete il file .docx creato in automatico nella cartella impostata come path (solitamente è la cartella report del progetto).

In Visual Studio Code, fai clic con il tasto destro del mouse sul file DOCX e scegli "Apri esternamente". Questo aprirà Microsoft Word.

Se non l'hai già fatto, assicurati di avere la scheda Sviluppo abilitata. Fai clic su File | Opzioni | Personalizzazione barra multifunzione. Nella scheda principale, seleziona l'opzione Sviluppo e clicca su OK:

![3-report-1](/img/bc-reporting-word-1.png)

Quindi ora è possibile andare nella schea Sviluppo e fare clic su "Riquadro mapping XML". Nella barra che si apre, selezionare in "Web part XML personalizzata" l'ultima opzione dal drop-down menu, dovrebbe apparire simile all'immagine:

![3-report-2](/img/bc-reporting-word-2.png)

Adesso è possibile inserire del contenuto nel documento word. Per farlo, posizionarsi con il cursore nel punto in cui si vuole inserire qualcosa, nella barra laterale fare click-destro sull'elemento che si vuole aggiungere e quindi "inserisci controllo contenuto" -> "testo normale" o "immagine" a seconda del contenuto. Gli elementi inseriti fuori da un controllo ripetuto verranno presi dalla prima riga del dataset.

Se si vuole inserire una tabella con i dati del dataset, posizionarsi nel punto in cui si vuole inserire la tabella, fare inserisci -> tabella -> 2 righe e x colonne a seconda dei campi che si vuole mettere. Nella prima riga inserire le caption della tabella allo stesso modo di come si aggiungono gli elementi sparsi nel documento. Nella seconda riga, invece bisogna inserire il controllo ripetuto: selezionare la riga -> click destro sul dataitem da inserire -> "ripetuto". A questo punto, dentro all'elemento repeater appena inserito, continuare ad inserire dei testi normali a partire da campi come fatto finora.

Un esempio di come potrebbe essere il documento word:
![3-report-3](/img/bc-reporting-word-3.png)

A questo punto installare e lanciare il report. Per visualizzare il layout word, cliccare su "Invia a" -> "Microsoft Word".

## Processing-only report

In Business Central, esistono i report definiti "processing only", come il report numero 795, "Adjust Cost - Item Entries". Questi report si distinguono perché hanno la proprietà "ProcessingOnly" impostata su "true". La caratteristica principale di un report "processing only" è che non mostra i dati agli utenti, ma si concentra esclusivamente sull'elaborazione e l'aggiornamento dei dati presenti nelle tabelle. L'utilizzo di oggetti report per queste funzioni è particolarmente vantaggioso: grazie al loro ciclo automatico di lettura, elaborazione e scrittura, e alla presenza di una request page integrata, si riduce notevolmente la necessità di scrittura del codice. Inoltre, è importante sapere che un report può eseguire operazioni di aggiunta, modifica o cancellazione di record nelle tabelle, a prescindere dal fatto che sia un report "processing only" o un report tradizionale che genera output visibili.

## Esercizio

* Lista di clienti e fornitori
* Lista di articoli e quantità disponibili per magazzino
* Collegandoci all'applicazione squash, creare un report di lista degli Squash Player

## Link utili
- [Creazione di report per Microsoft Dynamics 365 Business Central](https://learn.microsoft.com/it-it/training/paths/build-reports/)
- [Programming Microsoft Dynamics 365 Business Central](https://www.amazon.it/Programming-Microsoft-Dynamics-Business-Central-ebook/dp/B07RJBDX3G/)
