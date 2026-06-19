window.TenjinChatView = {
    conversationHistory: [],
    isRecording: false,
    recognition: null,
    currentAudio: null,       
    currentAudioButton: null, 
    currentImageBase64: null,
    currentAvatarState: 'idle', 
    
    systemPrompt: `You are Tenjin, a friendly Japanese language tutor. 

CRITICAL RULES:
1. SINGLE RESPONSE: Provide EXACTLY ONE unified answer. Do NOT generate multiple drafts, provide alternate "options", or restart your greeting in the middle of the text.
2. DIRECT DIALOGUE: Speak directly TO the user. NEVER refer to the user in the third person (e.g., "The user uploaded...").
3. NO INTERNAL MONOLOGUE: NEVER narrate your thoughts, plans, or instructions (e.g., "Plan:", "As Tenjin...", "Draft:").
4. NATURAL FORMAT: Use standard paragraphs. Do NOT use bullet points or asterisks (*).

Example Interaction:
User: translate this
Assistant: Konnichiwa! The text in your image says "Neko" (猫), which translates to "Cat". Let me know if you want to practice pronouncing it!`,

    initializeHistory: function() {
        this.conversationHistory = [
            { role: "system", content: this.systemPrompt }
        ];
    },

    // AVATAR STATE MANAGER
    getAvatarSrc: function(state) {
        const map = {
            'idle': 'assets/images/tenjin_idle.png',
            'thinking': 'assets/images/tenjin_thinking.png',
            'talking': 'assets/images/tenjin_talking.png',
            'error': 'assets/images/tenjin_sad.png'
        };
        return map[state] || map['idle'];
    },

    updateAvatar: function(state, text = null) {
        this.currentAvatarState = state;
        const img = document.getElementById('tenjin-chat-avatar');
        const statusTxt = document.getElementById('avatar-status-text');
        
        if (img) img.src = this.getAvatarSrc(state);
        if (statusTxt && text) statusTxt.innerText = text;
    },

    render: function(container) {
        if (this.conversationHistory.length === 0) this.initializeHistory();

        container.innerHTML = `
            <style>
                @keyframes pulse-record { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
                .recording-active { background: rgba(231, 76, 60, 0.1) !important; border: 1px solid #e74c3c !important; color: #e74c3c !important; }
            </style>
            <div style="display: flex; gap: 25px; height: calc(100vh - 160px); max-width: 1200px; margin: 0 auto; padding-bottom: 10px;">
                <div style="flex: 2; display: flex; flex-direction: column; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; overflow: hidden;">
                    
                    <div style="padding: 15px 20px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; background: var(--bg-card);">
                        <div>
                            <h3 style="margin: 0 0 4px 0; color: var(--accent-color);">Tenjin AI Tutor</h3>
                            <p style="margin:0; font-size:0.85rem; color:var(--text-muted);">Powered by Cloud Intelligence</p>
                        </div>
                        <button class="btn" style="padding: 6px 12px; font-size:0.82rem; border:1px solid var(--border-color); background:transparent; color:var(--text-muted);" onclick="window.TenjinChatView.clearSession()">Clear History</button>
                    </div>

                    <div id="chat-window" style="flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 15px; background: var(--bg-primary);"></div>
                    
                    <div id="image-preview-container" style="display: none; padding: 10px 20px; background: var(--bg-card); border-top: 1px solid var(--border-color); align-items: center; gap: 10px;">
                        <img id="image-preview" src="" style="height: 60px; border-radius: 8px; border: 1px solid var(--border-color);">
                        <button class="btn" style="background: transparent; color: #e74c3c; border: none; padding: 5px; font-weight: bold; cursor: pointer;" onclick="window.TenjinChatView.clearImage()">❌ Remove Image</button>
                    </div>

                    <div style="padding: 15px; border-top: 1px solid var(--border-color); display: flex; gap: 10px; background: var(--bg-card); align-items: center;">
                        <input type="file" id="vision-upload" accept="image/*" style="display: none;" onchange="window.TenjinChatView.handleImageUpload(event)">
                        
                        <button class="btn" style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 50%; width: 45px; height: 45px; padding: 0; cursor: pointer; flex-shrink: 0;" onclick="document.getElementById('vision-upload').click()" title="Upload Image">📷</button>
                        <button id="mic-btn" class="btn" style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 50%; width: 45px; height: 45px; padding: 0; cursor: pointer; flex-shrink: 0; transition: all 0.2s;" onclick="window.TenjinChatView.toggleVoiceInput()" title="Voice Input">🎙️</button>
                        
                        <div style="flex: 1; position: relative; display: flex; align-items: center;">
                            <input type="text" id="chat-input" class="form-control" style="width: 100%; padding: 12px 20px; border-radius: 25px;" placeholder="Type your message here..." onkeypress="if(event.key==='Enter') window.TenjinChatView.sendMessage()">
                            
                            <div id="recording-overlay" style="display: none; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(231, 76, 60, 0.1); border-radius: 25px; border: 1px solid #e74c3c; align-items: center; padding: 0 20px; color: #e74c3c; font-weight: bold; gap: 10px; z-index: 10;">
                                <span style="animation: pulse-record 1s infinite;">🔴</span> 
                                <span id="live-transcript" style="font-weight: normal; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1;">Listening...</span>
                            </div>
                        </div>

                        <button id="send-btn" class="btn btn-primary" style="border-radius: 50%; width: 45px; height: 45px; padding: 0; cursor: pointer; flex-shrink: 0;" onclick="window.TenjinChatView.sendMessage()">➤</button>
                    </div>
                </div>

                <div style="flex: 1; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px;">
                    <img id="tenjin-chat-avatar" 
                         src="assets/images/tenjin_idle.png" 
                         style="width: 100%; max-width: 220px; cursor: pointer; transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);" 
                         onerror="this.src='https://api.dicebear.com/7.x/bottts/svg?seed=Tenjin'"
                         onmouseenter="this.src='assets/images/tenjin_lovely.png'; this.style.transform='scale(1.08)';"
                         onmouseleave="this.src=window.TenjinChatView.getAvatarSrc(window.TenjinChatView.currentAvatarState); this.style.transform='scale(1)';"
                         onmousedown="this.src='assets/images/tenjin_angry.png';"
                         onmouseup="this.src='assets/images/tenjin_lovely.png';">
                    <p style="font-weight: bold; color: var(--text-main); margin-top: 15px; margin-bottom: 4px;">Tenjin</p>
                    <p id="avatar-status-text" style="margin:0; font-size:0.88rem; color:var(--text-muted);">Awaiting your input...</p>
                </div>
            </div>
        `;
        this.renderStoredHistory();
        this.updateAvatar('idle', 'Awaiting your input...'); // Reset state on render
    },

    clearSession: function() {
        this.initializeHistory();
        this.clearImage();
        if (this.currentAudio) this.currentAudio.pause();
        this.render(document.getElementById('dynamic-view'));
    },

    renderStoredHistory: function() {
        const win = document.getElementById('chat-window');
        if (!win) return;
        win.innerHTML = '';

        if(this.conversationHistory.length <= 1) {
            this.appendDomTenjin("Konnichiwa! I am Tenjin, your virtual Japanese tutor. 🎌\n\nYou can type, use your microphone, or upload an image of Japanese text for me to evaluate!", false);
        }

        this.conversationHistory.forEach((msg) => {
            if (msg.role === 'system') return;
            if (msg.role === 'user') this.appendDomUser(msg.content, msg.image);
            if (msg.role === 'assistant') this.appendDomTenjin(msg.content, true);
        });
    },

    handleImageUpload: function(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            this.currentImageBase64 = e.target.result;
            document.getElementById('image-preview').src = this.currentImageBase64;
            document.getElementById('image-preview-container').style.display = 'flex';
        };
        reader.readAsDataURL(file);
    },

    clearImage: function() {
        this.currentImageBase64 = null;
        document.getElementById('vision-upload').value = '';
        document.getElementById('image-preview-container').style.display = 'none';
    },

    toggleVoiceInput: function() {
        if (window.location.protocol === 'file:') {
            alert("🚨 MICROPHONE BLOCKED BY BROWSER 🚨\n\nYou are currently opening the 'index.html' file directly from your hard drive.\n\nPlease type 'http://localhost:5000' into your URL bar to use the microphone.");
            return;
        }

        const micBtn = document.getElementById('mic-btn');
        const inputField = document.getElementById('chat-input');
        const recordingOverlay = document.getElementById('recording-overlay');
        const liveTranscript = document.getElementById('live-transcript');

        if (this.isRecording) {
            if (this.recognition) this.recognition.stop();
            return; 
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Speech recognition is only supported in Chrome or Edge.");
            return;
        }

        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'en-US'; 
        this.recognition.interimResults = true;
        
        this.isRecording = true;
        micBtn.classList.add('recording-active');
        micBtn.innerHTML = "🛑";
        inputField.style.display = 'none';
        recordingOverlay.style.display = 'flex';
        liveTranscript.innerText = "Listening...";

        this.recognition.onresult = (event) => {
            let finalTranscript = '';
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
                else interimTranscript += event.results[i][0].transcript;
            }
            liveTranscript.innerText = finalTranscript || interimTranscript || "Listening...";
            if (finalTranscript) inputField.value = finalTranscript;
        };

        const resetMicUI = () => {
            this.isRecording = false;
            micBtn.classList.remove('recording-active');
            micBtn.innerHTML = "🎙️";
            inputField.style.display = 'block';
            recordingOverlay.style.display = 'none';
        };

        this.recognition.onend = resetMicUI;
        this.recognition.onerror = (e) => {
            console.error("Mic error: ", e.error);
            resetMicUI();
        };

        this.recognition.start();
    },

    cleanAIResponse: function(rawText) {
        let text = rawText.replace(/\*/g, '');
        let blocks = text.split(/\n\s*\n/);
        
        const blacklistPhrases = [
            "the user has provided", "the user is asking", "the user asks",
            "the user wants", "the user provided", "as tenjin", "plan:",
            "draft:", "role:", "constraint", "goal:", "persona:",
            "thinking process:", "user says:", "option 1", "option 2"
        ];

        let cleanBlocks = blocks.filter(block => {
            const lower = block.toLowerCase();
            return !blacklistPhrases.some(phrase => lower.includes(phrase));
        });

        let result = cleanBlocks.join('\n\n').trim();
        
        const restartMatch = result.substring(50).search(/(Hello there!|Konnichiwa!|Hi there!|Greetings!|Hello!)/i);
        if (restartMatch !== -1) {
            result = result.substring(0, 50 + restartMatch).trim();
        }

        if (!result || result.length < 5) {
            return "Got it! Let's keep practicing. What would you like to focus on next?";
        }

        return result;
    },

    sendMessage: async function() {
        const input = document.getElementById('chat-input');
        const promptText = input.value.trim();
        const hasImage = this.currentImageBase64 !== null;
        if (!promptText && !hasImage) return;

        if (this.isRecording && this.recognition) this.recognition.stop();

        this.appendDomUser(promptText, this.currentImageBase64);
        
        const payloadMsg = { role: "user", content: promptText };
        if (hasImage) payloadMsg.image = this.currentImageBase64;
        
        this.conversationHistory.push(payloadMsg);
        input.value = '';
        this.clearImage();

        this.injectTypingBubble();
        
        // Trigger Avatar Thinking State
        this.updateAvatar('thinking', 'Thinking...');

        try {
            const api_key = localStorage.getItem('tenjin_api_key');
            const provider = localStorage.getItem('tenjin_cloud_provider') || 'Google';
            const cloud_model = localStorage.getItem('tenjin_cloud_model') || 'gemini-1.5-flash';

            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    api_key: api_key, provider: provider, cloud_model: cloud_model,
                    messages: this.conversationHistory
                })
            });

            const data = await response.json();
            this.removeTypingBubble();

            if (!response.ok) throw new Error(data.error || "System failed to capture response trace.");

            let finalCleanText = this.cleanAIResponse(data.reply);

            this.conversationHistory.push({ role: "assistant", content: finalCleanText });
            this.appendDomTenjin(finalCleanText, true);
            
            // Return to idle state after answering
            this.updateAvatar('idle', 'Ready.');

        } catch (error) {
            this.removeTypingBubble();
            this.appendDomTenjin(`⚠️ **Error:** ${error.message}`, false);
            this.updateAvatar('error', 'Error state detected.');
        }
    },

    dispatchVoiceAudio: async function(txt, buttonElement) {
        // Stop currently playing audio
        if (this.currentAudio && !this.currentAudio.paused) {
            this.currentAudio.pause();
            if (this.currentAudioButton) this.currentAudioButton.innerText = "🔊";
            this.updateAvatar('idle', 'Ready.');
            return;
        }

        let speakableText = txt.replace(/\*\*(.*?)\*\*/g, '$1').replace(/[*_#`~-]/g, '').trim();

        const originalText = buttonElement.innerText;
        buttonElement.innerText = "⏳";
        
        try {
            const response = await fetch('http://localhost:5000/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: speakableText })
            });
            if (!response.ok) throw new Error("Backend TTS Failed");
            
            const blob = await response.blob();
            this.currentAudio = new Audio(URL.createObjectURL(blob));
            this.currentAudioButton = buttonElement;
            
            buttonElement.innerText = "⏹️";
            this.updateAvatar('talking', 'Speaking...');

            this.currentAudio.onended = () => { 
                buttonElement.innerText = "🔊"; 
                window.TenjinChatView.updateAvatar('idle', 'Ready.');
            };
            this.currentAudio.play();

        } catch(e) {
            console.warn("Python TTS failed, falling back to Browser Native Voice.", e);
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(speakableText);
                utterance.lang = 'ja-JP'; 
                
                utterance.onstart = () => { 
                    buttonElement.innerText = "⏹️"; 
                    window.TenjinChatView.updateAvatar('talking', 'Speaking...');
                };
                utterance.onend = () => { 
                    buttonElement.innerText = "🔊"; 
                    window.TenjinChatView.updateAvatar('idle', 'Ready.');
                };
                
                if (window.speechSynthesis.speaking) {
                    window.speechSynthesis.cancel();
                    buttonElement.innerText = "🔊";
                    this.updateAvatar('idle', 'Ready.');
                    return;
                }
                window.speechSynthesis.speak(utterance);
            } else {
                buttonElement.innerText = "🔊";
            }
        }
    },

    appendDomUser: function(text, imageBase64 = null) {
        const win = document.getElementById('chat-window');
        if (!win) return;
        const div = document.createElement('div');
        div.style = "display:flex; gap:12px; align-self: flex-end; max-width: 80%; flex-direction: row-reverse;";
        
        let contentHtml = text ? `<div style="line-height: 1.45;">${text}</div>` : '';
        if (imageBase64) {
            contentHtml = `<img src="${imageBase64}" style="max-width: 200px; border-radius: 8px; margin-bottom: ${text ? '10px' : '0'}; border: 2px solid rgba(255,255,255,0.3);"><br>` + contentHtml;
        }

        div.innerHTML = `
            <div style="background:var(--border-color); width:35px; height:35px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:0.9rem;">👤</div>
            <div style="background: var(--accent-color); color: white; padding: 12px 16px; border-radius: 15px 0 15px 15px;">${contentHtml}</div>
        `;
        win.appendChild(div);
        win.scrollTop = win.scrollHeight;
    },

    appendDomTenjin: function(text, showSpeaker = true) {
        const win = document.getElementById('chat-window');
        if (!win) return;
        
        const wrapper = document.createElement('div');
        wrapper.style = "display:flex; gap:12px; align-self: flex-start; max-width: 80%;";
        
        let formatted = text
            .replace(/\n\n/g, '<br><br>')
            .replace(/(?<!<br>)\n/g, '<br>');

        wrapper.innerHTML = `
            <div style="background:var(--accent-color); color:white; width:35px; height:35px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:0.9rem;">天</div>
            <div class="chat-bubble-content" style="background: var(--bg-card); border:1px solid var(--border-color); color: var(--text-main); padding: 14px 18px; border-radius: 0 15px 15px 15px; line-height: 1.6; position: relative; width: 100%;">
                ${formatted}
            </div>
        `;

        if (showSpeaker) {
            const btnContainer = document.createElement('div');
            btnContainer.style = "text-align: right; margin-top: 10px;";
            
            const speakerBtn = document.createElement('button');
            speakerBtn.className = "btn";
            speakerBtn.style = "background: rgba(230, 126, 34, 0.1); color: var(--accent-color); border: none; border-radius: 50%; width: 34px; height: 34px; padding: 0; display: inline-flex; align-items: center; justify-content: center; font-size: 0.9rem; cursor: pointer;";
            speakerBtn.innerText = "🔊";
            speakerBtn.onclick = () => window.TenjinChatView.dispatchVoiceAudio(text, speakerBtn);
            
            btnContainer.appendChild(speakerBtn);
            wrapper.querySelector('.chat-bubble-content').appendChild(btnContainer);
        }

        win.appendChild(wrapper);
        win.scrollTop = win.scrollHeight;
    },

    injectTypingBubble: function() {
        const win = document.getElementById('chat-window');
        if (!win) return;
        const div = document.createElement('div');
        div.id = "pulse-bubble";
        div.style = "align-self: flex-start; background: var(--bg-card); border: 1px solid var(--border-color); padding: 10px 15px; border-radius: 8px; color: var(--text-muted); font-size:0.85rem;";
        div.innerText = "Tenjin is thinking...";
        win.appendChild(div);
        win.scrollTop = win.scrollHeight;
    },

    removeTypingBubble: function() {
        const bubble = document.getElementById('pulse-bubble');
        if (bubble) bubble.remove();
    }
};