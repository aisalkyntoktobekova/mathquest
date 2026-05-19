/* ============================================
   MATHQUEST — LEADERBOARD.JS
   Builds and displays the leaderboard.
   Uses a mix of mock top players + the real local player.
   ============================================ */

/* ============================================================
   MOCK PLAYERS
   In a real multi-user app, this would come from a server.
   For our single-player demo, we use fictional top players.
   ============================================================ */
const MOCK_PLAYERS = [
  { name: 'Jordan K.',   xp: 1200, level: 'Advanced',     accuracy: '94%', avatar: '🧑‍💻' },
  { name: 'Alex M.',     xp: 820,  level: 'Advanced',     accuracy: '88%', avatar: '🧑‍🎓' },
  { name: 'Sam L.',      xp: 650,  level: 'Intermediate', accuracy: '91%', avatar: '👩‍🎓' },
  { name: 'Maya R.',     xp: 580,  level: 'Intermediate', accuracy: '85%', avatar: '👩‍💻' },
  { name: 'Chris T.',    xp: 490,  level: 'Beginner',     accuracy: '96%', avatar: '🧑‍🚀' },
  { name: 'Aisha B.',    xp: 430,  level: 'Intermediate', accuracy: '80%', avatar: '👩‍🔬' },
  { name: 'Omar S.',     xp: 380,  level: 'Beginner',     accuracy: '88%', avatar: '🧑‍🔬' },
  { name: 'Elena P.',    xp: 310,  level: 'Beginner',     accuracy: '77%', avatar: '👩‍🏫' },
  { name: 'Lucas F.',    xp: 260,  level: 'Beginner',     accuracy: '74%', avatar: '🧑‍🏫' },
];

/* ============================================================
   BUILD LEADERBOARD
   ============================================================ */
function buildLeaderboard() {
  const profile = getProfile();

  // Add the real player to the rankings
  const allPlayers = [
    ...MOCK_PLAYERS,
    {
      name: profile.name + ' (You)',
      xp: profile.totalXP,
      level: profile.totalXP >= 1000 ? 'Advanced' :
             profile.totalXP >= 300  ? 'Intermediate' : 'Beginner',
      accuracy: profile.totalQuestions > 0
        ? Math.round((profile.totalCorrect / profile.totalQuestions) * 100) + '%'
        : '—',
      avatar: '⭐',
      isYou: true,
    }
  ];

  // Sort by XP descending
  allPlayers.sort((a, b) => b.xp - a.xp);

  /* ---- Update podium top 3 ---- */
  if (allPlayers[0]) {
    document.getElementById('p1name').textContent = allPlayers[0].name;
    document.getElementById('p1score').textContent = allPlayers[0].xp + ' XP';
  }
  if (allPlayers[1]) {
    document.getElementById('p2name').textContent = allPlayers[1].name;
    document.getElementById('p2score').textContent = allPlayers[1].xp + ' XP';
  }
  if (allPlayers[2]) {
    document.getElementById('p3name').textContent = allPlayers[2].name;
    document.getElementById('p3score').textContent = allPlayers[2].xp + ' XP';
  }

  /* ---- Build table rows ---- */
  const tbody = document.getElementById('lbTableBody');
  tbody.innerHTML = '';

  const rankEmojis = ['🥇', '🥈', '🥉'];

  allPlayers.forEach((player, index) => {
    const rank = index + 1;
    const row = document.createElement('tr');

    // Special CSS classes for top 3 and the current player
    if (rank <= 3) row.classList.add(`rank-${rank}`);
    if (player.isYou) {
      row.classList.add('you-row');
      // Save player's rank for the "Your Position" display
      document.getElementById('yourRank').textContent = `#${rank}`;
      document.getElementById('yourXP').textContent = `${player.xp} XP`;
    }

    // Rank display: emoji for top 3, number for others
    const rankDisplay = rank <= 3 ? rankEmojis[rank - 1] : `#${rank}`;

    row.innerHTML = `
      <td>${rankDisplay}</td>
      <td>${player.avatar} ${player.name}</td>
      <td>${player.level}</td>
      <td>${player.accuracy}</td>
      <td><strong>${player.xp}</strong></td>
    `;

    tbody.appendChild(row);
  });

  // If player has no games, show a message
  if (profile.gamesPlayed === 0) {
    document.getElementById('yourRank').textContent = '—';
    document.getElementById('yourXP').textContent = 'Play to join!';
  }
}

// Run when page loads
buildLeaderboard();
