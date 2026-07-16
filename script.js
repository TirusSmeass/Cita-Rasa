// ============================================================
// CITARASA - MELESTARIKAN KULINER DAERAH
// File JavaScript Terpisah
// Chatbot dengan panduan beli + NusaQuiz Interaktif
// ============================================================

(function() {
  "use strict";

  // ------------------------------------------------------------
  // 1. DATABASE KULINER DAERAH (UNTUK PELESTARIAN)
  // ------------------------------------------------------------
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

  // ------------------------------------------------------------
  // 2. NUSAQUIZ - DATABASE PERTANYAAN
  // ------------------------------------------------------------
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

  // ------------------------------------------------------------
  // 3. NUSAQUIZ - STATE MANAGEMENT
  // ------------------------------------------------------------
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

  // Set total questions
  if (quizElements.totalQ) {
    quizElements.totalQ.textContent = quizQuestions.length;
  }

  // Timer functions
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
      
      // Change color based on time
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
    showFeedback('Waktu habis!', 'error');
    if (quizElements.nextBtn) {
      quizElements.nextBtn.disabled = false;
    }
    currentQuizState.streak = 0;
    updateStreak();
  }

  // Load question
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

    // Render options
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

      // Add event listeners to options
      if (!currentQuizState.answers[index]) {
        document.querySelectorAll('.quiz-option:not(.disabled)').forEach(btn => {
          btn.addEventListener('click', (e) => handleOptionClick(e, index));
        });
      }
    }

    // Clear feedback
    if (quizElements.feedback) {
      quizElements.feedback.innerHTML = '';
    }

    // Disable next button until answer
    if (quizElements.nextBtn) {
      quizElements.nextBtn.disabled = currentQuizState.answers[index] === undefined;
    }

    // Start timer
    startTimer();
  }

  function handleOptionClick(event, questionIndex) {
    const optionIndex = parseInt(event.currentTarget.dataset.optionIndex);
    const isCorrect = optionIndex === quizQuestions[questionIndex].correct;
    
    // Clear timer
    if (currentQuizState.timerInterval) {
      clearInterval(currentQuizState.timerInterval);
    }

    // Save answer
    currentQuizState.answers[questionIndex] = optionIndex;
    
    // Update score and streak
    if (isCorrect) {
      currentQuizState.score += quizQuestions[questionIndex].points;
      currentQuizState.streak++;
      
      // Bonus for streak
      if (currentQuizState.streak >= 3) {
        currentQuizState.score += 5;
        showFeedback(`Streak ${currentQuizState.streak}! +5 bonus poin! 🎉`, 'success');
      } else {
        showFeedback('✅ Benar! +10 poin', 'success');
      }
    } else {
      currentQuizState.streak = 0;
      showFeedback(`❌ Salah. ${quizQuestions[questionIndex].explanation}`, 'error');
    }

    // Update UI
    updateScore();
    updateStreak();
    
    // Disable all options
    disableOptions();
    
    // Enable next button
    if (quizElements.nextBtn) {
      quizElements.nextBtn.disabled = false;
    }

    // Highlight correct answer
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

  function finishQuiz() {
    // Clear timer
    if (currentQuizState.timerInterval) {
      clearInterval(currentQuizState.timerInterval);
    }

    // Hide quiz interface
    if (quizElements.question) quizElements.question.style.display = 'none';
    if (quizElements.options) quizElements.options.style.display = 'none';
    if (quizElements.nextBtn) quizElements.nextBtn.style.display = 'none';
    if (quizElements.restartBtn) quizElements.restartBtn.style.display = 'none';
    if (quizElements.feedback) quizElements.feedback.style.display = 'none';
    
    // Show result
    if (quizElements.result) {
      quizElements.result.classList.remove('hidden');
      const correctAnswers = currentQuizState.answers.filter(a => a !== undefined).length;
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

    // Save to localStorage (for reward)
    localStorage.setItem('nusaquiz_last_score', currentQuizState.score);
    localStorage.setItem('nusaquiz_last_date', new Date().toISOString());
  }

  function resetQuiz() {
    // Reset state
    currentQuizState = {
      currentIndex: 0,
      score: 0,
      streak: 0,
      answers: [],
      quizCompleted: false,
      timerInterval: null,
      timeLeft: 15
    };

    // Show quiz interface
    if (quizElements.question) quizElements.question.style.display = 'block';
    if (quizElements.options) quizElements.options.style.display = 'block';
    if (quizElements.nextBtn) quizElements.nextBtn.style.display = 'block';
    if (quizElements.restartBtn) quizElements.restartBtn.style.display = 'block';
    if (quizElements.feedback) quizElements.feedback.style.display = 'block';
    
    // Hide result
    if (quizElements.result) {
      quizElements.result.classList.add('hidden');
    }

    // Update UI
    updateScore();
    updateStreak();
    
    // Load first question
    loadQuestion(0);
  }

  // Event listeners for quiz
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

  // Initialize quiz
  resetQuiz();

  // ------------------------------------------------------------
  // 4. CHATBOT KNOWLEDGE BASE
  // ------------------------------------------------------------
  const chatbotKnowledge = [
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
    {
      keywords: ['rendang', 'padang', 'minang'],
      jawaban: `🍛 **Rendang Padang**\n` +
               `Asal: Sumatera Barat\n` +
               `UMKM: Mak Yun\n` +
               `Harga: Rp45.000\n` +
               `Deskripsi: Rendang asli Minang dengan rempah tradisional, dimasak 7 jam.\n\n` +
               `🛒 **Cara beli**: Kunjungi halaman Kuliner Daerah, cari "Rendang Mak Yun", tambah ke keranjang, lalu checkout.`
    },
    {
      keywords: ['gudeg', 'jogja', 'yogyakarta'],
      jawaban: `🥘 **Gudeg Jogja**\n` +
               `Asal: Yogyakarta\n` +
               `UMKM: Bu Gandes\n` +
               `Harga: Rp30.000\n` +
               `Deskripsi: Gudeg manis legit dengan nasi, ayam, telur, dan sambal krecek.\n\n` +
               `🛒 **Cara beli**: Tersedia di kategori "Kuliner Jawa". Tambah ke keranjang dan checkout.`
    },
    {
      keywords: ['sate', 'madura'],
      jawaban: `🍢 **Sate Madura**\n` +
               `Asal: Jawa Timur\n` +
               `UMKM: Pak Samin\n` +
               `Harga: Rp25.000\n` +
               `Deskripsi: Sate ayam dengan bumbu kacang kental dan lontong.\n\n` +
               `🛒 **Cara beli**: Pesan sekarang di halaman produk Sate Madura.`
    },
    {
      keywords: ['pempek', 'palembang'],
      jawaban: `🍲 **Pempek Palembang**\n` +
               `Asal: Sumatera Selatan\n` +
               `UMKM: Kapal Saga\n` +
               `Harga: Rp35.000\n` +
               `Deskripsi: Pempek ikan dengan kuah cuko asam pedas manis.\n\n` +
               `🛒 **Cara beli**: Tersedia di marketplace. Jangan lupa tambahkan ekstra cuko!`
    },
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
    {
      keywords: ['reward', 'poin', 'tukar poin', 'hadiah'],
      jawaban: `🎁 **Program Reward**\n` +
               `Setiap pembelian di CitaRasa akan mendapatkan poin:\n` +
               `• Setiap Rp10.000 = 10 poin\n` +
               `• Poin bisa ditukar dengan voucher belanja\n` +
               `• Reward spesial: merchandise, kelas masak, peralatan UMKM\n\n` +
               `🔍 Cek halaman Reward untuk melihat katalog lengkap!`
    },
    {
      keywords: ['afiliasi', 'komisi', 'promosi'],
      jawaban: `🤝 **Program Afiliasi**\n` +
               `Dapatkan komisi dengan mempromosikan produk kuliner daerah:\n` +
               `• Daftar gratis, dapatkan link unik\n` +
               `• Komisi 5-15% dari setiap penjualan\n` +
               `• Pantau performa di dashboard afiliasi\n\n` +
               `💰 Mulai dapatkan penghasilan pasif sekarang!`
    },
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
    {
      keywords: ['sejarah', 'ai sejarah', 'tanya makanan'],
      jawaban: `🤖 **AI Sejarah Kuliner**\n` +
               `Ingin tahu asal-usul makanan favoritmu? Gunakan fitur AI Sejarah!\n\n` +
               `• Tanyakan sejarah rendang, sate, gudeg, dll\n` +
               `• Fakta unik dan filosofi di balik makanan\n` +
               `• Database 30+ makanan Nusantara\n\n` +
               `🔍 Klik card "AI Sejarah" di halaman utama atau menu AI Sejarah.`
    },
    {
      keywords: ['kuis', 'quiz', 'nusaquiz', 'game', 'permainan'],
      jawaban: `🎮 **NusaQuiz - Gamified Culinary Quiz**\n\n` +
               `Uji pengetahuan kulinermu dan dapatkan poin!\n\n` +
               `• 10 pertanyaan seputar kuliner Nusantara\n` +
               `• Setiap jawaban benar = 10 poin\n` +
               `• Streak 3x berturut-turut = bonus 5 poin\n` +
               `• Poin bisa ditukar dengan reward di halaman Reward\n\n` +
               `👉 Coba sekarang di bagian "NusaQuiz" di halaman utama!`
    }
  ];

  // Fungsi NLP untuk chatbot
  function cariJawaban(pertanyaan) {
    if (!pertanyaan || pertanyaan.trim() === '') {
      return 'Silakan tulis pertanyaan terlebih dahulu.';
    }

    const lowerQ = pertanyaan.toLowerCase().trim();
    
    // Handle sapaan
    if (lowerQ.match(/^(halo|hai|hey|hi|pagi|siang|sore|malam)/)) {
      return '🌾 Halo! Ada yang bisa saya bantu tentang pelestarian kuliner daerah?';
    }

    if (lowerQ.match(/^(makasih|terima kasih|thanks)/)) {
      return 'Sama-sama! Senang bisa membantu melestarikan kuliner daerah bersama kamu. Ada lagi yang ingin ditanyakan?';
    }

    // Cari berdasarkan kata kunci
    let bestMatch = null;
    let highestScore = 0;

    for (let item of chatbotKnowledge) {
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

    // Cek apakah bertanya tentang makanan tertentu
    for (let makanan of kulinerDaerah) {
      if (lowerQ.includes(makanan.nama.toLowerCase())) {
        return `🍽️ **${makanan.nama}**\n` +
               `Daerah: ${makanan.daerah}\n` +
               `UMKM: ${makanan.umkm}\n` +
               `Harga: Rp${makanan.harga.toLocaleString()}\n\n` +
               `🛒 **Cara beli**: ${makanan.caraBeli}`;
      }
    }

    return 'Maaf, saya belum paham. Coba tanyakan tentang:\n\n' +
           '• Cara beli kuliner daerah\n' +
           '• Informasi rendang/gudeg/sate/pempek\n' +
           '• Daftar UMKM\n' +
           '• Program reward\n' +
           '• Afiliasi\n' +
           '• Fitur premium\n' +
           '• NusaQuiz (kuis kuliner)\n' +
           '• AI Sejarah';
  }

  // ------------------------------------------------------------
  // 5. CHATBOT UI
  // ------------------------------------------------------------
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

    setTimeout(() => {
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

  // ------------------------------------------------------------
  // 6. MOBILE MENU
  // ------------------------------------------------------------
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

  // ------------------------------------------------------------
  // 7. ADD TO CART
  // ------------------------------------------------------------
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function() {
      const name = this.dataset.name;
      alert(`✅ "${name}" ditambahkan ke keranjang!\n\nLanjutkan ke halaman checkout untuk menyelesaikan pembelian.`);
    });
  });

})();
