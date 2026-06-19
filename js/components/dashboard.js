window.TenjinDashboardView = {
    avatarInterval: null,

    updateStreak: function() {
        const todayStr = new Date().toISOString().split('T')[0];
        let activeDates = JSON.parse(localStorage.getItem('tenjin_active_days')) || [];
        
        if (!activeDates.includes(todayStr)) {
            activeDates.push(todayStr);
            localStorage.setItem('tenjin_active_days', JSON.stringify(activeDates));
        }
        return activeDates;
    },

    render: function(container) {
        // --- 1. Gather Real Data ---
        const activeDates = this.updateStreak();
        const history = JSON.parse(localStorage.getItem('tenjin_score_history')) || [];
        const userProfile = JSON.parse(localStorage.getItem('tenjin_user_profile')) || { name: 'Learner', role: 'Active Explorer' };
        
        // Calculate Streak
        let streakCount = 0;
        const today = new Date();
        for(let i = 0; i < 30; i++) {
            let d = new Date(); 
            d.setDate(today.getDate() - i);
            if(activeDates.includes(d.toISOString().split('T')[0])) streakCount++;
            else break;
        }

        // Calculate Progress & Recent Scores
        const progressPercent = Math.min(100, history.length * 10); // Simple metric: 10% per test
        const stage = history.length > 0 ? "Level 1: Language Fundamentals" : "Getting Started";
        const recentScores = history.slice(0, 2); // Get top 2 most recent

        // Generate Calendar Grid
        let calendarHtml = '';
        for(let i = 13; i >= 0; i--) {
            let d = new Date();
            d.setDate(today.getDate() - i);
            let dStr = d.toISOString().split('T')[0];
            let isActive = activeDates.includes(dStr);
            calendarHtml += `<div class="calendar-day ${isActive ? 'active' : ''}">${d.getDate()}</div>`;
        }

        // --- 2. Render HTML ---
        container.innerHTML = `
            <div class="dashboard-grid">
                
                <div class="dashboard-column">
                    <div class="dashboard-card">
                        <h3>Current Stage</h3>
                        <p style="margin-top:8px; color:var(--text-muted); font-size:1.05rem; font-weight:600;">${stage}</p>
                        <div class="progress-bar-container">
                            <div class="progress-fill" style="width: ${progressPercent}%;"></div>
                        </div>
                        <p style="margin-top:8px; font-size:0.85rem; text-align:right;">${progressPercent}% Completed</p>
                    </div>

                    <div class="dashboard-card">
                        <h3>Recent Test Scores</h3>
                        <div style="margin-top:15px; display:flex; flex-direction:column; gap:12px;">
                            ${recentScores.length > 0 ? recentScores.map(item => `
                                <div style="display:flex; justify-content:space-between; padding:12px; background:var(--bg-primary); border-radius:8px;">
                                    <div>
                                        <p style="font-weight:600; font-size:0.95rem; margin:0;">${item.topic}</p>
                                        <span style="font-size:0.8rem; color:var(--text-muted);">${item.date}</span>
                                    </div>
                                    <div style="font-weight:bold; color:var(--success-color); font-size:1.05rem;">${item.percentage}%</div>
                                </div>
                            `).join('') : '<p style="color:var(--text-muted); font-size:0.9rem;">No tests taken yet.</p>'}
                        </div>
                    </div>
                </div>

                <div class="dashboard-column tenjin-hero-container" style="cursor: pointer; transition: transform 0.2s;" onclick="window.navigateTo('chat')">
                    <img id="dashboard-avatar" src="assets/images/tenjin_idle.png" alt="Tenjin Sensei" class="tenjin-hero-image">
                    <div style="text-align:center; margin-top:15px; background: var(--bg-card); padding: 10px 20px; border-radius: 20px; border: 1px solid var(--border-color); box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                        <h2 style="font-size:1.4rem; letter-spacing:0.5px; color: var(--accent-color);">Tenjin</h2>
                        <p style="color:var(--text-muted); font-size:0.9rem; font-weight:600; margin-top:2px;">💬 Click to Chat</p>
                    </div>
                </div>

                <div class="dashboard-column">
                    <div class="dashboard-card" style="text-align:center;">
                        <div class="avatar-circle" style="width:65px; height:65px; font-size:1.6rem; margin:0 auto 12px;">👤</div>
                        <h3>Student Profile</h3>
                        <p style="font-size:0.85rem; color:var(--text-muted);">${userProfile.role}</p>
                    </div>

                    <div class="dashboard-card">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 15px;">
                            <h3>Streak Matrix</h3>
                            <span style="font-weight:bold; color:var(--accent-color)">🔥 ${streakCount} Days</span>
                        </div>
                        <div class="calendar-grid">
                            ${calendarHtml}
                        </div>
                    </div>
                </div>
            </div>
        `;

        // --- 3. Dynamic Avatar Logic ---
        if (this.avatarInterval) clearInterval(this.avatarInterval);
        
        const avatarStates = [
            'assets/images/tenjin_dance.png',
            'assets/images/tenjin_disappointed.png',
            'assets/images/tenjin_lovely.png',
            'assets/images/tenjin_thinking.png',
            'assets/images/tenjin_happy.png',
            'assets/images/tenjin_idle.png'
        ];
        
        this.avatarInterval = setInterval(() => {
            const imgEl = document.getElementById('dashboard-avatar');
            if (imgEl) {
                const randomState = avatarStates[Math.floor(Math.random() * avatarStates.length)];
                imgEl.src = randomState;
            } else {
                clearInterval(this.avatarInterval); // Clear if user navigated away
            }
        }, 30000); // 30 Seconds
    }
};