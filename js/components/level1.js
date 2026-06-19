window.TenjinLevel1View = {
    activeTab: 'hiragana',

    render: function(container) {
        const getTabStyle = (tab) => {
            return this.activeTab === tab 
                ? 'btn btn-primary' 
                : 'btn style="background: transparent; color: var(--text-main); border: 1px solid var(--border-color);"';
        };

        container.innerHTML = `
            <div style="max-width: 1000px; margin: 0 auto;">
                <button class="btn" style="margin-bottom: 20px; background: transparent; color: var(--text-main); border: 1px solid var(--border-color);" onclick="window.navigateTo('learn')">← Back to Curriculum</button>
                
                <div class="settings-section">
                    <h2 style="margin-bottom: 15px; color: var(--accent-color);">Level 1: Language Foundations</h2>
                    <p style="margin-bottom: 15px; line-height: 1.6;">Japanese uses three distinct scripts: <strong>Hiragana</strong> (native Japanese words), <strong>Katakana</strong> (foreign loan words), and <strong>Kanji</strong> (adopted Chinese characters representing concepts).</p>
                </div>

                <div class="settings-section">
                    <div style="display: flex; gap: 15px; border-bottom: 2px solid var(--border-color); padding-bottom: 15px; margin-bottom: 25px;">
                        <button class="${getTabStyle('hiragana')}" style="border-radius: 20px;" onclick="window.TenjinLevel1View.switchTab('hiragana')">Hiragana (ひらがな)</button>
                        <button class="${getTabStyle('katakana')}" style="border-radius: 20px;" onclick="window.TenjinLevel1View.switchTab('katakana')">Katakana (カタカナ)</button>
                        <button class="${getTabStyle('kanji')}" style="border-radius: 20px;" onclick="window.TenjinLevel1View.switchTab('kanji')">Kanji (漢字) Intro</button>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 15px;">
                        ${this.generateScriptCards(this.activeTab)}
                    </div>
                </div>

                <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--border-color);">
                    <h3 style="color: var(--text-main); margin-bottom: 15px;">Ready to test your Alphabet knowledge?</h3>
                    <button class="btn btn-primary" style="padding: 12px 30px; font-size: 1.1rem; border-radius: 8px;" 
                    onclick="window.TenjinAssessmentView.gen_assessment('level1', document.getElementById('dynamic-view'))">
                    📝 Take Level 1 Assessment
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

    playAudio: function(filename) {
        const audio = new Audio(`assets/audio/level_one/${filename}`);
        audio.play().catch(err => {
            console.warn(`Audio file not found: assets/audio/level_one/${filename}`);
        });
    },

    generateScriptCards: function(scriptType) {
        const data = {
            hiragana: [
                { j: 'あ', r: 'a', file: 'a.mp3' }, { j: 'い', r: 'i', file: 'i.mp3' }, { j: 'う', r: 'u', file: 'u.mp3' }, { j: 'え', r: 'e', file: 'e.mp3' }, { j: 'お', r: 'o', file: 'o.mp3' },
                { j: 'か', r: 'ka', file: 'ka.mp3' }, { j: 'き', r: 'ki', file: 'ki.mp3' }, { j: 'く', r: 'ku', file: 'ku.mp3' }, { j: 'け', r: 'ke', file: 'ke.mp3' }, { j: 'こ', r: 'ko', file: 'ko.mp3' },
                { j: 'さ', r: 'sa', file: 'sa.mp3' }, { j: 'し', r: 'shi', file: 'shi.mp3' }, { j: 'す', r: 'su', file: 'su.mp3' }, { j: 'せ', r: 'se', file: 'se.mp3' }, { j: 'そ', r: 'so', file: 'so.mp3' },
                { j: 'た', r: 'ta', file: 'ta.mp3' }, { j: 'ち', r: 'chi', file: 'chi.mp3' }, { j: 'つ', r: 'tsu', file: 'tsu.mp3' }, { j: 'て', r: 'te', file: 'te.mp3' }, { j: 'と', r: 'to', file: 'to.mp3' },
                { j: 'な', r: 'na', file: 'na.mp3' }, { j: 'に', r: 'ni', file: 'ni.mp3' }, { j: 'ぬ', r: 'nu', file: 'nu.mp3' }, { j: 'ね', r: 'ne', file: 'ne.mp3' }, { j: 'の', r: 'no', file: 'no.mp3' },
                { j: 'ま', r: 'ma', file: 'ma.mp3' }, { j: 'み', r: 'mi', file: 'mi.mp3' }, { j: 'む', r: 'mu', file: 'mu.mp3' }, { j: 'め', r: 'me', file: 'me.mp3' }, { j: 'も', r: 'mo', file: 'mo.mp3' },
                { j: 'や', r: 'ya', file: 'ya.mp3' }, { j: 'ゆ', r: 'yu', file: 'yu.mp3' }, { j: 'よ', r: 'yo', file: 'yo.mp3' },
                { j: 'ら', r: 'ra', file: 'ra.mp3' }, { j: 'り', r: 'ri', file: 'ri.mp3' }, { j: 'る', r: 'ru', file: 'ru.mp3' }, { j: 'れ', r: 're', file: 're.mp3' }, { j: 'ろ', r: 'ro', file: 'ro.mp3' },
                { j: 'わ', r: 'wa', file: 'wa.mp3' }, { j: 'を', r: 'wo', file: 'wo.mp3' }, { j: 'ん', r: 'n', file: 'n.mp3' }
            ],
            katakana: [
                { j: 'ア', r: 'a', file: 'a.mp3' }, { j: 'イ', r: 'i', file: 'i.mp3' }, { j: 'ウ', r: 'u', file: 'u.mp3' }, { j: 'エ', r: 'e', file: 'e.mp3' }, { j: 'オ', r: 'o', file: 'o.mp3' },
                { j: 'カ', r: 'ka', file: 'ka.mp3' }, { j: 'キ', r: 'ki', file: 'ki.mp3' }, { j: 'ク', r: 'ku', file: 'ku.mp3' }, { j: 'ケ', r: 'ke', file: 'ke.mp3' }, { j: 'コ', r: 'ko', file: 'ko.mp3' },
                { j: 'サ', r: 'sa', file: 'sa.mp3' }, { j: 'シ', r: 'shi', file: 'shi.mp3' }, { j: 'ス', r: 'su', file: 'su.mp3' }, { j: 'セ', r: 'se', file: 'se.mp3' }, { j: 'ソ', r: 'so', file: 'so.mp3' },
                { j: 'タ', r: 'ta', file: 'ta.mp3' }, { j: 'チ', r: 'chi', file: 'chi.mp3' }, { j: 'ツ', r: 'tsu', file: 'tsu.mp3' }, { j: 'テ', r: 'te', file: 'te.mp3' }, { j: 'ト', r: 'to', file: 'to.mp3' },
                { j: 'ナ', r: 'na', file: 'na.mp3' }, { j: 'ニ', r: 'ni', file: 'ni.mp3' }, { j: 'ヌ', r: 'nu', file: 'nu.mp3' }, { j: 'ネ', r: 'ne', file: 'ne.mp3' }, { j: 'ノ', r: 'no', file: 'no.mp3' },
                { j: 'マ', r: 'ma', file: 'ma.mp3' }, { j: 'ミ', r: 'mi', file: 'mi.mp3' }, { j: 'ム', r: 'mu', file: 'mu.mp3' }, { j: 'メ', r: 'me', file: 'me.mp3' }, { j: 'モ', r: 'mo', file: 'mo.mp3' },
                { j: 'ヤ', r: 'ya', file: 'ya.mp3' }, { j: 'ユ', r: 'yu', file: 'yu.mp3' }, { j: 'ヨ', r: 'yo', file: 'yo.mp3' },
                { j: 'ラ', r: 'ra', file: 'ra.mp3' }, { j: 'リ', r: 'ri', file: 'ri.mp3' }, { j: 'ル', r: 'ru', file: 'ru.mp3' }, { j: 'レ', r: 're', file: 're.mp3' }, { j: 'ロ', r: 'ro', file: 'ro.mp3' },
                { j: 'ワ', r: 'wa', file: 'wa.mp3' }, { j: 'ヲ', r: 'wo', file: 'wo.mp3' }, { j: 'ン', r: 'n', file: 'n.mp3' }
            ],
            kanji: [
                { j: '一', r: 'ichi', file: 'kanji_ichi.mp3', mean: 'One' },
                { j: '二', r: 'ni', file: 'kanji_ni.mp3', mean: 'Two' },
                { j: '三', r: 'san', file: 'kanji_san.mp3', mean: 'Three' },
                { j: '日', r: 'nichi / hi', file: 'kanji_nichi.mp3', mean: 'Sun / Day' },
                { j: '月', r: 'getsu / tsuki', file: 'kanji_getsu.mp3', mean: 'Moon / Month' },
                { j: '木', r: 'moku / ki', file: 'kanji_moku.mp3', mean: 'Tree' },
                { j: '水', r: 'sui / mizu', file: 'kanji_sui.mp3', mean: 'Water' },
                { j: '火', r: 'ka / hi', file: 'kanji_ka.mp3', mean: 'Fire' },
                { j: '金', r: 'kin / kane', file: 'kanji_kin.mp3', mean: 'Gold / Money' },
                { j: '土', r: 'do / tsuchi', file: 'kanji_do.mp3', mean: 'Earth / Soil' }
            ]
        };

        const activeData = data[scriptType] || data.hiragana;

        return activeData.map(item => `
            <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 20px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
                <div style="font-size: 2.8rem; font-weight: bold; margin-bottom: 5px; color: var(--text-main);">${item.j}</div>
                <div style="color: var(--text-muted); font-size: 1rem; margin-bottom: ${item.mean ? '5px' : '15px'}; letter-spacing: 1px;">${item.r}</div>
                ${item.mean ? `<div style="color: var(--accent-color); font-size: 0.85rem; font-weight: bold; margin-bottom: 10px;">${item.mean}</div>` : ''}
                <button class="btn" style="background: rgba(255, 71, 87, 0.1); color: var(--accent-color); border: 1px solid rgba(255, 71, 87, 0.2); border-radius: 50%; width: 45px; height: 45px; cursor: pointer; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-size: 1.2rem; transition: background 0.2s;" onmouseover="this.style.background='var(--accent-color)'; this.style.color='white';" onmouseout="this.style.background='rgba(255, 71, 87, 0.1)'; this.style.color='var(--accent-color)';" onclick="window.TenjinLevel1View.playAudio('${item.file}')">🔊</button>
            </div>
        `).join('');
    }
};