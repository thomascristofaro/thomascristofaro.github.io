
# API

## Nozioni di base

### API

Le API (Application Programming Interfaces) sono set di definizioni e protocolli usati per costruire e integrare software applicativo. Agiscono come ponti di comunicazione tra diversi software, permettendo loro di interagire tra di loro senza la necessità di conoscere i dettagli interni l'uno dell'altro. Le API possono essere utilizzate per diversi scopi, come l'accesso a database, la comunicazione tra software su diverse piattaforme e molto altro.

### Web Services

I Web Services sono un tipo specifico di API che operano su reti internet. Essi permettono alle applicazioni di comunicare tra di loro attraverso la rete, utilizzando standard aperti e universalmente accettati come SOAP (Simple Object Access Protocol) e REST (Representational State Transfer). Questi servizi possono essere accessibili da qualsiasi dispositivo collegato alla rete, offrendo un alto livello di flessibilità e interoperabilità.

Quindi, le API forniscono le regole e le specifiche su come i programmi dovrebbero interagire, mentre i Web Services implementano queste API su internet, consentendo agli sviluppatori di creare applicazioni che possono facilmente comunicare e condividere dati e funzionalità su diverse piattaforme e dispositivi. Questa interconnessione ha portato a un'espansione senza precedenti delle possibilità di integrazione e innovazione nel campo software.

![API WEBSERVICE](/img/API1.png)

### REST

REST (Representational State Transfer) è un tipo di architettura software che definisce un insieme di regole e convenzioni per la creazione di servizi Web. L'approccio architetturale REST è definito dai dei vincoli applicati ad un'architettura, mentre lascia libera l'implementazione dei singoli componenti (NON è un protocollo):

* Architettura client-server: l’architettura REST è costituita da client, server e risorse scambiate tra loro. L'architettura si basa su HTTP. Il funzionamento prevede una struttura degli URL ben definita che identifica univocamente una risorsa o un insieme di risorse e l'utilizzo dei metodi HTTP specifici per il recupero di informazioni (GET), per la modifica (POST, PUT, PATCH, DELETE).
* Stateless: nessun contenuto client è archiviato nel server tra le richieste. Le informazioni relative allo stato della sessione sono invece contenute nel client.
* Interfaccia uniforme: è il vincolo principale per la progettazione di API RESTful e prevede 4 aspetti:
    * Identificazione delle risorse nelle richieste: le risorse vengono identificate nelle richieste e vengono distinte dalle rappresentazioni restituite al client.
    * Manipolazione delle risorse tramite le rappresentazioni: i client ricevono file che rappresentano le risorse e che devono contenere le informazioni necessarie per consentirne la modifica o l’eliminazione.
    * Messaggi autodescrittivi: ogni messaggio restituito a un client contiene le informazioni necessarie per descrivere come il client deve elaborare l’informazione.
    * Ipermedia come motore dello stato dell’applicazione: accedendo alla risorsa, il client REST deve poter individuare, attraverso hyperlink, tutte le altre azioni disponibili al momento.

Ecco la tabella che mostra come i metodi HTTP sono tipicamente usati in una API RESTful:

| URL                                        | GET                                                                                           | PUT                                                                                                      | POST                                                                                                         | DELETE                                                                 |
|--------------------------------------------|-----------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------|
| `http://api.example.com/resources/`        | Restituisce un elenco di risorse e altri dettagli delle collezioni.                           | Sostituisce l'intera collezione con un'altra.                                                            | Crea un nuovo elemento nella collezione. URI della nuova risorsa assegnato automaticamente (201 Created). | Elimina l'intera collezione.                                          |
| `http://api.example.com/resources/item17`  | Recupera rappresentazione di item17 della collezione in un formato di dato appropriato.       | Sostituisce l'elemento item17 nella collezione, o lo crea se non esiste.                                 | Generalmente non usato con PUT. Tratta l'elemento e crea un nuovo elemento all'interno della collezione.  | Elimina l'elemento item17 identificato nella collezione.               |


### ODATA
Il Protocollo Open Data o OData è un protocollo aperto che permette la creazione e il consumo di API RESTful interoperabili e interrogabili in maniera semplice e standard. Esso è il protocollo utilizzato da Business Central per creare API RESTful.

Caratteristiche:
* Interrogazioni Complesse: Consente ai client di costruire interrogazioni complesse su dati, usando un URL.
* Standardizzazione: Offre un approccio standardizzato per esporre, interrogare e manipolare dati attraverso API.
Supporto per JSON e Atom: Le risposte possono essere formattate in JSON o Atom, rendendo OData flessibile nell'uso.

Utilizzo:
* Accesso ai Dati: Ideale per situazioni in cui è necessario accedere a set di dati complessi e interrogarli efficacemente.
* Integrazione di Servizi: Utilizzato in scenari di integrazione dove diverse applicazioni hanno bisogno di comunicare e scambiare dati in modo efficiente.

Vantaggi:
* Interrogazioni Potenti: Permette agli utenti di specificare e filtrare esattamente i dati di cui hanno bisogno.
* Standardizzazione e Interoperabilità: Come standard, facilita l'interoperabilità tra diverse piattaforme e applicazioni.

Esempio:
```json
{
  "@odata.context": "http://services.odata.org/V4/OData/OData.svc/$metadata#Products",
  "value": [
    {
      "ID": 0,
      "Name": "Bread",
      "Description": "Whole grain bread",
      "ReleaseDate": "1992-01-01T00:00:00Z",
      "DiscontinuedDate": null,
      "Rating": 4,
      "Price": 2.5
    },
    {
      "ID": 1,
      "Name": "Milk",
      "Description": "Low fat milk",
      "ReleaseDate": "1995-10-01T00:00:00Z",
      "DiscontinuedDate": null,
      "Rating": 3,
      "Price": 3.5
    },
    ...
  ]
}
```
### Business Central
In Business Central le API sono di tipologia REST basate su protoccolo OData e sono molto semplici da realizzare.

## Prerequisiti

Installare [Postman](https://www.postman.com/downloads/?utm_source=postman-home): è un popolare strumento di sviluppo API utilizzato da sviluppatori per testare, sviluppare e documentare API. Offre una piattaforma user-friendly per inviare richieste HTTP, testare le risposte e visualizzare i risultati. Postman supporta vari tipi di richieste come GET, POST, PUT e DELETE, rendendolo ideale per lavorare con API RESTful.

### Abilitare Business Central
1. Open the Business Central Administration Shell with administrator privilege.
2. Esegui questi tre comandi: abilita gli Odata, abilita le API e attiva l'autenticazione NTLM.

```powershell
Set-NAVServerConfiguration -ServerInstance <BC_instance> -KeyName ODataServicesEnabled -KeyValue true
Set-NAVServerConfiguration -ServerInstance <BC_instance> -KeyName ApiServicesEnabled -KeyValue true
Set-NAVServerConfiguration -ServerInstance <BC_instance> -KeyName ServicesUseNTLMAuthentication -KeyValue true
```

3. Verifica il numero della tua porta ODataServicesPort tramite:

```powershell
Get-NAVServerConfiguration -ServerInstance <BC_instance>
```

## Primo Test

Testiamo l'API companies che è già pronta all'interno dell'ambiente Business Central, ridà come risposta la lista delle company attive su Business Central.

Bisogna lanciare una richiesta HTTP GET all'indirizzo:

```http://<host>:<port>/<serverinstance>/api/v2.0/companies```

Se la tua installazione è standard, molto probabilmente i dati mancanti sono:
* ```<host>``` = localhost
* ```<port>``` = 7048
* ```<serverinstance>``` = BC210 

e quindi la costruzione del ```<base URL>``` a cui farò riferimento da qui in avanti diventa: ```http://localhost:7048/BC210```

Possiamo farlo in due modi:
* Incollare l'indirizzo dentro un web browser (chrome, edge...)
* Testare il metodo su Postman

## Creare API Custom

Per creare una nuova API in Business Central, devi creare una Page e quindi impostare la proprietà PageType = API. Devi impostare anche le seguenti proprietà:
* **APIPublisher** - Il nome dell'azienda che ha creato le API. Questo valore viene utilizzato nell'URL per connettersi all'API e viene utilizzato per raggruppare tutte le API dello stesso publisher.
* **APIGroup** - Un gruppo utilizzato per raggruppare logicamente un insieme di API. Questo valore viene utilizzato anche nell'URL per connettersi all'API.
* **APIVersion** - La versione della tua API. Puoi creare più versioni della stessa API. Ogni versione è un oggetto separato, con il proprio numero di oggetto. Tuttavia, puoi supportare più versioni contemporaneamente. In questo modo, gli altri servizi che si basano sul tuo servizio API non devono essere modificati direttamente quando il tuo servizio aggiunge un nuovo campo o modifica la struttura dell'API. Il valore di questo campo piò essere: beta or v1.0, v1.1, v1.2, v2.0, and so on. 
* **EntityName** - Il valore singolo dell'entità restituita dall'API (Customer, Item, Car, Vendor, Artist, Movie, and so on).
* **EntitySetName** - Questo parametro è il valore plurale per l'entità restituita dall'API (Customers, Items, Cars, Vendors, Artists, Movies, and so on).
* **ODataKeyFields** - Questa proprietà indica quale campo verrà utilizzato come chiave. Quando richiedi un record specifico, puoi impostare questa proprietà per indicare quale campo utilizzerai per cercare quel particolare record. Microsoft crea un campo SystemId, che è disponibile su ogni tabella, anche sulle tue tabelle, senza la necessità di doverlo creare tu stesso. Il campo SystemId identificherà un record in modo univoco e non cambierà mai nel tempo, anche se aggiorni la chiave primaria. Ti consiglo di utilizzare il campo SystemId come ODataKeyFields.
* **DelayedInsert** - Questo valore deve essere sempre impostato su true per le pagine API. Questa impostazione garantisce che i valori vengano inseriti nel database solo quando viene effettuato il provisioning di tutti i valori dalla richiesta API.

L'esempio di codice seguente mostra la struttura di una pagina API personalizzata che utilizza la tabella Customer.

```al
page 50115 "My Custom Customer API"
{
    PageType = API;
    APIVersion = 'v1.0';
    APIPublisher = 'mycompany';
    APIGroup = 'sales';
    EntityName = 'mycustomer';
    EntitySetName = 'mycustomers';
    DelayedInsert = true;
    SourceTable = Customer;
    ODataKeyFields = SystemId;

    layout
    {
        area(Content)
        {
            repeater(GroupName)
            {
                field(id;SystemId)
                {
                    ApplicationArea = All;
                }
                field(name;Name)
                {
                    ApplicationArea = All;
                }
                field(email;"E-Mail")
                {
                    ApplicationArea = All;
                }
            }
        }
    }
}
```

### Costruzione degli URL
In business central OnPremise gli URL delle API sono costruiti nel seguente modo: 

```<base URL>/api/<API publisher>/<API group>/<API version>/<entitysetname>```

Nel caso specifico l'url quindi diventa: 

```<base URL>/api/mycompany/sales/v1.0/mycustomers```

Provare quindi a contattarlo per visuallizzare la risposta.

Nel caso in cui la richiesta restituisca un errore relativa alla company, bisogna inserire anche l'id della company a cui si vuole accedere, quindi l'url diventa:

```<base URL>/api/mycompany/sales/v1.0/companies(<company id>)/mycustomers```

## Basic Operations

| Method | Description                         | Example                           |
|--------|-------------------------------------|-----------------------------------|
| GET    | List collection                     | GET .../entitysetname             |
| GET    | Get member of the collection        | GET .../entitysetname({id})       |
| POST   | Create new entity in the collection | POST .../entitysetname/           |
| PATCH  | Update entity                       | PATCH .../entitysetname({id})     |
| DELETE | Delete entity                       | DELETE .../entitysetname({id})    |

## GET API
Per leggere i dati da una tabella, è necessario utilizzare il metodo GET. Il metodo GET può essere utilizzato per leggere un singolo record o un elenco di record:
* Elenco di record: ```.../<entitysetname>```
* Singolo record: ```.../<entitysetname>(<id>)```

![API2](/img/API2.png)

### Filtrare
Per filtrare i dati, è necessario utilizzare il parametro $filter. Il parametro $filter deve essere integrato nell'URL nel seguente modo: ```.../<entitysetname>?$filter=<filter>```

Il parametro $filter può essere utilizzato con i seguenti operatori:

| Operator | Description            | Example                          |
|----------|------------------------|----------------------------------|
| eq       | Equal                  | $filter=category eq 'Expense'    |
| ne       | Not equal              | $filter=unitPrice ne 0           |
| gt       | Greater than           | $filter=unitPrice gt 1000        |
| ge       | Greater than or equal  | $filter=unitPrice ge 1000        |
| lt       | Less than              | $filter=unitPrice lt 1000        |
| le       | Less than or equal     | $filter=unitPrice le 1000        |
| and         | Logical and                | $filter=number ge '50000' and number lt '60000'              |
| or          | Logical or                 | $filter=category eq 'Expense' or category eq 'Income'        |
| not         | Logical negation           | Not supported                                                |
| ()          | Precedence grouping        | $filter=(category eq 'Expense' or category eq 'Income') and (number ge '40000' and number lt '50000') |
| contains    | Search for substring       | $filter=contains(displayName, 'red')                         |
| endswith    | Test if first string ends with second string | $filter=endswith(email,'contoso.com')             |
| startswith  | Test if first string starts with second string | $filter=startswith(email,'aj')                   |
| concat      | Returns a string that appends the second parameter to the first | Not supported            |

## POST API
Per inserire un record in una tabella, è necessario utilizzare il metodo POST all'url ```.../<entitysetname>```. Il body della richiesta deve contenere i dati del record da inserire sotto forma di JSON. Restituirà un codice di stato 201 Created e il record inserito.

![API3](/img/API3.png)

## PATCH API
Per modificare un record in una tabella, è necessario utilizzare il metodo PATCH all'url ```.../<entitysetname>(<id>)```. Il body della richiesta deve contenere i dati del record da modificare sotto forma di JSON. Restituirà un codice di stato 200 OK e il record modificato. In aggiunta bisogna anche inserire l'header ```If-Match``` con il valore ```*```.

![API4](/img/API4.png)

## DELETE API
Per eliminare un record in una tabella, è necessario utilizzare il metodo DELETE all'url ```.../<entitysetname>(<id>)```. Restituirà un codice di stato 204 No Content.

![API4](/img/API5.png)

## Esercizio

Costruire un'API per la Squash application creata nelle precedenze lezioni. Creare una pagina "SquashPlayerAPI" con i seguenti campi: id, no, name, member. Provare a leggere, inserire, modificare ed eliminare i dati tramite postman.

## Connessione con Power Platform

1. Scaricare [On-premises Data Gateway](https://learn.microsoft.com/en-us/data-integration/gateway/service-gateway-install#download-and-install-a-standard-gateway) e installare seguendo i passaggi. 
Un gateway dati on-premises è un software che viene installato in una rete locale (on-premises) e ne agevola l'accesso ai dati presenti. Una delle sue applicazioni più significative è nell'ambito dell'integrazione tra sistemi locali e soluzioni basate su cloud. Nello specifico, questo gateway di Microsoft è utilizzato per collegare Business Central, installato su macchine locali, con Power Apps nel cloud. In questo modo, funge da ponte, permettendo alle applicazioni basate su cloud di interagire in modo sicuro e efficiente con i dati e le risorse aziendali gestiti localmente.

2. Seguire [questa](https://powerautomate.microsoft.com/it-it/blog/on-premise-apis/) guida dal punto 2: consente di creare un custom connector al nostro gateway. In seguito potrete utilizzare questo connettore nelle power apps.

## Lettura API esterne
[Microsoft Learn](https://learn.microsoft.com/it-it/training/modules/access-rest-services/)

## Link utili
- [Guida BC API](https://yzhums.com/6117/)
- [Reference for filtering](https://learn.microsoft.com/it-it/dynamics365/business-central/dev-itpro/developer/devenv-connect-apps-filtering)
- [Interfacciarsi con Microsoft Dynamics 365 Business Central](https://learn.microsoft.com/it-it/training/paths/interface-with-business-central/)
- [Enabling Apis](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/api-reference/v2.0/enabling-apis-for-dynamics-nav)

