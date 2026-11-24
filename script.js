// ============================================================
// ============================================================
// FILE: MOJORASA - UMKM MOJOKERTO & KULINER DAERAH
// VERSI: 4.1 (Update Kuis & Database Kuliner Mojokerto)
// ============================================================
// ============================================================
//
//  📌  FITUR UTAMA:
//  ------------------------------------------------------------
//  1.  AI SEJARAH - Sistem Rule-Based untuk edukasi budaya kuliner
//  2.  NUSAQUIZ - Gamifikasi edukasi kuliner Mojokerto & Nusantara
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
  // BAGIAN 1: DATABASE KULINER MOJOKERTO & DAERAH
  // ============================================================

  const kulinerDaerah = [
    {
      nama: "Onde-onde Mojokerto",
      daerah: "Kota Mojokerto, Jawa Timur",
      umkm: "UMKM Onde-onde Bo Liem",
      harga: 35000,
      caraBeli: "Onde-onde khas Mojokerto bisa dibeli langsung di halaman Kuliner Daerah MojoRasa. Klik produk, tambah ke keranjang, lalu checkout."
    },
    {
      nama: "Sambel Wader Trowulan",
      daerah: "Trowulan, Mojokerto",
      umkm: "Warung Wader Kolam Segaran",
      harga: 20000,
      caraBeli: "Sambel Wader khas Trowulan tersedia di etalase UMKM Mojokerto. Tambahkan ke keranjang dan pilih pengiriman instan atau reguler."
    },
    {
      nama: "Kerupuk Rambak Bangsal",
      daerah: "Bangsal, Mojokerto",
      umkm: "Sentra Rambak Bangsal",
      harga: 28000,
      caraBeli: "Kerupuk Rambak kulit sapi asli Bangsal bisa dipesan langsung di halaman produk MojoRasa."
    },
    {
      nama: "Sate Keong Trowulan",
      daerah: "Trowulan, Mojokerto",
      umkm: "UMKM Sate Keong Majapahit",
      harga: 18000,
      caraBeli: "Sate Keong bumbu kacang pedas khas Trowulan bisa dipesan melalui marketplace MojoRasa."
    },
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
  // BAGIAN 2: NUSAQUIZ - KUIS KULINER MOJOKERTO & NUSANTARA
  // ============================================================

  const quizQuestions = [
    {
      question: "Jajanan legendaris berbalut wijen dengan isian kacang hijau yang menjadi julukan utama Kota Mojokerto adalah?",
      options: ["Wingko Babat", "Onde-onde", "Klepon", "Kue Putu"],
      correct: 1,
      explanation: "Kota Mojokerto dijuluki sebagai Kota Onde-onde karena kuliner legendarisnya yang terkenal sejak tahun 1929 (seperti Onde-onde Bo Liem).",
      points: 10
    },
    {
      question: "Kawasan wisata sejarah di Mojokerto yang menjadi sentra kuliner ikonik Sambel Wader adalah?",
      options: ["Pacet", "Trawas", "Trowulan", "Mojosari"],
      correct: 2,
      explanation: "Sambel Wader sangat terkenal di kawasan Trowulan, khususnya di sekitar situs sejarah Kolam Segaran.",
      points: 10
    },
    {
      question: "Kecamatan di Kabupaten Mojokerto yang dikenal luas sebagai sentra industri UMKM Kerupuk Rambak adalah?",
      options: ["Bangsal", "Puri", "Dawarblandong", "Jatirejo"],
      correct: 0,
      explanation: "Kecamatan Bangsal merupakan pusat produksi UMKM kerupuk rambak kulit sapi/kerbau terbesar di Mojokerto.",
      points: 10
    },
    {
      question: "Apa keunikan proses penggorengan 'Kerupuk Upil' khas Mojokerto dan Jawa Timur?",
      options: ["Digoreng dengan minyak kelapa", "Digoreng menggunakan pasir sungai panas", "Dipanggang di atas bara api", "Dikukus dengan daun pisang"],
      correct: 1,
      explanation: "Kerupuk upil digoreng tanpa minyak melainkan menggunakan pasir sungai bersih yang dipanaskan, lalu disajikan dengan sambal petis.",
      points: 10
    },
    {
      question: "Selain Sambel Wader, sate unik berbahan dasar hewan sawah yang populer di sekitar Trowulan Mojokerto adalah?",
      options: ["Sate Kelinci", "Sate Keong", "Sate Lilit", "Sate Kerang"],
      correct: 1,
      explanation: "Sate Keong sawah dengan bumbu bacem dan sambal kacang merupakan kuliner khas masyarakat sekitar Trowulan, Mojokerto.",
      points: 10
    },
    {
      question: "Minuman rempah berwarna merah alami yang dipercaya sudah ada sejak era Kerajaan Majapahit di Mojokerto adalah?",
      options: ["Wedang Ronde", "Wedang Uwuh", "Wedang Secang", "Bandrek"],
      correct: 2,
      explanation: "Wedang Secang terbuat dari serutan kayu secang dan rempah-rempah Nusantara yang diwariskan sejak zaman Majapahit.",
      points: 10
    },
    {
      question: "Kawasan dataran tinggi di Mojokerto yang terkenal dengan kuliner Nasi Jagung dan Tape Ketan Hitam adalah?",
      options: ["Pacet & Trawas", "Gedeg & Kemlagi", "Sooko & Puri", "Ngoro & Pungging"],
      correct: 0,
      explanation: "Pacet dan Trawas di lereng Gunung Welirang-Penanggungan terkenal dengan kuliner hangat seperti Nasi Jagung dan oleh-oleh Tape Ketan.",
      points: 10
    },
    {
      question: "Hidangan berkuah santan kental kaya rempah khas daerah Mojosari, Mojokerto berbahan daging unggas adalah?",
      options: ["Opor Ayam", "Gulai Mentok", "Soto Lamongan", "Rawon Setan"],
      correct: 1,
      explanation: "Gulai Mentok (itik serati) merupakan salah satu kuliner gurih-pedas andalan di kawasan Mojosari, Mojokerto.",
      points: 10
    },
    {
      question: "Lauk tradisional khas Mojokerto yang dibungkus daun pisang berisi campuran tempe, kelapa parut, dan lamtoro adalah?",
      options: ["Pepes Ikan", "Botok Tempe", "Gadon Daging", "Garang Asem"],
      correct: 1,
      explanation: "Botok Tempe adalah lauk rumahan khas Jawa Timur dan Mojokerto yang dikukus dalam daun pisang bersama kelapa muda parut.",
      points: 10
    },
    {
      question: "Sup daging berkuah hitam pekat yang catatan sejarahnya sudah ditemukan sejak era Kerajaan Majapahit adalah?",
      options: ["Rawon", "Soto Banjar", "Coto Makassar", "Empal Gentong"],
      correct: 0,
      explanation: "Rawon tercatat dalam prasasti era Kerajaan Majapahit (dengan nama 'Rarawwan') dan menggunakan kluwek sebagai pewarna hitam alami.",
      points: 10
    }
  ];

  // ============================================================
  // BAGIAN 3: NUSAQUIZ - STATE MANAGEMENT
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
    showFeedback('⏰ Waktu habis! Yuk lanjut ke soal berikutnya.', 'error');
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

      if (currentQuizState.answers[index] === undefined) {
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
        showFeedback(`🔥 Streak ${currentQuizState.streak}! +5 bonus poin! ${quizQuestions[questionIndex].explanation}`, 'success');
      } else {
        showFeedback(`✅ Benar! +10 poin. ${quizQuestions[questionIndex].explanation}`, 'success');
      }
    } else {
      currentQuizState.streak = 0;
      showFeedback(`❌ Kurang tepat. ${quizQuestions[questionIndex].explanation}`, 'error');
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
  // BAGIAN 4: AI SEJARAH & ASISTEN MOJORASA (RULE-BASED SYSTEM)
  // ============================================================

  const aiSejarahKnowledge = [
    // --- TOPIK MOJOKERTO 1: ONDE-ONDE MOJOKERTO ---
    {
      keywords: ['onde', 'onde-onde', 'mojokerto', 'bo liem', 'kota onde'],
      jawaban: `🟡 **Sejarah Onde-Onde Mojokerto**\n\n` +
               `Onde-onde adalah ikon utama yang membuat Mojokerto dijuluki sebagai **"Kota Onde-onde"**.\n\n` +
               `📜 **Sejarah**:\n` +
               `• Berakar dari akulturasi budaya Tionghoa-Jawa sejak era Kerajaan Majapahit\n` +
               `• Dipopulerkan secara komersial di Mojokerto sejak 1929 oleh perintis seperti Bo Liem\n` +
               `• Kini menjadi penopang utama ratusan pelaku UMKM oleh-oleh di Mojokerto\n\n` +
               `✨ **Ciri Khas**: Kulit tepung ketan yang kenyal namun renyah di luar, taburan wijen melimpah, dan isian kacang hijau kupas yang lembut.`
    },
    // --- TOPIK MOJOKERTO 2: SAMBEL WADER TROWULAN ---
    {
      keywords: ['wader', 'sambel wader', 'trowulan', 'kolam segaran'],
      jawaban: `🐟 **Sejarah Sambel Wader Trowulan**\n\n` +
               `Sambel Wader adalah kuliner khas kawasan cagar budaya Trowulan, Mojokerto.\n\n` +
               `📜 **Asal-Usul**:\n` +
               `• Memanfaatkan ikan wader air tawar dari sungai dan kolam kuno peninggalan Majapahit (seperti Kolam Segaran)\n` +
               `• Ikan wader digoreng garing sehingga renyah dimakan utuh\n` +
               `• Disajikan di atas cobek dengan sambal terasi tomat segar dan lalapan kemangi.`
    },
    // --- TOPIK MOJOKERTO 3: KERUPUK RAMBAK BANGSAL ---
    {
      keywords: ['rambak', 'kerupuk rambak', 'bangsal', 'kulit sapi'],
      jawaban: `🍘 **Sentra UMKM Kerupuk Rambak Bangsal**\n\n` +
               `Kerupuk Rambak adalah camilan gurih berbahan kulit sapi atau kerbau pilihan khas Kecamatan Bangsal, Kabupaten Mojokerto.\n\n` +
               `🏭 **Ekonomi Kerakyatan**:\n` +
               `• Diproduksi turun-temurun oleh puluhan keluarga UMKM di Desa Bangsal dan sekitarnya\n` +
               `• Melalui proses perebusan, pengeringan sinar matahari, hingga penggorengan dua tahap agar mekar sempurna.`
    },
    // --- TOPIK MOJOKERTO 4: SATE KEONG & WEDANG SECANG ---
    {
      keywords: ['keong', 'sate keong', 'secang', 'wedang secang', 'majapahit'],
      jawaban: `🍢 **Warisan Gastronomi Majapahit (Sate Keong & Wedang Secang)**\n\n` +
               `Kawasan Trowulan Mojokerto menyimpan kekayaan resep kuno era Majapahit:\n` +
               `• **Sate Keong**: Keong sawah dibumbui bacem rempah agar empuk lalu dibakar dengan bumbu kacang.\n` +
               `• **Wedang Secang**: Minuman hangat berwarna merah dari kayu secang, jahe, dan kapulaga yang dulu disajikan untuk menjaga stamina bangsawan Majapahit.`
    },
    // --- TOPIK 5: SEJARAH RENDANG ---
    {
      keywords: ['rendang', 'padang', 'minang', 'sejarah rendang'],
      jawaban: `🍛 **Sejarah Rendang**\n\n` +
               `Rendang adalah masakan khas Minangkabau yang berasal dari Sumatera Barat.\n\n` +
               `📜 **Filosofi**: Rendang melambangkan musyawarah dan kebersamaan:\n` +
               `• Daging sapi (pemimpin) - simbol kepala adat\n` +
               `• Santan (ulama) - simbol pengetahuan agama\n` +
               `• Cabai (pemuda) - simbol semangat juang\n\n` +
               `🌏 UNESCO mengakui rendang sebagai warisan budaya tak benda Indonesia.`
    },
    // --- TOPIK 6: SEJARAH GUDEG ---
    {
      keywords: ['gudeg', 'jogja', 'yogyakarta', 'sejarah gudeg'],
      jawaban: `🥘 **Sejarah Gudeg**\n\n` +
               `Gudeg adalah makanan khas Yogyakarta yang terbuat dari nangka muda.\n\n` +
               `📜 **Sejarah**:\n` +
               `• Berasal dari masa Kerajaan Mataram Islam\n` +
               `• Proses memasak berjam-jam dengan gula aren menghasilkan rasa manis legit yang khas.`
    },
    // --- TOPIK 7: SEJARAH SATE MADURA ---
    {
      keywords: ['sate madura', 'madura', 'sejarah sate'],
      jawaban: `🍢 **Sejarah Sate Madura**\n\n` +
               `Sate Madura adalah kuliner kebanggaan Jawa Timur dengan ciri khas bumbu kacang yang kental, gurih, dan manis.`
    },
    // --- TOPIK 8: SEJARAH PEMPEK ---
    {
      keywords: ['pempek', 'palembang', 'sejarah pempek'],
      jawaban: `🍲 **Sejarah Pempek**\n\n` +
               `Pempek adalah makanan khas Palembang yang berakar sejak era Kerajaan Sriwijaya, terbuat dari olahan ikan giling dan sagu dengan kuah cuko.`
    },
    // --- TOPIK 9: SEJARAH RAWON ---
    {
      keywords: ['rawon', 'sejarah rawon', 'rawon hitam'],
      jawaban: `🍖 **Sejarah Rawon (Warisan Majapahit)**\n\n` +
               `Rawon adalah sup daging berkuah hitam khas Jawa Timur yang sudah tercatat sejak era Kerajaan Majapahit (disebut dalam Prasasti Taji tahun 901 M sebagai *Rarawwan*). Warna hitamnya berasal dari bumbu kluwek.`
    },
    // --- TOPIK 10: PELESTARIAN BUDAYA ---
    {
      keywords: ['budaya', 'warisan', 'tradisi', 'nilai budaya', 'filosofi', 'kearifan lokal'],
      jawaban: `🌏 **Pelestarian Budaya Kuliner di MojoRasa**\n\n` +
               `Setiap kuliner daerah—mulai dari Onde-onde Mojokerto, Sambel Wader Trowulan, hingga Rendang—menyimpan identitas sejarah.\n\n` +
               `💡 MojoRasa hadir menghubungkan edukasi sejarah, NusaQuiz, dan pemberdayaan langsung UMKM Mojokerto & Nusantara!`
    },
    // --- TOPIK 11: CARA BELI (PEMBERDAYAAN UMKM) ---
    {
      keywords: ['beli', 'cara beli', 'order', 'pesan', 'transaksi', 'checkout', 'rekomendasi'],
      jawaban: `🛒 **Rekomendasi & Cara Beli Produk UMKM di MojoRasa:**\n\n` +
               `🔥 **Populer dari Mojokerto**: Onde-onde Bo Liem, Sambel Wader Trowulan, Kerupuk Rambak Bangsal, Sate Keong.\n\n` +
               `1️⃣ Pilih produk di menu **Kuliner Daerah** atau **UMKM Mojokerto**\n` +
               `2️⃣ Klik tombol **Tambah ke Keranjang (+)**\n` +
               `3️⃣ Isi alamat pengiriman & selesaikan pembayaran\n` +
               `4️⃣ Dapatkan poin reward dari setiap transaksi!`
    }
  ];

  // ============================================================
  // BAGIAN 4.2: AI SEJARAH - FUNGSI PENENTU OUTPUT
  // ============================================================

  function cariJawabanAI(pertanyaan) {
    if (!pertanyaan || pertanyaan.trim() === '') {
      return 'Silakan tulis pertanyaan terlebih dahulu.';
    }

    const lowerQ = pertanyaan.toLowerCase().trim();
    
    if (lowerQ.match(/^(halo|hai|hey|hi|pagi|siang|sore|malam)/)) {
      return '🌾 Halo! Saya asisten MojoRasa. Ada yang bisa saya bantu seputar kuliner UMKM Mojokerto atau sejarah kuliner Nusantara?';
    }

    if (lowerQ.match(/^(makasih|terima kasih|thanks)/)) {
      return 'Sama-sama! Terima kasih sudah ikut mendukung UMKM Mojokerto dan melestarikan kuliner daerah.';
    }

    let bestMatch = null;
    let highestScore = 0;

    for (let item of aiSejarahKnowledge) {
      let score = 0;
      
      for (let keyword of item.keywords) {
        if (lowerQ.includes(keyword)) {
          score += 15;
        }
        
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

    if (highestScore > 10 && bestMatch) {
      return bestMatch.jawaban;
    }

    for (let makanan of kulinerDaerah) {
      if (lowerQ.includes(makanan.nama.toLowerCase())) {
        return `🍽️ **${makanan.nama}**\n` +
               `Daerah: ${makanan.daerah}\n` +
               `UMKM: ${makanan.umkm}\n` +
               `Harga: Rp${makanan.harga.toLocaleString('id-ID')}\n\n` +
               `🛒 **Cara beli**: ${makanan.caraBeli}`;
      }
    }

    return 'Maaf, saya belum menemukan info spesifik itu. Coba tanyakan tentang:\n' +
           '• Sejarah Onde-onde Mojokerto / Sambel Wader Trowulan / Kerupuk Rambak Bangsal\n' +
           '• Warisan kuliner era Majapahit (Rawon, Sate Keong, Wedang Secang)\n' +
           '• Rekomendasi & cara beli produk UMKM di MojoRasa';
  }

  // ============================================================
  // BAGIAN 4.3: AI SEJARAH & CHATBOT WIDGET UI
  // ============================================================

  const aiToggle = document.getElementById('ai-sejarah-toggle') || document.getElementById('chatbot-toggle');
  const aiWindow = document.getElementById('ai-sejarah-window') || document.getElementById('chatbot-citarasa');
  const aiClose = document.getElementById('ai-sejarah-close') || document.getElementById('chatbot-close');
  const aiMessages = document.getElementById('ai-sejarah-messages') || document.getElementById('chatbot-messages');
  const aiInput = document.getElementById('ai-sejarah-input') || document.getElementById('chatbot-input');
  const aiSend = document.getElementById('ai-sejarah-send') || document.getElementById('chatbot-send');

  function addAIMessage(text, sender) {
    if (!aiMessages) return;
    const msgDiv = document.createElement('div');
    const isChatbotWidget = aiMessages.id === 'chatbot-messages';
    msgDiv.className = isChatbotWidget 
      ? `chatbot-message ${sender === 'ai' ? 'bot' : 'user'}`
      : `ai-message ${sender}`;
    
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formattedText = formattedText.replace(/\n/g, '<br>');
    msgDiv.innerHTML = formattedText;
    
    aiMessages.appendChild(msgDiv);
    aiMessages.scrollTop = aiMessages.scrollHeight;
  }

  function sendAIMessage() {
    if (!aiInput) return;
    const userText = aiInput.value.trim();
    if (!userText) return;

    addAIMessage(userText, 'user');
    aiInput.value = '';

    setTimeout(() => {
      const jawaban = cariJawabanAI(userText);
      addAIMessage(jawaban, 'ai');
    }, 600);
  }

  if (aiSend) {
    aiSend.addEventListener('click', sendAIMessage);
  }
  
  if (aiInput) {
    aiInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendAIMessage();
    });
  }

  if (aiToggle && aiWindow) {
    aiToggle.addEventListener('click', () => {
      aiWindow.style.display = aiWindow.style.display === 'flex' ? 'none' : 'flex';
      if (aiWindow.style.display === 'flex' && aiInput) aiInput.focus();
    });
  }

  if (aiClose && aiWindow) {
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
      alert(`✅ "${name}" ditambahkan ke keranjang MojoRasa!\n\nLanjutkan ke halaman checkout untuk mendukung UMKM lokal.`);
    });
  });


  // ============================================================
  // BAGIAN 7: API PREDIKSI MINAT (RANDOM FOREST)
  // ============================================================
  // ENDPOINT TETAP: https://cita-rasa.onrender.com/predict

  const API_URL = 'https://cita-rasa.onrender.com/predict';

  async function prediksiMinat(data) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('✅ Hasil prediksi:', result);
      return result;
    } catch (error) {
      console.error('❌ Gagal memanggil API prediksi:', error);
      return null;
    }
  }

  async function tampilkanPrediksi() {
    const usia = parseInt(document.getElementById('input-usia')?.value) || 1;
    const status = parseInt(document.getElementById('input-status')?.value) || 1;
    const frekuensi = parseInt(document.getElementById('input-frekuensi')?.value) || 2;
    const sumberInfo = parseInt(document.getElementById('input-sumber')?.value) || 1;
    const promosi = parseInt(document.getElementById('input-promosi')?.value) || 1;

    const dataPengguna = { usia, status, frekuensi, sumber_info: sumberInfo, promosi };
    const result = await prediksiMinat(dataPengguna);
    
    const hasilElement = document.getElementById('hasil-prediksi');
    if (!hasilElement) {
      if (result) {
        alert(`🎯 Prediksi Minat: ${result.minat}/5 (${result.kategori})`);
      } else {
        alert('⚠️ Gagal mendapatkan prediksi. Coba lagi nanti.');
      }
      return;
    }

    if (result) {
      const warnaKategori = result.kategori === 'Tinggi' ? 'text-green-600' : 
                           result.kategori === 'Sedang' ? 'text-yellow-600' : 'text-red-500';
      
      hasilElement.innerHTML = `
        <div class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-5 mt-4 shadow-sm">
          <p class="font-bold text-green-800 text-lg">🎯 Prediksi Minat Kuliner UMKM Mojokerto & Daerah</p>
          <div class="flex items-center gap-4 mt-2">
            <div class="text-center">
              <p class="text-sm text-gray-600">Skor Minat</p>
              <p class="text-3xl font-bold text-indigo-600">${result.minat} <span class="text-base text-gray-400">/ 5</span></p>
            </div>
            <div class="h-12 w-px bg-gray-300"></div>
            <div class="text-center">
              <p class="text-sm text-gray-600">Kategori</p>
              <p class="text-xl font-bold ${warnaKategori}">${result.kategori}</p>
            </div>
          </div>
          <p class="text-sm text-gray-500 mt-3">✨ Rekomendasi kuliner UMKM Mojokerto akan disesuaikan berdasarkan hasil ini.</p>
        </div>
      `;
    } else {
      hasilElement.innerHTML = `
        <div class="bg-red-50 border border-red-200 rounded-xl p-4 mt-4">
          <p class="text-red-600">⚠️ Gagal mendapatkan prediksi. Silakan coba lagi.</p>
        </div>
      `;
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    const btnPrediksi = document.getElementById('btn-prediksi');
    if (btnPrediksi) {
      btnPrediksi.addEventListener('click', tampilkanPrediksi);
    }
  });

})();