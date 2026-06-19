window.TenjinProfileView = {
    render: function(container) {
        // --- Load Data ---
        const history = JSON.parse(localStorage.getItem('tenjin_score_history')) || [];
        const userProfile = JSON.parse(localStorage.getItem('tenjin_user_profile')) || { name: 'Learner', role: 'Active Explorer' };
        
        // Calculate Stats
        const totalExams = history.length;
        let totalScore = 0; let totalPossible = 0; let passedExams = 0;
        history.forEach(test => {
            totalScore += test.score; totalPossible += test.total;
            if (test.percentage >= 80) passedExams++;
        });
        const overallAccuracy = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

        // Calculate Calendar/Streak
        const today = new Date();
        let activeDates = JSON.parse(localStorage.getItem('tenjin_active_days')) || [];
        let calendarHtml = '';
        for(let i = 13; i >= 0; i--) {
            let d = new Date(); d.setDate(today.getDate() - i);
            let isActive = activeDates.includes(d.toISOString().split('T')[0]);
            calendarHtml += `<div class="calendar-day ${isActive ? 'active' : ''}">${d.getDate()}</div>`;
        }

        // History List HTML
        let historyHtml = history.length === 0 ? 
            `<div style="text-align: center; padding: 40px; color: var(--text-muted); background: var(--bg-primary); border-radius: 12px;">No exams taken yet. Go to the Learn tab to start!</div>` :
            history.map(test => {
                const isPass = test.percentage >= 80;
                const badgeColor = isPass ? 'var(--success-color, #2ed573)' : 'var(--danger-color, #e74c3c)';
                return `
                    <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 12px; margin-bottom: 15px;">
                        <div>
                            <h4 style="margin: 0 0 5px 0; color: var(--text-main);">${test.level}</h4>
                            <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted);">${test.topic}</p>
                            <p style="margin: 5px 0 0 0; font-size: 0.8rem; color: var(--text-muted);">🕒 ${test.date}</p>
                        </div>
                        <div style="text-align: right;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: var(--accent-color);">${test.score}/${test.total}</div>
                            <div style="display: inline-block; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: bold; background: ${badgeColor}20; color: ${badgeColor}; margin-top: 5px;">
                                ${isPass ? 'PASS' : 'RETRY'} (${test.percentage}%)
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

        // --- Render Layout ---
        container.innerHTML = `
            <div style="max-width: 900px; margin: 0 auto; padding-bottom: 40px;">
                
                <!-- TOP SECTION: User Settings & Streak -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                    
                    <!-- Edit Profile Form -->
                    <div style="background: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-color); padding: 25px;">
                        <h3 style="margin: 0 0 20px 0;">👤 Profile Details</h3>
                        <label style="display:block; margin-bottom:5px; font-size:0.9rem; color:var(--text-muted);">Display Name</label>
                        <input type="text" id="profile-name" class="form-control" value="${userProfile.name}" style="width:100%; margin-bottom: 15px; padding: 10px; border-radius: 8px;">
                        
                        <label style="display:block; margin-bottom:5px; font-size:0.9rem; color:var(--text-muted);">Learning Title</label>
                        <input type="text" id="profile-role" class="form-control" value="${userProfile.role}" style="width:100%; margin-bottom: 20px; padding: 10px; border-radius: 8px;">
                        
                        <button class="btn btn-primary" style="width: 100%; padding: 10px; border-radius: 8px;" onclick="window.TenjinProfileView.saveProfile()">Save Changes</button>
                    </div>

                    <!-- Streak Calendar Replica -->
                    <div class="dashboard-card" style="margin: 0;">
                        <h3 style="margin: 0 0 20px 0;">📅 14-Day Activity</h3>
                        <div class="calendar-grid" style="margin-top: 10px;">
                            ${calendarHtml}
                        </div>
                        <p style="text-align: center; margin-top: 20px; font-size: 0.85rem; color: var(--text-muted);">Your daily streak updates automatically upon logging in!</p>
                    </div>

                </div>

                <!-- MIDDLE HEADER: STATS ROW -->
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px;">
                    <div style="background: var(--bg-card); padding: 25px; border-radius: 16px; border: 1px solid var(--border-color); text-align: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 10px;">🎯</div>
                        <h2 style="margin: 0; font-size: 2.5rem; color: var(--text-main);">${overallAccuracy}%</h2>
                        <p style="margin: 5px 0 0 0; color: var(--text-muted); font-weight: 600;">Overall Accuracy</p>
                    </div>
                    <div style="background: var(--bg-card); padding: 25px; border-radius: 16px; border: 1px solid var(--border-color); text-align: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 10px;">📚</div>
                        <h2 style="margin: 0; font-size: 2.5rem; color: var(--text-main);">${totalExams}</h2>
                        <p style="margin: 5px 0 0 0; color: var(--text-muted); font-weight: 600;">Exams Taken</p>
                    </div>
                    <div style="background: var(--bg-card); padding: 25px; border-radius: 16px; border: 1px solid var(--border-color); text-align: center;">
                        <div style="font-size: 2.5rem; margin-bottom: 10px;">🏆</div>
                        <h2 style="margin: 0; font-size: 2.5rem; color: var(--text-main);">${passedExams}</h2>
                        <p style="margin: 5px 0 0 0; color: var(--text-muted); font-weight: 600;">Modules Passed</p>
                    </div>
                </div>

                <!-- BOTTOM SECTION: SCORE HISTORY -->
                <div style="background: var(--bg-card); border-radius: 16px; border: 1px solid var(--border-color); padding: 30px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px;">
                        <h3 style="margin: 0; color: var(--text-main);">Assessment Timeline</h3>
                        <button class="btn" style="background: transparent; border: 1px solid var(--border-color); color: var(--danger-color, #e74c3c); padding: 6px 12px; font-size: 0.8rem; cursor: pointer; border-radius: 6px;" 
                                onclick="if(confirm('Wipe all exam history?')) { localStorage.removeItem('tenjin_score_history'); window.TenjinProfileView.render(document.getElementById('dynamic-view')); }">
                            Reset Progress
                        </button>
                    </div>
                    <div class="history-list">${historyHtml}</div>
                </div>
            </div>
        `;
    },

    saveProfile: function() {
        const name = document.getElementById('profile-name').value;
        const role = document.getElementById('profile-role').value;
        localStorage.setItem('tenjin_user_profile', JSON.stringify({ name, role }));
        
        // Show success visual feedback
        const btn = event.target;
        const originalText = btn.innerText;
        btn.innerText = "✅ Saved!";
        btn.style.background = "#2ed573";
        setTimeout(() => {
            btn.innerText = originalText;
            btn.style.background = "";
            window.TenjinProfileView.render(document.getElementById('dynamic-view')); // Re-render to update
        }, 1500);
    }
};