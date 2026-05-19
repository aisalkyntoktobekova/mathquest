/* ============================================
   MATHQUEST — QUIZ.JS
   The main game engine. Handles:
   - Question banks for all 3 levels
   - Countdown, timer, scoring
   - Answer checking and feedback
   - Results and badge checking
   ============================================ */

/* ============================================================
   1. QUESTION BANK
   Each question is an object with:
   - q: the question text
   - options: array of 4 answer choices
   - answer: the correct option (must exactly match one in 'options')
   ============================================================ */
const QUESTION_BANK = {

  // ---- BEGINNER: Basic arithmetic ----
  beginner: [
    { q: 'What is 7 × 8?',            options: ['54', '56', '63', '48'],   answer: '56' },
    { q: 'What is 144 ÷ 12?',         options: ['10', '11', '12', '13'],   answer: '12' },
    { q: 'What is 25 + 37?',          options: ['52', '61', '62', '63'],   answer: '62' },
    { q: 'What is 100 − 43?',         options: ['57', '67', '47', '53'],   answer: '57' },
    { q: 'What is 9 × 9?',            options: ['72', '81', '80', '90'],   answer: '81' },
    { q: 'What is 63 ÷ 7?',           options: ['7', '8', '9', '6'],       answer: '9' },
    { q: 'What is 15 × 4?',           options: ['45', '55', '60', '65'],   answer: '60' },
    { q: 'What is 200 − 87?',         options: ['113', '123', '117', '103'], answer: '113' },
    { q: 'What is 48 + 56?',          options: ['94', '104', '100', '102'], answer: '104' },
    { q: 'What is 11 × 12?',          options: ['121', '131', '132', '122'], answer: '132' },
    { q: 'What is the square of 8?',  options: ['56', '64', '72', '68'],   answer: '64' },
    { q: 'What is 360 ÷ 6?',          options: ['50', '55', '60', '65'],   answer: '60' },
    { q: 'What is 3³ (3 cubed)?',     options: ['6', '9', '27', '18'],     answer: '27' },
    { q: 'Which is the prime number?', options: ['15', '21', '13', '27'],  answer: '13' },
    { q: 'What is 75% of 40?',        options: ['25', '30', '35', '20'],   answer: '30' },
  ],

  // ---- INTERMEDIATE: Fractions, percentages, basic algebra ----
  intermediate: [
    { q: 'Solve: x + 14 = 23. What is x?', options: ['7', '8', '9', '10'],  answer: '9' },
    { q: 'What is ¾ + ½?',             options: ['5/4', '4/5', '1¼', '1'],  answer: '5/4' },
    { q: 'What is 20% of 150?',        options: ['25', '30', '35', '20'],   answer: '30' },
    { q: 'Simplify: 18/24',           options: ['2/3', '3/4', '4/6', '5/8'], answer: '3/4' },
    { q: 'What is the LCM of 4 and 6?', options: ['6', '8', '12', '24'],   answer: '12' },
    { q: 'If 3x = 27, what is x?',    options: ['7', '8', '9', '10'],      answer: '9' },
    { q: 'What is 15% of 200?',       options: ['25', '30', '35', '20'],   answer: '30' },
    { q: 'What is −5 + 12?',          options: ['−7', '7', '17', '−17'],   answer: '7' },
    { q: 'What is the HCF of 12 and 18?', options: ['3', '4', '6', '9'], answer: '6' },
    { q: 'Solve: 2x − 5 = 11. What is x?', options: ['6', '7', '8', '9'], answer: '8' },
    { q: 'What is 2.5 × 4?',          options: ['8', '10', '12', '9'],     answer: '10' },
    { q: 'What is 0.75 as a fraction?', options: ['3/5', '3/4', '4/5', '2/3'], answer: '3/4' },
    { q: 'What is the next prime after 7?', options: ['8', '9', '10', '11'], answer: '11' },
    { q: 'What is 5² − 4²?',          options: ['3', '7', '9', '11'],      answer: '9' },
    { q: 'A shirt costs $40, 25% off. Price?', options: ['$25', '$28', '$30', '$35'], answer: '$30' },
  ],

  // ---- ADVANCED: Geometry, quadratics, word problems ----
  advanced: [
    { q: 'What is the area of a circle with radius 7? (Use π≈3.14)', options: ['43.96', '153.86', '21.98', '98.0'], answer: '153.86' },
    { q: 'Solve: x² − 5x + 6 = 0. What are the roots?', options: ['2, 3', '1, 6', '−2, −3', '3, 4'], answer: '2, 3' },
    { q: 'The Pythagorean theorem: if a=3, b=4, what is c?', options: ['5', '6', '7', '8'], answer: '5' },
    { q: 'What is the slope of y = 3x − 4?',  options: ['−4', '3', '4', '−3'],   answer: '3' },
    { q: 'Expand: (x + 3)²',                  options: ['x²+9', 'x²+3x+9', 'x²+6x+9', 'x²+6x+3'], answer: 'x²+6x+9' },
    { q: 'Volume of a cube with side 4?',      options: ['16', '24', '48', '64'], answer: '64' },
    { q: 'What is sin(90°)?',                  options: ['0', '0.5', '1', '√2/2'], answer: '1' },
    { q: 'Factorise: x² − 9',                 options: ['(x+3)²', '(x−3)(x+3)', '(x−3)²', 'x(x−9)'], answer: '(x−3)(x+3)' },
    { q: 'If y = 2x + 1, what is y when x = 4?', options: ['7', '8', '9', '10'], answer: '9' },
    { q: 'The interior angles of a triangle sum to?', options: ['90°', '180°', '270°', '360°'], answer: '180°' },
    { q: 'What is ∛64?',                       options: ['4', '6', '8', '16'],  answer: '4' },
    { q: 'What is the median of: 3, 7, 5, 9, 1?', options: ['3', '5', '7', '9'], answer: '5' },
    { q: 'Simplify: (x³ × x²)',               options: ['x⁵', 'x⁶', 'x', 'x⁴'], answer: 'x⁵' },
    { q: 'A car travels 120km in 2 hours. Speed?', options: ['50', '55', '60', '65'], answer: '60' },
    { q: 'What is the perimeter of a regular hexagon with side 5?', options: ['25', '30', '35', '20'], answer: '30' },
  ],
};

/* ============================================================
   2. GAME SETTINGS — Points per level, time per question
   ============================================================ */
const LEVEL_CONFIG = {
  beginner:     { xpPerCorrect: 25, timeLimit: 20, label: 'Beginner 🌱',     color: 'var(--accent-success)' },
  intermediate: { xpPerCorrect: 50, timeLimit: 15, label: 'Intermediate ⚡', color: 'var(--accent-primary)' },
  advanced:     { xpPerCorrect: 100, timeLimit: 12, label: 'Advanced 🚀',    color: 'var(--accent-danger)'  },
};

// Number of questions per game
const QUESTIONS_PER_GAME = 10;

/* ============================================================
   3. GAME STATE — All variables that track the current game
   ============================================================ */
let state = {
  level: null,          // 'beginner', 'intermediate', or 'advanced'
  questions: [],        // Shuffled questions for this game
  currentIndex: 0,      // Which question we're on (0-based)
  score: 0,             // XP earned so far this game
  correct: 0,           // Correct answers count
  streak: 0,            // Current consecutive correct answers
  bestStreak: 0,        // Highest streak reached this game
  answered: false,      // Has the current question been answered?
  timerInterval: null,  // Holds the setInterval reference for countdown
  timeLeft: 0,          // Seconds remaining
  hadFastAnswer: false, // Did player answer in < 5 seconds?
  startTime: null,      // When the current question appeared
};

/* ============================================================
   4. DOM ELEMENT REFERENCES
   ============================================================ */
const screens = {
  levelSelect:  document.getElementById('levelSelectScreen'),
  countdown:    document.getElementById('countdownScreen'),
  quiz:         document.getElementById('quizScreen'),
  results:      document.getElementById('resultsScreen'),
};

/* ---- Helper: Switch visible screen ---- */
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

/* ============================================================
   5. LEVEL SELECT — Clicking a level card starts the game
   ============================================================ */
document.querySelectorAll('.level-select-card').forEach(card => {
  card.addEventListener('click', () => {
    SFX.click();
    const level = card.dataset.level;
    startGame(level);
  });
});

/* Check URL params — allows "Play →" links from homepage
   e.g. quiz.html?level=intermediate */
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const levelParam = params.get('level');
  if (levelParam && LEVEL_CONFIG[levelParam]) {
    startGame(levelParam);
  }
});

/* ============================================================
   6. START GAME — Initialize state and show countdown
   ============================================================ */
function startGame(level) {
  state.level = level;
  state.questions = getShuffledQuestions(level);
  state.currentIndex = 0;
  state.score = 0;
  state.correct = 0;
  state.streak = 0;
  state.bestStreak = 0;
  state.answered = false;
  state.hadFastAnswer = false;

  showCountdown(level);
}

/**
 * Shuffle and pick QUESTIONS_PER_GAME questions from the bank.
 * Fisher-Yates shuffle algorithm ensures fair randomization.
 */
function getShuffledQuestions(level) {
  const pool = [...QUESTION_BANK[level]]; // Copy the array

  // Fisher-Yates shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]]; // Swap
  }

  return pool.slice(0, QUESTIONS_PER_GAME); // Take first N
}

/* ============================================================
   7. COUNTDOWN — 3, 2, 1, GO!
   ============================================================ */
function showCountdown(level) {
  showScreen('countdown');
  const config = LEVEL_CONFIG[level];

  // Set the level name in the countdown
  document.getElementById('countdownLevel').textContent = config.label;

  let count = 3;
  const numEl = document.getElementById('countdownNumber');
  numEl.textContent = count;

  const interval = setInterval(() => {
    count--;
    if (count === 0) {
      numEl.textContent = 'GO!';
      clearInterval(interval);
      // Small delay, then start the actual quiz
      setTimeout(() => showQuiz(), 600);
    } else {
      numEl.textContent = count;
      SFX.click();
    }
  }, 1000);
}

/* ============================================================
   8. QUIZ — Show questions and handle answers
   ============================================================ */
function showQuiz() {
  showScreen('quiz');

  // Set the level display in the HUD
  const config = LEVEL_CONFIG[state.level];
  document.getElementById('hudLevel').textContent = config.label;
  document.getElementById('totalQ').textContent = QUESTIONS_PER_GAME;

  loadQuestion();
}

/** Load the current question onto the screen */
function loadQuestion() {
  const q = state.questions[state.currentIndex];
  const config = LEVEL_CONFIG[state.level];
  const qNumber = state.currentIndex + 1;

  state.answered = false;
  state.startTime = Date.now(); // Record when question appeared

  // Update HUD
  document.getElementById('currentQ').textContent = qNumber;
  document.getElementById('hudScore').textContent = state.score;
  document.getElementById('questionNumber').textContent = `Question ${qNumber}`;
  document.getElementById('questionText').textContent = q.q;

  // Update progress bar width
  const pct = ((qNumber - 1) / QUESTIONS_PER_GAME) * 100;
  document.getElementById('progressFill').style.width = pct + '%';

  // Hide feedback and next button from previous question
  document.getElementById('feedbackBanner').classList.add('hidden');
  document.getElementById('feedbackBanner').className = 'feedback-banner hidden';
  document.getElementById('nextBtn').classList.add('hidden');

  // Update streak display
  updateStreakDisplay();

  // Render answer options
  renderOptions(q);

  // Start the countdown timer
  startTimer(config.timeLimit);
}

/** Create and display the 4 answer option buttons */
function renderOptions(question) {
  const grid = document.getElementById('optionsGrid');
  grid.innerHTML = ''; // Clear old options

  const letters = ['A', 'B', 'C', 'D']; // Labels for options

  // Shuffle options so correct answer isn't always in same position
  const shuffledOptions = [...question.options];
  for (let i = shuffledOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
  }

  shuffledOptions.forEach((optionText, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `
      <span class="option-letter">${letters[index]}</span>
      <span>${optionText}</span>
    `;

    // When clicked, check if this answer is correct
    btn.addEventListener('click', () => handleAnswer(optionText, question.answer, btn));

    grid.appendChild(btn);
  });
}

/* ============================================================
   9. TIMER — Countdown per question
   ============================================================ */
function startTimer(seconds) {
  // Clear any existing timer
  clearInterval(state.timerInterval);
  state.timeLeft = seconds;

  const timerBar = document.getElementById('timerBar');
  const timerDisplay = document.getElementById('timerDisplay');

  // Reset timer bar to full
  timerBar.style.width = '100%';
  timerBar.classList.remove('warning');
  timerDisplay.classList.remove('warning');

  function tick() {
    state.timeLeft--;
    timerDisplay.textContent = state.timeLeft;

    // Update the shrinking timer bar
    const pct = (state.timeLeft / seconds) * 100;
    timerBar.style.width = pct + '%';

    // Warning state when < 5 seconds
    if (state.timeLeft <= 5) {
      timerBar.classList.add('warning');
      timerDisplay.classList.add('warning');
      SFX.click(); // Tick sound
    }

    // Time's up!
    if (state.timeLeft <= 0) {
      clearInterval(state.timerInterval);
      if (!state.answered) {
        handleTimeUp();
      }
    }
  }

  // Run tick every 1000ms (1 second)
  state.timerInterval = setInterval(tick, 1000);
}

/** Called when timer runs out without an answer */
function handleTimeUp() {
  state.answered = true;
  state.streak = 0; // Reset streak on timeout

  // Disable all option buttons
  document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);

  // Show "Time's up" feedback
  showFeedback(false, '⏰ Time\'s Up!', null, true);
  document.getElementById('nextBtn').classList.remove('hidden');
}

/* ============================================================
   10. ANSWER HANDLING — Check if answer is correct
   ============================================================ */
function handleAnswer(selected, correct, clickedBtn) {
  if (state.answered) return; // Prevent double-clicking
  state.answered = true;

  // Stop the timer
  clearInterval(state.timerInterval);

  // Check if answered quickly (for Speed Demon badge)
  const elapsed = (Date.now() - state.startTime) / 1000;
  if (elapsed < 5) state.hadFastAnswer = true;

  // Disable all buttons so you can't change your answer
  document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = true);

  const isCorrect = selected === correct;

  if (isCorrect) {
    /* ---- CORRECT ANSWER ---- */
    clickedBtn.classList.add('correct');
    SFX.correct();

    // Update game state
    state.correct++;
    state.streak++;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;

    // Calculate XP (bonus for streaks!)
    const config = LEVEL_CONFIG[state.level];
    let xpGained = config.xpPerCorrect;
    if (state.streak >= 3) xpGained = Math.floor(xpGained * 1.5); // 50% bonus!
    if (state.streak >= 5) xpGained = Math.floor(xpGained * 2);   // 100% bonus!

    state.score += xpGained;
    document.getElementById('hudScore').textContent = state.score;

    // Streak bonus message
    const streakMsg = state.streak >= 5 ? '🔥 MEGA COMBO x2!' :
                      state.streak >= 3 ? '🔥 COMBO x1.5!' : '';

    showFeedback(true, '✅ Correct!', `+${xpGained} XP ${streakMsg}`, false);
    updateStreakDisplay();

  } else {
    /* ---- WRONG ANSWER ---- */
    clickedBtn.classList.add('wrong');
    SFX.wrong();

    // Reset streak
    state.streak = 0;
    updateStreakDisplay();

    // Highlight the correct answer in green so student can learn
    document.querySelectorAll('.option-btn').forEach(btn => {
      if (btn.querySelector('span:last-child').textContent === correct) {
        btn.classList.add('correct');
      }
    });

    showFeedback(false, '❌ Wrong!', `Correct: ${correct}`, false);
  }

  // Show the Next button
  document.getElementById('nextBtn').classList.remove('hidden');
}

/** Display the feedback banner below options */
function showFeedback(isCorrect, text, extraText, isTimeout) {
  const banner = document.getElementById('feedbackBanner');
  const feedbackText = document.getElementById('feedbackText');
  const feedbackXP = document.getElementById('feedbackXP');

  feedbackText.textContent = text;
  feedbackXP.textContent = extraText || '';

  // Set color class based on result
  banner.className = `feedback-banner ${isCorrect ? 'correct-fb' : (isTimeout ? '' : 'wrong-fb')}`;
  banner.classList.remove('hidden');
}

/** Update the streak indicator at the top */
function updateStreakDisplay() {
  const streakBar = document.getElementById('streakBar');
  const streakCount = document.getElementById('streakCount');

  streakCount.textContent = state.streak;

  if (state.streak >= 2) {
    streakBar.classList.add('visible');
    streakBar.style.animation = 'streakPop 0.3s ease';
    setTimeout(() => streakBar.style.animation = '', 300);
  } else {
    streakBar.classList.remove('visible');
  }
}

/* ============================================================
   11. NEXT QUESTION — Advance to next or end game
   ============================================================ */
document.getElementById('nextBtn').addEventListener('click', () => {
  SFX.click();
  state.currentIndex++;

  if (state.currentIndex >= QUESTIONS_PER_GAME) {
    // All questions done — show results
    endGame();
  } else {
    // Load next question
    loadQuestion();
  }
});

/* ============================================================
   12. END GAME — Calculate results, save, show screen
   ============================================================ */
function endGame() {
  clearInterval(state.timerInterval);

  // Calculate accuracy percentage
  const accuracy = Math.round((state.correct / QUESTIONS_PER_GAME) * 100);

  // Build game result object
  const gameResult = {
    level: state.level,
    score: state.score,
    correct: state.correct,
    total: QUESTIONS_PER_GAME,
    accuracy: accuracy,
    bestStreak: state.bestStreak,
    hadFastAnswer: state.hadFastAnswer,
    date: new Date().toLocaleDateString(),
  };

  // --- Update persistent profile ---
  const profile = getProfile();
  profile.totalXP += state.score;
  profile.gamesPlayed++;
  profile.totalCorrect += state.correct;
  profile.totalQuestions += QUESTIONS_PER_GAME;
  if (state.bestStreak > profile.bestStreak) {
    profile.bestStreak = state.bestStreak;
  }

  // Add game to history (keep last 20 games)
  profile.history.unshift(gameResult);
  if (profile.history.length > 20) profile.history.pop();

  // --- Check for new badges ---
  const newBadges = checkBadges(profile, gameResult);
  newBadges.forEach(badge => {
    profile.badges.push(badge.id); // Mark as earned
  });

  // Save updated profile
  saveProfile(profile);
  updateNavScore();

  // Show the results screen
  showResults(gameResult, newBadges);

  // Victory sound
  SFX.levelUp();
}

/* ============================================================
   13. SHOW RESULTS SCREEN
   ============================================================ */
function showResults(game, newBadges) {
  showScreen('results');

  // Update all stat displays
  document.getElementById('resFinalScore').textContent = game.score;
  document.getElementById('resCorrect').textContent = `${game.correct}/${game.total}`;
  document.getElementById('resAccuracy').textContent = game.accuracy + '%';
  document.getElementById('resStreak').textContent = game.bestStreak;

  // Pick trophy emoji based on performance
  const trophy = game.accuracy === 100 ? '🏆' :
                 game.accuracy >= 80  ? '🥇' :
                 game.accuracy >= 60  ? '🥈' :
                 game.accuracy >= 40  ? '🥉' : '📚';
  document.getElementById('resultsTrophy').textContent = trophy;

  // Rank message based on score
  const msg = game.accuracy === 100 ? '🌟 Perfect Score! You\'re a Math Champion!' :
              game.accuracy >= 80  ? '🔥 Excellent work! Keep it up!' :
              game.accuracy >= 60  ? '👍 Good job! Practice makes perfect.' :
                                     '📖 Keep studying — you\'ll get there!';
  document.getElementById('rankMessage').textContent = msg;

  // Show badge notification if any new badge earned
  if (newBadges.length > 0) {
    const badge = newBadges[0]; // Show first new badge
    document.getElementById('badgeIcon').textContent = badge.icon;
    document.getElementById('badgeName').textContent = badge.name;
    document.getElementById('badgeEarned').classList.remove('hidden');
    setTimeout(() => SFX.badge(), 500);
  }
}

/* ============================================================
   14. PLAY AGAIN BUTTON
   ============================================================ */
document.getElementById('playAgainBtn').addEventListener('click', () => {
  SFX.click();
  // Reset URL params and go back to level select
  history.replaceState({}, '', 'quiz.html');
  showScreen('levelSelect');
});
