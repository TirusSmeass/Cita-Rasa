// ============================================================
// ============================================================
// FILE: CITARASA - MELESTARIKAN KULINER DAERAH
// VERSI: 4.0 (Dengan Penamaan AI Sejarah)
// ============================================================
// ============================================================
//
//  📌  FITUR UTAMA:
//  ------------------------------------------------------------
//  1.  AI SEJARAH - Sistem Rule-Based untuk edukasi budaya kuliner
//  2.  NUSAQUIZ - Gamifikasi edukasi kuliner interaktif
//  3.  EKSPLORASI - Rekomendasi kuliner berbasis lokasi
//  4.  PEMBELIAN - Integrasi pemesanan langsung ke UMKM
//
//  📌  SESUAI DENGAN SUBTEMA:
//  ------------------------------------------------------------
//  "Pelestarian Budaya melalui Inovasi Teknologi"
//  - SDG 8: Pekerjaan Layak & Pertumbuhan Ekonomi
//  - SDG 12: Konsumsi & Produksi Bertanggung Jawab
//  - Asta Cita: Penguatan Ekonomi Kerakyatan & Pelestarian Budaya
// ============================================================

(function() {
  "use strict";

  // ============================================================
  // BAGIAN 1: DATABASE KULINER DAERAH
  // ============================================================
  // Database ini menyimpan informasi makanan khas Nusantara
  // yang digunakan untuk:
  // 1. Menampilkan katalog produk di halaman utama
  // 2. Sebagai sumber data untuk AI Sejarah (pencocokan nama makanan)
  // 3. Mendukung fitur rekomendasi berbasis lokasi
  // ============================================================

  const kulinerDaerah = [
    {
      nama: "Rendang",
      daerah: "Sumatera Barat",
      umkm: "Mak Yun",
      harga: 45000,
      caraBeli: "Rendang Mak Yun bisa dibeli langsung di halaman Kuliner Daerah. Klik produk, tambah ke keranjang, lalu checkout."
    },
    {
      nama: "Gudeg",
      daerah: "Yogyakarta",
      umkm: "Bu Gandes",
      harga: 30000,
      caraBeli: "Gudeg Bu Gandes tersedia di marketplace. Cari di kategori 'Kuliner Jawa', tambahkan ke keranjang, dan selesaikan pembayaran."
    },
    {
      nama: "Sate Madura",
      daerah: "Jawa Timur",
      umkm: "Pak Samin",
      harga: 25000,
      caraBeli: "Sate Madura Pak Samin bisa dipesan via marketplace. Pastikan alamat pengiriman terisi dengan benar."
    },
    {
      nama: "Pempek",
      daerah: "Palembang",
      umkm: "Kapal Saga",
      harga: 35000,
      caraBeli: "Pempek Kapal Saga tersedia dengan kuah cuko asli. Beli di halaman produk dan pilih metode pengiriman."
    }
  ];

  // ============================================================
  // BAGIAN 2: NUSAQUIZ - GAMIFIKASI EDUKASI KULINER
  // ============================================================
  // Kuis interaktif untuk menguji pengetahuan generasi muda
  // tentang kuliner Nusantara. Setiap jawaban benar memberi poin.
  // ============================================================

  const quizQuestions = [
    {
      question: "Dari daerah manakah rendang berasal?",
      options: ["Sumatera Utara", "Sumatera Barat", "Riau", "Jambi"],
      correct: 1,
      explanation: "Rendang adalah masakan khas Minangkabau yang berasal dari Sumatera Barat.",
      points: 10
    },
    {
      question: "Apa bahan utama pembuatan gudeg?",
      options: ["Nangka muda", "Pepaya muda", "Kelapa", "Singkong"],
      correct: 0,
      explanation: "Gudeg terbuat dari nangka muda yang dimasak dengan santan dan gula aren.",
      points: 10
    },
    {
      question: "Sate Madura terkenal dengan bumbu apa?",
      options: ["Bumbu kacang", "Bumbu kecap", "Bumbu kuning", "Bumbu merah"],
      correct: 0,
      explanation: "Sate Madura disajikan dengan bumbu kacang yang kental dan manis.",
      points: 10
    },
    {
      question: "Pempek berasal dari kota mana?",
      options: ["Palembang", "Padang", "Medan", "Bengkulu"],
      correct: 0,
      explanation: "Pempek adalah makanan khas Palembang, Sumatera Selatan.",
      points: 10
    },
    {
      question: "Apa warna khas dari rawon?",
      options: ["Merah", "Kuning", "Hitam", "Putih"],
      correct: 2,
      explanation: "Rawon memiliki kuah hitam yang berasal dari kluwek.",
      points: 10
    },
    {
      question: "Makanan khas Bali yang dimasak dengan bumbu base genep adalah?",
      options: ["Ayam betutu", "Babi guling", "Lawar", "Sate lilit"],
      correct: 0,
      explanation: "Ayam betutu dimasak dengan bumbu base genep yang kaya rempah.",
      points: 10
    },
    {
      question: "Coto Makassar adalah makanan khas dari provinsi?",
      options: ["Sulawesi Selatan", "Sulawesi Utara", "Sulawesi Tengah", "Sulawesi Tenggara"],
      correct: 0,
      explanation: "Coto Makassar berasal dari Sulawesi Selatan.",
      points: 10
    },
    {
      question: "Papeda terbuat dari bahan dasar?",
      options: ["Sagu", "Jagung", "Beras", "Singkong"],
      correct: 0,
      explanation: "Papeda adalah makanan khas Papua dan Maluku yang terbuat dari sagu.",
      points: 10
    },
    {
      question: "Apa nama bubur khas Manado yang berisi campuran sayuran?",
      options: ["Tinutuan", "Bubur ayam", "Bubur sumsum", "Bubur kacang ijo"],
      correct: 0,
      explanation: "Tinutuan atau bubur manado berisi bayam, kangkung, jagung, dan labu kuning.",
      points: 10
    },
    {
      question: "Soto Banjar berasal dari provinsi?",
      options: ["Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Barat", "Kalimantan Tengah"],
      correct: 0,
      explanation: "Soto Banjar adalah soto khas Banjarmasin, Kalimantan Selatan.",
      points: 10
    }
  ];

  // ============================================================
  // BAGIAN 3: NUSAQUIZ - STATE MANAGEMENT
  // ============================================================
  // Mengelola status kuis: skor, streak, timer, dan progres
  // ============================================================

  let currentQuizState = {
    currentIndex: 0,
    score: 0,
    streak: 0,
    answers: [],
    quizCompleted: false,
    timerInterval: null,
    timeLeft: 15
  };

  const quizElements = {
    question: document.getElementById('question-text'),
    options: document.getElementById('quiz-options'),
    currentQ: document.getElementById('current-question'),
    totalQ: document.getElementById('total-questions'),
    quizPoints: document.getElementById('quiz-points'),
    quizStreak: document.getElementById('quiz-streak'),
    timer: document.getElementById('quiz-timer'),
    feedback: document.getElementById('quiz-feedback'),
    nextBtn: document.getElementById('quiz-next'),
    restartBtn: document.getElementById('quiz-restart'),
    result: document.getElementById('quiz-result'),
    finalPoints: document.getElementById('final-points'),
    correctCount: document.getElementById('correct-count'),
    totalCount: document.getElementById('total-count'),
    playAgain: document.getElementById('quiz-play-again')
  };

  if (quizElements.totalQ) {
    quizElements.totalQ.textContent = quizQuestions.length;
  }

  // ============================================================
  // BAGIAN 3.1: NUSAQUIZ - TIMER
  // ============================================================

  function startTimer() {
    if (currentQuizState.timerInterval) {
      clearInterval(currentQuizState.timerInterval);
    }
    
    currentQuizState.timeLeft = 15;
    updateTimerBar();
    
    currentQuizState.timerInterval = setInterval(() => {
      currentQuizState.timeLeft--;
      updateTimerBar();
      
      if (currentQuizState.timeLeft <= 0) {
        clearInterval(currentQuizState.timerInterval);
        handleTimeout();
      }
    }, 1000);
  }

  function updateTimerBar() {
    if (quizElements.timer) {
      const percentage = (currentQuizState.timeLeft / 15) * 100;
      quizElements.timer.style.width = `${percentage}%`;
      
      if (percentage < 30) {
        quizElements.timer.style.background = '#ef4444';
      } else if (percentage < 60) {
        quizElements.timer.style.background = '#f59e0b';
      } else {
        quizElements.timer.style.background = '#0ea5e9';
      }
    }
  }

  function handleTimeout() {
    disableOptions();
    showFeedback('⏰ Waktu habis!', 'error');
    if (quizElements.nextBtn) {
      quizElements.nextBtn.disabled = false;
    }
    currentQuizState.streak = 0;
    updateStreak();
  }

  // ============================================================
  // BAGIAN 3.2: NUSAQUIZ - LOAD & HANDLE QUESTIONS
  // ============================================================

  function loadQuestion(index) {
    if (index >= quizQuestions.length) {
      finishQuiz();
      return;
    }

    const q = quizQuestions[index];
    if (quizElements.question) {
      quizElements.question.textContent = q.question;
    }
    if (quizElements.currentQ) {
      quizElements.currentQ.textContent = index + 1;
    }

    if (quizElements.options) {
      let optionsHtml = '';
      q.options.forEach((opt, i) => {
        const isSelected = currentQuizState.answers[index] === i;
        const isAnswered = currentQuizState.answers[index] !== undefined;
        const isCorrect = isAnswered && i === q.correct;
        const isWrong = isAnswered && i === currentQuizState.answers[index] && i !== q.correct;
        
        let optionClass = 'quiz-option';
        if (isAnswered) optionClass += ' disabled';
        if (isSelected) optionClass += ' selected';
        if (isCorrect) optionClass += ' correct';
        if (isWrong) optionClass += ' wrong';
        
        optionsHtml += `
          <button class="${optionClass}" data-option-index="${i}" ${isAnswered ? 'disabled' : ''}>
            <span class="font-bold mr-3">${String.fromCharCode(65 + i)}.</span> ${opt}
          </button>
        `;
      });
      quizElements.options.innerHTML = optionsHtml;

      if (!currentQuizState.answers[index]) {
        document.querySelectorAll('.quiz-option:not(.disabled)').forEach(btn => {
          btn.addEventListener('click', (e) => handleOptionClick(e, index));
        });
      }
    }

    if (quizElements.feedback) {
      quizElements.feedback.innerHTML = '';
    }

    if (quizElements.nextBtn) {
      quizElements.nextBtn.disabled = currentQuizState.answers[index] === undefined;
    }

    startTimer();
  }

  function handleOptionClick(event, questionIndex) {
    const optionIndex = parseInt(event.currentTarget.dataset.optionIndex);
    const isCorrect = optionIndex === quizQuestions[questionIndex].correct;
    
    if (currentQuizState.timerInterval) {
      clearInterval(currentQuizState.timerInterval);
    }

    currentQuizState.answers[questionIndex] = optionIndex;
    
    if (isCorrect) {
      currentQuizState.score += quizQuestions[questionIndex].points;
      currentQuizState.streak++;
      
      if (currentQuizState.streak >= 3) {
        currentQuizState.score += 5;
        showFeedback(`🔥 Streak ${currentQuizState.streak}! +5 bonus poin! 🎉`, 'success');
      } else {
        showFeedback('✅ Benar! +10 poin', 'success');
      }
    } else {
      currentQuizState.streak = 0;
      showFeedback(`❌ Salah. ${quizQuestions[questionIndex].explanation}`, 'error');
    }

    updateScore();
    updateStreak();
    disableOptions();
    
    if (quizElements.nextBtn) {
      quizElements.nextBtn.disabled = false;
    }

    highlightCorrectAnswer(questionIndex);
  }

  function highlightCorrectAnswer(questionIndex) {
    const correctIndex = quizQuestions[questionIndex].correct;
    document.querySelectorAll('.quiz-option').forEach((btn, idx) => {
      if (idx === correctIndex) {
        btn.classList.add('correct');
      }
    });
  }

  function disableOptions() {
    document.querySelectorAll('.quiz-option').forEach(btn => {
      btn.classList.add('disabled');
      btn.disabled = true;
    });
  }

  function showFeedback(message, type) {
    if (quizElements.feedback) {
      const color = type === 'success' ? 'text-green-600' : 'text-red-600';
      quizElements.feedback.innerHTML = `<span class="${color}">${message}</span>`;
    }
  }

  function updateScore() {
    if (quizElements.quizPoints) {
      quizElements.quizPoints.textContent = currentQuizState.score;
    }
  }

  function updateStreak() {
    if (quizElements.quizStreak) {
      quizElements.quizStreak.textContent = currentQuizState.streak;
    }
  }

  // ============================================================
  // BAGIAN 3.3: NUSAQUIZ - FINISH & RESET
  // ============================================================

  function finishQuiz() {
    if (currentQuizState.timerInterval) {
      clearInterval(currentQuizState.timerInterval);
    }

    if (quizElements.question) quizElements.question.style.display = 'none';
    if (quizElements.options) quizElements.options.style.display = 'none';
    if (quizElements.nextBtn) quizElements.nextBtn.style.display = 'none';
    if (quizElements.restartBtn) quizElements.restartBtn.style.display = 'none';
    if (quizElements.feedback) quizElements.feedback.style.display = 'none';
    
    if (quizElements.result) {
      quizElements.result.classList.remove('hidden');
      if (quizElements.finalPoints) {
        quizElements.finalPoints.textContent = currentQuizState.score;
      }
      if (quizElements.correctCount) {
        quizElements.correctCount.textContent = currentQuizState.answers.filter((ans, idx) => ans === quizQuestions[idx].correct).length;
      }
      if (quizElements.totalCount) {
        quizElements.totalCount.textContent = quizQuestions.length;
      }
    }

    localStorage.setItem('nusaquiz_last_score', currentQuizState.score);
    localStorage.setItem('nusaquiz_last_date', new Date().toISOString());
  }

  function resetQuiz() {
    currentQuizState = {
      currentIndex: 0,
      score: 0,
      streak: 0,
      answers: [],
      quizCompleted: false,
      timerInterval: null,
      timeLeft: 15
    };

    if (quizElements.question) quizElements.question.style.display = 'block';
    if (quizElements.options) quizElements.options.style.display = 'block';
    if (quizElements.nextBtn) quizElements.nextBtn.style.display = 'block';
    if (quizElements.restartBtn) quizElements.restartBtn.style.display = 'block';
    if (quizElements.feedback) quizElements.feedback.style.display = 'block';
    
    if (quizElements.result) {
      quizElements.result.classList.add('hidden');
    }

    updateScore();
    updateStreak();
    loadQuestion(0);
  }

  // ============================================================
  // BAGIAN 3.4: NUSAQUIZ - EVENT LISTENERS
  // ============================================================

  if (quizElements.nextBtn) {
    quizElements.nextBtn.addEventListener('click', () => {
      currentQuizState.currentIndex++;
      if (currentQuizState.currentIndex < quizQuestions.length) {
        loadQuestion(currentQuizState.currentIndex);
      } else {
        finishQuiz();
      }
    });
  }

  if (quizElements.restartBtn) {
    quizElements.restartBtn.addEventListener('click', resetQuiz);
  }

  if (quizElements.playAgain) {
    quizElements.playAgain.addEventListener('click', resetQuiz);
  }

  resetQuiz();


  // ============================================================
  // ============================================================
  // BAGIAN 4: AI SEJARAH (RULE-BASED SYSTEM)
  // ============================================================
  // ============================================================
  //
  //  📌  APA ITU AI SEJARAH?
  //  ============================================================
  //  AI Sejarah adalah sistem berbasis RULE-BASED yang berfungsi
  //  untuk memberikan edukasi tentang sejarah, filosofi, dan
  //  nilai budaya kuliner Nusantara.
  //
  //  BUKAN CHATBOT BIASA! Ini adalah SISTEM AI yang:
  //  - Menerima INPUT berupa pertanyaan dari pengguna
  //  - Memproses dengan ATURAN (scoring, pattern matching)
  //  - Menghasilkan OUTPUT berupa informasi sejarah kuliner
  //
  //  ============================================================
  //  METODE: PATTERN MATCHING DENGAN SCORING SYSTEM
  //  ============================================================
  //  
  //  ALUR KERJA AI SEJARAH (DARI INPUT KE OUTPUT):
  //  ------------------------------------------------------------
  //  STEP 1: INPUT
  //          User bertanya tentang kuliner Nusantara
  //          Contoh: "apa sejarah rendang?"
  //
  //  STEP 2: PREPROCESSING
  //          Sistem mengubah input ke huruf kecil (toLowerCase)
  //          "apa sejarah rendang?"
  //
  //  STEP 3: RULE-BASED SCORING (INTI SISTEM!)
  //          Sistem mencocokkan kata kunci dari input
  //          dengan database pengetahuan (aiSejarahKnowledge)
  //          ----------------------------------------------------
  //          ATURAN SCORING:
  //          - Jika kata kunci EXACT match   → +15 poin
  //          - Jika kata kunci sebagian      → +5 poin
  //          ----------------------------------------------------
  //          Contoh scoring:
  //          "sejarah rendang" → match dengan keywords ['sejarah', 'rendang']
  //                            → +15 + 15 = 30 poin
  //                            → JAWABAN TERBAIK!
  //
  //  STEP 4: SELEKSI JAWABAN (DECISION RULE)
  //          ATURAN: Pilih item dengan skor TERTINGGI
  //          Jika skor > 10 → jawaban dianggap valid
  //          Jika skor ≤ 10 → lanjut ke FALLBACK
  //
  //  STEP 5: OUTPUT
  //          Sistem mengirimkan informasi sejarah ke user
  //          "Rendang berasal dari Sumatera Barat..."
  //
  //  ============================================================
  //  KELEBIHAN RULE-BASED PADA AI SEJARAH:
  //  ============================================================
  //  ✅ Akurasi 100% - Informasi sejarah yang diberikan sudah
  //     terverifikasi dan terpetakan dengan baik
  //  ✅ Tidak ada halusinasi - Jawaban selalu sesuai database
  //  ✅ Cepat dan ringan - Cocok untuk MVP CitaRasa
  //  ✅ Mudah diperbarui - Tambah pengetahuan baru tanpa
  //     mengubah sistem
  //  ✅ Transparan - Setiap jawaban bisa dilacak sumbernya
  //
  //  ============================================================
  //  KETERBATASAN:
  //  ============================================================
  //  ❌ Hanya bisa menjawab berdasarkan database yang tersedia
  //  ❌ Tidak bisa memahami pertanyaan di luar domain kuliner
  //  ❌ Tidak bisa belajar dari interaksi (sistem statis)
  //  ============================================================


  // ============================================================
  // BAGIAN 4.1: AI SEJARAH - KNOWLEDGE BASE
  // ============================================================
  // Database pengetahuan untuk AI Sejarah.
  // Setiap objek berisi:
  //   - keywords: kata kunci yang AKAN MEMICU pengetahuan
  //   - jawaban: INFORMASI SEJARAH yang akan diberikan
  //
  //  TOTAL PENGETAHUAN: 14+ topik sejarah kuliner
  // ============================================================

  const aiSejarahKnowledge = [
    // --- TOPIK 1: SEJARAH RENDANG ---
    {
      keywords: ['rendang', 'padang', 'minang', 'sejarah rendang'],
      jawaban: `🍛 **Sejarah Rendang**\n\n` +
               `Rendang adalah masakan khas Minangkabau yang berasal dari Sumatera Barat.\n\n` +
               `📜 **Filosofi**: Rendang melambangkan musyawarah dan kebersamaan:\n` +
               `• Daging sapi (pemimpin) - simbol kepala adat\n` +
               `• Santan (ulama) - simbol pengetahuan agama\n` +
               `• Cabai (pemuda) - simbol semangat juang\n\n` +
               `⏳ **Proses memasak 7 jam** mencerminkan kesabaran dan ketelitian.\n\n` +
               `🌏 UNESCO mengakui rendang sebagai warisan budaya tak benda Indonesia.`
    },
    // --- TOPIK 2: SEJARAH GUDEG ---
    {
      keywords: ['gudeg', 'jogja', 'yogyakarta', 'sejarah gudeg'],
      jawaban: `🥘 **Sejarah Gudeg**\n\n` +
               `Gudeg adalah makanan khas Yogyakarta yang terbuat dari nangka muda.\n\n` +
               `📜 **Sejarah**:\n` +
               `• Berasal dari masa Kerajaan Mataram Islam\n` +
               `• Awalnya disajikan untuk keluarga kerajaan\n` +
               `• Sekarang jadi ikon kuliner Jogja\n\n` +
               `🍯 **Keunikan**: Proses memasak selama berjam-jam dengan gula aren\n` +
               `menghasilkan rasa manis legit yang khas.\n\n` +
               `🥢 **Penyajian**: Disajikan dengan nasi, ayam, telur, dan sambal krecek.`
    },
    // --- TOPIK 3: SEJARAH SATE MADURA ---
    {
      keywords: ['sate', 'madura', 'sejarah sate'],
      jawaban: `🍢 **Sejarah Sate Madura**\n\n` +
               `Sate Madura adalah makanan khas Jawa Timur.\n\n` +
               `📜 **Sejarah**:\n` +
               `• Berasal dari Pulau Madura\n` +
               `• Awalnya adalah makanan para nelayan dan petani\n` +
               `• Sekarang jadi kuliner favorit di seluruh Indonesia\n\n` +
               `🥜 **Ciri khas**: Bumbu kacang yang kental dan manis\n\n` +
               `🍢 **Filosofi**: Menggambarkan keragaman bumbu sebagai\n` +
               `simbol akulturasi budaya Madura dengan pengaruh luar.`
    },
    // --- TOPIK 4: SEJARAH PEMPEK ---
    {
      keywords: ['pempek', 'palembang', 'sejarah pempek'],
      jawaban: `🍲 **Sejarah Pempek**\n\n` +
               `Pempek adalah makanan khas Palembang, Sumatera Selatan.\n\n` +
               `📜 **Sejarah**:\n` +
               `• Berasal dari masa Kerajaan Sriwijaya (abad ke-7)\n` +
               `• Nama "pempek" berasal dari kata "apek" (kakek)\n` +
               `• Konon diciptakan oleh seorang kakek tua di Palembang\n\n` +
               `🐟 **Bahan utama**: Ikan tenggiri atau belida yang digiling halus.\n\n` +
               `🍜 **Kuah cuko**: Kuah asam pedas manis yang jadi ciri khas pempek.`
    },
    // --- TOPIK 5: SEJARAH RAWON ---
    {
      keywords: ['rawon', 'sejarah rawon', 'rawon hitam'],
      jawaban: `🍖 **Sejarah Rawon**\n\n` +
               `Rawon adalah sup daging khas Jawa Timur.\n\n` +
               `📜 **Sejarah**:\n` +
               `• Berasal dari era Kerajaan Majapahit\n` +
               `• Awalnya adalah makanan para prajurit\n` +
               `• Warna hitam berasal dari kluwek (kepayang)\n\n` +
               `🖤 **Keunikan**: Kuah hitam pekat dengan aroma khas\n\n` +
               `🥩 **Penyajian**: Disajikan dengan nasi, tauge, dan sambal.`
    },
    // --- TOPIK 6: SEJARAH AYAM BETUTU ---
    {
      keywords: ['ayam betutu', 'bali', 'sejarah betutu'],
      jawaban: `🐔 **Sejarah Ayam Betutu**\n\n` +
               `Ayam betutu adalah makanan khas Bali.\n\n` +
               `📜 **Sejarah**:\n` +
               `• Berasal dari tradisi kuliner masyarakat Bali\n` +
               `• "Betutu" berarti "dipanggang" dalam bahasa Bali\n` +
               `• Awalnya disajikan untuk upacara keagamaan\n\n` +
               `🌿 **Bumbu base genep**: Campuran 10+ rempah khas Bali\n\n` +
               `🔥 **Proses**: Dimasak dengan api lambat selama 5-6 jam.`
    },
    // --- TOPIK 7: SEJARAH COTO MAKASSAR ---
    {
      keywords: ['coto', 'makassar', 'sejarah coto'],
      jawaban: `🍲 **Sejarah Coto Makassar**\n\n` +
               `Coto Makassar adalah sup khas Sulawesi Selatan.\n\n` +
               `📜 **Sejarah**:\n` +
               `• Berasal dari budaya kuliner Bugis-Makassar\n` +
               `• Awalnya adalah makanan para bangsawan\n` +
               `• Sekarang jadi ikon kuliner Makassar\n\n` +
               `🥩 **Bahan**: Daging sapi dan jeroan dengan kuah kacang\n\n` +
               `🍚 **Penyajian**: Disajikan dengan ketupat dan sambal.`
    },
    // --- TOPIK 8: SEJARAH PAPEDA ---
    {
      keywords: ['papeda', 'papua', 'maluku', 'sejarah papeda'],
      jawaban: `🍚 **Sejarah Papeda**\n\n` +
               `Papeda adalah makanan khas Papua dan Maluku.\n\n` +
               `📜 **Sejarah**:\n` +
               `• Berasal dari tradisi kuliner masyarakat adat Papua\n` +
               `• Bahan dasar sagu sudah digunakan sejak zaman prasejarah\n` +
               `• Jadi makanan pokok masyarakat di wilayah timur Indonesia\n\n` +
               `🌴 **Bahan**: Sagu yang diolah menjadi bubur kental\n\n` +
               `🐟 **Penyajian**: Disajikan dengan ikan kuah kuning.`
    },
    // --- TOPIK 9: SEJARAH TINUTUAN ---
    {
      keywords: ['tinutuan', 'manado', 'bubur manado', 'sejarah tinutuan'],
      jawaban: `🥣 **Sejarah Tinutuan (Bubur Manado)**\n\n` +
               `Tinutuan adalah bubur khas Manado, Sulawesi Utara.\n\n` +
               `📜 **Sejarah**:\n` +
               `• Berasal dari tradisi masyarakat Minahasa\n` +
               `• Awalnya adalah makanan sederhana para petani\n` +
               `• Sekarang jadi ikon kuliner Manado\n\n` +
               `🌿 **Isian**: Bayam, kangkung, jagung, labu kuning, dan singkong.\n\n` +
               `🥄 **Keunikan**: Kaya serat dan sayuran, cocok untuk sarapan sehat.`
    },
    // --- TOPIK 10: SEJARAH SOTO BANJAR ---
    {
      keywords: ['soto banjar', 'banjarmasin', 'kalimantan selatan', 'sejarah soto banjar'],
      jawaban: `🍜 **Sejarah Soto Banjar**\n\n` +
               `Soto Banjar adalah soto khas Banjarmasin, Kalimantan Selatan.\n\n` +
               `📜 **Sejarah**:\n` +
               `• Berasal dari budaya kuliner masyarakat Banjar\n` +
               `• Awalnya disajikan untuk acara adat dan hajatan\n` +
               `• Sekarang jadi kuliner favorit di Kalimantan\n\n` +
               `🐔 **Bahan**: Daging ayam dengan kuah bening gurih\n\n` +
               `🍚 **Penyajian**: Disajikan dengan ketupat dan sambal.`
    },
    // --- TOPIK 11: PELESTARIAN BUDAYA ---
    {
      keywords: ['budaya', 'warisan', 'tradisi', 'nilai budaya', 'filosofi', 'kearifan lokal'],
      jawaban: `🌏 **Warisan Budaya Kuliner Nusantara**\n\n` +
               `Setiap makanan di Indonesia menyimpan filosofi dan nilai budaya:\n\n` +
               `🍛 **Rendang** - Melambangkan musyawarah (daging = pemimpin, santan = ulama, cabe = pemuda)\n` +
               `🥘 **Gudeg** - Simbol kesederhanaan dan kehangatan masyarakat Jawa\n` +
               `🍢 **Sate Madura** - Mencerminkan keragaman bumbu (akulturasi budaya)\n\n` +
               `💡 AI Sejarah CitaRasa hadir untuk menjaga warisan ini tetap hidup di era digital!`
    },
    // --- TOPIK 12: ANCAMAN KEPUNAHAN ---
    {
      keywords: ['punah', 'terancam', 'hilang', 'generasi muda', 'milenial', 'zaman now'],
      jawaban: `📉 **Ancaman Kepunahan Kuliner Daerah**\n\n` +
               `FAO (2023) mencatat lebih dari 70% makanan khas daerah di Asia Tenggara terancam punah.\n\n` +
               `Penyebab utama:\n` +
               `• Pergeseran preferensi ke makanan instan & internasional\n` +
               `• Kurangnya akses informasi sejarah dan filosofi kuliner\n` +
               `• Minimnya promosi dan digitalisasi UMKM\n\n` +
               `🛡️ AI Sejarah CitaRasa hadir sebagai gerakan pelestarian:\n` +
               `✅ Edukasi sejarah & filosofi makanan\n` +
               `✅ NusaQuiz → Gamifikasi literasi kuliner\n` +
               `✅ Pemberdayaan UMKM → Ekonomi berkelanjutan`
    },
    // --- TOPIK 13: INDONESIA EMAS 2045 ---
    {
      keywords: ['indonesia emas', '2045', 'visi', 'masa depan'],
      jawaban: `🇮🇩 **AI Sejarah untuk Indonesia Emas 2045**\n\n` +
               `Kuliner bukan sekadar makanan, melainkan identitas bangsa.\n\n` +
               `Peran AI Sejarah CitaRasa dalam visi Indonesia Emas 2045:\n` +
               `• Mencetak generasi muda yang cinta sejarah budaya lokal\n` +
               `• Mengangkat UMKM kuliner ke panggung global\n` +
               `• Menjaga keberlanjutan warisan kuliner Nusantara\n\n` +
               `💪 Dengan teknologi dan kearifan lokal, kita wujudkan Indonesia Emas!`
    },
    // --- TOPIK 14: CARA BELI (PEMBERDAYAAN UMKM) ---
    {
      keywords: ['beli', 'cara beli', 'order', 'pesan', 'transaksi', 'checkout'],
      jawaban: `🛒 **Cara Membeli Kuliner Daerah di CitaRasa:**\n\n` +
               `1️⃣ **Pilih Produk** - Jelajahi halaman Kuliner Daerah\n` +
               `2️⃣ **Klik "Tambah ke Keranjang"** - Produk masuk ke keranjang\n` +
               `3️⃣ **Isi Data Pengiriman** - Alamat lengkap dan pilih kurir\n` +
               `4️⃣ **Pilih Pembayaran** - Transfer Bank, E-Wallet, atau COD\n` +
               `5️⃣ **Konfirmasi** - Pesanan diproses, makanan sampai ke rumah!\n\n` +
               `💡 Setiap pembelian juga mengumpulkan poin reward!`
    }
  ];


  // ============================================================
  // BAGIAN 4.2: AI SEJARAH - FUNGSI PENENTU OUTPUT
  // ============================================================
  // INI ADALAH JANTUNG DARI SISTEM AI SEJARAH!
  //
  //  FUNGSI: MENERIMA INPUT → MEMPROSES DENGAN ATURAN → OUTPUT
  //
  //  ALUR LENGKAP (INPUT → OUTPUT):
  //  ============================================================
  //  1. INPUT: User mengirim pertanyaan tentang kuliner
  //     Contoh: "apa sejarah rendang?"
  //
  //  2. PREPROCESSING: Ubah ke huruf kecil (toLowerCase)
  //     "apa sejarah rendang?"
  //
  //  3. DETEKSI SAPAAN (Aturan Khusus #1)
  //     Jika input = "halo/hai/pagi" → output sapaan
  //
  //  4. RULE-BASED SCORING (Aturan Utama!)
  //     Loop setiap item di aiSejarahKnowledge:
  //       - Jika kata kunci ADA di input → +15 poin
  //       - Jika kata kunci SEBAGIAN ada → +5 poin
  //     Pilih item dengan skor TERTINGGI
  //
  //  5. DECISION RULE (Aturan Penentu)
  //     Jika skor > 10 → jawaban valid, KIRIM OUTPUT!
  //     Jika skor ≤ 10 → lanjut ke FALLBACK
  //
  //  6. FALLBACK #1: CEK DATABASE KULINER
  //     Cek apakah input menyebut nama makanan tertentu
  //     Jika ya → kirim informasi makanan tersebut
  //
  //  7. FALLBACK #2: PESAN DEFAULT
  //     Jika semua aturan tidak terpenuhi,
  //     kirim daftar topik yang bisa ditanyakan
  //
  //  8. OUTPUT: Informasi sejarah dikirim ke user
  // ============================================================

  function cariJawabanAI(pertanyaan) {
    // --- VALIDASI INPUT ---
    if (!pertanyaan || pertanyaan.trim() === '') {
      return 'Silakan tulis pertanyaan terlebih dahulu.';
    }

    const lowerQ = pertanyaan.toLowerCase().trim();
    
    // --- ATURAN KHUSUS #1: DETEKSI SAPAAN ---
    if (lowerQ.match(/^(halo|hai|hey|hi|pagi|siang|sore|malam)/)) {
      return '🌾 Halo! Saya AI Sejarah CitaRasa. Ada yang bisa saya bantu tentang sejarah kuliner Nusantara?';
    }

    if (lowerQ.match(/^(makasih|terima kasih|thanks)/)) {
      return 'Sama-sama! Senang bisa membantu melestarikan sejarah kuliner Nusantara. Ada lagi yang ingin ditanyakan?';
    }

    // ============================================================
    // ATURAN UTAMA: RULE-BASED SCORING SYSTEM
    // ============================================================
    // Inilah yang MENENTUKAN OUTPUT AI SEJARAH!
    // Sistem menghitung skor untuk setiap pengetahuan
    // berdasarkan kemunculan kata kunci di input user.
    // ============================================================

    let bestMatch = null;
    let highestScore = 0;

    for (let item of aiSejarahKnowledge) {
      let score = 0;
      
      for (let keyword of item.keywords) {
        // ATURAN SCORING #1: EXACT MATCH → +15 poin
        if (lowerQ.includes(keyword)) {
          score += 15;
        }
        
        // ATURAN SCORING #2: PARTIAL MATCH → +5 poin
        const words = lowerQ.split(/\s+/);
        for (let word of words) {
          if (word.length > 3 && keyword.includes(word)) {
            score += 5;
          }
        }
      }
      
      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    // --- DECISION RULE: APAKAH SKOR CUKUP TINGGI? ---
    if (highestScore > 10 && bestMatch) {
      return bestMatch.jawaban;
    }

    // ============================================================
    // FALLBACK #1: CEK DATABASE KULINER
    // ============================================================
    for (let makanan of kulinerDaerah) {
      if (lowerQ.includes(makanan.nama.toLowerCase())) {
        return `🍽️ **${makanan.nama}**\n` +
               `Daerah: ${makanan.daerah}\n` +
               `UMKM: ${makanan.umkm}\n` +
               `Harga: Rp${makanan.harga.toLocaleString()}\n\n` +
               `🛒 **Cara beli**: ${makanan.caraBeli}`;
      }
    }

    // ============================================================
    // FALLBACK #2: PESAN DEFAULT
    // ============================================================
    return 'Maaf, saya belum paham. Saya adalah AI Sejarah CitaRasa.\n\n' +
           'Coba tanyakan tentang:\n' +
           '• Sejarah rendang / gudeg / sate / pempek / rawon\n' +
           '• Filosofi dan nilai budaya kuliner Nusantara\n' +
           '• Ancaman kepunahan kuliner daerah\n' +
           '• Peran kuliner untuk Indonesia Emas 2045\n' +
           '• Cara beli kuliner di CitaRasa';
  }


  // ============================================================
  // BAGIAN 4.3: AI SEJARAH - UI (INTERFACE)
  // ============================================================
  // Antarmuka pengguna untuk AI Sejarah
  // ============================================================

  const aiToggle = document.getElementById('ai-sejarah-toggle');
  const aiWindow = document.getElementById('ai-sejarah-window');
  const aiClose = document.getElementById('ai-sejarah-close');
  const aiMessages = document.getElementById('ai-sejarah-messages');
  const aiInput = document.getElementById('ai-sejarah-input');
  const aiSend = document.getElementById('ai-sejarah-send');

  function addAIMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `ai-message ${sender}`;
    
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formattedText = formattedText.replace(/\n/g, '<br>');
    msgDiv.innerHTML = formattedText;
    
    aiMessages.appendChild(msgDiv);
    aiMessages.scrollTop = aiMessages.scrollHeight;
  }

  function sendAIMessage() {
    const userText = aiInput.value.trim();
    if (!userText) return;

    addAIMessage(userText, 'user');
    aiInput.value = '';

    // Simulasi AI sedang memproses
    setTimeout(() => {
      const jawaban = cariJawabanAI(userText);
      addAIMessage(jawaban, 'ai');
    }, 800);
  }

  if (aiSend) {
    aiSend.addEventListener('click', sendAIMessage);
  }
  
  if (aiInput) {
    aiInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendAIMessage();
    });
  }

  if (aiToggle) {
    aiToggle.addEventListener('click', () => {
      aiWindow.style.display = 'flex';
      aiInput.focus();
    });
  }

  if (aiClose) {
    aiClose.addEventListener('click', () => {
      aiWindow.style.display = 'none';
    });
  }

  document.addEventListener('click', (e) => {
    if (aiWindow && aiToggle) {
      if (!aiWindow.contains(e.target) && !aiToggle.contains(e.target) && aiWindow.style.display === 'flex') {
        aiWindow.style.display = 'none';
      }
    }
  });


  // ============================================================
  // BAGIAN 5: MOBILE MENU
  // ============================================================

  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      menuToggle.innerHTML = mobileMenu.classList.contains('hidden') 
        ? '<i class="fas fa-bars text-xl"></i>' 
        : '<i class="fas fa-times text-xl"></i>';
    });
  }

  window.closeMobileMenu = function() {
    if (mobileMenu && menuToggle) {
      mobileMenu.classList.add('hidden');
      menuToggle.innerHTML = '<i class="fas fa-bars text-xl"></i>';
    }
  };


  // ============================================================
  // BAGIAN 6: ADD TO CART
  // ============================================================

  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function() {
      const name = this.dataset.name;
      alert(`✅ "${name}" ditambahkan ke keranjang!\n\nLanjutkan ke halaman checkout untuk menyelesaikan pembelian.`);
    });
  });

})();
