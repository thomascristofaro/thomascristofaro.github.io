
# Project Design

Per il successo di un progetto è fondamentale la definizione di **fasi e metodologie** che guidino il percorso dall'ideazione all'implementazione. La combinazione di fasi ben definite e di una metodologia strategica può influenzare in modo significativo l'esito di progetti complessi, per questo Microsoft ha definito il modello **"Success by Design"**, un modello usato per guidare i progetti sulla sua piattaforma.

## Metodologia del progetto

Per dare una struttura ai progetti, i team adottano una metodologia di implementazione. Indipendentemente dalla metodologia, tutte condividono alcuni benefici:

* **Ripetibilità** - Consente ad un approccio di essere ripetibile nei vari progetti.
* **Documentazione standardizzata** - Tipicamente, vengono utilizzati documenti standard per dettagliare il lavoro di progetto da consegnare.
* **Gestione/pianificazione del progetto** - Di solito include un modo per pianificare e monitorare il progresso verso la distribuzione. La metodologia influenza anche comunemente il modo di suddividere un grande progetto in rilasci o iterazioni più piccole e gestibili.
* **Controllo dei cambiamenti/governance** - Essenziale per mantenere sotto controllo l'ambito del progetto gestendo i cambiamenti che sono essenziali per il progetto stesso.

è possibile implementare i progetti Microsoft utilizzando tre approcci:

* **Approccio a cascata**: quando tutto l'ambito, la pianificazione e i dettagli vengono decisi prima dell'inizio dello sviluppo. Un vantaggio dell'utilizzo dell'approccio a cascata è il budget prestabilito del progetto. Uno svantaggio è l'impossibilità di apportare correzioni in corso d'opera o di sfruttare le nuove versioni del prodotto principale Dynamics 365.
* **Approccio agile**: quando il quadro generale e gli obiettivi vengono decisi all'inizio, quindi i rilasci del progetto procedono con un approccio iterativo. Un tipo popolare di metodologia agile è chiamato Scrum. I vantaggi di un approccio agile includono la possibilità di mostrare regolarmente i risultati attraverso distribuzioni più piccole e sfruttare rapidamente nuove informazioni e nuove versioni di funzionalità. Gli svantaggi includono le incognite dei costi e il potenziale superamento del budget.
* **Approccio ibrido**: la maggior parte dei clienti preferisce ottenere un ritorno sugli investimenti il più rapidamente possibile, quindi un approccio agile o ibrido soddisfa meglio tale esigenza. Molte soluzioni incentrate sulla pianificazione delle risorse aziendali (ERP) richiedono molto tempo nella fase di pianificazione di un progetto e sono simili alla metodologia a cascata, anche se l'implementazione viene eseguita in modo iterativo.

## Fasi del progetto

Le metodologie dividono un progetto in fasi più piccole (anche dette sprint o iterazioni), questo consente di tenere traccia dei progressi più facilmente.
La durata di un progetto varia notevolmente. Alcuni progetti passano dalla fase ideativa alla fase operativa in pochi mesi, mentre altri richiedono almeno un anno di analisi prima che il lavoro possa iniziare.

Di solito un progetto segue un percorso lineare: **prevendita, avvio, implementazione, distribuzione ed esecuzione**. Le fasi del progetto hanno alti e bassi man mano che il progetto avanza. Se il progetto utilizza una metodologia agile, è possibile ripetere le fasi lungo il percorso. 

![process](/img/bc-process-project.png)

### Prevendita

L'attività principale della fase di prevendita è quella di supportare il team delle vendite nella chiusura del contratto. L'attenzione è rivolta all'effort minimo richiesto per ottenere il progetto, garantendo al contempo che il team delle vendite non prometta più di quanto si possa effettivamente consegnare. In linea generale, le attività durante questa fase sono suddivise come segue:

* Risposte alle Request for proposal (RFP) (cliente che chiede un'offerta)
* Riunioni di introduzione con i clienti
* Proof of concepts/demos
* Ideazione della soluzione

### Avvio

In questa fase è il Solution Architect ad assumere la guida.

* **Workshop presso i clienti**: discussioni in cui si acquisiscono requisiti con gli utenti aziendali coinvolti nel delicato processo di analisi delle esigenze.
* **Convalida e chiarimenti dei requisiti**: analizzare in dettaglio i requisiti individuati, compresi quelli riportati come esperienze dirette degli utenti. L'obiettivo è garantire che i requisiti siano implementabili, chiari e ben definiti. Potrebbe richiedere ulteriori follow-up con il cliente o il team.
* **Architettura di alto livello**: il Solution Architect progetta la topologia complessiva della soluzione. Questa valutazione include un'ampia panoramica delle interazioni con i sistemi e i servizi interni ed esterni.
* **Revisione dei progetti tecnici**: quando la fase di progettazione inizia a delineare un'architettura più dettagliata, il Solution Architect assumerà il ruolo di revisore per garantire che la progettazione sia conforme all'architettura prevista.
* **Gestione delle modifiche**: la gestione delle modifiche è un elemento chiave per garantire che le soluzioni, che i clienti intendono adottare, siano puntuali e conformi al budget.

### Implementazione

Nella fase di implementazione il team di progetto si concentra sulla **creazione della soluzione** in base alla progettazione concordata. Vengono introdotte le **revisioni dell'implementazione**, esse consentono al team di affrontare i problemi relativi ad aspetti della progettazione (modello di dati, sicurezza, integrazione) e le procedure di implementazione (Application Lifecycle Management e strategia di test). 

Durante la fase di implementazione, è possibile prevedere problemi relativi alla progettazione di componenti specifici, scelte tecnologiche, modifiche imminenti, roadmap, deprecazioni, Application Lifecycle Management (ALM) e build. Assicurarsi di lavorare in modo **proattivo** con i clienti per garantire che la soluzione sviluppata sia **conforme** alle procedure consigliate e sia strategicamente allineata alla roadmap del prodotto.

### Distribuzione

Durante la fase di distribuzione:

* La **soluzione è stata creata** e testata
* Il team di progetto si prepara per il ciclo finale di test di accettazione utente 
* Iniziano i **training** agli utenti. 
* Sono state concesse tutte le approvazioni del cliente 
* Sono state completate le **revisioni** della sicurezza delle informazioni 
* è stato definito il piano di cutover (compresi i criteri go/no-go) 
* Il servizio di supporto è pronto
* il runbook di distribuzione è completato con attività, proprietari, durate e dipendenze definite.

### Esecuzione

Dopo aver pianificato, sviluppato e distribuito l'applicazione, le attività non sono ancora completate. L'obiettivo della fase di esecuzione è 

* **Convalidare** il successo della distribuzione
* **Rivedere** le lezioni apprese dal progetto
* **Pianificare** la transizione alla fase successiva
* Fornire **supporto** per la transizione al team di manutenzione. 

Dopo che il cliente è live, il Solution Architect deve eseguire una revisione post go-live, discutere il piano di transizione e condividerlo con il team di manutenzione.

## Success by Design

Success by Design è la guida (con approcci e procedure consigliate) per la progettazione, la creazione e l'implementazione di una soluzione Dynamics 365. Si basa sull'esperienza Microsoft acquisita nel corso degli anni. Stabilisce una serie di punti di controllo al fine di agevolare il progresso dei progetti verso il successo. La guida non mira a valutare individualmente i partner o i clienti, ma è concepita per unirli in un unico team con l'obiettivo di guidare il proprio progetto verso un processo di integrazione di successo per gli utenti.

Success by Design è un approccio che consente agli architetti delle soluzioni di lavorare attraverso **workshop** strategici che seguono le fasi chiave del progetto. Questi workshop hanno **obiettivi chiari e misurabili** e consentono di valutare l'aderenza alle best practice, identificando potenziali problemi. Inoltre, questa metodologia promuove il **coinvolgimento proattivo** dei clienti, garantendo che la soluzione soddisfi le esigenze attuali e future.

Success by Design rappresenta l'esperienza di migliaia di implementazioni cloud, migliorando l'adozione del sistema, fornendo indicazioni tempestive e garantendo che la soluzione sia scalabile e allineata agli obiettivi aziendali. In breve, si propone di rendere il **passaggio al cloud più efficiente e di successo**.

### Fasi di Success by Design

Success by Design è stato creato in modo che un Solution Architect possa interagire con i clienti indipendentemente dalla loro metodologia di consegna. Nei progetti agili, le fasi e i workshop verranno probabilmente ripetuti in qualche misura durante la durata del progetto. Questa guida mappa il ciclo di vita dell'implementazione in quattro fasi:

![Success by Design Phases](/img/bc-design-phases.png)

### Workshop

Success by Design comprende diversi workshop di progetto. Questi workshop sono una combinazione di riunioni interattive, discussioni tecniche, comunicazioni e attività di completamento. Gli argomenti del workshop sono:

* **Solution blueprint**: La revisione iniziale del progetto, il team può rivedere il piano generale della soluzione e offrire suggerimenti e correzioni di rotta fin dalle prime fasi.
* **Test strategy**: Una strategia di test efficace offrirà una visione più ampia delle soluzioni proposte. I test verranno effettuati in diverse fasi dello sviluppo, ma la strategia deve essere definita in anticipo.
* **Data model**: Il modello dei dati di solito riflette l'ambito funzionale del progetto e rivela la sua potenziale complessità
* **BI and analytics design**: garantisce che nella progettazione della soluzione di BI vengano usate le strategie e le tecnologie appropriate
* **Gap solution design**
* **Data migration**: Il workshop fornisce le procedure consigliate per evitare problemi di prestazioni nella migrazione dei dati e sviluppare consapevolezza su un throughput realistico.
* **Security**: per aiutare a comprendere le esigenze particolari dei requisiti di sicurezza dell'organizzazione e rivedere la granularità del controllo di accesso.
* **Integration design**: fornisce gli elementi utili nella progettazione delle integrazione con i prodotti Microsoft o esterni
* **Solution performance**: fornisce una conoscenza più approfondita sull'impatto di alcuni tipi di configurazione e/o personalizzazione sulle prestazioni complessive e sull'esperienza dell'utente.
* **Cutover strategy**: Un piano di migrazione è una strategia dettagliata che fornisce un piano per effettuare una transizione ben definita, ben testata, affidabile e sicura dai sistemi attuali ai nuovi sistemi di produzione.
* **Post go-live strategy**: Rivedere gli obiettivi del progetto e le lezioni apprese, fornire informazioni sulle fasi successive di implementazione e rivedere i piani di supporto

I workshop non sono in un ordine prestabilito; è possibile tornare su un argomento più di una volta durante un determinato progetto. Si possono trovare sovrapposizioni negli argomenti e una consapevolezza generale degli altri aspetti è una parte essenziale del successo. 

### Motivi per usare Success by Design

Success by Design è stato realizzato per conseguire **cinque obiettivi** chiave nei progetti Dynamics 365, come illustrato nel seguente diagramma:

![Success by Design Reasons](/img/bc-design-reasons.png#center)

* **Allineamento strategico della direzione del prodotto**: I Solution Architect giocano un ruolo cruciale nell'assicurare che i team dei clienti e dei partner seguano la direzione evolutiva di Dynamics 365, garantendo l'efficienza e l'allineamento con la strategia dei prodotti Microsoft attraverso i workshop.
* **Innovation evangelism**: Success by Design offre l'opportunità di influenzare il progetto attraverso raccomandazioni mirate per ottenere un vantaggio competitivo adottando le ultime innovazioni, come funzionalità multitenant e l'uso di IA.
* **Best practices and knowledge sharing**: nel tempo, le singole raccomandazioni di Success by Design sono state consolidate in best practices, sotto forma di risorse condivisibili con coloro che seguono questa guida.
* **Execution excellence**: Success by Design fornisce la struttura necessaria per promuovere una maggiore uniformità nell'approccio all'interazione con i clienti e nella misurazione e comunicazione del successo.
* **Escalation management**: Success by Design dovrebbe contribuire a ridurre al minimo le situazioni di escalation legate all'implementazione attraverso workshop proattivi e checkpoint di revisione.


## Requisiti

La qualità dei requisiti è essenziale per un progetto. I vantaggi principali sono:

* **Chiara descrizione** delle azioni da eseguire per consentire a un consulente di implementare la soluzione.
* **Identificazione delle eccezioni** e relativa modalità di gestione per garantire che gli scenari primari e secondari vengano affrontati.
* **Criteri di accettazione** per aiutare a chiarire quando il requisito è soddisfatto.
* Requisiti ben definiti, che **aiutano a ridurre gli scostamenti** rispetto all'ambito del progetto.

A progetti diversi sono associati livelli di **formalità differenti**: i progetti di dimensioni minori potrebbero usare specifiche informali, mentre per un progetto più ampio solitamente si hanno requisiti più formali, ben definiti e documentati, rivisti e con priorità di rilascio.

I team di progetto utilizzano diverse tecniche per gestire i requisiti, sfruttano **strumenti** come le issue di GitHub o i ticket di Redmine. Solitamente, i requisiti vengono organizzati in un **backlog**, una lista di idee in attesa di implementazione, prima di essere prioritizzati e messi in atto durante uno **sprint** o un'iterazione del progetto. Questi rappresentano un periodo di tempo o un insieme di attività definito che il team di progetto raggruppa per implementarle nella soluzione.

Nel corso della pianificazione dello sprint, le squadre possono stimare lo sforzo richiesto per gli elementi del backlog utilizzando diversi approcci, come l'assegnazione di ore o la definizione di dimensioni relative (piccolo, medio, grande). I requisiti dovrebbero essere realizzabili e non troppo ampi per essere completati in un singolo sprint. Requisiti di dimensioni maggiori, denominati "epic", possono essere suddivisi in parti più piccole.

I requisiti sono comunemente suddivisi in **due categorie**. Una descrizione completa di una nuova soluzione dovrebbe includere entrambi i tipi di requisiti:

* **Requisiti funzionali**: Descrivono il comportamento del sistema. I requisiti funzionali devono definire il chi, il che cosa e il perché del requisito. La maggior parte dei requisiti funzionali proviene dagli utenti della soluzione finalizzata. Es: Gli utenti dell'amministrazione devono essere in grado di filtrare gli ordini di vendita che sono già stati interamente fatturati.

* **Requisiti non funzionali**: Coprono aspetti tecnici. La maggior parte dei requisiti non funzionali proviene dal reparto IT o di conformità a livello aziendale e non dagli utenti finali. Questi tipi di requisiti riguardano di solito argomenti come le prestazioni, la capacità, la privacy, la sicurezza e la conformità. Es: Il sistema deve gestire 2500 segnalazioni simultanee di problemi in entrata dei clienti durante le interruzioni

## Link utili
- [Concetti fondamentali sui progetti Dynamics 365](https://learn.microsoft.com/it-it/training/paths/learn-fundamentals-dynamics-365-projects/)
- [Progettazione di soluzioni Dynamics 365](https://learn.microsoft.com/it-it/training/paths/design-dynamics-365-solutions/)
- [Uso delle soluzioni Success by Design for Dynamics 365](https://learn.microsoft.com/it-it/training/paths/use-success-design/)
