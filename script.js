// ============================================================
// ============================================================
// FILE: CITARASA - MELESTARIKAN KULINER DAERAH
// VERSI: 3.0 (Dengan Komentar Rule-Based)
// ============================================================
// ============================================================

(function() {
  "use strict";

  // ============================================================
  // BAGIAN 1: DATABASE KULINER DAERAH
  // ============================================================
  // Database ini menyimpan informasi makanan khas Nusantara
  // yang digunakan untuk:
  // 1. Menampilkan katalog produk di halaman utama
  // 2. Sebagai sumber data untuk chatbot (pencocokan nama makanan)
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
  // BAGIAN 4: RULE-BASED CHATBOT (SISTEM PENENTU OUTPUT AI)
  // ============================================================
  // ============================================================
  //
  //  📌  APA ITU RULE-BASED DI SINI?
  //  ============================================================
  //  Rule-Based adalah SISTEM yang MENENTUKAN OUTPUT AI
  //  berdasarkan ATURAN-ATURAN LOGIKA yang sudah ditentukan.
  //
  //  Bukan sekadar database tanya-jawab, tetapi:
  //  - Menerima INPUT dari user (pertanyaan)
  //  - Memproses dengan ATURAN (scoring, pattern matching)
  //  - Menghasilkan OUTPUT (jawaban terbaik)
  //
  //  ============================================================
  //  METODE: PATTERN MATCHING DENGAN SCORING SYSTEM
  //  ============================================================
  //  
  //  ALUR KERJA RULE-BASED (DARI INPUT KE OUTPUT):
  //  ------------------------------------------------------------
  //  STEP 1: INPUT
  //          User mengetik pertanyaan di chat
  //          Contoh: "bagaimana cara beli rendang?"
  //
  //  STEP 2: PREPROCESSING
  //          Sistem mengubah input ke huruf kecil (toLowerCase)
  //          "bagaimana cara beli rendang?"
  //
  //  STEP 3: RULE-BASED SCORING (INTI DARI SISTEM!)
  //          Sistem mencocokkan kata kunci dari input
  //          dengan database pengetahuan (chatbotKnowledge)
  //          ----------------------------------------------------
  //          ATURAN SCORING:
  //          - Jika kata kunci EXACT match   → +15 poin
  //          - Jika kata kunci sebagian      → +5 poin
  //          ----------------------------------------------------
  //          Contoh scoring:
  //          "cara beli" → match dengan keywords ['beli','cara beli']
  //                        → +15 poin
  //          "rendang"   → match dengan keywords ['rendang']
  //                        → +15 poin
  //          Total skor: 30 → JAWABAN TERBAIK!
  //
  //  STEP 4: SELEKSI JAWABAN (DECISION RULE)
  //          ATURAN: Pilih item dengan skor TERTINGGI
  //          Jika skor > 10 → jawaban dianggap valid
  //          Jika skor ≤ 10 → lanjut ke FALLBACK
  //
  //  STEP 5: OUTPUT
  //          Sistem mengirimkan jawaban terbaik ke user
  //          "Rendang Padang... (informasi lengkap)"
  //
  //  ============================================================
  //  KELEBIHAN RULE-BASED SEBAGAI SISTEM PENENTU OUTPUT:
  //  ============================================================
  //  ✅ Akurasi 100% pada basis pengetahuan yang telah dipetakan
  //  ✅ Tidak ada halusinasi AI (jawaban selalu terkontrol)
  //  ✅ Cepat dan ringan, cocok untuk MVP
  //  ✅ Mudah ditambahkan pengetahuan baru tanpa mengubah sistem
  //  ✅ Transparan - semua keputusan bisa dilacak
  //  ✅ Prediktif - output selalu konsisten untuk input yang sama
  //
  //  ============================================================
  //  KETERBATASAN RULE-BASED:
  //  ============================================================
  //  ❌ Tidak bisa memahami konteks kalimat kompleks
  //  ❌ Hanya merespons berdasarkan kata kunci spesifik
  //  ❌ Tidak bisa belajar dari interaksi (statis)
  //  ❌ Membutuhkan pembaruan manual database pengetahuan
  //  ❌ Tidak bisa menangani pertanyaan di luar domain
  //  ============================================================


  // ============================================================
  // BAGIAN 4.1: KNOWLEDGE BASE (DATABASE PENGETAHUAN)
  // ============================================================
  // Database ini adalah sumber PENGETAHUAN bagi sistem AI.
  // Setiap objek berisi:
  //   - keywords: array kata kunci yang AKAN MEMICU jawaban
  //   - jawaban: OUTPUT yang akan diberikan jika aturan terpenuhi
  //
  //  Cara kerja: Sistem akan mencocokkan input user dengan
  //  keywords ini. Jika cocok (sesuai aturan scoring),
  //  maka output jawaban akan diberikan.
  // ============================================================

  const chatbotKnowledge = [
    // --- TOPIK 1: PANDUAN CARA BELI ---
    {
      keywords: ['beli', 'cara beli', 'order', 'pesan', 'transaksi', 'checkout'],
      jawaban: `🛒 **Cara Membeli Kuliner Daerah di CitaRasa:**\n\n` +
               `1️⃣ **Pilih Produk** - Jelajahi halaman Kuliner Daerah atau marketplace\n` +
               `2️⃣ **Klik "Tambah ke Keranjang"** - Produk akan masuk ke keranjang belanja\n` +
               `3️⃣ **Isi Data Pengiriman** - Masukkan alamat lengkap dan pilih kurir\n` +
               `4️⃣ **Pilih Pembayaran** - Transfer Bank, E-Wallet, atau COD\n` +
               `5️⃣ **Konfirmasi** - Pesanan diproses, makanan sampai ke rumah!\n\n` +
               `💡 Setiap pembelian juga mengumpulkan poin reward yang bisa ditukar hadiah!`
    },
    // --- TOPIK 2: RENDANG ---
    {
      keywords: ['rendang', 'padang', 'minang'],
      jawaban: `🍛 **Rendang Padang**\n` +
               `Asal: Sumatera Barat\n` +
               `UMKM: Mak Yun\n` +
               `Harga: Rp45.000\n` +
               `Deskripsi: Rendang asli Minang dengan rempah tradisional, dimasak 7 jam.\n\n` +
               `🛒 **Cara beli**: Kunjungi halaman Kuliner Daerah, cari "Rendang Mak Yun", tambah ke keranjang, lalu checkout.`
    },
    // --- TOPIK 3: GUDEG ---
    {
      keywords: ['gudeg', 'jogja', 'yogyakarta'],
      jawaban: `🥘 **Gudeg Jogja**\n` +
               `Asal: Yogyakarta\n` +
               `UMKM: Bu Gandes\n` +
               `Harga: Rp30.000\n` +
               `Deskripsi: Gudeg manis legit dengan nasi, ayam, telur, dan sambal krecek.\n\n` +
               `🛒 **Cara beli**: Tersedia di kategori "Kuliner Jawa". Tambah ke keranjang dan checkout.`
    },
    // --- TOPIK 4: SATE MADURA ---
    {
      keywords: ['sate', 'madura'],
      jawaban: `🍢 **Sate Madura**\n` +
               `Asal: Jawa Timur\n` +
               `UMKM: Pak Samin\n` +
               `Harga: Rp25.000\n` +
               `Deskripsi: Sate ayam dengan bumbu kacang kental dan lontong.\n\n` +
               `🛒 **Cara beli**: Pesan sekarang di halaman produk Sate Madura.`
    },
    // --- TOPIK 5: PEMPEK ---
    {
      keywords: ['pempek', 'palembang'],
      jawaban: `🍲 **Pempek Palembang**\n` +
               `Asal: Sumatera Selatan\n` +
               `UMKM: Kapal Saga\n` +
               `Harga: Rp35.000\n` +
               `Deskripsi: Pempek ikan dengan kuah cuko asam pedas manis.\n\n` +
               `🛒 **Cara beli**: Tersedia di marketplace. Jangan lupa tambahkan ekstra cuko!`
    },
    // --- TOPIK 6: DAFTAR UMKM ---
    {
      keywords: ['umkm', 'penjual', 'daftar umkm', 'jualan'],
      jawaban: `🏪 **Daftar sebagai UMKM**\n` +
               `Ingin produk kuliner daerahmu dikenal luas? Daftar UMKM sekarang!\n\n` +
               `1️⃣ Klik menu "Bergabung" > "Daftar UMKM"\n` +
               `2️⃣ Isi formulir lengkap dengan data usaha\n` +
               `3️⃣ Upload foto produk dan dokumen pendukung\n` +
               `4️⃣ Tim kami akan verifikasi dalam 1x24 jam\n\n` +
               `Dapatkan fitur gratis untuk memulai!`
    },
    // --- TOPIK 7: REWARD & POIN ---
    {
      keywords: ['reward', 'poin', 'tukar poin', 'hadiah'],
      jawaban: `🎁 **Program Reward**\n` +
               `Setiap pembelian di CitaRasa akan mendapatkan poin:\n` +
               `• Setiap Rp10.000 = 10 poin\n` +
               `• Poin bisa ditukar dengan voucher belanja\n` +
               `• Reward spesial: merchandise, kelas masak, peralatan UMKM\n\n` +
               `🔍 Cek halaman Reward untuk melihat katalog lengkap!`
    },
    // --- TOPIK 8: AFILIASI ---
    {
      keywords: ['afiliasi', 'komisi', 'promosi'],
      jawaban: `🤝 **Program Afiliasi**\n` +
               `Dapatkan komisi dengan mempromosikan produk kuliner daerah:\n` +
               `• Daftar gratis, dapatkan link unik\n` +
               `• Komisi 5-15% dari setiap penjualan\n` +
               `• Pantau performa di dashboard afiliasi\n\n` +
               `💰 Mulai dapatkan penghasilan pasif sekarang!`
    },
    // --- TOPIK 9: FITUR PREMIUM ---
    {
      keywords: ['premium', 'fitur premium', 'berbayar'],
      jawaban: `👑 **Fitur Premium untuk Penjual**\n` +
               `Tingkatkan penjualan dengan fitur eksklusif:\n` +
               `• Dashboard analitik real-time\n` +
               `• Promosi prioritas di halaman utama\n` +
               `• Pelatihan digital marketing\n` +
               `• Dukungan prioritas\n\n` +
               `Biaya mulai Rp50.000/bulan. Klik menu Premium untuk info lengkap.`
    },
    // --- TOPIK 10: AI SEJARAH ---
    {
      keywords: ['sejarah', 'ai sejarah', 'tanya makanan'],
      jawaban: `🤖 **AI Sejarah Kuliner**\n` +
               `Ingin tahu asal-usul makanan favoritmu? Gunakan fitur AI Sejarah!\n\n` +
               `• Tanyakan sejarah rendang, sate, gudeg, dll\n` +
               `• Fakta unik dan filosofi di balik makanan\n` +
               `• Database 30+ makanan Nusantara\n\n` +
               `🔍 Klik card "AI Sejarah" di halaman utama atau menu AI Sejarah.`
    },
    // --- TOPIK 11: NUSAQUIZ ---
    {
      keywords: ['kuis', 'quiz', 'nusaquiz', 'game', 'permainan'],
      jawaban: `🎮 **NusaQuiz - Gamified Culinary Quiz**\n\n` +
               `Uji pengetahuan kulinermu dan dapatkan poin!\n\n` +
               `• 10 pertanyaan seputar kuliner Nusantara\n` +
               `• Setiap jawaban benar = 10 poin\n` +
               `• Streak 3x berturut-turut = bonus 5 poin\n` +
               `• Poin bisa ditukar dengan reward di halaman Reward\n\n` +
               `👉 Coba sekarang di bagian "NusaQuiz" di halaman utama!`
    },
    // --- TOPIK 12: PELESTARIAN BUDAYA ---
    {
      keywords: ['budaya', 'warisan', 'tradisi', 'nilai budaya', 'filosofi', 'kearifan lokal'],
      jawaban: `🌏 **Warisan Budaya Kuliner Nusantara**\n\n` +
               `Setiap makanan di Indonesia menyimpan filosofi dan nilai budaya:\n\n` +
               `🍛 **Rendang** - Melambangkan musyawarah (daging sapi = pemimpin, santan = ulama, cabe = pemuda)\n` +
               `🥘 **Gudeg** - Simbol kesederhanaan dan kehangatan masyarakat Jawa\n` +
               `🍢 **Sate Madura** - Mencerminkan keragaman bumbu (akulturasi budaya)\n\n` +
               `💡 CitaRasa hadir untuk menjaga warisan ini tetap hidup di era digital!`
    },
    // --- TOPIK 13: ANCAMAN KEPUNAHAN ---
    {
      keywords: ['punah', 'terancam', 'hilang', 'generasi muda', 'milenial', 'zaman now'],
      jawaban: `📉 **Ancaman Kepunahan Kuliner Daerah**\n\n` +
               `FAO (2023) mencatat lebih dari 70% makanan khas daerah di Asia Tenggara terancam punah.\n\n` +
               `Penyebab utama:\n` +
               `• Pergeseran preferensi ke makanan instan & internasional\n` +
               `• Kurangnya akses informasi kuliner lokal\n` +
               `• Minimnya promosi dan digitalisasi UMKM\n\n` +
               `🛡️ CitaRasa hadir sebagai gerakan pelestarian:\n` +
               `✅ AI Sejarah → Edukasi budaya\n` +
               `✅ NusaQuiz → Gamifikasi literasi kuliner\n` +
               `✅ Pemberdayaan UMKM → Ekonomi berkelanjutan`
    },
    // --- TOPIK 14: INDONESIA EMAS 2045 ---
    {
      keywords: ['indonesia emas', '2045', 'visi', 'masa depan'],
      jawaban: `🇮🇩 **CitaRasa untuk Indonesia Emas 2045**\n\n` +
               `Kuliner bukan sekadar makanan, melainkan identitas bangsa.\n\n` +
               `Peran CitaRasa dalam visi Indonesia Emas 2045:\n` +
               `• Mencetak generasi muda yang cinta budaya lokal\n` +
               `• Mengangkat UMKM kuliner ke panggung global\n` +
               `• Menjaga keberlanjutan warisan kuliner Nusantara\n\n` +
               `💪 Dengan teknologi dan kearifan lokal, kita wujudkan Indonesia Emas!`
    }
  ];


  // ============================================================
  // BAGIAN 4.2: FUNGSI PENENTU OUTPUT AI (cariJawaban)
  // ============================================================
  // INI ADALAH JANTUNG DARI RULE-BASED SYSTEM!
  //
  //  FUNGSI: MENERIMA INPUT → MEMPROSES DENGAN ATURAN → OUTPUT
  //
  //  ALUR LENGKAP (INPUT → OUTPUT):
  //  ============================================================
  //  1. INPUT: User mengirim pertanyaan
  //     Contoh: "bagaimana cara beli rendang?"
  //
  //  2. PREPROCESSING: Ubah ke huruf kecil (toLowerCase)
  //     "bagaimana cara beli rendang?"
  //
  //  3. DETEKSI SAPAAN (Aturan Khusus #1)
  //     Jika input = "halo/hai/pagi/siang" → output sapaan
  //     Jika input = "makasih/terima kasih" → output terima kasih
  //
  //  4. RULE-BASED SCORING (Aturan Utama!)
  //     Loop setiap item di chatbotKnowledge:
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
  //  8. OUTPUT: Jawaban dikirim ke user
  // ============================================================

  function cariJawaban(pertanyaan) {
    // --- VALIDASI INPUT ---
    // Aturan: Jika input kosong, output peringatan
    if (!pertanyaan || pertanyaan.trim() === '') {
      return 'Silakan tulis pertanyaan terlebih dahulu.';
    }

    const lowerQ = pertanyaan.toLowerCase().trim();
    
    // --- ATURAN KHUSUS #1: DETEKSI SAPAAN ---
    // Jika input adalah sapaan, output sapaan balasan
    if (lowerQ.match(/^(halo|hai|hey|hi|pagi|siang|sore|malam)/)) {
      return '🌾 Halo! Ada yang bisa saya bantu tentang pelestarian kuliner daerah?';
    }

    // --- ATURAN KHUSUS #2: DETEKSI UCAPAN TERIMA KASIH ---
    if (lowerQ.match(/^(makasih|terima kasih|thanks)/)) {
      return 'Sama-sama! Senang bisa membantu melestarikan kuliner daerah bersama kamu. Ada lagi yang ingin ditanyakan?';
    }

    // ============================================================
    // ATURAN UTAMA: RULE-BASED SCORING SYSTEM
    // ============================================================
    // Inilah yang MENENTUKAN OUTPUT AI!
    // Sistem menghitung skor untuk setiap item pengetahuan
    // berdasarkan kemunculan kata kunci di input user.
    // ============================================================

    let bestMatch = null;
    let highestScore = 0;

    // --- LOOPING SETIAP PENGETAHUAN ---
    for (let item of chatbotKnowledge) {
      let score = 0;
      
      // --- HITUNG SKOR BERDASARKAN KATA KUNCI ---
      for (let keyword of item.keywords) {
        
        // ATURAN SCORING #1: EXACT MATCH
        // Jika kata kunci muncul PERSIS di input → +15 poin
        if (lowerQ.includes(keyword)) {
          score += 15;
        }
        
        // ATURAN SCORING #2: PARTIAL MATCH (substring)
        // Jika ada kemiripan kata → +5 poin
        const words = lowerQ.split(/\s+/);
        for (let word of words) {
          if (word.length > 3 && keyword.includes(word)) {
            score += 5;
          }
        }
      }
      
      // --- SIMPAN ITEM DENGAN SKOR TERTINGGI ---
      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    // --- DECISION RULE: APAKAH SKOR CUKUP TINGGI? ---
    // ATURAN: Jika skor > 10, jawaban dianggap valid
    // Jika skor ≤ 10, tidak cukup bukti → cari alternatif
    if (highestScore > 10 && bestMatch) {
      // OUTPUT: Kirim jawaban terbaik!
      return bestMatch.jawaban;
    }

    // ============================================================
    // FALLBACK #1: CEK DATABASE KULINER
    // ============================================================
    // Jika tidak ada match di chatbotKnowledge,
    // cek apakah user bertanya tentang makanan tertentu
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
    // Jika semua aturan tidak terpenuhi,
    // tampilkan daftar topik yang bisa ditanyakan
    // ============================================================

    return 'Maaf, saya belum paham. Coba tanyakan tentang:\n\n' +
           '• Cara beli kuliner daerah\n' +
           '• Informasi rendang/gudeg/sate/pempek\n' +
           '• Daftar UMKM\n' +
           '• Program reward\n' +
           '• Afiliasi\n' +
           '• Fitur premium\n' +
           '• NusaQuiz (kuis kuliner)\n' +
           '• AI Sejarah\n' +
           '• Pelestarian budaya dan kearifan lokal\n' +
           '• Visi Indonesia Emas 2045';
  }


  // ============================================================
  // BAGIAN 4.3: CHATBOT UI (ANTARMUKA PENGGUNA)
  // ============================================================
  // FITUR UI CHATBOT:
  // 1. Floating button untuk toggle chatbot
  // 2. Window chat dengan pesan user (kanan) dan bot (kiri)
  // 3. Input field + tombol kirim
  // 4. Enter key support
  // 5. Auto-scroll ke pesan terbaru
  // 6. Close button dan click outside untuk tutup
  // 7. Format teks bold dengan **markdown**
  // 8. Line break otomatis dari \n ke <br>
  // ============================================================

  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbot = document.getElementById('chatbot-citarasa');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSend = document.getElementById('chatbot-send');

  function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `chatbot-message ${sender}`;
    
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formattedText = formattedText.replace(/\n/g, '<br>');
    msgDiv.innerHTML = formattedText;
    
    chatbotMessages.appendChild(msgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function sendMessage() {
    const userText = chatbotInput.value.trim();
    if (!userText) return;

    addMessage(userText, 'user');
    chatbotInput.value = '';

    // Simulasi jeda "mengetik" (seperti AI sedang memproses)
    setTimeout(() => {
      // Panggil fungsi Rule-Based untuk menentukan OUTPUT!
      const jawaban = cariJawaban(userText);
      addMessage(jawaban, 'bot');
    }, 800);
  }

  if (chatbotSend) {
    chatbotSend.addEventListener('click', sendMessage);
  }
  
  if (chatbotInput) {
    chatbotInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }

  if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
      chatbot.style.display = 'flex';
      chatbotInput.focus();
    });
  }

  if (chatbotClose) {
    chatbotClose.addEventListener('click', () => {
      chatbot.style.display = 'none';
    });
  }

  document.addEventListener('click', (e) => {
    if (chatbot && chatbotToggle) {
      if (!chatbot.contains(e.target) && !chatbotToggle.contains(e.target) && chatbot.style.display === 'flex') {
        chatbot.style.display = 'none';
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
