# Product Requirements Document (PRD) — IdroTrack

**Progetto:** IdroTrack Mobile App  
**Versione Documento:** 1.0  
**Stato:** Approvato / Baseline di Progettazione  
**Piattaforma Target:** Mobile (iOS / Android — standard viewport 390×844 px)  
**Tipologia Prodotto:** One-Page Wellness & Hydration Tracker  

---

## 1. Executive Summary & Visione di Prodotto

### 1.1 Visione
**IdroTrack** è un'applicazione mobile di monitoraggio dell'idratazione quotidiana focalizzata su **semplicità estrema, zero frizione d'uso e gamification empatica**. Risolve il problema dell'abbandono tipico dei tracker tradizionali (troppo complessi o noiosi) offrendo un'esperienza a **schermata singola** (senza sottomenu, tab bar superflue o onboarding lunghi) incentrata su una mascotte dinamica reattiva ("Idro") che crea una connessione emotiva immediata con l'utente.

### 1.2 Target Personas
- **Lavoratori d'ufficio / Studenti:** Passano ore concentrati davanti allo schermo dimenticandosi di bere a intervalli regolari.
- **Appassionati di fitness / Wellness:** Cercano un feedback visivo immediato sull'apporto idrico giornaliero senza dover pesare o catalogare minuziosamente ogni sorso.
- **Utenti casuali / amanti del design amichevole:** Persone stimolate da rinforzi positivi, micro-animazioni e feedback visivi giocosi (stile Duolingo o Tamagotchi leggero).

---

## 2. Principi di Design & Architettura dell'Informazione

### 2.1 Architettura "One-Page Minimalist"
L'intera esperienza si consuma in **un'unica schermata ergonomica verticale**:
1. **Header Istituzionale & Contesto:** Indicazione del giorno corrente, obiettivo target predefinito (2.0L), logo brand e accesso profilo rapido.
2. **Dashboard di Sintesi Metrica (Split Dashboard):** Ring progressivo radiale combinato con indicatori analitici (ml totali, frazione bicchieri, percentuale di completamento).
3. **Timeline Quantitativa a Bicchiere:** 8 slot iconici progressivi da 250 ml (da vuoto/tratteggiato a pieno/animato) con stima del prossimo orario utile di idratazione.
4. **Zona Empatica & Gamification (Mascotte Idro):** Una goccia antropomorfa centrale dotata di speech bubble reattivo che varia espressione e copy motivazionale in 4 soglie psicologiche.
5. **Thumb-Zone Action Bar (In basso):** Pulsante CTA primario ad altissima accessibilità ergonomica con pollice (`+ Aggiungi bicchiere (250 ml)`), affiancato da azioni correttive rapide (`- Rimuovi uno`, `Azzera giornata`).

### 2.2 Design System "IdroTrack" (Specifiche Visive)
- **Palette Cromatica:**
  - *Primary Accent:* Ciano Elettrico IdroTrack (`#06B6D4` / `#0284C7`)
  - *Secondary Glow:* Celeste acqua (`#38BDF8`, `#E0F2FE`)
  - *Neutrals & Surface:* Bianco puro (`#FFFFFF`) su sfondi light tint (`#FAFAFF` / `#F0F9FF`)
  - *Dark Neutral:* Ardesia profondo (`#0F172A`) per massima leggibilità e contrasto WCAG AAA.
  - *Accent Emotions:* Giallo celebrazione (`#FACC15`), Rosa guance (`#FB7185`).
- **Tipografia:** Font Outfit / Inter pulito, geometrico con numeri a spaziatura tabellare per evitare layout shift durante l'aggiornamento dei contatori.
- **Roundness:** Raggio di curvatura morbido (12px–20px) per trasmettere accoglienza e morbidezza visiva.

---

## 3. Requisiti Funzionali Dettagliati

| ID | Modulo | Descrizione del Requisito | Criteri di Accettazione |
|---|---|---|---|
| **FR-01** | Tracciamento Rapido | L'utente preme il pulsante primario `+ Aggiungi bicchiere (250 ml)`. | - Il contatore incrementa di 1 (max 8).<br>- Il volume cresce di +250 ml (fino a 2.000 ml).<br>- La percentuale sale del +12.5% per click.<br>- L'anello radiale e la barra avanzano fluidamente.<br>- Lo slot del bicchiere corrispondente si colora di azzurro. |
| **FR-02** | Correzione Errore | L'utente tocca `− Rimuovi uno`. | - Scala di 1 bicchiere (min 0).<br>- Sottrae 250 ml e ricalcola percentuale.<br>- Il relativo slot bicchiere torna allo stato tratteggiato/vuoto.<br>- La mascotte adegua espressione e fumetto alla nuova soglia. |
| **FR-03** | Reset Giornaliero | L'utente tocca `Azzera giornata`. | - Chiede eventuale conferma o esegue reset immediato a 0/8 bicchieri (0 ml).<br>- Tutti i bicchieri tornano vuoti.<br>- Mascotte reimpostata allo stato "assetato". |
| **FR-04** | Notifica Ritmo Idrico | Calcolo dinamico dell'orario suggerito ("Bevi il prossimo entro le..."). | Suggerisce una finestra temporale (es. entro 60–90 min dall'ultimo bicchiere) per evitare disidratazione. |
| **FR-05** | Persistenza Dati | I dati devono essere salvati in locale (`localStorage` o DB locale). | Al riavvio dell'app o refresh del browser la sessione odierna conserva i progressi. Alle 00:00 scatta il reset automatico giornaliero. |

---

## 4. Specifiche Mascotte "Idro" & Matrice degli Stati Emotivi

La mascotte funge da specchio empatico dell'idratazione corporea dell'utente:

| Scaglione (Bicchieri) | Volume (ml) | % Goal | Espressione Mascotte | Testo Speech Bubble |
|---|---|---|---|---|
| **0 – 2** | 0 – 500 ml | 0% – 25% | **Assetata / Assonnata:** Occhi a mezzaluna assonnati, gocciolina di sudore, bocca timida verso il basso. | *"Ho sete… iniziamo a bere un po’ d’acqua! 💧"* |
| **3 – 5** | 750 – 1.250 ml | 37.5% – 62.5% | **Incoraggiante / Solare:** Occhi aperti vispi, sorriso aperto con linguetta, postura reattiva. | *"Ottimo ritmo! Sei già a più di metà strada! 🌊"* |
| **6 – 7** | 1.500 – 1.750 ml | 75% – 87.5% | **Entusiasta / Energetica:** Occhi scintillanti, grande sorriso felice, corpo reattivo. | *"Grande! Sei quasi arrivato all’obiettivo! ⭐"* |
| **8 (Completato)** | 2.000 ml | 100% | **Festeggiamento / Trionfo:** Occhi a stella o chiusi di gioia, coriandoli e stelline dorate attorno. | *"Fantastico! Obiettivo giornaliero raggiunto! 🏆🎉"* |

---

## 5. Requisiti Non Funzionali & UX/UI

- **Reattività Istantanea:** Latenza delle interazioni UI < 50ms; feedback immediato su click/tap con micro-transizioni CSS.
- **Ergonomia (Thumb-Zone Optimization):** Tutti i controlli ad alta frequenza d'uso sono concentrati nel 30% inferiore dello schermo per utilizzo confortevole con una sola mano.
- **Accessibilità (WCAG 2.1 AA):** 
  - Contrasto testo su sfondo superiore a 4.5:1.
  - Stati vuoto/pieno differenziati sia dal colore (ciano vs bianco) sia dal tratto grafico (linea continua vs tratteggio).
- **Leggerezza del Bundle:** Nessun framework pesante; implementabile con HTML semantico, Tailwind CSS / modern CSS e vanilla JS reattivo.

---

## 6. Roadmap di Evoluzione Futura (v1.1 - v2.0)

1. **v1.1 — Personalizzazione Obiettivo:** Possibilità di modificare il target da 2.0L a valori personalizzati in base a peso e attività fisica.
2. **v1.2 — Notifiche Push Smart:** Reminder gentili a orari cadenzati tramite Web Push API o notifiche native.
3. **v2.0 — Streak & Storico Settimanale:** Scheda a comparsa per visualizzare il grafico dei giorni consecutivi a target completato e sbloccare outfit/accessori per Idro.
