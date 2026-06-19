window.TenjinLevel3View = {
    activeTab: 'basic',

    render: function(container) {
        // Dynamic Tab Styling based on current state
        const getTabStyle = (tab) => {
            return this.activeTab === tab 
                ? 'btn btn-primary' 
                : 'btn style="background: transparent; color: var(--text-main); border: 1px solid var(--border-color);"';
        };

        container.innerHTML = `
            <style>
                details > summary {
                    cursor: pointer;
                    color: #9b59b6;
                    font-weight: 600;
                    margin-top: 15px;
                    padding: 8px;
                    background: rgba(155, 89, 182, 0.05);
                    border-radius: 6px;
                    transition: background 0.2s;
                    user-select: none;
                }
                details > summary:hover {
                    background: rgba(155, 89, 182, 0.1);
                }
                .example-box {
                    background: rgba(155, 89, 182, 0.1);
                    border-left: 4px solid #9b59b6;
                    padding: 15px;
                    border-radius: 0 8px 8px 0;
                    margin-top: 10px;
                    margin-bottom: 10px;
                }
            </style>
            <div style="max-width: 1000px; margin: 0 auto; padding-bottom: 40px;">
                <button class="btn" style="margin-bottom: 20px; background: transparent; color: var(--text-main); border: 1px solid var(--border-color);" onclick="window.navigateTo('learn')">← Back to Curriculum</button>
                
                <div class="settings-section">
                    <h2 style="margin-bottom: 15px; color: #9b59b6;">Level 3: Grammar Syntax</h2>
                    <p style="margin-bottom: 15px; line-height: 1.6;">Japanese grammar follows a highly structured, logical system based on particles and verb positioning. Master the basic building blocks before moving to complex sentence structures.</p>
                </div>

                <div class="settings-section">
                    <!-- Category Tabs -->
                    <div style="display: flex; gap: 10px; flex-wrap: wrap; border-bottom: 2px solid var(--border-color); padding-bottom: 15px; margin-bottom: 25px;">
                        <button class="${getTabStyle('basic')}" style="border-radius: 20px; ${this.activeTab === 'basic' ? 'background: #9b59b6; border-color: #9b59b6;' : ''}" onclick="window.TenjinLevel3View.switchTab('basic')">Basic Rules</button>
                        <button class="${getTabStyle('advanced')}" style="border-radius: 20px; ${this.activeTab === 'advanced' ? 'background: #9b59b6; border-color: #9b59b6;' : ''}" onclick="window.TenjinLevel3View.switchTab('advanced')">Advance Rules</button>
                    </div>

                    <!-- Dynamic Content Area -->
                    <div style="display: flex; flex-direction: column; gap: 20px;">
                        ${this.activeTab === 'basic' ? this.renderBasicRules() : this.renderAdvanceRules()}
                    </div>
                </div>

                <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--border-color);">
                    <h3 style="color: var(--text-main); margin-bottom: 15px;">Ready to test your Grammar & Sentences?</h3>
                    <button class="btn btn-primary" style="padding: 12px 30px; font-size: 1.1rem; border-radius: 8px;" 
                    onclick="window.TenjinAssessmentView.gen_assessment('level3', document.getElementById('dynamic-view'))">
                    📝 Take Level 3 Assessment
                    </button>
                </div>
            </div>
        `;
    },

    switchTab: function(tabName) {
        this.activeTab = tabName;
        const viewContainer = document.getElementById('dynamic-view');
        this.render(viewContainer);
    },

    // ==========================================
    // SECTION 1: BASIC RULES
    // ==========================================
    renderBasicRules: function() {
        return `
            <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 25px;">
                <h3 style="color: var(--text-main); margin-bottom: 10px; font-size: 1.4rem;">1. Sentence Order (SOV)</h3>
                <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 10px;">Unlike English which uses Subject-Verb-Object (SVO), Japanese uses <strong>Subject-Object-Verb (SOV)</strong>. The verb almost always comes at the very end of the sentence.</p>
                
                <details>
                    <summary> View Examples</summary>
                    <div class="example-box">
                        <p style="font-weight: bold; margin-bottom: 2px;">私は りんごを 食べます。</p>
                        <p style="color: #9b59b6; font-size: 0.95rem; margin-bottom: 5px;">Watashi wa ringo o tabemasu.</p>
                        <p style="font-size: 0.9rem;">(I) + (Apple) + (Eat) = <strong>I eat an apple.</strong></p>
                    </div>
                    <div class="example-box">
                        <p style="font-weight: bold; margin-bottom: 2px;">田中さんは 本を 読みます。</p>
                        <p style="color: #9b59b6; font-size: 0.95rem; margin-bottom: 5px;">Tanaka-san wa hon o yomimasu.</p>
                        <p style="font-size: 0.9rem;">(Mr. Tanaka) + (Book) + (Reads) = <strong>Mr. Tanaka reads a book.</strong></p>
                    </div>
                </details>
            </div>

            <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 25px;">
                <h3 style="color: var(--text-main); margin-bottom: 10px; font-size: 1.4rem;">2. The Copula "Desu" (です)</h3>
                <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 10px;">"Desu" is roughly equivalent to "is/am/are" in English. It is attached to the end of noun or adjective sentences to make them polite.</p>
                
                <details>
                    <summary> View Examples</summary>
                    <div class="example-box">
                        <p style="font-weight: bold; margin-bottom: 2px;">これは ペン です。</p>
                        <p style="color: #9b59b6; font-size: 0.95rem; margin-bottom: 5px;">Kore wa pen desu.</p>
                        <p style="font-size: 0.9rem;"><strong>This is a pen.</strong></p>
                    </div>
                    <div class="example-box">
                        <p style="font-weight: bold; margin-bottom: 2px;">私は 学生 です。</p>
                        <p style="color: #9b59b6; font-size: 0.95rem; margin-bottom: 5px;">Watashi wa gakusei desu.</p>
                        <p style="font-size: 0.9rem;"><strong>I am a student.</strong></p>
                    </div>
                    <div class="example-box">
                        <p style="font-weight: bold; margin-bottom: 2px;">今日は 晴れ です。</p>
                        <p style="color: #9b59b6; font-size: 0.95rem; margin-bottom: 5px;">Kyō wa hare desu.</p>
                        <p style="font-size: 0.9rem;"><strong>Today is sunny.</strong></p>
                    </div>
                </details>
            </div>

            <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 25px;">
                <h3 style="color: var(--text-main); margin-bottom: 10px; font-size: 1.4rem;">3. Essential Particles (は, を, も)</h3>
                <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 10px;">Particles are small words that mark the grammatical function of the word before them. They are the glue of Japanese sentences.</p>
                <ul style="color: var(--text-muted); line-height: 1.8; margin-left: 20px;">
                    <li><strong style="color: var(--text-main);">は (wa):</strong> Topic marker. Marks the subject of the sentence.</li>
                    <li><strong style="color: var(--text-main);">を (o):</strong> Object marker. Marks the direct object of an action.</li>
                    <li><strong style="color: var(--text-main);">も (mo):</strong> "Also/Too" marker. Replaces 'wa' when indicating similarity.</li>
                </ul>

                <details>
                    <summary> View Examples</summary>
                    <div class="example-box">
                        <p style="font-weight: bold; margin-bottom: 2px;">[は] 彼は 先生 です。</p>
                        <p style="color: #9b59b6; font-size: 0.95rem; margin-bottom: 5px;">Kare wa sensei desu.</p>
                        <p style="font-size: 0.9rem;"><strong>He is a teacher.</strong></p>
                    </div>
                    <div class="example-box">
                        <p style="font-weight: bold; margin-bottom: 2px;">[を] 音楽を 聞きます。</p>
                        <p style="color: #9b59b6; font-size: 0.95rem; margin-bottom: 5px;">Ongaku o kikimasu.</p>
                        <p style="font-size: 0.9rem;"><strong>I listen to music.</strong></p>
                    </div>
                    <div class="example-box">
                        <p style="font-weight: bold; margin-bottom: 2px;">[も] 私も 行きます。</p>
                        <p style="color: #9b59b6; font-size: 0.95rem; margin-bottom: 5px;">Watashi mo ikimasu.</p>
                        <p style="font-size: 0.9rem;"><strong>I will also go.</strong></p>
                    </div>
                </details>
            </div>

            <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 25px;">
                <h3 style="color: var(--text-main); margin-bottom: 10px; font-size: 1.4rem;">4. Forming Questions (か)</h3>
                <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 10px;">To turn any statement into a question in polite Japanese, simply add the particle <strong>か (ka)</strong> to the very end of the sentence. No word order changes are needed!</p>
                
                <details>
                    <summary> View Examples</summary>
                    <div class="example-box">
                        <p style="font-weight: bold; margin-bottom: 2px;">学生 です か？</p>
                        <p style="color: #9b59b6; font-size: 0.95rem; margin-bottom: 5px;">Gakusei desu ka?</p>
                        <p style="font-size: 0.9rem;"><strong>Are you a student?</strong></p>
                    </div>
                    <div class="example-box">
                        <p style="font-weight: bold; margin-bottom: 2px;">元気 です か？</p>
                        <p style="color: #9b59b6; font-size: 0.95rem; margin-bottom: 5px;">Genki desu ka?</p>
                        <p style="font-size: 0.9rem;"><strong>Are you well? / How are you?</strong></p>
                    </div>
                    <div class="example-box">
                        <p style="font-weight: bold; margin-bottom: 2px;">今 何時 です か？</p>
                        <p style="color: #9b59b6; font-size: 0.95rem; margin-bottom: 5px;">Ima nanji desu ka?</p>
                        <p style="font-size: 0.9rem;"><strong>What time is it now?</strong></p>
                    </div>
                </details>
            </div>

            <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 25px;">
                <h3 style="color: var(--text-main); margin-bottom: 10px; font-size: 1.4rem;">5. Contextual & Multi-Meaning Words</h3>
                <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 10px;">Japanese is highly context-dependent. Pointing out objects depends on physical distance, and some common phrases change their English meaning entirely depending on the situation.</p>
                
                <details>
                    <summary> View "Ko-So-A" (This/That) Examples</summary>
                    <div class="example-box">
                        <p style="font-weight: bold; margin-bottom: 2px;">これは 何 ですか？</p>
                        <p style="color: #9b59b6; font-size: 0.95rem; margin-bottom: 5px;">Kore wa nan desu ka?</p>
                        <p style="font-size: 0.9rem;"><strong>What is this?</strong> (Object is near the speaker)</p>
                    </div>
                    <div class="example-box">
                        <p style="font-weight: bold; margin-bottom: 2px;">それは 何 ですか？</p>
                        <p style="color: #9b59b6; font-size: 0.95rem; margin-bottom: 5px;">Sore wa nan desu ka?</p>
                        <p style="font-size: 0.9rem;"><strong>What is that?</strong> (Object is near the listener)</p>
                    </div>
                    <div class="example-box">
                        <p style="font-weight: bold; margin-bottom: 2px;">あの人は 誰 ですか？</p>
                        <p style="color: #9b59b6; font-size: 0.95rem; margin-bottom: 5px;">Ano hito wa dare desu ka?</p>
                        <p style="font-size: 0.9rem;"><strong>Who is that person over there?</strong> (Far from both)</p>
                    </div>
                </details>

                <details>
                    <summary> View "Sumimasen" & "Daijōbu" Examples</summary>
                    <div class="example-box">
                        <p style="font-weight: bold; margin-bottom: 2px;">すみません、水をお願いします。</p>
                        <p style="color: #9b59b6; font-size: 0.95rem; margin-bottom: 5px;">Sumimasen, mizu o onegaishimasu.</p>
                        <p style="font-size: 0.9rem;"><strong>Excuse me, water please.</strong> (Calling a waiter)</p>
                    </div>
                    <div class="example-box">
                        <p style="font-weight: bold; margin-bottom: 2px;">遅れて すみません。</p>
                        <p style="color: #9b59b6; font-size: 0.95rem; margin-bottom: 5px;">Okurete sumimasen.</p>
                        <p style="font-size: 0.9rem;"><strong>I'm sorry for being late.</strong> (Apologizing)</p>
                    </div>
                    <div class="example-box">
                        <p style="font-weight: bold; margin-bottom: 2px;">もう 大丈夫 です。</p>
                        <p style="color: #9b59b6; font-size: 0.95rem; margin-bottom: 5px;">Mō daijōbu desu.</p>
                        <p style="font-size: 0.9rem;"><strong>I am fine now. / No, thank you.</strong> (Declining an offer)</p>
                    </div>
                </details>
            </div>
        `;
    },

    // ==========================================
    // SECTION 2: ADVANCE RULES
    // ==========================================
    renderAdvanceRules: function() {
        return `
            <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 25px;">
                <h3 style="color: var(--text-main); margin-bottom: 10px; font-size: 1.4rem;">1. Verb Conjugation (Masu Form)</h3>
                <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 15px;">Japanese verbs conjugate to show tense and polarity (positive/negative), but they do <strong>not</strong> change based on the subject (I, you, he, she).</p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px;">
                    <div style="background: var(--bg-primary); padding: 15px; border-radius: 8px; border: 1px solid var(--border-color);">
                        <div style="font-weight: bold; color: var(--text-main);">Present Positive: 〜ます (-masu)</div>
                        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 5px;">食べる (Taberu) -> 食べます (Tabemasu)</div>
                    </div>
                    <div style="background: var(--bg-primary); padding: 15px; border-radius: 8px; border: 1px solid var(--border-color);">
                        <div style="font-weight: bold; color: var(--text-main);">Present Negative: 〜ません (-masen)</div>
                        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 5px;">食べる (Taberu) -> 食べません (Tabemasen)</div>
                    </div>
                    <div style="background: var(--bg-primary); padding: 15px; border-radius: 8px; border: 1px solid var(--border-color);">
                        <div style="font-weight: bold; color: var(--text-main);">Past Positive: 〜ました (-mashita)</div>
                        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 5px;">食べる (Taberu) -> 食べました (Tabemashita)</div>
                    </div>
                    <div style="background: var(--bg-primary); padding: 15px; border-radius: 8px; border: 1px solid var(--border-color);">
                        <div style="font-weight: bold; color: var(--text-main);">Past Negative: 〜ませんでした (-masen deshita)</div>
                        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 5px;">食べる (Taberu) -> 食べませんでした (Tabemasen deshita)</div>
                    </div>
                </div>

                <details>
                    <summary> View Sentence Examples</summary>
                    <div class="example-box">
                        <p style="font-weight: bold; margin-bottom: 2px;">映画を 見ます。</p>
                        <p style="color: #9b59b6; font-size: 0.95rem; margin-bottom: 5px;">Eiga o mimasu.</p>
                        <p style="font-size: 0.9rem;"><strong>I will watch a movie.</strong> (Present/Future Positive)</p>
                    </div>
                    <div class="example-box">
                        <p style="font-weight: bold; margin-bottom: 2px;">肉を 食べません。</p>
                        <p style="color: #9b59b6; font-size: 0.95rem; margin-bottom: 5px;">Niku o tabemasen.</p>
                        <p style="font-size: 0.9rem;"><strong>I do not eat meat.</strong> (Present Negative)</p>
                    </div>
                    <div class="example-box">
                        <p style="font-weight: bold; margin-bottom: 2px;">昨日は 働きませんでした。</p>
                        <p style="color: #9b59b6; font-size: 0.95rem; margin-bottom: 5px;">Kinō wa hatarakimasen deshita.</p>
                        <p style="font-size: 0.9rem;"><strong>I did not work yesterday.</strong> (Past Negative)</p>
                    </div>
                </details>
            </div>

            <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 25px;">
                <h3 style="color: var(--text-main); margin-bottom: 10px; font-size: 1.4rem;">2. Two Types of Adjectives (I vs Na)</h3>
                <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 10px;">Japanese has two distinct classes of adjectives, which behave differently when connecting to nouns or conjugating for tense.</p>
                <ul style="color: var(--text-muted); line-height: 1.8; margin-left: 20px;">
                    <li><strong style="color: var(--text-main);">い-Adjectives (i-adjectives):</strong> End in the Hiragana 'い' (i). To make it past tense, drop 'i' and add 'katta' (Ex: 寒い Samui -> 寒かった Samukatta).</li>
                    <li><strong style="color: var(--text-main);">な-Adjectives (na-adjectives):</strong> Require 'な' (na) to connect to a noun. They conjugate similar to nouns using 'desu / deshita' (Ex: 静か Shizuka -> 静かでした Shizuka deshita).</li>
                </ul>

                <details>
                    <summary> View Examples</summary>
                    <div class="example-box">
                        <p style="font-weight: bold; margin-bottom: 2px;">高い 車 です。</p>
                        <p style="color: #9b59b6; font-size: 0.95rem; margin-bottom: 5px;">Takai kuruma desu.</p>
                        <p style="font-size: 0.9rem;"><strong>It is an expensive car.</strong> (I-Adjective)</p>
                    </div>
                    <div class="example-box">
                        <p style="font-weight: bold; margin-bottom: 2px;">昨日は 寒かったです。</p>
                        <p style="color: #9b59b6; font-size: 0.95rem; margin-bottom: 5px;">Kinō wa samukatta desu.</p>
                        <p style="font-size: 0.9rem;"><strong>It was cold yesterday.</strong> (I-Adjective Past Tense)</p>
                    </div>
                    <div class="example-box">
                        <p style="font-weight: bold; margin-bottom: 2px;">綺麗な 花 です。</p>
                        <p style="color: #9b59b6; font-size: 0.95rem; margin-bottom: 5px;">Kirei na hana desu.</p>
                        <p style="font-size: 0.9rem;"><strong>It is a beautiful flower.</strong> (Na-Adjective)</p>
                    </div>
                </details>
            </div>

            <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 25px;">
                <h3 style="color: var(--text-main); margin-bottom: 10px; font-size: 1.4rem;">3. Location Particles (に vs で)</h3>
                <p style="color: var(--text-muted); line-height: 1.6; margin-bottom: 10px;">Both particles denote a location, but they are used in entirely different contexts depending on the verb.</p>
                <ul style="color: var(--text-muted); line-height: 1.8; margin-left: 20px;">
                    <li><strong style="color: var(--text-main);">に (ni):</strong> Used with verbs of existence (to be) or destination (to go/come/return).</li>
                    <li><strong style="color: var(--text-main);">で (de):</strong> Used to mark the place where an active event or action occurs.</li>
                </ul>

                <details>
                    <summary> View Examples</summary>
                    <div class="example-box">
                        <p style="font-weight: bold; margin-bottom: 2px;">東京に 住んでいます。</p>
                        <p style="color: #9b59b6; font-size: 0.95rem; margin-bottom: 5px;">Tōkyō ni sundeimasu.</p>
                        <p style="font-size: 0.9rem;"><strong>I live in Tokyo.</strong> (Existence)</p>
                    </div>
                    <div class="example-box">
                        <p style="font-weight: bold; margin-bottom: 2px;">コンビニに 行きます。</p>
                        <p style="color: #9b59b6; font-size: 0.95rem; margin-bottom: 5px;">Konbini ni ikimasu.</p>
                        <p style="font-size: 0.9rem;"><strong>I go to the convenience store.</strong> (Destination)</p>
                    </div>
                    <div class="example-box">
                        <p style="font-weight: bold; margin-bottom: 2px;">公園で 遊びます。</p>
                        <p style="color: #9b59b6; font-size: 0.95rem; margin-bottom: 5px;">Kōen de asobimasu.</p>
                        <p style="font-size: 0.9rem;"><strong>I play at the park.</strong> (Action happening at a location)</p>
                    </div>
                </details>
            </div>
        `;
    }
};