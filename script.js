// === 1. COSTANTI E STATO CONDIVISO DELL'APP ===
const TOTAL_CUPS = 8;               // Limite massimo di bicchieri giornalieri
const ML_PER_CUP = 250;             // Quantitativo d'acqua per singolo bicchiere (ml)
const TOTAL_ML = TOTAL_CUPS * ML_PER_CUP; // Totale obiettivo: 2.000 ml
const CIRCLE_CIRCUMFERENCE = 257.6; // Circonferenza anello gauge (2 * PI * 41)

// Unico stato condiviso: quanti bicchieri sono stati bevuti oggi
let currentCups = 0;
let lastAddedCupIndex = -1;         // Indice utile per l'animazione di riempimento

// Chiavi di memorizzazione per localStorage
const STORAGE_KEY_CUPS = 'idrotrack_cups';
const STORAGE_KEY_DATE = 'idrotrack_date';

// === 2. SELEZIONE DEGLI ELEMENTI DEL DOM ===
// Elementi Header e Data
const dateText = document.getElementById('date-text');
const btnProfile = document.getElementById('btn-profile');

// Elementi Split Hero Dashboard
const circularProgressBar = document.getElementById('circular-progress-bar');
const gaugeRatioText = document.getElementById('gauge-ratio-text');
const metricMlText = document.getElementById('metric-ml-text');
const metricMainCount = document.getElementById('metric-main-count');
const metricPctBadge = document.getElementById('metric-pct-badge');
const horizontalProgressBar = document.getElementById('horizontal-progress-bar');

// Elementi Tracker Bicchieri
const cupsMissingTitle = document.getElementById('cups-missing-title');
const cupsSubtitleText = document.getElementById('cups-subtitle-text');
const cupsBadgeCompleted = document.getElementById('cups-badge-completed');
const cupsGrid = document.getElementById('cups-grid');
const reminderCaptionText = document.getElementById('reminder-caption-text');

// Elementi Mascotte Idro
const idroSpeechBubble = document.getElementById('idro-speech-bubble');
const idroBodyPath = document.getElementById('idro-body-path');
const idroCheeks = document.getElementById('idro-cheeks');
const idroFace = document.getElementById('idro-face');
const idroAccessories = document.getElementById('idro-accessories');

// Indicatori di Livello (Pills)
const pillTier1 = document.getElementById('pill-tier-1');
const pillTier2 = document.getElementById('pill-tier-2');
const pillTier3 = document.getElementById('pill-tier-3');
const pillTier4 = document.getElementById('pill-tier-4');

// Pulsanti di Azione
const btnAdd = document.getElementById('btn-add');
const btnAddLabel = document.getElementById('btn-add-label');
const btnRemove = document.getElementById('btn-remove');
const btnReset = document.getElementById('btn-reset');

// Elementi Popup Modale di Conferma
const confirmationModal = document.getElementById('confirmation-modal');
const modalBtnCancel = document.getElementById('modal-btn-cancel');
const modalBtnConfirm = document.getElementById('modal-btn-confirm');

// === 3. FUNZIONI DI FORMATTAZIONE E DATE ===

// Formatta i millilitri con il punto per le migliaia (es. 1.250 ml)
function formatMl(ml) {
  return ml.toLocaleString('it-IT');
}

// Restituisce la data di oggi formattata in italiano (es. "Oggi, 17 Ottobre")
function getItalianDateString() {
  const today = new Date();
  const day = today.getDate();
  const months = [
    'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
    'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
  ];
  const monthName = months[today.getMonth()];
  return `Oggi, ${day} ${monthName}`;
}

// Restituisce la data in formato "AAAA-MM-GG" per il controllo giornaliero nel localStorage
function getIsoDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Calcola l'orario suggerito per il prossimo bicchiere (ora attuale + 90 minuti)
function getNextReminderTime() {
  const now = new Date();
  const reminderTime = new Date(now.getTime() + 90 * 60 * 1000);
  const hours = String(reminderTime.getHours()).padStart(2, '0');
  const minutes = String(reminderTime.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

// === 4. PERSISTENZA DEI DATI (localStorage) ===

// Salva il numero di bicchieri e la data odierna
function saveData() {
  localStorage.setItem(STORAGE_KEY_CUPS, currentCups);
  localStorage.setItem(STORAGE_KEY_DATE, getIsoDateString());
}

// Carica i dati salvati e azzera automaticamente a un nuovo giorno
function loadData() {
  const savedDate = localStorage.getItem(STORAGE_KEY_DATE);
  const savedCups = localStorage.getItem(STORAGE_KEY_CUPS);
  const todayIso = getIsoDateString();

  // Se la data salvata corrisponde a oggi, ripristiniamo i bicchieri
  if (savedDate === todayIso && savedCups !== null) {
    currentCups = parseInt(savedCups, 10);
    if (isNaN(currentCups) || currentCups < 0) currentCups = 0;
    if (currentCups > TOTAL_CUPS) currentCups = TOTAL_CUPS;
  } else {
    // Nuovo giorno o primo utilizzo: il contatore parte da zero
    currentCups = 0;
    saveData();
  }
}

// === 5. GENERAZIONE DINAMICA DELLA GRIGLIA DEGLI 8 BICCHIERI ===
function renderCupsGrid() {
  cupsGrid.innerHTML = '';

  for (let i = 1; i <= TOTAL_CUPS; i++) {
    const isFilled = i <= currentCups;
    const isJustAdded = i === lastAddedCupIndex;

    const cupSlot = document.createElement('div');
    cupSlot.className = `cup-slot ${isFilled ? 'filled' : 'empty'} ${isJustAdded ? 'cup-pop' : ''}`;
    cupSlot.setAttribute('title', `${i}° bicchiere (${i * ML_PER_CUP} ml)`);

    if (isFilled) {
      // Bicchiere pieno con grafica azzurra e acqua animata
      cupSlot.innerHTML = `
        <svg width="20" height="24" viewBox="0 0 20 24">
          <defs>
            <linearGradient id="cupWaterG_${i}" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="#38bdf8"></stop>
              <stop offset="100%" stop-color="#00687a"></stop>
            </linearGradient>
          </defs>
          <!-- Bordo bicchiere -->
          <path d="M4 2h12l-1.5 17c-.1 1.1-1 2-2.1 2H7.6c-1.1 0-2-.9-2.1-2L4 2z" fill="#ebf4f8" stroke="#06b6d4" stroke-width="1.5"></path>
          <!-- Acqua nel bicchiere -->
          <path d="M5.1 8h9.8l-1.1 11.2c-.1.6-.6 1-1.2 1H7.4c-.6 0-1.1-.4-1.2-1L5.1 8z" fill="url(#cupWaterG_${i})"></path>
          <!-- Superficie dell'acqua -->
          <ellipse cx="10" cy="8.2" fill="#acedff" rx="4.8" ry="1.2"></ellipse>
          <!-- Bollicina decorativa -->
          <circle cx="${i % 2 === 0 ? '8.5' : '11.5'}" cy="${12 + (i % 3)}" fill="#ffffff" opacity="0.85" r="0.9"></circle>
        </svg>
        <span class="cup-slot-label">${i}°</span>
      `;
    } else {
      // Bicchiere vuoto con contorno tratteggiato e icona stilizzata
      cupSlot.innerHTML = `
        <svg width="20" height="24" viewBox="0 0 20 24">
          <path d="M4 2h12l-1.5 17c-.1 1.1-1 2-2.1 2H7.6c-1.1 0-2-.9-2.1-2L4 2z" fill="none" stroke="#94a3b8" stroke-dasharray="2.5 2.5" stroke-width="1.4"></path>
          <path d="M10 9c-1 1.5-2 3-2 4.2 0 1.1.9 2 2 2s2-.9 2-2c0-1.2-1-2.7-2-4.2z" fill="none" stroke="#cbd5e1" stroke-width="1.2"></path>
        </svg>
        <span class="cup-slot-label">${i}°</span>
      `;
    }

    // Cliccando direttamente su un bicchiere si imposta quel livello
    cupSlot.addEventListener('click', function () {
      setCupCount(i);
    });

    cupsGrid.appendChild(cupSlot);
  }
}

// === 6. AGGIORNAMENTO DELLA MASCOTTE E DEGLI STATI EMOTIVI ===
function updateMascot() {
  // Disattiva tutte le pillole di livello
  [pillTier1, pillTier2, pillTier3, pillTier4].forEach(pill => {
    pill.classList.remove('active');
  });

  if (currentCups <= 2) {
    // SCAGLIONE 1: 0–2 bicchieri (Assetata / stanca)
    pillTier1.classList.add('active');
    idroSpeechBubble.innerText = "Ho sete... iniziamo a bere un po' d'acqua!";
    idroBodyPath.setAttribute('fill', 'url(#idroSadGrad)');
    
    // Guancette spente
    idroCheeks.innerHTML = `
      <ellipse cx="39" cy="87" rx="4" ry="2.5" fill="#94a3b8" opacity="0.4" />
      <ellipse cx="81" cy="87" rx="4" ry="2.5" fill="#94a3b8" opacity="0.4" />
    `;

    // Occhi assonnati e bocca verso il basso
    idroFace.innerHTML = `
      <path d="M42 75 Q47 70 51 76" stroke="#001f26" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <circle cx="46" cy="77" r="2" fill="#001f26" />
      <path d="M69 76 Q73 70 78 75" stroke="#001f26" stroke-width="2.5" stroke-linecap="round" fill="none" />
      <circle cx="74" cy="77" r="2" fill="#001f26" />
      <path d="M55 86 Q60 82 65 86" stroke="#001f26" stroke-width="2.5" stroke-linecap="round" fill="none" />
    `;

    // Gocciolina di sudore sul lato
    idroAccessories.innerHTML = `
      <path d="M82 52 C82 52 76 60 76 64 C76 67 78.5 69 82 69 C85.5 69 88 67 88 64 C88 60 82 52 82 52 Z" fill="#acedff" stroke="#0284c7" stroke-width="1" />
      <circle cx="81" cy="63" r="1" fill="#ffffff" />
    `;

  } else if (currentCups <= 5) {
    // SCAGLIONE 2: 3–5 bicchieri (Sorridente / incoraggiante)
    pillTier2.classList.add('active');
    idroSpeechBubble.innerText = "Ottimo ritmo! Continua così!";
    idroBodyPath.setAttribute('fill', 'url(#idroBodyGrad)');

    // Guance rosee
    idroCheeks.innerHTML = `
      <ellipse cx="39" cy="85" rx="5.5" ry="3" fill="#f43f5e" opacity="0.35" />
      <ellipse cx="81" cy="85" rx="5.5" ry="3" fill="#f43f5e" opacity="0.35" />
    `;

    // Occhi vispi aperti e sorriso aperto con linguetta
    idroFace.innerHTML = `
      <ellipse cx="46" cy="75" rx="4.5" ry="6" fill="#001f26" />
      <circle cx="44.5" cy="72.5" r="2" fill="#ffffff" />
      <circle cx="47.5" cy="77" r="1" fill="#ffffff" />
      <ellipse cx="74" cy="75" rx="4.5" ry="6" fill="#001f26" />
      <circle cx="72.5" cy="72.5" r="2" fill="#ffffff" />
      <circle cx="75.5" cy="77" r="1" fill="#ffffff" />
      <path d="M54 81 Q60 88 66 81" stroke="#001f26" stroke-width="2.5" stroke-linecap="round" fill="#001f26" />
      <path d="M56 82.5 Q60 86 64 82.5" fill="#f87171" />
    `;

    // Scintilla allegra
    idroAccessories.innerHTML = `
      <path d="M88 34 L90 28 L92 34 L98 36 L92 38 L90 44 L88 38 L82 36 Z" fill="#fef08a" opacity="0.9" />
      <circle cx="96" cy="46" r="1.5" fill="#acedff" />
    `;

  } else if (currentCups <= 7) {
    // SCAGLIONE 3: 6–7 bicchieri (Entusiasta / energetica)
    pillTier3.classList.add('active');
    idroSpeechBubble.innerText = "Ci siamo quasi! Ancora un piccolo sforzo!";
    idroBodyPath.setAttribute('fill', 'url(#idroBodyGrad)');

    // Guancette rosate accese
    idroCheeks.innerHTML = `
      <ellipse cx="38" cy="84" rx="6" ry="3.5" fill="#fb7185" opacity="0.5" />
      <ellipse cx="82" cy="84" rx="6" ry="3.5" fill="#fb7185" opacity="0.5" />
    `;

    // Occhi ad arco sorridente e grande sorriso
    idroFace.innerHTML = `
      <path d="M42 76 Q46 69 51 76" stroke="#001f26" stroke-width="2.8" stroke-linecap="round" fill="none" />
      <path d="M69 76 Q74 69 78 76" stroke="#001f26" stroke-width="2.8" stroke-linecap="round" fill="none" />
      <path d="M53 80 Q60 90 67 80 Z" fill="#001f26" />
      <path d="M55 83 Q60 89 65 83 Z" fill="#f43f5e" />
    `;

    // Stelle dorate di energia
    idroAccessories.innerHTML = `
      <path d="M88 30 L90 22 L93 30 L101 32 L93 35 L90 43 L88 35 L80 32 Z" fill="#facc15" />
      <circle cx="95" cy="48" r="2" fill="#38bdf8" />
      <path d="M26 38 L28 32 L30 38 L36 40 L30 42 L28 48 L26 42 L20 40 Z" fill="#fef08a" opacity="0.8" />
    `;

  } else {
    // SCAGLIONE 4: 8 bicchieri (Felicissima / trionfo e festeggiamento)
    pillTier4.classList.add('active');
    idroSpeechBubble.innerText = "Fantastico! Abbiamo raggiunto l'obiettivo!";
    idroBodyPath.setAttribute('fill', 'url(#idroBodyGrad)');

    // Guance festanti
    idroCheeks.innerHTML = `
      <ellipse cx="37" cy="84" rx="6.5" ry="4" fill="#fb7185" opacity="0.6" />
      <ellipse cx="83" cy="84" rx="6.5" ry="4" fill="#fb7185" opacity="0.6" />
    `;

    // Occhi di trionfo e sorriso apertissimo
    idroFace.innerHTML = `
      <path d="M40 75 Q46 66 52 75" stroke="#001f26" stroke-width="3" stroke-linecap="round" fill="none" />
      <path d="M68 75 Q74 66 80 75" stroke="#001f26" stroke-width="3" stroke-linecap="round" fill="none" />
      <path d="M51 79 Q60 93 69 79 Z" fill="#001f26" />
      <path d="M54 84 Q60 92 66 84 Z" fill="#f43f5e" />
    `;

    // Coriandoli e stelle di vittoria
    idroAccessories.innerHTML = `
      <path d="M88 28 L90 20 L93 28 L101 30 L93 33 L90 41 L88 33 L80 30 Z" fill="#facc15" />
      <path d="M24 38 L26 30 L28 38 L35 40 L28 43 L26 50 L24 43 L17 40 Z" fill="#38bdf8" />
      <circle cx="96" cy="46" r="2.2" fill="#f472b6" />
      <circle cx="23" cy="62" r="1.8" fill="#facc15" />
      <circle cx="60" cy="8" r="2.5" fill="#fef08a" />
    `;
  }
}

// === 7. SINCRONIZZAZIONE GENERALE DELL'INTERFACCIA (updateUI) ===
function updateUI() {
  const currentMl = currentCups * ML_PER_CUP;
  const pct = (currentCups / TOTAL_CUPS) * 100;

  // 1. Aggiornamento Split Hero Dashboard
  metricMlText.innerText = `${formatMl(currentMl)} / ${formatMl(TOTAL_ML)} ml`;
  metricMainCount.innerText = currentCups;
  gaugeRatioText.innerText = `${currentCups} / ${TOTAL_CUPS}`;
  metricPctBadge.innerText = `${pct % 1 === 0 ? pct.toFixed(0) : pct.toFixed(1)}%`;

  // Barra di avanzamento orizzontale
  horizontalProgressBar.style.width = `${pct}%`;

  // Barra circolare radiale (offset circonferenza)
  const offset = CIRCLE_CIRCUMFERENCE - (pct / 100) * CIRCLE_CIRCUMFERENCE;
  circularProgressBar.style.strokeDashoffset = offset;

  // 2. Aggiornamento Card Bicchieri e Stato
  const remainingCups = TOTAL_CUPS - currentCups;

  if (currentCups === TOTAL_CUPS) {
    cupsMissingTitle.innerText = "Obiettivo completato! 🎉";
    cupsSubtitleText.innerText = "Hai raggiunto i 2.000 ml odierni";
    reminderCaptionText.innerText = "Hai raggiunto il tuo fabbisogno idrico ottimale di 2.0L per oggi! Bravissimo!";
  } else if (remainingCups === 1) {
    cupsMissingTitle.innerText = "Ti manca 1 bicchiere";
    cupsSubtitleText.innerText = "Progresso idratazione odierna";
    reminderCaptionText.innerText = `Bevi il prossimo bicchiere entro le ${getNextReminderTime()} per mantenere l'idratazione ottimale.`;
  } else {
    cupsMissingTitle.innerText = `Ti mancano ${remainingCups} bicchieri`;
    cupsSubtitleText.innerText = "Progresso idratazione odierna";
    reminderCaptionText.innerText = `Bevi il prossimo bicchiere entro le ${getNextReminderTime()} per mantenere l'idratazione ottimale.`;
  }

  cupsBadgeCompleted.innerText = `${currentCups} / ${TOTAL_CUPS} completati`;

  // Render degli 8 bicchieri
  renderCupsGrid();

  // 3. Aggiornamento Mascotte Idro e Indicatori
  updateMascot();

  // 4. Gestione Stati dei Pulsanti di Azione
  if (currentCups >= TOTAL_CUPS) {
    btnAdd.classList.add('completed');
    btnAddLabel.innerText = '🎉 Obiettivo raggiunto (2.0L)';
  } else {
    btnAdd.classList.remove('completed');
    btnAddLabel.innerText = '+ Aggiungi bicchiere (250 ml)';
  }

  // Disabilita "Rimuovi uno" se siamo a 0
  btnRemove.disabled = (currentCups <= 0);
}

// Imposta un numero specifico di bicchieri (con limiti 0-8)
function setCupCount(val) {
  const clamped = Math.max(0, Math.min(TOTAL_CUPS, val));
  if (clamped > currentCups) {
    lastAddedCupIndex = clamped;
  } else {
    lastAddedCupIndex = -1;
  }
  currentCups = clamped;
  saveData();
  updateUI();
}

// === 8. GESTIONE EVENTI (EVENT LISTENERS) ===

// Pulsante "+ Aggiungi bicchiere (250 ml)"
btnAdd.addEventListener('click', function () {
  if (currentCups < TOTAL_CUPS) {
    lastAddedCupIndex = currentCups + 1;
    currentCups++;
    saveData();
    updateUI();
  }
});

// Pulsante "− Rimuovi uno"
btnRemove.addEventListener('click', function () {
  if (currentCups > 0) {
    lastAddedCupIndex = -1;
    currentCups--;
    saveData();
    updateUI();
  }
});

// Funzione per aprire il popup di conferma
function openResetModal() {
  confirmationModal.classList.remove('hidden');
}

// Funzione per chiudere il popup di conferma
function closeResetModal() {
  confirmationModal.classList.add('hidden');
}

// Pulsante "Azzera giornata": apre il popup di conferma
btnReset.addEventListener('click', function () {
  openResetModal();
});

// Pulsante "No, continuo!" del popup: chiude senza modificare nulla
modalBtnCancel.addEventListener('click', function () {
  closeResetModal();
});

// Pulsante "Sì, azzera" del popup: azzera i progressi, aggiorna l'UI e chiude
modalBtnConfirm.addEventListener('click', function () {
  lastAddedCupIndex = -1;
  currentCups = 0;
  saveData();
  updateUI();
  closeResetModal();
});

// Chiusura del popup cliccando sull'overlay scuro esterno
confirmationModal.addEventListener('click', function (e) {
  if (e.target === confirmationModal) {
    closeResetModal();
  }
});

// Chiusura del popup premendo il tasto ESC
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !confirmationModal.classList.contains('hidden')) {
    closeResetModal();
  }
});

// Pulsante Profilo Utente
btnProfile.addEventListener('click', function () {
  alert("IdroTrack • Profilo Utente\n\nObiettivo giornaliero: 2.000 ml (8 bicchieri da 250 ml).\nMantieni una corretta idratazione ogni giorno per il tuo benessere!");
});

// Selettore rapido di livello tramite pillole
pillTier1.addEventListener('click', function () { setCupCount(1); });
pillTier2.addEventListener('click', function () { setCupCount(4); });
pillTier3.addEventListener('click', function () { setCupCount(6); });
pillTier4.addEventListener('click', function () { setCupCount(8); });

// === 9. INIZIALIZZAZIONE ALL'AVVIO ===
// Imposta la data odierna in italiano nell'header
dateText.innerText = getItalianDateString();

// Carica i dati salvati (o azzera se nuovo giorno) e aggiorna la schermata
loadData();
updateUI();
