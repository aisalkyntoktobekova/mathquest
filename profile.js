/* ============================================
   MATHQUEST — PROFILE.JS
   Loads and displays the player's saved profile,
   handles name editing, and shows badge collection.
   ============================================ */

/* ============================================================
   LOAD AND DISPLAY PROFILE DATA
   ============================================================ */
function renderProfile() {
  const profile = getProfile();
  const rank = getRank(profile.totalXP);
  const nextXP = getNextRankXP(profile.totalXP);

  /* ---- Basic info ---- */
  document.getElementById('profileName').textContent = profile.name;
  document.getElementById('profileTitle').textContent = rank.emoji + ' ' + rank.title;
  document.getElementById('profileAvatar').textContent = rank.emoji;

  /* ---- Stats ---- */
  document.getElementById('statGames').textContent = profile.gamesPlayed;
  document.getElementById('statCorrect').textContent = profile.totalCorrect;
  document.getElementById('statBestStreak').textContent = profile.bestStreak;

  // Accuracy = total correct / total attempted, as a percentage
  const acc = profile.totalQuestions > 0
    ? Math.round((profile.totalCorrect / profile.totalQuestions) * 100) + '%'
    : '—';
  document.getElementById('statAccuracy').textContent = acc;

  /* ---- XP Progress Bar ---- */
  document.getElementById('xpDisplay').textContent = profile.totalXP + ' XP';

  if (nextXP) {
    // Calculate progress to next rank as a percentage
    const currentRank = getRank(profile.totalXP);
    const prevXP = currentRank.min;
    const progress = ((profile.totalXP - prevXP) / (nextXP - prevXP)) * 100;

    document.getElementById('xpBarFill').style.width = Math.min(progress, 100) + '%';
    document.getElementById('xpToNext').textContent = `Next rank at ${nextXP} XP`;
  } else {
    // Max rank reached
    document.getElementById('xpBarFill').style.width = '100%';
    document.getElementById('xpToNext').textContent = '🏆 Maximum rank achieved!';
  }

  /* ---- Badges ---- */
  renderBadges(profile);
}

/** Render the badge collection grid */
function renderBadges(profile) {
  const grid = document.getElementById('profileBadgesGrid');
  grid.innerHTML = '';

  ALL_BADGES.forEach(badge => {
    const isUnlocked = profile.badges.includes(badge.id);

    const item = document.createElement('div');
    item.className = `badge-item ${isUnlocked ? 'unlocked' : 'locked'}`;
    item.title = isUnlocked ? badge.desc : '🔒 ' + badge.desc;

    item.innerHTML = `
      <div class="badge-icon">${badge.icon}</div>
      <span>${badge.name}</span>
      <div class="badge-desc">${isUnlocked ? badge.desc : '🔒 Locked'}</div>
    `;

    grid.appendChild(item);
  });
}

/* ============================================================
   NAME EDITING — Modal with input
   ============================================================ */
const editNameBtn = document.getElementById('editNameBtn');
const nameModal   = document.getElementById('nameModal');
const nameInput   = document.getElementById('nameInput');
const saveNameBtn = document.getElementById('saveNameBtn');
const cancelNameBtn = document.getElementById('cancelNameBtn');

// Open modal
editNameBtn.addEventListener('click', () => {
  const profile = getProfile();
  nameInput.value = profile.name;
  nameModal.classList.remove('hidden');
  nameInput.focus();
});

// Save new name
saveNameBtn.addEventListener('click', () => {
  const newName = nameInput.value.trim();
  if (!newName) {
    showToast('Please enter a name!', 'error');
    return;
  }

  const profile = getProfile();
  profile.name = newName;
  saveProfile(profile);

  nameModal.classList.add('hidden');
  renderProfile(); // Re-render with new name
  showToast('✅ Name saved!', 'success');
});

// Cancel / close modal
cancelNameBtn.addEventListener('click', () => {
  nameModal.classList.add('hidden');
});

// Also close if clicking outside the modal box
nameModal.addEventListener('click', (e) => {
  if (e.target === nameModal) nameModal.classList.add('hidden');
});

/* ============================================================
   RESET PROGRESS — Danger zone
   ============================================================ */
document.getElementById('resetBtn').addEventListener('click', () => {
  // Double-confirm with browser dialog
  const confirmed = confirm(
    '⚠️ Are you sure you want to reset ALL progress?\n\nThis will erase your XP, badges, and game history. This cannot be undone.'
  );

  if (confirmed) {
    // Overwrite profile with fresh default
    saveProfile(getDefaultProfile());
    renderProfile();
    updateNavScore();
    showToast('Progress reset. Start fresh!', 'info');
  }
});

/* ============================================================
   INITIAL RENDER — Run everything when page loads
   ============================================================ */
renderProfile();
