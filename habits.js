/**
 * FORGE — Student Habit Building Web App
 * Designed for MESA Forge PGP
 * Full interactive client-side application logic
 */
'use strict';

(function () {
  /* ═══════════════════════════════════════════════════
     1. CONSTANTS & PALETTES
  ═══════════════════════════════════════════════════ */
  const STORAGE_KEY = 'forge_v1_data';

  const HABIT_COLORS = [
    '#7C6AF8', // Electric Violet
    '#F97316', // Vibrant Orange
    '#10B981', // Emerald Green
    '#0EA5E9', // Ocean Sky
    '#EC4899', // Bright Pink
    '#F59E0B', // Sun Amber
    '#14B8A6', // Modern Teal
    '#F43F5E', // Vivid Rose
  ];

  const EMOJIS = [
    '💪','📚','🧘','💧','🌿','🏃','✍️','🎯',
    '🍎','😴','📖','🎵','🏋️','🧠','💊','📝',
    '🚴','🌅','🔥','⭐','🎸','🏊','🥗','🛹',
    '☕','🌙','📓','🤸','🏐','🧗','🎨','🔬'
  ];

  const CAT_EMOJIS = {
    fitness: '💪',
    study: '📚',
    mindfulness: '🧘',
    health: '🌿',
    social: '💬',
    other: '⭐',
  };

  const DEFAULT_STARTER_HABITS = [
    {
      title: 'Deep Work / Case Study prep',
      emoji: '📚',
      category: 'study',
      frequency: 'weekdays',
      timeOfDay: 'evening',
    },
    {
      title: 'Hydrate (2.5L clean water)',
      emoji: '💧',
      category: 'health',
      frequency: 'daily',
      timeOfDay: 'any',
    },
    {
      title: 'Morning 20-min workout or walk',
      emoji: '💪',
      category: 'fitness',
      frequency: 4,
      timeOfDay: 'morning',
    }
  ];

  /* ═══════════════════════════════════════════════════
     2. STATE MANAGEMENT & STORAGE
  ═══════════════════════════════════════════════════ */
  function getInitialState() {
    return {
      habits: [],
      userName: '',
      onboardingDone: false,
      theme: 'dark',
      currentView: 'today',
      joinDate: new Date().toISOString(),
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return getInitialState();
      return Object.assign(getInitialState(), JSON.parse(raw));
    } catch (e) {
      console.warn('Could not parse saved Forge state, resetting to default.', e);
      return getInitialState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Error saving state to localStorage', e);
    }
  }

  let state = loadState();

  /* ═══════════════════════════════════════════════════
     3. DATE & CALENDAR UTILITIES
  ═══════════════════════════════════════════════════ */
  function dateKey(date) {
    const d = date || new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function todayKey() {
    return dateKey(new Date());
  }

  function dateFromKey(key) {
    const [y, m, d] = key.split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  function formatDateHuman(date) {
    return (date || new Date()).toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  }

  function getWeekDays() {
    const today = new Date();
    const dow = today.getDay(); // 0 = Sun, 1 = Mon ...
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((dow + 6) % 7));
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  }

  function getGreeting() {
    const h = new Date().getHours();
    if (h >= 5 && h < 12) return 'Good morning';
    if (h >= 12 && h < 17) return 'Good afternoon';
    if (h >= 17 && h < 21) return 'Good evening';
    return 'Late night focus';
  }

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function escHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /* ═══════════════════════════════════════════════════
     4. HABIT ANALYTICS & METRICS
  ═══════════════════════════════════════════════════ */
  function habitColor(habit) {
    const idx = state.habits.findIndex(h => h.id === habit.id);
    return HABIT_COLORS[(idx >= 0 ? idx : 0) % HABIT_COLORS.length];
  }

  function isDueToday(habit) {
    const dow = new Date().getDay();
    if (habit.frequency === 'daily') return true;
    if (habit.frequency === 'weekdays') return dow >= 1 && dow <= 5;
    if (habit.frequency === 'weekends') return dow === 0 || dow === 6;
    return true; // numeric n times/week: display daily so students can choose when
  }

  function getTodayHabits() {
    return state.habits.filter(h => !h.archived && isDueToday(h));
  }

  function getStreak(habit) {
    const today = new Date();
    const todayStr = todayKey();
    let streak = 0;
    let d = new Date(today);

    if (!habit.completions[todayStr]) {
      d.setDate(d.getDate() - 1);
    }

    for (let i = 0; i < 365; i++) {
      const key = dateKey(d);
      if (habit.completions[key]) {
        streak++;
        d.setDate(d.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }

  function getBestStreak(habit) {
    const keys = Object.keys(habit.completions).filter(k => habit.completions[k]).sort();
    if (!keys.length) return 0;
    let best = 1, current = 1;
    for (let i = 1; i < keys.length; i++) {
      const prev = dateFromKey(keys[i - 1]);
      const curr = dateFromKey(keys[i]);
      const diffDays = Math.round(Math.abs(curr - prev) / 86400000);
      if (diffDays === 1) {
        current++;
        if (current > best) best = current;
      } else {
        current = 1;
      }
    }
    return best;
  }

  function getConsistency(habit, daysCount = 30) {
    const today = new Date();
    let completed = 0;
    for (let i = 0; i < daysCount; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      if (habit.completions[dateKey(d)]) {
        completed++;
      }
    }
    return Math.round((completed / daysCount) * 100);
  }

  function getOverallStreak() {
    const active = state.habits.filter(h => !h.archived);
    if (!active.length) return 0;

    const today = new Date();
    const tk = todayKey();
    let streak = 0;
    let d = new Date(today);

    const dueToday = active.filter(isDueToday);
    const allDoneToday = dueToday.length > 0 && dueToday.every(h => h.completions[tk]);

    if (!allDoneToday) {
      d.setDate(d.getDate() - 1);
    }

    for (let i = 0; i < 365; i++) {
      const k = dateKey(d);
      const allDone = active.every(h => h.completions[k]);
      if (allDone) {
        streak++;
        d.setDate(d.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }

  function streakEmoji(n) {
    if (!n) return '';
    if (n < 3) return '🌱';
    if (n < 7) return '⚡';
    if (n < 21) return '🔥';
    return '🔥🔥';
  }

  function freqLabel(freq) {
    if (freq === 'daily') return 'Every day';
    if (freq === 'weekdays') return 'Weekdays';
    if (freq === 'weekends') return 'Weekends';
    return `${freq}× per week`;
  }

  /* ═══════════════════════════════════════════════════
     5. INTELLIGENT NATURAL LANGUAGE PARSER
  ═══════════════════════════════════════════════════ */
  function parseHabitInput(text) {
    const lo = text.toLowerCase().trim();

    // 1. Frequency detection
    let frequency = 'daily';
    let freqStr = 'Every day';
    const numMatch = lo.match(/(\d+)\s*(?:times?|x|×)\s*(?:a|per)?\s*week/i);
    if (numMatch) {
      frequency = parseInt(numMatch[1], 10);
      freqStr = `${frequency}× / week`;
    } else if (/(weekday|mon.*fri|monday.*friday)/i.test(lo)) {
      frequency = 'weekdays';
      freqStr = 'Weekdays';
    } else if (/(weekend|sat.*sun|saturday.*sunday)/i.test(lo)) {
      frequency = 'weekends';
      freqStr = 'Weekends';
    }

    // 2. Time of day detection
    let timeOfDay = 'any';
    if (/\b(morning|wake|waking|breakfast|am)\b/i.test(lo)) timeOfDay = 'morning';
    else if (/\b(afternoon|lunch|midday|noon)\b/i.test(lo)) timeOfDay = 'afternoon';
    else if (/\b(evening|night|dinner|before bed|bedtime|sleep|pm)\b/i.test(lo)) timeOfDay = 'evening';

    // 3. Category & Emoji detection
    let category = 'other';
    if (/\b(gym|workout|exercise|run|running|jog|walk|walking|yoga|pushup|squat|lift|swim|cycling|bike|hiit|sport)\b/i.test(lo)) {
      category = 'fitness';
    } else if (/\b(study|read|reading|book|learn|course|class|exam|revise|revision|note|assignment|case|finance|quant)\b/i.test(lo)) {
      category = 'study';
    } else if (/\b(meditat|breath|journal|journaling|gratitude|mindful|reflect|zen|calm|pray)\b/i.test(lo)) {
      category = 'mindfulness';
    } else if (/\b(water|hydrate|vitamin|medicine|health|diet|fruit|meal|sleep|protein|supplement|doctor)\b/i.test(lo)) {
      category = 'health';
    } else if (/\b(call|family|friend|network|message|talk|meet|connect|mentor)\b/i.test(lo)) {
      category = 'social';
    }

    // 4. Clean Title Extraction
    let title = text.trim()
      .replace(/\s*\d+\s*(?:times?|x|×)\s*(?:a|per)?\s*week\s*/gi, ' ')
      .replace(/\s*(every|each|daily)\s*(day|morning|evening|night|afternoon|weekday|weekend|week)?\s*/gi, ' ')
      .replace(/\s*(weekdays?|weekends?)\s*/gi, ' ')
      .replace(/\s*(before|after)\s*(bed|sleep|breakfast|lunch|dinner|waking)\s*/gi, ' ')
      .replace(/\s*(in\s+the\s+)?(morning|afternoon|evening|night)\s*/gi, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    if (title.length > 0) {
      title = title.charAt(0).toUpperCase() + title.slice(1);
    } else {
      title = text.trim();
    }

    const timeLabels = {
      morning: '🌅 Morning',
      afternoon: '☀️ Afternoon',
      evening: '🌙 Evening',
      any: ''
    };
    const metaParts = [freqStr];
    if (timeLabels[timeOfDay]) metaParts.push(timeLabels[timeOfDay]);

    return {
      title: title || text.trim(),
      category,
      emoji: CAT_EMOJIS[category] || '⭐',
      frequency,
      timeOfDay,
      metaStr: metaParts.join(' · '),
    };
  }

  /* ═══════════════════════════════════════════════════
     6. VIEWS RENDERING
  ═══════════════════════════════════════════════════ */

  // --- VIEW: TODAY ---
  function renderToday() {
    const todayHabits = getTodayHabits();
    const todayStr = todayKey();
    const done = todayHabits.filter(h => h.completions[todayStr]);
    const remaining = todayHabits.filter(h => !h.completions[todayStr]);
    const pct = todayHabits.length ? Math.round((done.length / todayHabits.length) * 100) : 0;
    const allDone = todayHabits.length > 0 && remaining.length === 0;
    const overallStreak = getOverallStreak();
    const name = state.userName || 'Champion';
    const dateStr = formatDateHuman(new Date());

    const circumference = 226.19; // 2 * PI * 36
    const dashOffset = (circumference * (1 - pct / 100)).toFixed(2);

    let html = '<div class="view">';

    // Header with Circular Progress Ring
    html += `
      <div class="today-header">
        <div class="today-greeting">
          <div class="today-greeting-line">${escHtml(getGreeting())}</div>
          <div class="today-name">${escHtml(name)} ${allDone ? '🎉' : '👋'}</div>
          <div class="today-date">${escHtml(dateStr)}</div>
        </div>
        <div class="progress-ring-wrap" title="${pct}% completed today">
          <svg class="progress-ring" viewBox="0 0 80 80">
            <circle class="progress-ring-track" cx="40" cy="40" r="36"/>
            <circle class="progress-ring-fill ${allDone ? 'is-complete' : ''}" cx="40" cy="40" r="36"
              id="progressRingFill"
              style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${dashOffset};"
              data-target-offset="${dashOffset}"
            />
          </svg>
          <div class="progress-ring-center">
            <span class="progress-ring-pct" id="ringPct">${allDone ? '✓' : pct + '%'}</span>
            <span class="progress-ring-sub">today</span>
          </div>
        </div>
      </div>
    `;

    // Summary Metric Strip
    if (todayHabits.length > 0) {
      html += `
        <div class="day-summary">
          <div class="day-summary-stat">
            <div class="day-summary-val">${done.length}<span style="font-size:13px;color:var(--txt-3)">/${todayHabits.length}</span></div>
            <div class="day-summary-key">Completed</div>
          </div>
          <div class="day-summary-divider"></div>
          <div class="day-summary-stat">
            <div class="day-summary-val" style="${overallStreak > 0 ? 'color:var(--warning)' : ''}">
              ${overallStreak}${overallStreak > 0 ? '🔥' : ''}
            </div>
            <div class="day-summary-key">Day streak</div>
          </div>
          <div class="day-summary-divider"></div>
          <div class="day-summary-stat">
            <div class="day-summary-val">${remaining.length}</div>
            <div class="day-summary-key">Remaining</div>
          </div>
        </div>
      `;
    }

    // Content: Empty State vs All Done Celebration vs Active Habits
    if (todayHabits.length === 0) {
      html += `
        <div class="empty-state">
          <div class="empty-icon">🌱</div>
          <div class="empty-title">Start with a single habit</div>
          <div class="empty-body">Real momentum comes from small, daily wins. Choose an essential habit to forge today.</div>
          <button class="empty-cta" id="emptyAddBtn">+ Add your first habit</button>
          
          <div class="quick-starters">
            <button class="quick-starter-chip" data-quick="📚 Study & prep 45 mins daily">📚 Study 45 mins</button>
            <button class="quick-starter-chip" data-quick="💧 Drink 2.5L water daily">💧 Drink 2.5L water</button>
            <button class="quick-starter-chip" data-quick="🏃 20-min gym workout 4 times a week">🏃 Workout 4x/wk</button>
            <button class="quick-starter-chip" data-quick="🧘 10 mins meditation every morning">🧘 Morning meditation</button>
            <button class="quick-starter-chip" data-quick="📖 Read 15 pages before bed">📖 Read before bed</button>
          </div>
        </div>
      `;
    } else if (allDone) {
      html += `
        <div class="all-done-card">
          <div class="all-done-emoji">🎯</div>
          <div class="all-done-title">All habits crushed today!</div>
          <div class="all-done-body">You showed up and executed on every commitment today. That is how real discipline is forged. Rest well and repeat tomorrow!</div>
        </div>
        <div class="habits-section-label">Completed today</div>
        <div class="habit-list">
          ${done.map(h => renderHabitCard(h, true)).join('')}
        </div>
      `;
    } else {
      if (remaining.length > 0) {
        html += `
          <div class="habits-section-label">To do today (${remaining.length})</div>
          <div class="habit-list">
            ${remaining.map(h => renderHabitCard(h, false)).join('')}
          </div>
        `;
      }
      if (done.length > 0) {
        html += `
          <div class="habits-section-label">Done today (${done.length})</div>
          <div class="habit-list">
            ${done.map(h => renderHabitCard(h, true)).join('')}
          </div>
        `;
      }
    }

    html += '</div>';
    return html;
  }

  function renderHabitCard(h, isDone) {
    const color = habitColor(h);
    const streak = getStreak(h);
    const sEm = streakEmoji(streak);
    const weekDays = getWeekDays();
    const todayStr = todayKey();

    const weekDotsHtml = weekDays.map(d => {
      const key = dateKey(d);
      const isCompleted = !!h.completions[key];
      const isTod = key === todayStr;
      const dayName = d.toLocaleDateString('en-IN', { weekday: 'short' });
      return `<div class="week-dot ${isCompleted ? 'done' : ''} ${isTod ? 'today' : ''}" style="--h-color:${color}" title="${dayName}: ${isCompleted ? 'Done' : 'Missed'}"></div>`;
    }).join('');

    return `
      <div class="habit-card ${isDone ? 'is-done' : ''}" data-id="${escHtml(h.id)}" style="--h-color:${escHtml(color)}">
        <div class="habit-check ${isDone ? 'is-done' : ''}" style="--h-color:${escHtml(color)}" aria-label="Mark completed">
          <svg class="habit-check-svg" viewBox="0 0 14 14">
            <polyline points="2 7 5.5 10.5 12 3"/>
          </svg>
        </div>
        <div class="habit-info">
          <div class="habit-emoji-title">
            <span class="habit-emoji">${escHtml(h.emoji)}</span>
            <span class="habit-title">${escHtml(h.title)}</span>
          </div>
          <div class="habit-meta">
            <span class="habit-freq-tag">${escHtml(freqLabel(h.frequency))}</span>
            ${streak > 0 ? `<span class="habit-streak ${streak >= 3 ? 'is-hot' : ''}">${sEm} ${streak}d streak</span>` : ''}
          </div>
          <div class="habit-week-dots">
            ${weekDotsHtml}
          </div>
        </div>
        <button class="habit-edit-btn" data-edit="${escHtml(h.id)}" aria-label="Edit ${escHtml(h.title)}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
      </div>
    `;
  }

  // --- VIEW: HABITS (MANAGE) ---
  function renderHabits() {
    const active = state.habits.filter(h => !h.archived);
    let html = '<div class="view">';
    html += `
      <div class="habits-view-header">
        <div class="habits-view-title">My Habits</div>
        <button class="habits-view-add-btn" id="habitsAddBtn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          New Habit
        </button>
      </div>
    `;

    if (active.length === 0) {
      html += `
        <div class="empty-state">
          <div class="empty-icon">📋</div>
          <div class="empty-title">No habits created yet</div>
          <div class="empty-body">Set up daily or weekly routines that align with your academic and career goals.</div>
          <button class="empty-cta" id="habitsEmptyAddBtn">+ Add your first habit</button>
        </div>
      `;
    } else {
      html += '<div class="manage-habit-list">';
      active.forEach(h => {
        const color = habitColor(h);
        const streak = getStreak(h);
        const cons = getConsistency(h, 30);
        html += `
          <div class="manage-habit-card" data-edit="${escHtml(h.id)}" style="--h-color:${escHtml(color)}">
            <span class="manage-habit-emoji">${escHtml(h.emoji)}</span>
            <div class="manage-habit-info">
              <div class="manage-habit-title">${escHtml(h.title)}</div>
              <div class="manage-habit-meta">${escHtml(freqLabel(h.frequency))}${h.timeOfDay !== 'any' ? ' · ' + h.timeOfDay : ''}</div>
            </div>
            <div class="manage-habit-stats">
              ${streak > 0 ? `<span class="manage-habit-streak">${streakEmoji(streak)} ${streak}d</span>` : '<span class="manage-habit-streak" style="color:var(--txt-4)">–</span>'}
              <span class="manage-habit-cons">${cons}% / 30d</span>
            </div>
            <span class="manage-habit-chevron">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
            </span>
          </div>
        `;
      });
      html += '</div>';
    }

    html += '</div>';
    return html;
  }

  // --- VIEW: PROGRESS ---
  function renderProgress() {
    const active = state.habits.filter(h => !h.archived);
    const todayStr = todayKey();
    const weekDays = getWeekDays();

    const totalCompletions = active.reduce((acc, h) => acc + Object.values(h.completions).filter(Boolean).length, 0);
    const overallStreak = getOverallStreak();
    const avgConsistency = active.length
      ? Math.round(active.reduce((acc, h) => acc + getConsistency(h, 30), 0) / active.length)
      : 0;

    let html = '<div class="view">';
    html += '<div class="habits-view-header"><div class="habits-view-title">Progress & Insights</div></div>';

    if (active.length === 0) {
      html += `
        <div class="empty-state">
          <div class="empty-icon">📈</div>
          <div class="empty-title">Analytics will appear here</div>
          <div class="empty-body">Add your active routines to track streaks, weekly patterns, and contribution heatmaps.</div>
          <button class="empty-cta" onclick="window.forgeOpenAddSheet()">+ Add a habit</button>
        </div>
      `;
      html += '</div>';
      return html;
    }

    // 3 Stat Summary Grid
    html += `
      <div class="progress-stats-grid">
        <div class="stat-card">
          <div class="stat-icon">🔥</div>
          <div class="stat-val ${overallStreak > 0 ? 'is-hot' : ''}">${overallStreak}</div>
          <div class="stat-label">Day streak</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">✅</div>
          <div class="stat-val is-good">${avgConsistency}%</div>
          <div class="stat-label">Consistency (30d)</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⭐</div>
          <div class="stat-val">${totalCompletions}</div>
          <div class="stat-label">Total check-ins</div>
        </div>
      </div>
    `;

    // Week Grid Overview
    const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    html += `
      <div class="week-grid-wrap">
        <div class="section-title">This Week's Discipline</div>
        <div class="week-grid">
    `;
    weekDays.forEach((d, i) => {
      const k = dateKey(d);
      const isTod = k === todayStr;
      const doneCount = active.filter(h => h.completions[k]).length;
      const total = active.length;
      let dotClass = '';
      if (total > 0) {
        if (doneCount >= total) dotClass = 'is-done';
        else if (doneCount > 0) dotClass = 'is-partial';
      }
      html += `
        <div class="week-grid-day">
          <div class="week-grid-day-label">${dayLabels[i]}</div>
          <div class="week-grid-day-dot ${dotClass} ${isTod ? 'is-today' : ''}" title="${k}: ${doneCount}/${total}">
            ${doneCount}/${total}
          </div>
        </div>
      `;
    });
    html += '</div></div>';

    // Per-Habit Consistency & Heatmaps
    html += '<div class="section-title" style="margin-bottom:12px">Habit Consistency Breakdown</div>';
    html += '<div class="habit-progress-list">';
    active.forEach(h => {
      const color = habitColor(h);
      const streak = getStreak(h);
      const cons = getConsistency(h, 30);
      html += `
        <div class="habit-progress-row" style="--h-color:${escHtml(color)}">
          <div class="habit-progress-header">
            <div class="habit-progress-name">
              <span>${escHtml(h.emoji)}</span>
              <span>${escHtml(h.title)}</span>
            </div>
            <div class="habit-progress-streak">${streak > 0 ? streakEmoji(streak) + ' ' + streak + 'd' : '–'}</div>
          </div>
          <div class="habit-progress-bar-wrap">
            <div class="habit-progress-bar" style="width:0%" data-target="${cons}%"></div>
          </div>
          <div class="habit-progress-pct">${cons}% completion consistency in the last 30 days</div>
          <div class="heatmap-section">
            ${renderHeatmap(h, color)}
          </div>
        </div>
      `;
    });
    html += '</div></div>';
    return html;
  }

  function renderHeatmap(habit, color) {
    const today = new Date();
    const todayStr = todayKey();
    const numWeeks = 15;
    const numDays = numWeeks * 7;
    const days = [];

    for (let i = numDays - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const key = dateKey(d);
      days.push({ key, done: !!habit.completions[key] });
    }

    const weeks = [];
    for (let w = 0; w < numWeeks; w++) {
      weeks.push(days.slice(w * 7, w * 7 + 7));
    }

    let html = `<div class="heatmap-wrap" style="--h-color:${escHtml(color)}"><div class="heatmap">`;
    weeks.forEach(week => {
      html += '<div class="heatmap-col">';
      week.forEach(day => {
        const level = day.done ? 'l4' : '';
        const isT = day.key === todayStr;
        html += `<div class="heatmap-day ${level} ${isT ? 'is-today' : ''}" title="${day.key}: ${day.done ? 'Done' : 'Not logged'}"></div>`;
      });
      html += '</div>';
    });
    html += '</div></div>';
    return html;
  }

  // --- VIEW: PROFILE ---
  function renderProfile() {
    const name = state.userName || 'Student';
    const initial = name.charAt(0).toUpperCase();
    const joinDate = state.joinDate ? new Date(state.joinDate) : new Date();
    const joinStr = joinDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
    const active = state.habits.filter(h => !h.archived);
    const totalCompletions = active.reduce((acc, h) => acc + Object.values(h.completions).filter(Boolean).length, 0);
    const overallStreak = getOverallStreak();

    let html = '<div class="view">';
    html += `
      <div class="profile-avatar-section">
        <div class="profile-avatar">${escHtml(initial)}</div>
        <div>
          <div class="profile-name">${escHtml(name)}</div>
          <div class="profile-cohort">MESA Forge PGP Cohort</div>
          <div class="profile-join-date">Building disciplined habits since ${escHtml(joinStr)}</div>
        </div>
      </div>

      <div class="progress-stats-grid" style="margin-bottom:28px">
        <div class="stat-card">
          <div class="stat-icon">🎯</div>
          <div class="stat-val">${active.length}</div>
          <div class="stat-label">Active Habits</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🔥</div>
          <div class="stat-val ${overallStreak > 0 ? 'is-hot' : ''}">${overallStreak}</div>
          <div class="stat-label">Streak</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">✅</div>
          <div class="stat-val is-good">${totalCompletions}</div>
          <div class="stat-label">Check-ins</div>
        </div>
      </div>

      <div class="settings-section">
        <div class="settings-section-title">Preferences</div>
        <div class="settings-card">
          <div class="settings-row">
            <div class="settings-row-icon">🌙</div>
            <div class="settings-row-text">
              <div class="settings-row-label">Dark Mode</div>
              <div class="settings-row-sub">Reduced eye strain during late night study sessions</div>
            </div>
            <div class="settings-row-action">
              <label class="toggle">
                <input type="checkbox" id="themeToggle" ${state.theme === 'dark' ? 'checked' : ''}>
                <div class="toggle-track"></div>
                <div class="toggle-thumb"></div>
              </label>
            </div>
          </div>
          <div class="settings-row" id="editNameRow" style="cursor:pointer">
            <div class="settings-row-icon">✏️</div>
            <div class="settings-row-text">
              <div class="settings-row-label">Your Name</div>
              <div class="settings-row-sub">${escHtml(name)}</div>
            </div>
            <div class="settings-row-action">
              <button class="settings-link-arrow" id="editNameBtn" aria-label="Edit name">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="settings-section">
        <div class="settings-section-title">Data & Privacy</div>
        <div class="settings-card">
          <div class="settings-row">
            <div class="settings-row-icon">🗑️</div>
            <div class="settings-row-text">
              <div class="settings-row-label">Reset All Habits & History</div>
              <div class="settings-row-sub">Clear your local storage cache and restart clean</div>
            </div>
            <div class="settings-row-action">
              <button id="resetDataBtn" style="font-size:12px;color:var(--danger);font-weight:700;padding:7px 12px;border-radius:8px;background:var(--danger-bg);border:1px solid rgba(239,68,68,0.2)">Reset Data</button>
            </div>
          </div>
        </div>
      </div>

      <div class="settings-section">
        <div class="settings-section-title">About Forge</div>
        <div class="settings-card">
          <div class="settings-row">
            <div class="settings-row-icon">⚡</div>
            <div class="settings-row-text">
              <div class="settings-row-label">Forge v1.0 Production</div>
              <div class="settings-row-sub">Engineered specifically for MESA Forge students · Privacy-first, zero server latency</div>
            </div>
          </div>
        </div>
      </div>
    `;

    html += '</div>';
    return html;
  }

  /* ═══════════════════════════════════════════════════
     7. MAIN RENDER PIPELINE
  ═══════════════════════════════════════════════════ */
  function render() {
    const main = document.getElementById('mainContent');
    if (!main) return;

    const views = {
      today: renderToday,
      habits: renderHabits,
      progress: renderProgress,
      profile: renderProfile,
    };

    const viewFn = views[state.currentView] || renderToday;
    main.innerHTML = viewFn();

    // Trigger spring CSS animations for progress indicators
    requestAnimationFrame(() => {
      const ring = document.getElementById('progressRingFill');
      if (ring) {
        const target = parseFloat(ring.dataset.targetOffset || '226.19');
        setTimeout(() => { ring.style.strokeDashoffset = target; }, 50);
      }
      document.querySelectorAll('.habit-progress-bar[data-target]').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.target; }, 80);
      });
    });

    attachViewEvents();
    updateNavState();
    updateSidebarUser();
  }

  function updateNavState() {
    const view = state.currentView;
    document.querySelectorAll('[data-view]').forEach(el => {
      const isActive = el.dataset.view === view;
      el.classList.toggle('is-active', isActive);
      if (el.getAttribute('aria-current') !== null) {
        el.setAttribute('aria-current', isActive ? 'page' : 'false');
      }
    });
  }

  function updateSidebarUser() {
    const name = state.userName || 'Student';
    const nameEl = document.getElementById('sidebarName');
    const avatarEl = document.getElementById('sidebarAvatar');
    if (nameEl) nameEl.textContent = name;
    if (avatarEl) avatarEl.textContent = name.charAt(0).toUpperCase();
  }

  function navigate(view) {
    state.currentView = view;
    saveState();

    const titles = {
      today: 'Today — Forge',
      habits: 'My Habits — Forge',
      progress: 'Progress & Insights — Forge',
      profile: 'Profile — Forge',
    };
    document.title = titles[view] || 'Forge — Build Your Habits';

    render();
    const main = document.getElementById('mainContent');
    if (main) main.scrollTop = 0;
  }

  /* ═══════════════════════════════════════════════════
     8. VIEW EVENT BINDINGS
  ═══════════════════════════════════════════════════ */
  function attachViewEvents() {
    // Add Buttons
    const emptyBtn = document.getElementById('emptyAddBtn');
    if (emptyBtn) emptyBtn.addEventListener('click', openAddSheet);

    const habitsEmptyBtn = document.getElementById('habitsEmptyAddBtn');
    if (habitsEmptyBtn) habitsEmptyBtn.addEventListener('click', openAddSheet);

    const habitsAddBtn = document.getElementById('habitsAddBtn');
    if (habitsAddBtn) habitsAddBtn.addEventListener('click', openAddSheet);

    // Quick Starter Chips
    document.querySelectorAll('.quick-starter-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.dataset.quick;
        if (text) {
          const parsed = parseHabitInput(text);
          createAndSaveHabit(parsed);
        }
      });
    });

    // Habit Card completion toggles
    document.querySelectorAll('.habit-card').forEach(card => {
      const id = card.dataset.id;
      if (!id) return;
      card.addEventListener('click', (e) => {
        if (e.target.closest('.habit-edit-btn')) return;
        toggleHabit(id, card);
      });
    });

    // Habit Edit Buttons
    document.querySelectorAll('[data-edit]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        openEditSheet(el.dataset.edit);
      });
    });

    // Profile Screen Events
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('change', () => {
        state.theme = themeToggle.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', state.theme);
        saveState();
      });
    }

    const editNameRow = document.getElementById('editNameRow');
    if (editNameRow) {
      editNameRow.addEventListener('click', promptEditName);
    }

    const resetBtn = document.getElementById('resetDataBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete all habits and history? This will restart the app.')) {
          state = getInitialState();
          saveState();
          document.documentElement.setAttribute('data-theme', 'dark');
          const overlay = document.getElementById('onboardingOverlay');
          if (overlay) {
            overlay.hidden = false;
            overlay.style.display = 'flex';
          }
          render();
          toast('All data reset successfully.', 'warning');
        }
      });
    }
  }

  function promptEditName() {
    const current = state.userName || '';
    const newName = prompt('Enter your name or preferred nickname:', current);
    if (newName && newName.trim()) {
      state.userName = newName.trim().split(' ')[0];
      saveState();
      render();
      toast('Name updated ✓', 'success');
    }
  }

  /* ═══════════════════════════════════════════════════
     9. COMPLETION & INTERACTION LOGIC
  ═══════════════════════════════════════════════════ */
  function toggleHabit(id, cardEl) {
    const habit = state.habits.find(h => h.id === id);
    if (!habit) return;

    const key = todayKey();
    const wasDone = !!habit.completions[key];

    habit.completions[key] = !wasDone;
    saveState();

    if (!wasDone) {
      // Completed action
      cardEl.classList.add('just-completed');
      const check = cardEl.querySelector('.habit-check');
      if (check) check.classList.add('is-done');

      // Native mobile haptic feedback
      if (typeof navigator.vibrate === 'function') {
        try { navigator.vibrate([12, 24]); } catch (e) {}
      }

      setTimeout(() => {
        cardEl.classList.remove('just-completed');
        render();
        checkAllDoneToday();
      }, 360);
    } else {
      // Undo action
      render();
    }
  }

  function checkAllDoneToday() {
    const todayHabits = getTodayHabits();
    const key = todayKey();
    const done = todayHabits.filter(h => h.completions[key]);

    if (todayHabits.length > 0 && done.length === todayHabits.length) {
      const lastCelebrated = sessionStorage.getItem('forge_celebrated_date');
      if (lastCelebrated !== key) {
        sessionStorage.setItem('forge_celebrated_date', key);
        setTimeout(showCelebration, 250);
      }
    }
  }

  function createAndSaveHabit(parsed) {
    const newHabit = {
      id: generateId(),
      title: parsed.title,
      emoji: parsed.emoji,
      category: parsed.category,
      frequency: parsed.frequency,
      timeOfDay: parsed.timeOfDay,
      createdAt: new Date().toISOString(),
      completions: {},
      archived: false,
    };

    state.habits.push(newHabit);
    saveState();
    navigate('today');
    toast(`Habit added: ${newHabit.emoji} ${newHabit.title}`, 'success');
  }

  /* ═══════════════════════════════════════════════════
     10. ADD HABIT SHEET LOGIC
  ═══════════════════════════════════════════════════ */
  let isAddSheetOpen = false;

  function openAddSheet() {
    const sheet = document.getElementById('addHabitSheet');
    const backdrop = document.getElementById('addSheetBackdrop');
    const input = document.getElementById('habitInput');
    if (!sheet) return;

    sheet.classList.add('is-open');
    sheet.setAttribute('aria-hidden', 'false');
    if (backdrop) {
      backdrop.hidden = false;
      backdrop.style.display = 'block';
    }
    document.body.style.overflow = 'hidden';
    isAddSheetOpen = true;

    setTimeout(() => { if (input) input.focus(); }, 200);
  }

  function closeAddSheet() {
    const sheet = document.getElementById('addHabitSheet');
    const backdrop = document.getElementById('addSheetBackdrop');
    const input = document.getElementById('habitInput');
    const preview = document.getElementById('habitPreview');
    const submitBtn = document.getElementById('addSheetSubmit');
    const counter = document.getElementById('habitCharCount');

    if (!sheet) return;

    sheet.classList.remove('is-open');
    sheet.setAttribute('aria-hidden', 'true');
    if (backdrop) {
      backdrop.hidden = true;
      backdrop.style.display = 'none';
    }
    document.body.style.overflow = '';
    isAddSheetOpen = false;

    if (input) input.value = '';
    if (preview) {
      preview.hidden = true;
      preview.style.display = 'none';
    }
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.setAttribute('aria-disabled', 'true');
    }
    if (counter) counter.textContent = '0/120';
  }

  function initAddSheet() {
    const input = document.getElementById('habitInput');
    const preview = document.getElementById('habitPreview');
    const previewEmoji = document.getElementById('previewEmoji');
    const previewTitle = document.getElementById('previewTitle');
    const previewMeta = document.getElementById('previewMeta');
    const submitBtn = document.getElementById('addSheetSubmit');
    const counter = document.getElementById('habitCharCount');
    const closeBtn = document.getElementById('addSheetClose');
    const backdrop = document.getElementById('addSheetBackdrop');

    if (!input) return;

    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = Math.min(input.scrollHeight, 120) + 'px';

      const val = input.value.trim();
      if (counter) counter.textContent = `${input.value.length}/120`;

      if (val.length < 2) {
        if (preview) {
          preview.hidden = true;
          preview.style.display = 'none';
        }
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.setAttribute('aria-disabled', 'true');
        }
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.removeAttribute('aria-disabled');
      }

      const parsed = parseHabitInput(val);
      if (preview) {
        preview.hidden = false;
        preview.style.display = 'block';
      }
      if (previewEmoji) previewEmoji.textContent = parsed.emoji;
      if (previewTitle) previewTitle.textContent = parsed.title;
      if (previewMeta) previewMeta.textContent = parsed.metaStr;
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (submitBtn && !submitBtn.disabled) submitHabitFromSheet();
      }
    });

    if (closeBtn) closeBtn.addEventListener('click', closeAddSheet);
    if (backdrop) backdrop.addEventListener('click', closeAddSheet);
    if (submitBtn) submitBtn.addEventListener('click', submitHabitFromSheet);

    document.querySelectorAll('.example-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        if (input) {
          input.value = chip.dataset.example || '';
          input.dispatchEvent(new Event('input'));
          input.focus();
        }
      });
    });
  }

  function submitHabitFromSheet() {
    const input = document.getElementById('habitInput');
    if (!input) return;
    const val = input.value.trim();
    if (!val) return;

    const parsed = parseHabitInput(val);
    closeAddSheet();
    createAndSaveHabit(parsed);
  }

  /* ═══════════════════════════════════════════════════
     11. EDIT HABIT SHEET LOGIC
  ═══════════════════════════════════════════════════ */
  let currentEditingHabitId = null;
  let editingEmoji = '';
  let editingFreq = 'daily';
  let editingTime = 'any';

  function openEditSheet(id) {
    const habit = state.habits.find(h => h.id === id);
    if (!habit) return;

    currentEditingHabitId = id;
    editingEmoji = habit.emoji;
    editingFreq = habit.frequency;
    editingTime = habit.timeOfDay;

    const titleInput = document.getElementById('editTitleInput');
    if (titleInput) titleInput.value = habit.title;

    // Emoji Picker Populate
    const picker = document.getElementById('emojiPicker');
    if (picker) {
      picker.innerHTML = EMOJIS.map(e => `
        <button class="emoji-option ${e === habit.emoji ? 'is-active' : ''}" data-emoji="${e}">${e}</button>
      `).join('');

      picker.querySelectorAll('.emoji-option').forEach(btn => {
        btn.addEventListener('click', () => {
          picker.querySelectorAll('.emoji-option').forEach(b => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          editingEmoji = btn.dataset.emoji;
        });
      });
    }

    // Frequency Selector
    const freqEl = document.getElementById('freqOptions');
    if (freqEl) {
      freqEl.querySelectorAll('.seg-btn').forEach(btn => {
        const f = btn.dataset.freq;
        const active = String(editingFreq) === f;
        btn.classList.toggle('is-active', active);
        btn.onclick = () => {
          freqEl.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          editingFreq = isNaN(Number(f)) ? f : Number(f);
        };
      });
    }

    // Time of Day Selector
    const timeEl = document.getElementById('timeOptions');
    if (timeEl) {
      timeEl.querySelectorAll('.seg-btn').forEach(btn => {
        btn.classList.toggle('is-active', btn.dataset.time === editingTime);
        btn.onclick = () => {
          timeEl.querySelectorAll('.seg-btn').forEach(b => b.classList.remove('is-active'));
          btn.classList.add('is-active');
          editingTime = btn.dataset.time;
        };
      });
    }

    const sheet = document.getElementById('editHabitSheet');
    const backdrop = document.getElementById('editSheetBackdrop');
    if (sheet) {
      sheet.classList.add('is-open');
      sheet.setAttribute('aria-hidden', 'false');
    }
    if (backdrop) {
      backdrop.hidden = false;
      backdrop.style.display = 'block';
    }
    document.body.style.overflow = 'hidden';
  }

  function closeEditSheet() {
    const sheet = document.getElementById('editHabitSheet');
    const backdrop = document.getElementById('editSheetBackdrop');
    if (sheet) {
      sheet.classList.remove('is-open');
      sheet.setAttribute('aria-hidden', 'true');
    }
    if (backdrop) {
      backdrop.hidden = true;
      backdrop.style.display = 'none';
    }
    document.body.style.overflow = '';
    currentEditingHabitId = null;
  }

  function initEditSheet() {
    const closeBtn = document.getElementById('editSheetClose');
    const backdrop = document.getElementById('editSheetBackdrop');
    const saveBtn = document.getElementById('editSaveBtn');
    const delBtn = document.getElementById('editDeleteBtn');

    if (closeBtn) closeBtn.addEventListener('click', closeEditSheet);
    if (backdrop) backdrop.addEventListener('click', closeEditSheet);

    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const habit = state.habits.find(h => h.id === currentEditingHabitId);
        if (!habit) return;

        const titleInput = document.getElementById('editTitleInput');
        habit.title = (titleInput?.value.trim()) || habit.title;
        habit.emoji = editingEmoji || habit.emoji;
        habit.frequency = editingFreq;
        habit.timeOfDay = editingTime;

        saveState();
        closeEditSheet();
        render();
        toast('Habit updated ✓', 'success');
      });
    }

    if (delBtn) {
      delBtn.addEventListener('click', () => {
        if (!confirm('Are you sure you want to delete this habit? Its past log will be removed.')) return;
        state.habits = state.habits.filter(h => h.id !== currentEditingHabitId);
        saveState();
        closeEditSheet();
        render();
        toast('Habit removed', 'warning');
      });
    }
  }

  /* ═══════════════════════════════════════════════════
     12. CELEBRATION & CONFETTI ENGINE
  ═══════════════════════════════════════════════════ */
  function showCelebration() {
    const overlay = document.getElementById('celebrationOverlay');
    if (!overlay) return;

    const streak = getOverallStreak();
    const todayHabits = getTodayHabits();
    const titleEl = document.getElementById('celebTitle');
    const bodyEl = document.getElementById('celebBody');
    const emojiEl = document.getElementById('celebEmoji');

    if (streak >= 7) {
      if (emojiEl) emojiEl.textContent = '🔥';
      if (titleEl) titleEl.textContent = `${streak} Day Streak!`;
      if (bodyEl) bodyEl.textContent = `You have completed all habits for ${streak} consecutive days. That is top 1% discipline.`;
    } else {
      if (emojiEl) emojiEl.textContent = '🎯';
      if (titleEl) titleEl.textContent = 'All Complete Today!';
      if (bodyEl) bodyEl.textContent = `You completed all ${todayHabits.length} habits planned for today. Keep the fire burning tomorrow.`;
    }

    overlay.hidden = false;
    overlay.style.display = 'flex';
    launchConfetti();
  }

  function initCelebration() {
    const closeBtn = document.getElementById('celebClose');
    const overlay = document.getElementById('celebrationOverlay');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        overlay.hidden = true;
        overlay.style.display = 'none';
      });
    }
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.hidden = true;
          overlay.style.display = 'none';
        }
      });
    }
  }

  function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';

    const ctx = canvas.getContext('2d');
    const colors = ['#7C6AF8', '#F59E0B', '#10B981', '#F97316', '#EC4899', '#0EA5E9', '#F43F5E'];
    const particles = Array.from({ length: 85 }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 100,
      r: Math.random() * 6 + 4,
      d: Math.random() * 80 + 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 10,
      tiltAngle: 0,
      tiltInc: Math.random() * 0.07 + 0.05,
    }));

    let angle = 0;
    let frame = 0;

    function draw() {
      angle += 0.01;
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let activeCount = 0;

      particles.forEach(p => {
        p.tiltAngle += p.tiltInc;
        p.y += (Math.cos(angle + p.d) + 3 + p.r / 2) * 0.85;
        p.x += Math.sin(angle) * 1.6;
        p.tilt = Math.sin(p.tiltAngle - frame / 3) * 12;

        if (p.y < canvas.height + 20) activeCount++;

        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 3, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
        ctx.stroke();
      });

      if (activeCount > 0 && frame < 240) {
        requestAnimationFrame(draw);
      } else {
        canvas.style.display = 'none';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    requestAnimationFrame(draw);
  }

  /* ═══════════════════════════════════════════════════
     13. TOAST NOTIFICATION SYSTEM
  ═══════════════════════════════════════════════════ */
  function toast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const icons = { success: '✅', warning: '⚠️', info: 'ℹ️' };
    const el = document.createElement('div');
    el.className = `toast toast-${type}`;
    el.innerHTML = `<span class="toast-icon">${icons[type] || 'ℹ️'}</span><span>${escHtml(message)}</span>`;
    container.appendChild(el);

    setTimeout(() => {
      el.classList.add('is-out');
      setTimeout(() => el.remove(), 260);
    }, 3200);
  }

  /* ═══════════════════════════════════════════════════
     14. ONBOARDING FLOW
  ═══════════════════════════════════════════════════ */
  function initOnboarding() {
    const overlay = document.getElementById('onboardingOverlay');
    const nameInput = document.getElementById('nameInput');
    const continueBtn = document.getElementById('onboardingContinue');

    if (!overlay) return;

    if (!state.onboardingDone) {
      overlay.hidden = false;
      overlay.style.display = 'flex';
      setTimeout(() => nameInput?.focus(), 150);
    } else {
      overlay.hidden = true;
      overlay.style.display = 'none';
    }

    if (nameInput && continueBtn) {
      nameInput.addEventListener('input', () => {
        continueBtn.disabled = nameInput.value.trim().length < 1;
      });

      nameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !continueBtn.disabled) {
          completeOnboarding();
        }
      });

      continueBtn.addEventListener('click', completeOnboarding);
    }

    function completeOnboarding() {
      const name = (nameInput?.value.trim() || '').split(' ')[0] || 'Champion';
      state.userName = name;
      state.onboardingDone = true;

      // If state has 0 habits, pre-seed starter habits so they have immediate momentum
      if (state.habits.length === 0) {
        DEFAULT_STARTER_HABITS.forEach(template => {
          state.habits.push({
            id: generateId(),
            title: template.title,
            emoji: template.emoji,
            category: template.category,
            frequency: template.frequency,
            timeOfDay: template.timeOfDay,
            createdAt: new Date().toISOString(),
            completions: {},
            archived: false,
          });
        });
      }

      saveState();

      // Ensure overlay is truly hidden
      overlay.hidden = true;
      overlay.style.display = 'none';

      render();
      toast(`Welcome to Forge, ${name}! Let's build consistency.`, 'success');
    }
  }

  /* ═══════════════════════════════════════════════════
     15. GLOBAL NAVIGATION & SHORTCUTS
  ═══════════════════════════════════════════════════ */
  function initNavigation() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-view]');
      if (btn) {
        navigate(btn.dataset.view);
        return;
      }

      if (e.target.closest('#addHabitFab') || e.target.closest('#sidebarAddBtn')) {
        openAddSheet();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'Escape') {
        closeAddSheet();
        closeEditSheet();
        const celeb = document.getElementById('celebrationOverlay');
        if (celeb && !celeb.hidden) {
          celeb.hidden = true;
          celeb.style.display = 'none';
        }
      }
      if ((e.key === 'n' || e.key === 'N') && !e.metaKey && !e.ctrlKey) {
        openAddSheet();
      }
    });
  }

  /* ═══════════════════════════════════════════════════
     16. INITIALIZATION ENTRY POINT
  ═══════════════════════════════════════════════════ */
  function init() {
    // 1. Theme setup
    document.documentElement.setAttribute('data-theme', state.theme || 'dark');

    // 2. Render initial view
    render();

    // 3. Module inits
    initOnboarding();
    initAddSheet();
    initEditSheet();
    initCelebration();
    initNavigation();

    // 4. Milestone Check
    if (state.onboardingDone) {
      const streak = getOverallStreak();
      const milestones = [3, 7, 14, 21, 30, 60, 100];
      const last = parseInt(sessionStorage.getItem('forge_last_milestone') || '0', 10);
      for (const m of milestones) {
        if (streak >= m && last < m) {
          sessionStorage.setItem('forge_last_milestone', m);
          setTimeout(() => toast(`🔥 ${m}-day streak! Outstanding discipline.`, 'success'), 1200);
          break;
        }
      }
    }
  }

  // Expose helpers for inline handlers if needed
  window.forgeOpenAddSheet = openAddSheet;
  window.forgeCloseAddSheet = closeAddSheet;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
