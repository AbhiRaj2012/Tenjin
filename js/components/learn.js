window.TenjinLearnView = {
    render: function(container) {
        container.innerHTML = `
            <div style="display: flex; gap: 40px; max-width: 1200px; margin: 0 auto; align-items: flex-start;">
                
                <div style="flex: 1;">
                    <h2 style="margin-bottom: 10px;">Learning Path</h2>
                    <p style="color: var(--text-muted); margin-bottom: 30px;">Follow the curriculum step-by-step to achieve Japanese fluency.</p>

                    <div style="display: grid; grid-template-columns: 1fr; gap: 20px;">
                        
                        <!-- Level 1 Card -->
                        <div class="settings-section" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: transform 0.2s;" onclick="window.navigateTo('level1')" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                            <div>
                                <span style="font-size: 0.85rem; font-weight: bold; color: var(--accent-color); text-transform: uppercase;">Level 1</span>
                                <h3 style="margin: 5px 0 8px 0; border: none; padding: 0;">Foundations & Alphabets</h3>
                                <p style="color: var(--text-muted); font-size: 0.95rem;">Master Hiragana, Katakana, and basic Kanji origins.</p>
                            </div>
                            <button class="btn btn-primary">Start Level</button>
                        </div>

                        <!-- Level 2 Card -->
                        <div class="settings-section" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: transform 0.2s;" onclick="window.navigateTo('level2')" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                            <div>
                                <span style="font-size: 0.85rem; font-weight: bold; color: #3498db; text-transform: uppercase;">Level 2</span>
                                <h3 style="margin: 5px 0 8px 0; border: none; padding: 0;">Vocabulary Dictionary</h3>
                                <p style="color: var(--text-muted); font-size: 0.95rem;">Learn essential words for food, greetings, travel, and common verbs.</p>
                            </div>
                            <button class="btn" style="background: transparent; color: #3498db; border: 1px solid #3498db;">Explore</button>
                        </div>

                        <!-- Level 3 Card -->
                        <div class="settings-section" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: transform 0.2s;" onclick="window.navigateTo('level3')" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                            <div>
                                <span style="font-size: 0.85rem; font-weight: bold; color: #9b59b6; text-transform: uppercase;">Level 3</span>
                                <h3 style="margin: 5px 0 8px 0; border: none; padding: 0;">Basic Grammar</h3>
                                <p style="color: var(--text-muted); font-size: 0.95rem;">Understand sentence structure, particle usage (desu, ka), and word placement.</p>
                            </div>
                            <button class="btn" style="background: transparent; color: #9b59b6; border: 1px solid #9b59b6;">Explore</button>
                        </div>

                        <!-- Level 4 Card -->
                        <div class="settings-section" style="display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: transform 0.2s;" onclick="window.navigateTo('level4')" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'">
                            <div>
                                <span style="font-size: 0.85rem; font-weight: bold; color: #e67e22; text-transform: uppercase;">Level 4</span>
                                <h3 style="margin: 5px 0 8px 0; border: none; padding: 0;">Common Sentences</h3>
                                <p style="color: var(--text-muted); font-size: 0.95rem;">Practice 100+ everyday phrases with hidden translations.</p>
                            </div>
                            <button class="btn" style="background: transparent; color: #e67e22; border: 1px solid #e67e22;">Explore</button>
                        </div>

                    </div>
                </div>

                <!-- RIGHT COLUMN: Avatar and Full Test Button -->
                <div class="col-md-4">
                    <div style="position: sticky; top: 20px;">
                        <!-- Avatar -->
                        <div style="text-align: center; margin-bottom: 20px;">
                            <img src="assets/images/tenjin_lovely.png" alt="Tenjin Avatar" id="tenjin-avatar" style="width: 200px; transition: all 0.3s ease;">
                        </div>
                        
                        <!-- Speech Bubble -->
                        <div style="background: var(--bg-card); padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); text-align: center; border: 1px solid var(--border-color); margin-bottom: 25px;">
                            <h4 style="margin-top: 0; color: var(--text-main);">Let's master Japanese!</h4>
                            <p style="margin-bottom: 0; color: var(--text-muted);">Ganbatte! (Do your best!)</p>
                        </div>

                        <!-- NEW: Ultimate Mastery Quiz Button -->
                        <div style="text-align: center;">
                            <button class="btn" 
                                    style="width: 100%; padding: 15px 20px; font-size: 1.1rem; border-radius: 12px; font-weight: bold; background: linear-gradient(135deg, var(--accent-color), #ff4757); border: none; box-shadow: 0 4px 15px rgba(255, 71, 87, 0.3); color: white; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;"
                                    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(255, 71, 87, 0.4)';"
                                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(255, 71, 87, 0.3)';"
                                    onclick="window.TenjinAssessmentView.full_quiz(document.getElementById('dynamic-view'))">
                                👑 Ultimate Mastery Exam
                            </button>
                            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 12px;">
                                Test your knowledge across all 4 levels (20 Questions)
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        `;
    }
};