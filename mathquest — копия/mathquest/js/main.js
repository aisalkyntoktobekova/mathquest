/* ============================================
   MATHQUEST — MAIN.JS
   Shared utilities used across ALL pages:
   - Theme toggle (dark/light)
   - LocalStorage helpers
   - Score display
   - Toast notifications
   ============================================ */

/* ============================================================
   1. THEME TOGGLE
   Saves the user's preference in localStorage so it persists
   across pages and page reloads.
   ============================================================ */

// The theme toggle button exists on every page
const themeToggle = document.getElementById('themeToggle');

/**
 * Apply a theme ('dark' or 'light') to the page.
 * The CSS uses [data-theme="dark"] and [data-theme="light"]
 * selectors to swap colors automatically.
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  // Update button emoji to reflect current mode
  if (themeToggle) {
    themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
  }
}

// Load saved theme on page load, default to 'dark'
const savedTheme = localStorage.getItem('mq_theme') || 'dark';
applyTheme(savedTheme);

// Toggle theme when button is clicked
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('mq_theme', next); // Save preference
  });
}

/* ============================================================
   2. LOCALSTORAGE HELPERS
   These functions make it easy to save and load data.
   We prefix all our keys with 'mq_' to avoid conflicts.
   ============================================================ */

/**
 * Save any JavaScript value to localStorage.
 * JSON.stringify converts objects/arrays to text for storage.
 */
function saveData(key, value) {
  localStorage.setItem('mq_' + key, JSON.stringify(value));
}

/**
 * Load a value from localStorage.
 * Returns defaultValue if the key doesn't exist yet.
 */
function loadData(key, defaultValue = null) {
  const raw = localStorage.getItem('mq_' + key);
  if (raw === null) return defaultValue;
  try {
    return JSON.parse(raw);       // Convert text back to JS value
  } catch {
    return defaultValue;           // If corrupted, return default
  }
}

/* ============================================================
   3. PLAYER PROFILE — Default structure
   This is the main data object that tracks everything.
   ============================================================ */
function getDefaultProfile() {
  return {
    name: 'Math Explorer',        // Player's display name
    totalXP: 0,                   // Total experience points earned
    gamesPlayed: 0,               // How many quizzes completed
    totalCorrect: 0,              // Total correct answers ever
    totalQuestions: 0,            // Total questions ever attempted
    bestStreak: 0,                // Highest streak in any game
    badges: [],                   // Array of badge IDs earned
    history: [],                  // Array of past game results
  };
}

/**
 * Load the player profile. If it doesn't exist yet,
 * create a fresh default profile.
 */
function getProfile() {
  return loadData('profile', getDefaultProfile());
}

/**
 * Save the player profile back to localStorage.
 */
function saveProfile(profile) {
  saveData('profile', profile);
}

/* ============================================================
   4. NAVBAR SCORE DISPLAY
   Updates the XP number shown in the top-right of the navbar.
   ============================================================ */
function updateNavScore() {
  const navScoreEl = document.getElementById('navScore');
  if (navScoreEl) {
    const profile = getProfile();
    navScoreEl.textContent = profile.totalXP;
  }
}

// Update score display every time any page loads
updateNavScore();

/* ============================================================
   5. TOAST NOTIFICATIONS
   Shows a small popup message at the bottom-right of screen.
   Usage: showToast('✅ Correct!', 'success');
   ============================================================ */

/**
 * @param {string} message - The text to display
 * @param {string} type - 'success', 'error', or 'info'
 */
function showToast(message, type = 'info') {
  // Remove any existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  // Create new toast element
  const toast = document.createElement('div');
  toast.className = 'toast';

  // Pick icon based on type
  const icons = { success: '✅', error: '❌', info: '💡' };
  toast.innerHTML = `<span>${icons[type] || '💡'}</span><span>${message}</span>`;

  // Add colored border based on type
  const colors = {
    success: 'var(--accent-success)',
    error: 'var(--accent-danger)',
    info: 'var(--accent-primary)',
  };
  toast.style.borderColor = colors[type] || colors.info;

  document.body.appendChild(toast);

  // Automatically remove after 3 seconds
  setTimeout(() => toast.remove(), 3000);
}

/* ============================================================
   6. XP RANKS — Title based on XP amount
   Used in the profile page to show the player's rank title.
   ============================================================ */
const XP_RANKS = [
  { min: 0,    title: 'Beginner Mathematician',  emoji: '🌱' },
  { min: 200,  title: 'Number Apprentice',        emoji: '📐' },
  { min: 500,  title: 'Equation Explorer',        emoji: '⚡' },
  { min: 1000, title: 'Algebra Warrior',          emoji: '🔥' },
  { min: 2000, title: 'Geometry Master',          emoji: '🏆' },
  { min: 5000, title: 'Math Champion',            emoji: '🚀' },
];

/**
 * Get the rank info for a given XP amount.
 * Finds the highest rank the player has reached.
 */
function getRank(xp) {
  // Search backwards through ranks
  for (let i = XP_RANKS.length - 1; i >= 0; i--) {
    if (xp >= XP_RANKS[i].min) return XP_RANKS[i];
  }
  return XP_RANKS[0]; // Default: Beginner
}

/**
 * Find the next rank threshold (for the XP progress bar).
 */
function getNextRankXP(xp) {
  for (let i = 0; i < XP_RANKS.length; i++) {
    if (xp < XP_RANKS[i].min) return XP_RANKS[i].min;
  }
  return null; // Already at max rank
}

/* ============================================================
   7. BADGE DEFINITIONS
   All possible badges in the game.
   'check' is a function that returns true if the player
   has earned this badge based on their profile + latest game.
   ============================================================ */
const ALL_BADGES = [
  {
    id: 'first_step',
    icon: '🥉',
    name: 'First Step',
    desc: 'Complete your first quiz',
    check: (profile) => profile.gamesPlayed >= 1,
  },
  {
    id: 'speed_demon',
    icon: '⚡',
    name: 'Speed Demon',
    desc: 'Answer a question in under 5 seconds',
    check: (profile, game) => game && game.hadFastAnswer,
  },
  {
    id: 'on_fire',
    icon: '🔥',
    name: 'On Fire',
    desc: '5 correct answers in a row',
    check: (profile) => profile.bestStreak >= 5,
  },
  {
    id: 'perfectionist',
    icon: '🎯',
    name: 'Perfectionist',
    desc: 'Answer all questions correctly in a quiz',
    check: (profile, game) => game && game.accuracy === 100,
  },
  {
    id: 'all_star',
    icon: '🌟',
    name: 'All-Star',
    desc: 'Reach 1000 total XP',
    check: (profile) => profile.totalXP >= 1000,
  },
  {
    id: 'math_champ',
    icon: '🏆',
    name: 'Math Champion',
    desc: 'Score 100% on Advanced level',
    check: (profile, game) => game && game.level === 'advanced' && game.accuracy === 100,
  },
];

/**
 * Check if any new badges have been earned after a game.
 * Returns array of newly earned badge objects.
 */
function checkBadges(profile, gameResult) {
  const newBadges = [];
  for (const badge of ALL_BADGES) {
    // Skip if already earned
    if (profile.badges.includes(badge.id)) continue;
    // Check if now earned
    if (badge.check(profile, gameResult)) {
      newBadges.push(badge);
    }
  }
  return newBadges;
}

/* ============================================================
   8. SOUND EFFECTS (using Web Audio API - no files needed!)
   These create simple tones using the browser's audio engine.
   ============================================================ */

let audioCtx = null;

/**
 * Get (or create) the audio context.
 * Must be called after a user interaction due to browser rules.
 */
function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

/**
 * Play a short beep sound.
 * @param {number} frequency - Hz (e.g. 523 = middle C)
 * @param {number} duration - seconds
 * @param {string} type - 'sine', 'square', 'triangle', 'sawtooth'
 * @param {number} volume - 0 to 1
 */
function playBeep(frequency = 440, duration = 0.2, type = 'sine', volume = 0.3) {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    // Fade out smoothly to avoid clicking sound
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch (e) {
    // Audio may fail if user hasn't interacted yet — that's okay
    console.warn('Audio not available:', e.message);
  }
}

// Predefined sound effects
const SFX = {
  correct: () => playBeep(523, 0.15, 'sine'),    // C5 - pleasant ding
  wrong:   () => playBeep(200, 0.3, 'sawtooth'), // Low buzz
  levelUp: () => {                                // Ascending chord
    playBeep(523, 0.2, 'sine');
    setTimeout(() => playBeep(659, 0.2, 'sine'), 100);
    setTimeout(() => playBeep(784, 0.3, 'sine'), 200);
  },
  click:   () => playBeep(800, 0.05, 'square', 0.1), // Subtle click
  badge:   () => {                                // Victory fanfare
    playBeep(784, 0.1, 'sine');
    setTimeout(() => playBeep(1047, 0.1, 'sine'), 150);
    setTimeout(() => playBeep(1319, 0.3, 'sine'), 300);
  },
};
