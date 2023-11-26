
# BC API

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
