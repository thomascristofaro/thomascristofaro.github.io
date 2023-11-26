
# API Esterne

Le API esterne sono un modo per integrare Business Central con altri sistemi. Esse sono dei servizi esterni esposti tramite un endpoint HTTP richiamabile da un altro sistema, nel nostro caso da Business Central.

Per richiamare un'API esterna è necessario utilizzare delle tipologie di data type specifiche che permettono di gestire delle chiamate HTTP. L'AL supporta un insieme di classi HTTP per l'invio e la ricezione di dati dai servizi HTTP. Queste classi sono un'implementazione delle classi System.Net.Http del Framework .NET. Le classi disponibili sono:

* HttpClient
* HttpContent
* HttpHeaders
* HttpRequestMessage
* HttpResponseMessage

Tutti i tipi HTTP sono oggetti by reference, non by value. Questo significa che quando si passa un oggetto HTTP a un metodo, si passa un riferimento all'oggetto, non una copia dell'oggetto.

## Classi HTTP

### HttpClient
La classe HttpClient fornisce una base class per l'invio di richieste HTTP e la ricezione di risposte HTTP da una risorsa identificata da un URI. Metodi della classe:

| Metodo                      | Descrizione                                                                                               |
|-----------------------------|-----------------------------------------------------------------------------------------------------------|
| DefaultRequestHeaders()     | Ottiene le intestazioni predefinite che vengono inviate con ogni richiesta.            |
| SetBaseAddress(Uri)         | Imposta l'indirizzo di base dell'URI usato per le richieste.                                   |
| Get(Uri, HttpResponseMessage) | Invia una richiesta GET per ottenere la risorsa identificata dall'URI specificato.                    |
| Post(Uri, HttpContent, HttpResponseMessage) | Invia una richiesta POST all'URI specificato.                                                            |
| Put(Uri, HttpContent, HttpResponseMessage) | Invia una richiesta PUT all'URI specificato.                                                             |
| Delete(Uri, HttpResponseMessage) | Invia una richiesta DELETE all'URI specificato.                                                          |
| Send(HttpRequestMessage, HttpResponseMessage) | Invia una richiesta HTTP. Nella variabile HttpRequestMessage, si deve specificare l'URI e il verbo da usare. |
| Clear()                     | Imposta la variabile HttpClient sul valore predefinito.                                                   |
| Timeout()                   | Ottiene o imposta il tempo di attesa in secondi prima del timeout della richiesta. Il timeout è un valore intero. |

Quando si specifica un URI, è possibile usare due approcci. Il primo consiste nell'usare SetBaseAddress con la classe HttpClient per eseguire più richieste:

```al
var
    client: HttpClient;
    responseMessage: HttpResponseMessage;
begin 
    client.SetBaseAddress('https://jsonplaceholder.typicode.com/');
    client.Get('posts', responseMessage);
end;
```

Il secondo approccio è invece usato quando si richiedono i dati una sola volta. In tal caso, è possibile inserire l'URI completo nella funzione Get.

```al
var
    client: HttpClient;
    responseMessage: HttpResponseMessage;
begin 
    client.Get('https://jsonplaceholder.typicode.com/posts', responseMessage);
end;
```

### HttpHeaders
La classe HttpHeaders contiene una raccolta di intestazioni e i relativi valori. Le intestazioni HttpHeaders vengono inviate con ogni richiesta e risposta. Sono usate per inviare informazioni supplementari sulla richiesta o sul modo in cui la risposta deve essere formattata per il client.

È possibile ottenere intestazioni HttpHeaders usando la proprietà DefaultRequestHeaders della classe HttpClient.

```al
var
    client: HttpClient;
    headers: HttpHeaders;    
    content: HttpContent;
    responseMessage: HttpResponseMessage;
begin 
    headers := client.DefaultRequestHeaders();
    headers.Add('Content-Type','application-json');
    client.Post('https://jsonplaceholder.typicode.com/posts', content, 
                responseMessage);
end;
```

Metodi della classe:

| Metodo              | Descrizione                                                                                           |
|---------------------|-------------------------------------------------------------------------------------------------------|
| Add(Key, Value)     | Imposta il valore specificato per il nome di intestazione fornito.                                    |
| Clear()             | Imposta la variabile HttpHeaders sul valore predefinito.                                              |
| Contains(Key)       | Verifica se una variabile HttpHeaders contiene una proprietà con la chiave specificata.               |
| GetValues(Key, Array of Text) | Ottiene i valori per la chiave specificata. I valori vengono restituiti nella matrice di testo.   |
| Remove(Key)         | Rimuove la chiave e i valori correlati dall'oggetto HttpHeaders.                                      |

### HttpResponseMessage
La classe HttpResponseMessage rappresenta un messaggio di risposta HTTP. Un messaggio di risposta è il risultato di un'azione HTTP (Get, Post, Put, Delete). La classe HttpResponseMessage contiene informazioni sulla risposta, come ad esempio lo stato della risposta, il contenuto e le intestazioni.

```al
var
    client: HttpClient;
    responseMessage: HttpResponseMessage;
begin 
    client.Get('https://jsonplaceholder.typicode.com/posts', responseMessage);
end;
```

Metodi della classe:

| Metodo                | Descrizione                                                                                                                    |
|-----------------------|--------------------------------------------------------------------------------------------------------------------------------|
| Content()             | Ottiene il contenuto (HttpContent) della risposta HTTP.                                                                        |
| Headers()             | Ottiene le intestazioni HTTP della richiesta HTTP.                                                                             |
| HttpStatusCode()      | Ottiene il codice di stato della risposta HTTP.                                                                                |
| IsSuccessStatusCode() | Ottiene un valore che indica se la risposta HTTP ha avuto esito positivo.                                                      |
| ReasonPhrase()        | Ottiene il motivo del codice di stato. |

### HttpRequestMessage
La classe HttpRequestMessage rappresenta un messaggio di richiesta HTTP, è la classe usata per inviare una richiesta.

```al
var
    client: HttpClient;
    requestMessage: HttpRequestMessage;
    responseMessage: HttpResponseMessage;
begin 
    requestMessage.Method('GET');
    requestMessage.SetRequestUri('https://jsonplaceholder.typicode.com/posts');
    client.Send(requestMessage, responseMessage);
end;
```

Metodi della classe:

| Metodo              | Descrizione                                                           |
|---------------------|-----------------------------------------------------------------------|
| Content()           | Ottiene/imposta il contenuto della richiesta HTTP.                    |
| GetRequestUri()     | Ottiene l'URI usato per la richiesta HTTP.                            |
| Method()            | Ottiene o imposta il tipo di metodo. Specificare un verbo HTTP usato. |
| SetRequestUri(RequestUri) | Imposta l'URI usato per la richiesta HTTP.                         |

### HttpContent
La classe HttpContent rappresenta un body HTTP e gli headers del contenuto. È usata come corpo per inviare o ricevere informazioni. È possibile usare la proprietà Content nelle classe HttpRequestMessage (con una richiesta) o nella classe HttpResponseMessage (con una risposta). Metodi della classe:

| Metodo              | Descrizione                                                                                                  |
|---------------------|--------------------------------------------------------------------------------------------------------------|
| Clear()             | Imposta l'oggetto HttpContent su un valore predefinito.                                                       |
| GetHeaders(HttpHeaders) | Ottiene le intestazioni HTTP del contenuto. Il risultato viene restituito nel parametro HttpHeaders.        |
| ReadAs(Result)      | Legge il contenuto nel testo o nel flusso fornito. Il risultato può essere di tipo Text o InStream.           |
| WriteFrom(Value)    | Imposta la variabile HttpContent sul testo o flusso fornito.                                                  |

## Esercizio 1
Creare un pulsante nella pagina degli squash players che, quando premuto, richiama un servizio esterno e visualizza i dati recuperati dal messaggio di risposta tramite un dialog di Message alla fine del processo. Il servizio da contattare è https://jsonplaceholder.typicode.com e bisogna recuperare i dati relativi agli [utenti](https://jsonplaceholder.typicode.com/users). Potete provare anche a fare una richiesta POST per creare un nuovo utente a partire da uno squash player. Ma questo non verrà veramente creato, in quanto il servizio è solo di test.

## JSON
AL in Business Central ha il supporto integrato per usare dati JSON. Queste classi vengono usate per il trasferimento dei dati e non come campi di una tabella. Queste classi sono un'implementazione delle classi System.Json di .NET Framework:
* JsonToken
* JsonArray
* JsonObject
* JsonValue
Tutti i tipi JSON sono tipi di riferimento, non tipi di valore.

### JsonToken
L'oggetto JsonToken è un contenitore per tutti i dati JSON. Il valore predefinito di un JsonToken è NULL. JsonToken è la classe base per i tipi di dati JsonArray, JsonValue e JsonObject. Esempio di utilizz:
    
```al
{
   "company": {
      "employees": [
           { "id": "Marcy", "salary": 8.95 },
           { "id": "John", "salary": 7 },
           { "id": "Diana", "salary": 10.95 }
      ] }
} 

procedure GetSalary(CompanyData: JsonToken; Employee: Text) Salary: Decimal;
var
    JPathExpr: Text;
    SalaryToken: JsonToken;
begin
    JPathExpr := '$.company.employees[?(@.id==''' + Employee + ''')].salary';
    CompanyData.SelectToken(JPathExpr, salaryToken);

    Salary := SalaryToken.AsValue().AsDecimal();
end;
```

Metodi della classe:

| Metodo                        | Descrizione                                                                                           |
|-------------------------------|-------------------------------------------------------------------------------------------------------|
| ReadFrom(Text/InStream)      | Legge i dati JSON dal testo o dal flusso e li memorizza in una variabile JsonToken.                |
| WriteTo(Text/OutStream)      | Serializza e scrive i dati JSON dalla variabile JsonToken in un testo o flusso specifico.           |
| SelectToken(JPath, JsonToken) | Seleziona una variabile JsonToken utilizzando un'espressione JPath.                                   |
| IsArray                       | Indica se un JsonToken rappresenta un array JSON.                                                     |
| IsValue                       | Indica se un JsonToken rappresenta un valore JSON.                                                    |
| IsObject                      | Indica se un JsonToken rappresenta un oggetto JSON.                                                   |
| AsArray                       | Converte il valore contenuto in un JsonToken in un tipo di dati JsonArray.                            |
| AsValue                       | Converte il valore contenuto in un JsonToken in un tipo di dati JsonValue.                            |
| AsObject                      | Converte il valore contenuto in un JsonToken in un tipo di dati JsonObject.                           |

### JsonArray
JsonArray è un contenitore per qualsiasi array JSON. Un JsonArray predefinito contiene un array JSON vuoto. Questo contenitore funziona più come un tipo di dati ListOf che come un array. Contiene quindi molti metodi simili ad una lista:

| Metodo              | Descrizione                                                                                               |
|---------------------|-----------------------------------------------------------------------------------------------------------|
| Add(Value)          | Aggiunge un nuovo valore alla fine del JsonArray. Questo valore può essere di tipo JsonToken, JsonObject, JsonArray, Boolean, Char, Byte, Integer, BigInteger, Decimal, Duration, String, Date, Time o DateTime.  |
| Get(Index, JsonToken) | Recupera il valore corrispondente all'indice specificato nel JsonArray.                                        |
| IndexOf(Value)      | Restituisce la posizione dell'indice di un valore specificato.                                               |
| Insert(Index, Value)| Inserisce il valore nella posizione specificata nell'array, spostando tutti i valori a destra di una posizione.|
| RemoveAt(Index)     | Rimuove il token corrispondente all'indice specificato.                                                       |
| Set(Index, Value)   | Sostituisce il valore alla posizione specificata con un nuovo valore.                                         |
| RemoveAll()         | Rimuove tutti gli elementi figlio dall'array specificato.                                                      |
| Count               | Ottiene il numero di elementi nel JsonArray.                                                                 |

### JsonObject
JsonObject è un contenitore per tutti gli oggetti JSON. Un JsonObject predefinito contiene un oggetto JSON vuoto. Metodi specifici per gli oggetti JSON:

| Metodo             | Descrizione                                                                                              |
|--------------------|----------------------------------------------------------------------------------------------------------|
| Add(Value)         | Aggiunge una nuova proprietà a un JsonObject.                                                           |
| Contains(Key)      | Verifica se un JsonObject contiene una proprietà con una determinata chiave.                             |
| Get(Key, Value)    | Recupera il valore di una proprietà con una determinata chiave da un JsonObject.                         |
| Remove(Key)        | Rimuove la proprietà con la chiave specificata dall'oggetto.                                             |
| Replace(Key, Value)| Sostituisce il valore della proprietà con la chiave specificata con il nuovo valore.                      |
| RemoveAll()        | Rimuove tutte le proprietà dall'oggetto specificato.                                                      |

### JsonValue
JsonValue è un contenitore per tutti i valori JSON fondamentali. Un JsonValue predefinito è impostato sul valore JSON di NULL. Metodi specifici per i valori JSON:

| Metodo               | Descrizione                                                                                         |
|----------------------|-----------------------------------------------------------------------------------------------------|
| IsNull()             | Indica se JsonValue contiene il valore JSON di NULL.                                              |
| Metodi As            | Converte il valore di un JsonValue in un tipo di dati specifico. I metodi includono AsBoolean(), AsByte(), AsChar(), AsInteger(), AsDecimal(), AsCode(), AsText(), AsDate() e AsDateTime(). |
| SetValue(Value)      | Imposta i contenuti della variabile JsonValue sulla rappresentazione JSON del valore specificato. |
| SetValueToNull()     | Imposta i contenuti della variabile JsonValue sulla rappresentazione JSON di NULL.              |

## Esercizio 2
Partendo dall'esercizio 1, leggere il JSON di ritorno della risorsa e inserirla in un record della tabella squash player. Per fare ciò è necessario andare a convertire il testo di risposta in un oggetto JSON, andare a leggere i dati tramite le funzioni che abbiamo visto nella sezione JSON e quindi inserirli nel record.
















[Microsoft Learn](https://learn.microsoft.com/it-it/training/modules/access-rest-services/)
