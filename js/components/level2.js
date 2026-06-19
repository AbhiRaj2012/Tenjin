window.TenjinLevel2View = {
    activeTab: 'greetings',

    render: function(container) {
        // Dynamic Tab Styling based on current state
        const getTabStyle = (tab) => {
            return this.activeTab === tab 
                ? 'btn btn-primary' 
                : 'btn style="background: transparent; color: var(--text-main); border: 1px solid var(--border-color);"';
        };

        container.innerHTML = `
            <div style="max-width: 1000px; margin: 0 auto; padding-bottom: 40px;">
                <button class="btn" style="margin-bottom: 20px; background: transparent; color: var(--text-main); border: 1px solid var(--border-color);" onclick="window.navigateTo('learn')">← Back to Curriculum</button>
                
                <div class="settings-section">
                    <h2 style="margin-bottom: 15px; color: #3498db;">Level 2: Vocabulary Dictionary</h2>
                    <p style="margin-bottom: 15px; line-height: 1.6;">Expand your everyday lexicon. Select a category below to study 25 essential Japanese words, their English meanings, and pronunciations.</p>
                </div>

                <div class="settings-section">
                    <!-- Category Tabs -->
                    <div style="display: flex; gap: 10px; flex-wrap: wrap; border-bottom: 2px solid var(--border-color); padding-bottom: 15px; margin-bottom: 25px;">
                        <button class="${getTabStyle('greetings')}" style="border-radius: 20px; ${this.activeTab === 'greetings' ? 'background: #3498db; border-color: #3498db;' : ''}" onclick="window.TenjinLevel2View.switchTab('greetings')">Greetings & Expressions</button>
                        <button class="${getTabStyle('food')}" style="border-radius: 20px; ${this.activeTab === 'food' ? 'background: #3498db; border-color: #3498db;' : ''}" onclick="window.TenjinLevel2View.switchTab('food')">Food & Drinks</button>
                        <button class="${getTabStyle('travel')}" style="border-radius: 20px; ${this.activeTab === 'travel' ? 'background: #3498db; border-color: #3498db;' : ''}" onclick="window.TenjinLevel2View.switchTab('travel')">Travel & Places</button>
                        <button class="${getTabStyle('verbs')}" style="border-radius: 20px; ${this.activeTab === 'verbs' ? 'background: #3498db; border-color: #3498db;' : ''}" onclick="window.TenjinLevel2View.switchTab('verbs')">Common Verbs</button>
                    </div>

                    <!-- Dictionary Grid dynamically rendered based on Active Tab -->
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px;">
                        ${this.generateVocabCards(this.activeTab)}
                    </div>
                </div>

                <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid var(--border-color);">
                    <h3 style="color: var(--text-main); margin-bottom: 15px;">Ready to test your Vocabulary?</h3>
                    <button class="btn btn-primary" style="padding: 12px 30px; font-size: 1.1rem; border-radius: 8px;" 
                    onclick="window.TenjinAssessmentView.gen_assessment('level2', document.getElementById('dynamic-view'))">
                    📝 Take Level 2 Assessment
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
        const audio = new Audio(`assets/audio/level_two/${filename}`);
        audio.play().catch(err => {
            console.warn(`Audio file not found: assets/audio/level_two/${filename}`);
        });
    },

    generateVocabCards: function(category) {
        const vocabData = {
            greetings: [
                { j: 'こんにちは', r: 'Konnichiwa', e: 'Hello / Good afternoon', file: 'hello.mp3' },
                { j: 'おはようございます', r: 'Ohayō gozaimasu', e: 'Good morning', file: 'goodmorning.mp3' },
                { j: 'こんばんは', r: 'Konbanwa', e: 'Good evening', file: 'goodevening.mp3' },
                { j: 'おやすみなさい', r: 'Oyasuminasai', e: 'Good night', file: 'goodnight.mp3' },
                { j: 'さようなら', r: 'Sayōnara', e: 'Goodbye', file: 'goodbye.mp3' },
                { j: 'ありがとう', r: 'Arigatō', e: 'Thank you', file: 'thankyou.mp3' },
                { j: 'どういたしまして', r: 'Dōitashimashite', e: 'You are welcome', file: 'yourewelcome.mp3' },
                { j: 'すみません', r: 'Sumimasen', e: 'Excuse me / I am sorry', file: 'excuseme.mp3' },
                { j: 'ごめんなさい', r: 'Gomen nasai', e: 'I am sorry', file: 'imsorry.mp3' },
                { j: 'はい', r: 'Hai', e: 'Yes', file: 'yes.mp3' },
                { j: 'いいえ', r: 'Iie', e: 'No', file: 'no.mp3' },
                { j: 'お願いします', r: 'Onegaishimasu', e: 'Please', file: 'please.mp3' },
                { j: 'はじめまして', r: 'Hajimemashite', e: 'Nice to meet you', file: 'nicetomeetyou.mp3' },
                { j: 'お元気ですか', r: 'Ogenki desu ka', e: 'How are you?', file: 'howareyou.mp3' },
                { j: '元気です', r: 'Genki desu', e: 'I am fine', file: 'iamfine.mp3' },
                { j: 'お久しぶりです', r: 'Ohisashiburi desu', e: 'Long time no see', file: 'longtime.mp3' },
                { j: '頑張って', r: 'Ganbatte', e: 'Good luck / Do your best', file: 'goodluck.mp3' },
                { j: 'おめでとう', r: 'Omedetō', e: 'Congratulations', file: 'congrats.mp3' },
                { j: 'ようこそ', r: 'Yōkoso', e: 'Welcome', file: 'welcome.mp3' },
                { j: 'いってきます', r: 'Ittekimasu', e: 'I am leaving (but coming back)', file: 'leaving.mp3' },
                { j: 'いってらっしゃい', r: 'Itterasshai', e: 'Have a good trip (reply)', file: 'goodtrip.mp3' },
                { j: 'ただいま', r: 'Tadaima', e: 'I am home', file: 'imhome.mp3' },
                { j: 'おかえりなさい', r: 'Okaerinasai', e: 'Welcome back', file: 'welcomeback.mp3' },
                { j: 'いただきます', r: 'Itadakimasu', e: 'Let us eat (before meal)', file: 'letseat.mp3' },
                { j: 'ごちそうさまでした', r: 'Gochisōsama deshita', e: 'Thank you for the meal', file: 'thanksmeal.mp3' }
            ],
            food: [
                { j: '水', r: 'Mizu', e: 'Water', file: 'water.mp3' },
                { j: 'お茶', r: 'Ocha', e: 'Tea', file: 'tea.mp3' },
                { j: 'ご飯', r: 'Gohan', e: 'Rice / Meal', file: 'rice.mp3' },
                { j: 'パン', r: 'Pan', e: 'Bread', file: 'bread.mp3' },
                { j: '肉', r: 'Niku', e: 'Meat', file: 'meat.mp3' },
                { j: '魚', r: 'Sakana', e: 'Fish', file: 'fish.mp3' },
                { j: '卵', r: 'Tamago', e: 'Egg', file: 'egg.mp3' },
                { j: '野菜', r: 'Yasai', e: 'Vegetables', file: 'vegetables.mp3' },
                { j: '果物', r: 'Kudamono', e: 'Fruit', file: 'fruit.mp3' },
                { j: 'りんご', r: 'Ringo', e: 'Apple', file: 'apple.mp3' },
                { j: '寿司', r: 'Sushi', e: 'Sushi', file: 'sushi.mp3' },
                { j: 'ラーメン', r: 'Ramen', e: 'Ramen', file: 'ramen.mp3' },
                { j: '牛乳', r: 'Gyūnyū', e: 'Milk', file: 'milk.mp3' },
                { j: 'コーヒー', r: 'Kōhī', e: 'Coffee', file: 'coffee.mp3' },
                { j: '豚肉', r: 'Butaniku', e: 'Pork', file: 'pork.mp3' },
                { j: '牛肉', r: 'Gyūniku', e: 'Beef', file: 'beef.mp3' },
                { j: '鶏肉', r: 'Toriniku', e: 'Chicken', file: 'chicken.mp3' },
                { j: '砂糖', r: 'Satō', e: 'Sugar', file: 'sugar.mp3' },
                { j: '塩', r: 'Shio', e: 'Salt', file: 'salt.mp3' },
                { j: '醤油', r: 'Shōyu', e: 'Soy Sauce', file: 'soysauce.mp3' },
                { j: '朝ごはん', r: 'Asagohan', e: 'Breakfast', file: 'breakfast.mp3' },
                { j: '昼ごはん', r: 'Hirugohan', e: 'Lunch', file: 'lunch.mp3' },
                { j: '晩ごはん', r: 'Bangohan', e: 'Dinner', file: 'dinner.mp3' },
                { j: 'お菓子', r: 'Okashi', e: 'Snack / Sweets', file: 'snack.mp3' },
                { j: '箸', r: 'Hashi', e: 'Chopsticks', file: 'chopsticks.mp3' }
            ],
            travel: [
                { j: '駅', r: 'Eki', e: 'Station', file: 'station.mp3' },
                { j: '電車', r: 'Densha', e: 'Train', file: 'train.mp3' },
                { j: 'バス', r: 'Basu', e: 'Bus', file: 'bus.mp3' },
                { j: '空港', r: 'Kūkō', e: 'Airport', file: 'airport.mp3' },
                { j: '飛行機', r: 'Hikōki', e: 'Airplane', file: 'airplane.mp3' },
                { j: 'タクシー', r: 'Takushī', e: 'Taxi', file: 'taxi.mp3' },
                { j: '切符', r: 'Kippu', e: 'Ticket', file: 'ticket.mp3' },
                { j: 'ホテル', r: 'Hoteru', e: 'Hotel', file: 'hotel.mp3' },
                { j: 'パスポート', r: 'Pasupōto', e: 'Passport', file: 'passport.mp3' },
                { j: '地図', r: 'Chizu', e: 'Map', file: 'map.mp3' },
                { j: '荷物', r: 'Nimotsu', e: 'Luggage', file: 'luggage.mp3' },
                { j: 'トイレ', r: 'Toire', e: 'Restroom', file: 'restroom.mp3' },
                { j: '右', r: 'Migi', e: 'Right', file: 'right.mp3' },
                { j: '左', r: 'Hidari', e: 'Left', file: 'left.mp3' },
                { j: 'まっすぐ', r: 'Massugu', e: 'Straight', file: 'straight.mp3' },
                { j: '近く', r: 'Chikaku', e: 'Near', file: 'near.mp3' },
                { j: '遠く', r: 'Tōku', e: 'Far', file: 'far.mp3' },
                { j: '銀行', r: 'Ginkō', e: 'Bank', file: 'bank.mp3' },
                { j: '病院', r: 'Byōin', e: 'Hospital', file: 'hospital.mp3' },
                { j: '警察', r: 'Keisatsu', e: 'Police', file: 'police.mp3' },
                { j: 'コンビニ', r: 'Konbini', e: 'Convenience Store', file: 'convenience.mp3' },
                { j: 'レストラン', r: 'Resutoran', e: 'Restaurant', file: 'restaurant.mp3' },
                { j: 'お金', r: 'Okane', e: 'Money', file: 'money.mp3' },
                { j: 'クレジットカード', r: 'Kurejitto kādo', e: 'Credit Card', file: 'creditcard.mp3' },
                { j: '予約', r: 'Yoyaku', e: 'Reservation', file: 'reservation.mp3' }
            ],
            verbs: [
                { j: '食べる', r: 'Taberu', e: 'To eat', file: 'eat.mp3' },
                { j: '飲む', r: 'Nomu', e: 'To drink', file: 'drink.mp3' },
                { j: '行く', r: 'Iku', e: 'To go', file: 'go.mp3' },
                { j: '来る', r: 'Kuru', e: 'To come', file: 'come.mp3' },
                { j: '読む', r: 'Yomu', e: 'To read', file: 'read.mp3' },
                { j: '書く', r: 'Kaku', e: 'To write', file: 'write.mp3' },
                { j: '話す', r: 'Hanasu', e: 'To speak', file: 'speak.mp3' },
                { j: '聞く', r: 'Kiku', e: 'To listen / To ask', file: 'listen.mp3' },
                { j: '見る', r: 'Miru', e: 'To see / To watch', file: 'see.mp3' },
                { j: '買う', r: 'Kau', e: 'To buy', file: 'buy.mp3' },
                { j: '寝る', r: 'Neru', e: 'To sleep', file: 'sleep.mp3' },
                { j: '起きる', r: 'Okiru', e: 'To wake up', file: 'wakeup.mp3' },
                { j: '歩く', r: 'Aruku', e: 'To walk', file: 'walk.mp3' },
                { j: '走る', r: 'Hashiru', e: 'To run', file: 'run.mp3' },
                { j: '泳ぐ', r: 'Oyogu', e: 'To swim', file: 'swim.mp3' },
                { j: '作る', r: 'Tsukuru', e: 'To make', file: 'make.mp3' },
                { j: '待つ', r: 'Matsu', e: 'To wait', file: 'wait.mp3' },
                { j: '使う', r: 'Tsukau', e: 'To use', file: 'use.mp3' },
                { j: '働く', r: 'Hataraku', e: 'To work', file: 'work.mp3' },
                { j: '休む', r: 'Yasumu', e: 'To rest', file: 'rest.mp3' },
                { j: '勉強する', r: 'Benkyō suru', e: 'To study', file: 'study.mp3' },
                { j: '遊ぶ', r: 'Asobu', e: 'To play', file: 'play.mp3' },
                { j: 'あげる', r: 'Ageru', e: 'To give', file: 'give.mp3' },
                { j: 'もらう', r: 'Morau', e: 'To receive', file: 'receive.mp3' },
                { j: '分かる', r: 'Wakaru', e: 'To understand', file: 'understand.mp3' }
            ]
        };

        const activeList = vocabData[category] || vocabData.greetings;

        return activeList.map(item => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 15px 20px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; transition: transform 0.2s; box-shadow: 0 2px 6px rgba(0,0,0,0.05);" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                <div>
                    <div style="font-size: 1.6rem; font-weight: bold; color: var(--text-main); margin-bottom: 3px;">${item.j}</div>
                    <div style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 8px;">${item.r}</div>
                    <div style="color: #3498db; font-weight: 600; font-size: 1.05rem;">${item.e}</div>
                </div>
                <button class="btn" style="background: rgba(52, 152, 219, 0.1); color: #3498db; border: 1px solid rgba(52, 152, 219, 0.3); border-radius: 50%; width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; cursor: pointer; transition: all 0.2s;" onmouseover="this.style.background='#3498db'; this.style.color='white';" onmouseout="this.style.background='rgba(52, 152, 219, 0.1)'; this.style.color='#3498db';" onclick="window.TenjinLevel2View.playAudio('${item.file}')">🔊</button>
            </div>
        `).join('');
    }
};