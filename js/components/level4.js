window.TenjinLevel4View = {
    activeTab: 'travel',

    render: function(container) {
        const getTabStyle = (tab) => {
            return this.activeTab === tab 
                ? 'btn btn-primary' 
                : 'btn style="background: transparent; color: var(--text-main); border: 1px solid var(--border-color);"';
        };

        container.innerHTML = `
            <div style="max-width: 1000px; margin: 0 auto; padding-bottom: 40px;">
                <button class="btn" style="margin-bottom: 20px; background: transparent; color: var(--text-main); border: 1px solid var(--border-color);" onclick="window.navigateTo('learn')">← Back to Curriculum</button>
                
                <div class="settings-section">
                    <h2 style="margin-bottom: 15px; color: #e67e22;">Level 4: Common Sentences</h2>
                    <p style="margin-bottom: 15px; line-height: 1.6;">It is time to put your vocabulary and grammar to use! Practice these essential everyday phrases. <strong>Click the reveal button</strong> on each card to check the English translation.</p>
                </div>

                <div class="settings-section">
                    <!-- Category Tabs -->
                    <div style="display: flex; gap: 10px; flex-wrap: wrap; border-bottom: 2px solid var(--border-color); padding-bottom: 15px; margin-bottom: 25px;">
                        <button class="${getTabStyle('travel')}" style="border-radius: 20px; ${this.activeTab === 'travel' ? 'background: #e67e22; border-color: #e67e22;' : ''}" onclick="window.TenjinLevel4View.switchTab('travel')">Directions & Transit</button>
                        <button class="${getTabStyle('shopping')}" style="border-radius: 20px; ${this.activeTab === 'shopping' ? 'background: #e67e22; border-color: #e67e22;' : ''}" onclick="window.TenjinLevel4View.switchTab('shopping')">Shopping & Dining</button>
                        <button class="${getTabStyle('social')}" style="border-radius: 20px; ${this.activeTab === 'social' ? 'background: #e67e22; border-color: #e67e22;' : ''}" onclick="window.TenjinLevel4View.switchTab('social')">Making Friends</button>
                        <button class="${getTabStyle('emergency')}" style="border-radius: 20px; ${this.activeTab === 'emergency' ? 'background: #e67e22; border-color: #e67e22;' : ''}" onclick="window.TenjinLevel4View.switchTab('emergency')">Emergencies</button>
                    </div>

                    <!-- Sentences Grid -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px;">
                        ${this.generateSentenceCards(this.activeTab)}
                    </div>
                </div>

                <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid var(--border-color);">
                    <h3 style="color: var(--text-main); margin-bottom: 10px;">Ready to test your Kanji?</h3>
                    <p style="color: var(--text-muted); margin-bottom: 20px;">Complete Level 4, or challenge yourself with the Ultimate Exam.</p>
    
                    <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                        <button class="btn btn-primary" style="padding: 12px 30px; font-size: 1.1rem; border-radius: 8px;" 
                            onclick="window.TenjinAssessmentView.gen_assessment('level4', document.getElementById('dynamic-view'))">
                            📝 Take Level 4 Assessment
                        </button>
        
                        <button class="btn btn-primary" style="padding: 12px 30px; font-size: 1.1rem; border-radius: 8px; background-color: var(--accent-color); border-color: var(--accent-color); color: white;" 
                            onclick="window.TenjinAssessmentView.full_quiz(document.getElementById('dynamic-view'))">
                            👑 Ultimate Mastery Quiz (All Levels)
                        </button>
                    </div>
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
        const audio = new Audio(`assets/audio/level_four/${filename}`);
        audio.play().catch(err => {
            console.warn(`Audio file not found: assets/audio/level_four/${filename}`);
        });
    },

    revealTranslation: function(element, english) {
        // Remove the hover events so the background doesn't return
        element.onmouseover = null;
        element.onmouseout = null;
        
        // Reset all container styling to seamlessly blend
        element.style.background = 'transparent';
        element.style.textAlign = 'left';
        element.style.cursor = 'default';
        element.style.border = 'none';
        element.style.padding = '0';
        
        element.innerHTML = `
            <div style="color: #e67e22; font-size: 0.95rem; font-weight: 600; padding-top: 5px;"><strong>EN:</strong> ${english}</div>
        `;
    },

    generateSentenceCards: function(category) {
        // Added 'h' for Hiragana/Kana reading. Spaces added for beginner readability.
        const sentenceData = {
            travel: [
                { j: '東京駅はどこですか？', h: 'とうきょうえきは どこですか？', r: 'Tōkyō eki wa doko desu ka?', e: 'Where is Tokyo station?', file: 'where_tokyo_station.mp3' },
                { j: '切符を一枚お願いします。', h: 'きっぷを いちまい おねがいします。', r: 'Kippu o ichimai onegaishimasu.', e: 'One ticket, please.', file: 'one_ticket.mp3' },
                { j: 'この電車は新宿に行きますか？', h: 'この でんしゃは しんじゅくに いきますか？', r: 'Kono densha wa Shinjuku ni ikimasu ka?', e: 'Does this train go to Shinjuku?', file: 'train_to_shinjuku.mp3' },
                { j: 'まっすぐ行ってください。', h: 'まっすぐ いってください。', r: 'Massugu itte kudasai.', e: 'Please go straight ahead.', file: 'go_straight.mp3' },
                { j: '次の駅で降ります。', h: 'つぎの えきで おります。', r: 'Tsugi no eki de orimasu.', e: 'I will get off at the next station.', file: 'next_station.mp3' },
                { j: 'バス停はどこですか？', h: 'バスていは どこですか？', r: 'Basutei wa doko desu ka?', e: 'Where is the bus stop?', file: 'where_bus_stop.mp3' },
                { j: '地図を書いてもらえますか？', h: 'ちずを かいて もらえますか？', r: 'Chizu o kaite moraemasu ka?', e: 'Could you draw me a map?', file: 'draw_map.mp3' },
                { j: 'ホテルに荷物を預けたいです。', h: 'ホテルに にもつを あずけたいです。', r: 'Hoteru ni nimotsu o azuketai desu.', e: 'I want to leave my luggage at the hotel.', file: 'leave_luggage.mp3' },
                { j: '歩いて行けますか？', h: 'あるいて いけますか？', r: 'Aruite ikemasu ka?', e: 'Can I go there on foot?', file: 'go_on_foot.mp3' },
                { j: 'タクシーを呼んでください。', h: 'タクシーを よんでください。', r: 'Takushī o yonde kudasai.', e: 'Please call a taxi.', file: 'call_taxi.mp3' }
            ],
            shopping: [
                { j: 'これはいくらですか？', h: 'これは いくらですか？', r: 'Kore wa ikura desu ka?', e: 'How much is this?', file: 'how_much.mp3' },
                { j: 'クレジットカードは使えますか？', h: 'クレジットカードは つかえますか？', r: 'Kurejitto kādo wa tsukaemasu ka?', e: 'Can I use a credit card?', file: 'credit_card.mp3' },
                { j: 'これをください。', h: 'これを ください。', r: 'Kore o kudasai.', e: 'I will take this. / This one, please.', file: 'ill_take_this.mp3' },
                { j: 'メニューをお願いします。', h: 'メニューを おねがいします。', r: 'Menyū o onegaishimasu.', e: 'Menu, please.', file: 'menu_please.mp3' },
                { j: 'おすすめは何ですか？', h: 'おすすめは なんですか？', r: 'Osusume wa nan desu ka?', e: 'What do you recommend?', file: 'what_recommend.mp3' },
                { j: 'お会計をお願いします。', h: 'おかいけいを おねがいします。', r: 'Okaikei o onegaishimasu.', e: 'The bill/check, please.', file: 'bill_please.mp3' },
                { j: 'もう少し安いのはありますか？', h: 'もうすこし やすいのは ありますか？', r: 'Mō sukoshi yasui no wa arimasu ka?', e: 'Do you have a cheaper one?', file: 'cheaper_one.mp3' },
                { j: '試着してもいいですか？', h: 'しちゃくしても いいですか？', r: 'Shichaku shite mo ii desu ka?', e: 'Can I try this on?', file: 'try_on.mp3' },
                { j: '水をお願いします。', h: 'みずを おねがいします。', r: 'Mizu o onegaishimasu.', e: 'Water, please.', file: 'water_please.mp3' },
                { j: 'ベジタリアン用のメニューはありますか？', h: 'ベジタリアンようの メニューは ありますか？', r: 'Bejitarian yō no menyū wa arimasu ka?', e: 'Do you have a vegetarian menu?', file: 'vegetarian_menu.mp3' }
            ],
            social: [
                { j: '英語が話せますか？', h: 'えいごが はなせますか？', r: 'Eigo ga hanasemasu ka?', e: 'Can you speak English?', file: 'speak_english.mp3' },
                { j: 'お名前は何ですか？', h: 'おなまえは なんですか？', r: 'Onamae wa nan desu ka?', e: 'What is your name?', file: 'what_is_your_name.mp3' },
                { j: '私はアメリカから来ました。', h: 'わたしは アメリカから きました。', r: 'Watashi wa Amerika kara kimashita.', e: 'I come from America.', file: 'from_america.mp3' },
                { j: '趣味は何ですか？', h: 'しゅみは なんですか？', r: 'Shumi wa nan desu ka?', e: 'What are your hobbies?', file: 'what_hobbies.mp3' },
                { j: 'もう一度言ってください。', h: 'もういちど いってください。', r: 'Mō ichido itte kudasai.', e: 'Please say that one more time.', file: 'say_again.mp3' },
                { j: 'ゆっくり話してください。', h: 'ゆっくり はなしてください。', r: 'Yukkuri hanashite kudasai.', e: 'Please speak slowly.', file: 'speak_slowly.mp3' },
                { j: '日本語が少ししか話せません。', h: 'にほんごが すこししか はなせません。', r: 'Nihongo ga sukoshi shika hanasemasen.', e: 'I can only speak a little Japanese.', file: 'little_japanese.mp3' },
                { j: 'LINEを交換しませんか？', h: 'ラインを こうかんしませんか？', r: 'Rain o kōkan shimasen ka?', e: 'Would you like to exchange LINE (contacts)?', file: 'exchange_line.mp3' },
                { j: '週末は何をしますか？', h: 'しゅうまつは なにを しますか？', r: 'Shūmatsu wa nani o shimasu ka?', e: 'What are you doing this weekend?', file: 'weekend_plans.mp3' },
                { j: 'とても美味しいです！', h: 'とても おいしいです！', r: 'Totemo oishii desu!', e: 'It is very delicious!', file: 'very_delicious.mp3' }
            ],
            emergency: [
                { j: '助けて！', h: 'たすけて！', r: 'Tasukete!', e: 'Help!', file: 'help.mp3' },
                { j: '病院はどこですか？', h: 'びょういんは どこですか？', r: 'Byōin wa doko desu ka?', e: 'Where is the hospital?', file: 'where_hospital.mp3' },
                { j: '警察を呼んでください。', h: 'けいさつを よんでください。', r: 'Keisatsu o yonde kudasai.', e: 'Please call the police.', file: 'call_police.mp3' },
                { j: 'パスポートをなくしました。', h: 'パスポートを なくしました。', r: 'Pasupōto o nakushimashita.', e: 'I lost my passport.', file: 'lost_passport.mp3' },
                { j: '気分が悪いです。', h: 'きぶんが わるいです。', r: 'Kibun ga warui desu.', e: 'I feel sick / unwell.', file: 'feel_sick.mp3' },
                { j: '救急車を呼んでください。', h: 'きゅうきゅうしゃを よんでください。', r: 'Kyūkyūsha o yonde kudasai.', e: 'Please call an ambulance.', file: 'call_ambulance.mp3' },
                { j: 'アレルギーがあります。', h: 'アレルギーが あります。', r: 'Arerugī ga arimasu.', e: 'I have an allergy.', file: 'have_allergy.mp3' },
                { j: '痛いです。', h: 'いたいです。', r: 'Itai desu.', e: 'It hurts.', file: 'it_hurts.mp3' },
                { j: '英語が話せる医者はいますか？', h: 'えいごが はなせる いしゃは いますか？', r: 'Eigo ga hanaseru isha wa imasu ka?', e: 'Is there a doctor who speaks English?', file: 'english_doctor.mp3' },
                { j: 'ここはどこですか？', h: 'ここは どこですか？', r: 'Koko wa doko desu ka?', e: 'Where am I?', file: 'where_am_i.mp3' }
            ]
        };

        const activeList = sentenceData[category] || sentenceData.travel;

        return activeList.map(item => `
            <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
                
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px;">
                    <div style="padding-right: 15px;">
                        <div style="font-size: 1.3rem; font-weight: bold; color: var(--text-main); line-height: 1.5; margin-bottom: 5px;">
                            ${item.j}
                        </div>
                        <div style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 3px;">
                            <strong>Kana:</strong> ${item.h}
                        </div>
                        <div style="color: var(--text-muted); font-size: 0.95rem;">
                            <strong>Romaji:</strong> ${item.r}
                        </div>
                    </div>
                    <button class="btn" style="background: rgba(230, 126, 34, 0.1); color: #e67e22; border: 1px solid rgba(230, 126, 34, 0.3); border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; cursor: pointer; transition: all 0.2s; flex-shrink: 0;" onmouseover="this.style.background='#e67e22'; this.style.color='white';" onmouseout="this.style.background='rgba(230, 126, 34, 0.1)'; this.style.color='#e67e22';" onclick="window.TenjinLevel4View.playAudio('${item.file}')">🔊</button>
                </div>

                <!-- Interactive Reveal Box -->
                <div onclick="window.TenjinLevel4View.revealTranslation(this, '${item.e.replace(/'/g, "\\'")}')" style="background: rgba(230, 126, 34, 0.05); border: 1px dashed rgba(230, 126, 34, 0.4); border-radius: 8px; padding: 10px; text-align: center; cursor: pointer; color: #e67e22; font-size: 0.95rem; transition: background 0.2s; margin-top: 10px;" onmouseover="this.style.background='rgba(230, 126, 34, 0.1)'" onmouseout="this.style.background='rgba(230, 126, 34, 0.05)'">
                    👁️ Click to reveal meaning
                </div>

            </div>
        `).join('');
    }
};