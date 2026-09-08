# ⚡ Forge — Student Habit-Building Web App

A high-quality, mobile-first student habit-building web application designed for **MESA Forge PGP**.

Built with a focus on behavioral psychology, frictionless one-line habit creation, streak momentum, and zero-latency client-side persistence.

🔗 **Live Production Deployment**: [https://mesa-five-jet.vercel.app/habits](https://mesa-five-jet.vercel.app/habits)

---

## 🌟 Key Features

### 1. 🎯 Frictionless Natural Language Input
- Preserves the core one-line habit capture philosophy.
- Live NLP parsing: type *"Go to gym 4 times a week"* or *"Read for 20 minutes before bed"*, and Forge automatically infers:
  - Clean title
  - Target frequency (Daily, Weekdays, Weekends, or *N* times per week)
  - Preferred time of day (Morning, Afternoon, Evening)
  - Category (Fitness, Study, Mindfulness, Health, Social)
  - Curated emoji & theme color

### 2. 📊 High-Performance Daily Execution
- **Animated SVG Progress Ring**: Visual completion feedback that calculates daily percentages in real-time.
- **Micro-interactions**: Satisfying SVG checkmark draw animation, radiating ripple effect, and mobile haptic feedback (`navigator.vibrate`).
- **7-Day History Mini-Dots**: Instant visibility into the last 7 days of consistency directly on every habit card.
- **Recovery Messaging**: Constructive behavioral nudges (*"Fresh start 🌱"*) instead of guilt-inducing broken streak alerts.
- **Celebrations & Confetti**: Full canvas particle confetti burst on 100% daily completion.

### 3. 📈 Comprehensive Analytics & Insights
- **Key Metrics**: Real-time current streak, 30-day consistency percentage, and total lifetime check-ins.
- **Weekly Discipline Grid**: Monday-to-Sunday overview showing daily completion ratios.
- **15-Week Contribution Heatmap**: GitHub-style activity heatmaps for each individual habit.

### 4. 🎨 Design System & Accessibility
- **Dark & Light Modes**: System-aware theme toggle with instant CSS variable transitions.
- **Mobile-First UX**: Dedicated bottom tab bar with an elevated center Floating Action Button (FAB) on mobile (< 768px), transitioning to an ergonomic sticky sidebar on desktop (≥ 768px).
- **Keyboard Shortcuts**: Press `N` to open the habit creation sheet; press `Escape` to close any open modal.
- **Zero Latency**: Privacy-first local persistence via `localStorage` — no mandatory login or external API dependencies required.

---

## 🚀 Tech Stack

- **HTML5**: Semantic, accessible markup with full ARIA specifications.
- **CSS3**: Modern design tokens, spring easing transitions, CSS variables, and fluid typography.
- **Vanilla JavaScript**: Lightweight, modular event delegation and SVG animation engine.
- **Deployment**: Vercel with clean URL routing.

---

## 💻 Local Development

1. Clone this repository:
   ```bash
   git clone https://github.com/paramdeora/mesa-forge-habits.git
   cd mesa-forge-habits
   ```

2. Serve using any static file server:
   ```bash
   npx serve -l 8080 .
   ```

3. Open in your browser:
   ```
   http://localhost:8080/habits.html
   ```
