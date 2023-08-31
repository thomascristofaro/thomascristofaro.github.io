
# Project Design

Fondamentale per il successo di qualsiasi iniziativa è la definizione di fasi e metodologie che guidino il percorso dall'ideazione all'implementazione, dalla pianificazione all'esecuzione. La combinazione di fasi ben definite e di una metodologia strategica può influenzare in modo significativo l'esito di progetti complessi, per questo Microsoft ha definito il modello "Success by Design", un modello usato per guidare i progetti sulla sua piattaforma.

## Metodologia del progetto

Per dare una struttura ai progetti, in genere i team adottano una metodologia di implementazione che favorisca la buona riuscita di un progetto. Indipendentemente dalla metodologia, tutte condividono alcuni benefici comuni:

* **Ripetibilità** - Consente a un approccio di successo di diventare ripetibile attraverso vari progetti.
* **Documentazione standardizzata** - Tipicamente, vengono utilizzati documenti standard per dettagliare il lavoro di progetto da consegnare.
* **Gestione/pianificazione del progetto** - Di solito include un modo per pianificare e monitorare il progresso verso una distribuzione di successo. La metodologia influenza anche comunemente il modo di suddividere un grande progetto in rilasci o iterazioni più piccoli e gestibili.
* **Controllo dei cambiamenti/governance** - Essenziale per mantenere sotto controllo l'ambito del progetto gestendo i cambiamenti che sono essenziali per il progetto stesso.

In genere, è possibile implementare i progetti Dynamics 365 utilizzando un approccio a cascata, un approccio agile o un approccio ibrido:

* **Approccio a cascata**: quando tutto l'ambito, la pianificazione e i dettagli vengono decisi prima dell'inizio dello sviluppo. Un vantaggio dell'utilizzo dell'approccio a cascata è il budget prestabilito del progetto. Uno svantaggio è l'impossibilità di apportare correzioni in corso d'opera o di sfruttare le nuove versioni del prodotto principale Dynamics 365.
* **Approccio agile**: quando il quadro generale e gli obiettivi vengono decisi all'inizio, quindi i rilasci del progetto procedono con un approccio iterativo. Un tipo popolare di metodologia agile è chiamato Scrum. I vantaggi di un approccio agile includono la possibilità di mostrare regolarmente i risultati attraverso distribuzioni più piccole e sfruttare rapidamente nuove informazioni e nuove versioni di funzionalità. Gli svantaggi includono le incognite dei costi e il potenziale superamento del budget.
* **Approccio ibrido**: la maggior parte dei clienti preferisce ottenere un ritorno sugli investimenti il più rapidamente possibile, quindi un approccio agile o ibrido soddisfa meglio tale esigenza. Molte soluzioni incentrate sulla pianificazione delle risorse aziendali (ERP) richiedono molto più tempo nella fase di pianificazione di un progetto e sono simili alla metodologia a cascata, anche se l'implementazione viene eseguita in modo iterativo. Molti progetti incentrati su Customer Relationship Management (CRM) adottano un approccio iterativo e mostrano rilasci velocemente.

## Fasi del progetto

Le metodologie di implementazione separano un progetto generale in fasi più piccole (anche dette sprint o iterazioni), il che consente di tenere traccia dei progressi più facilmente.
La durata del tempo dedicato a ciascuna fase e a ciascun progetto varia notevolmente. Alcuni progetti passano dalla fase ideativa alla fase operativa in pochi mesi, mentre altri richiedono almeno un anno di analisi prima che il lavoro possa iniziare.

Di solito un progetto segue un percorso lineare: prevendita, avvio, implementazione, distribuzione ed esecuzione. Le fasi del progetto hanno alti e bassi man mano che il progetto avanza. Se il progetto utilizza una metodologia agile, è possibile ripetere le fasi lungo il percorso. 

![process](/img/bc-process-project.png)

### Prevendita

L'attività principale della fase di prevendita è quella di supportare il team delle vendite nella chiusura del contratto di progetto. L'attenzione è rivolta all'effort minimo richiesto per ottenere il progetto, garantendo al contempo che il team delle vendite non prometta più di quanto si possa effettivamente consegnare. In linea generale, le attività durante questa fase sono suddivise come segue:

* Risposte alle Request for proposal (RFP) (cliente che chiede un'offerta)
* Riunioni di introduzione con i clienti
* Proof of concepts/demos
* Ideazione della soluzione

### Avvio

In questa fase è il Solution Architect ad assumere la guida.

* **Workshop presso i clienti**: discussioni in cui si acquisiscono requisiti con gli utenti aziendali coinvolti nel delicato processo di analisi delle esigenze.
* **Convalida e chiarimenti dei requisiti**: analizzare in dettaglio i requisiti individuati, compresi quelli riportati come esperienze dirette degli utenti. L'obiettivo è garantire che i requisiti siano implementabili, chiari e ben definiti. Potrebbe richiedere ulteriori follow-up con il cliente o il team. [metti link ai requisiti]
* **Architettura di alto livello**: il Solution Architect progetta la topologia complessiva della soluzione. Questa valutazione include un'ampia panoramica delle interazioni con i sistemi e i servizi interni ed esterni.
* **Revisione dei progetti tecnici**: quando la fase di progettazione inizia a delineare un'architettura più dettagliata, il Solution Architect assumerà il ruolo di revisore per garantire che la progettazione sia conforme all'architettura prevista.
* **Gestione delle modifiche**: la gestione delle modifiche è un elemento chiave per garantire che le soluzioni che i clienti intendono adottare siano puntuali e conformi al budget.

### Implementazione

Nella fase di implementazione il team di progetto si concentra sulla **creazione della soluzione** in base alla progettazione e all'ambito della soluzione concordati. Vengono introdotte le **revisioni dell'implementazione**, esse consentono al team di affrontare i problemi relativi ad aspetti specifici della progettazione della soluzione (modello di dati, sicurezza, integrazione) e le procedure di implementazione (Application Lifecycle Management e strategia di test). 

Durante la fase di implementazione, è possibile prevedere problemi relativi alla progettazione di componenti specifici, scelte tecnologiche, modifiche imminenti, roadmap, deprecazioni, Application Lifecycle Management (ALM) e build. Assicurarsi di lavorare in modo **proattivo** con i clienti per garantire che la soluzione sviluppata sia **conforme** alle procedure consigliate e sia strategicamente allineata alla roadmap del prodotto.

### Distribuzione

Durante la fase di distribuzione:

* La **soluzione è stata creata** e testata
* Il team di progetto si prepara per il ciclo finale di test di accettazione utente 
* Iniziano i **training** agli utenti. 
* Sono state concesse tutte le approvazioni del cliente 
* Sono state completate le **revisioni** della sicurezza delle informazioni 
* è stato definito il piano di cutover (compresi i criteri go/no-go) 
* Il modello di supporto è pronto
* il runbook di distribuzione è completato con attività, proprietari, durate e dipendenze definite.

### Esecuzione

Dopo aver pianificato, sviluppato e distribuito l'applicazione, le attività non sono ancora completate. L'obiettivo della fase di esecuzione è 

* Convalidare il successo della distribuzione
* Rivedere le lezioni apprese dal progetto
* Pianificare la transizione alla fase successiva
* Fornire supporto per la transizione al team di manutenzione. 

Dopo che il cliente è live, il Solution Architect deve eseguire una revisione post go-live, discutere il piano di transizione e condividerlo con il team di manutenzione.

## Success by Design
Riassunto di https://learn.microsoft.com/it-it/training/modules/success-by-design/


## Requisiti

- [Valutazione dei requisiti per i progetti Dynamics 365](https://learn.microsoft.com/it-it/training/modules/evaluate-requirements-dynamics-365-projects/) - requisiti
- [Mapping dei processi aziendali per Dynamics 365](https://learn.microsoft.com/it-it/training/modules/business-process-mapping-dynamics-365/) - processi aziendali
- [Come lavorare con i requisiti per Microsoft Power Platform e Dynamics 365](https://learn.microsoft.com/it-it/training/modules/work-with-requirements/)    



## Link utili
- [Concetti fondamentali sui progetti Dynamics 365](https://learn.microsoft.com/it-it/training/paths/learn-fundamentals-dynamics-365-projects/)
    - [Definizione dell'approccio di implementazione per il progetto Dynamics 365](https://learn.microsoft.com/it-it/training/modules/determine-implementation-approach-dynamics-365/) - Fasi di un progetto
    - [Come conoscere il team di progetto per le implementazioni di Dynamics 365](https://learn.microsoft.com/it-it/training/modules/project-team-dynamics-365-implementation/) - team di un progetto
- [Progettazione di soluzioni Dynamics 365](https://learn.microsoft.com/it-it/training/paths/design-dynamics-365-solutions/)
    - [Valutazione dei requisiti per i progetti Dynamics 365](https://learn.microsoft.com/it-it/training/modules/evaluate-requirements-dynamics-365-projects/) - requisiti
    - [Mapping dei processi aziendali per Dynamics 365](https://learn.microsoft.com/it-it/training/modules/business-process-mapping-dynamics-365/) - processi aziendali
    - [Come lavorare con i requisiti per Microsoft Power Platform e Dynamics 365](https://learn.microsoft.com/it-it/training/modules/work-with-requirements/)    
- [Uso delle soluzioni Success by Design for Dynamics 365](https://learn.microsoft.com/it-it/training/paths/use-success-design/) - credo mi sia utile solo l'introduzione il resto del percorso è troppo specifico
- Libro [Guida all'implementazione di Dynamics 365 - Success by Design](https://www.d365implementationguide.com/books/asvr/#p=i/?azure-portal=true) - in autonomia
- 2009 Application Design: per reporting e tabelle master e altro
- Programming BC: BC Process Flow p.400 + BC development projects p.475