# 🎓 MathQuest — Gamified Math Learning Website
### University Final Interdisciplinary Assessment Project

---

## 📁 Project Structure

```
mathquest/
│
├── index.html          ← Home page (landing page)
├── quiz.html           ← Main quiz/game page
├── leaderboard.html    ← Leaderboard rankings
├── profile.html        ← Player profile & badges
│
├── css/
│   ├── style.css       ← Main design system (colors, fonts, layout)
│   └── quiz.css        ← Quiz-specific styles
│
└── js/
    ├── main.js         ← Shared utilities (theme, storage, sounds)
    ├── quiz.js         ← Game engine (questions, timer, scoring)
    ├── leaderboard.js  ← Leaderboard logic
    └── profile.js      ← Profile page logic
```

---

## 🎨 Design System

### Color Palette
| Role              | Color   | CSS Variable           |
|-------------------|---------|------------------------|
| Brand Purple      | #6c63ff | --accent-primary       |
| Success Teal      | #00d4aa | --accent-secondary     |
| Correct Green     | #00e676 | --accent-success       |
| Wrong Red         | #ff5c5c | --accent-danger        |
| Badge Gold        | #ffb300 | --accent-warning       |
| Dark Background   | #0d0d1a | --bg-primary           |

### Typography
- **Display/Logo:** Orbitron (futuristic, bold, memorable)
- **Body text:** DM Sans (clean, readable, friendly)

---

## ⚙️ Features Implemented

### ✅ Core Features
- [x] 45 math questions across 3 difficulty levels
- [x] Timer per question (20s / 15s / 12s)
- [x] XP scoring system
- [x] Streak multiplier (x1.5 at 3 streak, x2 at 5 streak)
- [x] Correct/wrong answer feedback with colors + sounds
- [x] Progress bar during quiz
- [x] Results screen with stats

### ✅ Gamification
- [x] 3 levels (Beginner / Intermediate / Advanced)
- [x] 6 badges with unlock conditions
- [x] Streak tracking & display
- [x] XP-based rank titles (6 ranks)
- [x] Leaderboard with podium

### ✅ Technical
- [x] LocalStorage for persistent progress
- [x] Dark/Light mode toggle (saved preference)
- [x] Web Audio API sound effects (no files needed)
- [x] Fully responsive (mobile + desktop)
- [x] CSS animations throughout
- [x] URL parameters to deep-link to a level

---

## 🚀 How to Run

1. Download or clone the project
2. Open `index.html` in any modern browser
3. No server or installation needed! Pure HTML/CSS/JS.

---

## 🏆 Badges Reference

| Badge          | Icon | Condition                              |
|----------------|------|----------------------------------------|
| First Step     | 🥉   | Complete your first quiz               |
| Speed Demon    | ⚡   | Answer a question in under 5 seconds  |
| On Fire        | 🔥   | Achieve a 5-question streak            |
| Perfectionist  | 🎯   | Get 100% accuracy in a quiz            |
| All-Star       | 🌟   | Reach 1000 total XP                    |
| Math Champion  | 🏆   | Score 100% on Advanced level           |

---

## 📈 XP Ranks

| XP Required | Rank Title               |
|-------------|--------------------------|
| 0           | 🌱 Beginner Mathematician |
| 200         | 📐 Number Apprentice      |
| 500         | ⚡ Equation Explorer      |
| 1000        | 🔥 Algebra Warrior        |
| 2000        | 🏆 Geometry Master        |
| 5000        | 🚀 Math Champion          |

---

## 💡 Future Improvements

1. **Backend integration** — Node.js + MongoDB for real multi-user leaderboard
2. **More question types** — Fill-in-the-blank, drag-and-drop, graphing
3. **Daily challenges** — New questions every day
4. **Hints system** — Use coins to buy hints
5. **Multiplayer mode** — Race friends in real-time
6. **Parent/Teacher dashboard** — Track student progress
7. **Accessibility** — Screen reader support, keyboard navigation
8. **PWA** — Make it installable as a mobile app

---

## 🎤 Presentation Tips

### Demo Flow (10 minutes)
1. Show the landing page (60 seconds)
2. Click "Start Playing" → choose Intermediate
3. Answer 3-4 questions live (show timer + streaks)
4. Get the streak bonus popup
5. Finish quiz → show results screen
6. Open Profile → show XP bar and badges
7. Toggle dark/light mode
8. Show leaderboard
9. Explain the code structure briefly

### Key Points to Mention
- "We used gamification principles from psychology (rewards, progress, competition)"
- "The XP streak multiplier encourages sustained focus"
- "LocalStorage lets data persist without a server"
- "Web Audio API creates sounds using math — no audio files needed!"
- "The design was inspired by Duolingo and Kahoot but with a futuristic academic aesthetic"

---

*Built with HTML, CSS, and JavaScript · No frameworks · No build tools needed*
