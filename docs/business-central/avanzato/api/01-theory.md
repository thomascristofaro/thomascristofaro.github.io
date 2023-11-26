# Nozioni di base

## API

Le API (Application Programming Interfaces) sono set di definizioni e protocolli usati per costruire e integrare software applicativo. Agiscono come ponti di comunicazione tra diversi software, permettendo loro di interagire tra di loro senza la necessità di conoscere i dettagli interni l'uno dell'altro. Le API possono essere utilizzate per diversi scopi, come l'accesso a database, la comunicazione tra software su diverse piattaforme e molto altro.

## Web Services

I Web Services sono un tipo specifico di API che operano su reti internet. Essi permettono alle applicazioni di comunicare tra di loro attraverso la rete, utilizzando standard aperti e universalmente accettati come SOAP (Simple Object Access Protocol) e REST (Representational State Transfer). Questi servizi possono essere accessibili da qualsiasi dispositivo collegato alla rete, offrendo un alto livello di flessibilità e interoperabilità.

Quindi, le API forniscono le regole e le specifiche su come i programmi dovrebbero interagire, mentre i Web Services implementano queste API su internet, consentendo agli sviluppatori di creare applicazioni che possono facilmente comunicare e condividere dati e funzionalità su diverse piattaforme e dispositivi. Questa interconnessione ha portato a un'espansione senza precedenti delle possibilità di integrazione e innovazione nel campo software.

![API WEBSERVICE](/img/API1.png)

## REST

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

## JSON
JSON, che sta per JavaScript Object Notation, è un formato leggero per lo scambio di dati. È facile da leggere e scrivere per gli umani e semplice da analizzare e generare per i computer. JSON è basato su due strutture: 

una raccolta di coppie nome/valore (simile agli oggetti in JavaScript) 
```json
{
    "nome": "Mario Rossi",
    "eta": 30,
    "email": "mario.rossi@example.com",
    "isAttivo": true
}
```
e un elenco ordinato di valori (simile agli array in JavaScript) 
```json
{
    "elenco": ["Mario Rossi", "Luigi Verdi", "Giovanni Bianchi"]
}
```
Nelle API, JSON è ampiamente utilizzato per trasmettere dati tra un server e un client web, in quanto è molto più efficiente rispetto ad altri formati come XML. Quando si fa una richiesta a un'API web, il server risponde inviando dati in formato JSON, che possono essere facilmente interpretati e utilizzati dall'applicazione client. Questa efficienza e facilità d'uso hanno reso JSON il formato dominante per lo scambio di dati nelle applicazioni web moderne.

## ODATA
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
## Business Central
In Business Central le API sono di tipologia REST basate su protoccolo OData e sono molto semplici da realizzare. Come vedremo in [BC API](./bc-api) è possibile creare delle API personalizzate per esporre dati e funzionalità di BC. Queste API possono essere utilizzate per integrare BC con altre applicazioni o per creare nuove applicazioni che utilizzano i dati e le funzionalità di BC.

## Link utili
- [Guida BC API](https://yzhums.com/6117/)
- [Reference for filtering](https://learn.microsoft.com/it-it/dynamics365/business-central/dev-itpro/developer/devenv-connect-apps-filtering)
- [Interfacciarsi con Microsoft Dynamics 365 Business Central](https://learn.microsoft.com/it-it/training/paths/interface-with-business-central/)
- [Enabling Apis](https://learn.microsoft.com/en-us/dynamics365/business-central/dev-itpro/api-reference/v2.0/enabling-apis-for-dynamics-nav)

