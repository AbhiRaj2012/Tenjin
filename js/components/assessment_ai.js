window.TenjinAssessmentView = {
    currentLevel: "",
    topicFocus: "",
    quizData: null,
    userAnswers: {},

    startAssessment: function(levelTitle, topic, container) {
        this.currentLevel = levelTitle;
        this.topicFocus = topic;
        this.quizData = null;
        this.userAnswers = {};
        
        this.renderLoading(container);
        this.generateQuiz(container);
    },

    generateQuiz: async function(container) {
        const prompt = `Generate a 5-question multiple choice Japanese test for: ${this.currentLevel} (Focus: ${this.topicFocus}).
        
        CRITICAL RULES:
        1. Output ONLY a valid JSON object. 
        2. NO conversational text, NO markdown formatting, NO greetings, NO roles.
        
        Use this EXACT format:
        {
          "questions": [
            {
              "question": "What is 'ka'?",
              "options": ["あ", "か", "さ", "た"],
              "correct_index": 1,
              "explanation": "か (ka) is the correct character."
            }
          ]
        }`;

        try {
            const api_key = localStorage.getItem('tenjin_api_key');
            const provider = localStorage.getItem('tenjin_cloud_provider') || 'Google';
            let chatModel = localStorage.getItem('tenjin_cloud_model') || 'gemini-1.5-flash';

            // --- THE TASK-BASED MODEL ROUTER ---
            // If the user is using a fast/lite model for chat, we forcefully upgrade 
            // to a 'Pro' model just for this JSON generation task to ensure structural integrity.
            let assessmentModel = chatModel;
            if (provider === 'Google' && chatModel.includes('flash')) {
                assessmentModel = 'gemini-1.5-pro'; // Upgrade to high-tier reasoning
            } else if (provider === 'Google' && chatModel.includes('lite')) {
                assessmentModel = 'gemini-1.5-pro'; 
            }

            console.log(`Routing assessment generation to higher-tier model: ${assessmentModel}`);

            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    api_key: api_key, 
                    provider: provider, 
                    cloud_model: assessmentModel, // Injecting the upgraded model here
                    messages: [{ role: "user", content: prompt }]
                })
            });

            const data = await response.json();
            
            // Catch quota limits or API crashes
            if (!response.ok) {
                throw new Error(data.error || `API Error (${response.status}): Failed to connect to cloud provider.`);
            }
            if (!data.reply) {
                throw new Error("API returned an empty response. You may have hit a quota limit.");
            }

            // Clean the string safely
            let rawString = data.reply.replace(/[\`]{3}json/gi, '').replace(/[\`]{3}/g, '').trim();
            const jsonMatch = rawString.match(/\{[\s\S]*\}/);
            
            if (!jsonMatch) {
                console.error("AI Output Dump:", data.reply);
                throw new Error("The AI failed to generate valid JSON data. Please retry.");
            }
            
            let cleanJsonString = jsonMatch[0];

            try {
                this.quizData = JSON.parse(cleanJsonString);
                
                if (!this.quizData.questions || this.quizData.questions.length === 0) {
                    throw new Error("JSON parsed, but questions array is missing.");
                }

                this.renderExamUI(container);
            } catch (parseError) {
                console.error("Failed String:", cleanJsonString);
                throw new Error("AI generated corrupted formatting. Please retry.");
            }

        } catch (error) {
            console.error("Quiz Error:", error);
            this.renderError(container, error.message);
        }
    },

    renderLoading: function(container) {
        container.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto; text-align: center; padding: 50px 20px;">
                <h2 style="color: var(--text-main); margin-bottom: 10px;">Generating ${this.currentLevel} Exam</h2>
                <p style="color: var(--text-muted); margin-bottom: 30px;">Tenjin is compiling tailored questions for ${this.topicFocus}...</p>
                <div style="display:inline-block; width:50px; height:50px; border:4px solid var(--border-color); border-top:4px solid var(--accent-color); border-radius:50%; animation: spin 1s linear infinite;"></div>
                <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
            </div>
        `;
    },

    renderError: function(container, errorMsg) {
        container.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto; text-align: center; padding: 50px 20px;">
                <div style="font-size: 3rem; margin-bottom: 15px;">⚠️</div>
                <h2 style="color: var(--accent-color); margin-bottom: 10px;">Generation Failed</h2>
                <p style="color: var(--text-muted); margin-bottom: 30px;">${errorMsg}</p>
                <button class="btn btn-primary" onclick="window.TenjinAssessmentView.startAssessment('${this.currentLevel}', '${this.topicFocus}', document.getElementById('dynamic-view'))">Retry Exam Generation</button>
            </div>
        `;
    },

    renderExamUI: function(container) {
        let questionsHtml = this.quizData.questions.map((q, qIndex) => {
            let optionsHtml = q.options.map((opt, oIndex) => `
                <label style="display: block; padding: 12px 15px; margin-bottom: 8px; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 8px; cursor: pointer; transition: all 0.2s;">
                    <input type="radio" name="question_${qIndex}" value="${oIndex}" onchange="window.TenjinAssessmentView.selectAnswer(${qIndex}, ${oIndex})" style="margin-right: 10px;" />
                    <span style="color: var(--text-main);">${opt}</span>
                </label>
            `).join('');

            return `
                <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 12px; padding: 25px; margin-bottom: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.02);">
                    <h4 style="margin-top: 0; margin-bottom: 15px; color: var(--text-main);"><span style="color: var(--text-muted); margin-right: 10px;">Q${qIndex + 1}.</span>${q.question}</h4>
                    <div class="options-container">${optionsHtml}</div>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto; padding-bottom: 40px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 30px;">
                    <div>
                        <h2 style="margin: 0 0 5px 0;">${this.currentLevel} Exam</h2>
                        <p style="margin: 0; color: var(--text-muted);">Topic: ${this.topicFocus}</p>
                    </div>
                </div>
                <form id="assessment-form">${questionsHtml}</form>
                <div style="text-align: right;">
                    <button class="btn btn-primary" style="padding: 12px 30px; font-size: 1.1rem; border-radius: 8px;" onclick="window.TenjinAssessmentView.submitExam(event)">Submit Answers</button>
                </div>
            </div>
        `;
    },

    selectAnswer: function(questionIndex, optionIndex) {
        this.userAnswers[questionIndex] = optionIndex;
    },

    submitExam: function(event) {
        if(event) event.preventDefault();
        
        if (Object.keys(this.userAnswers).length < this.quizData.questions.length) {
            alert("Please answer all questions before submitting.");
            return;
        }

        const container = document.getElementById('dynamic-view');
        let score = 0;

        let resultsHtml = this.quizData.questions.map((q, qIndex) => {
            const userAns = this.userAnswers[qIndex];
            const isCorrect = userAns === q.correct_index;
            if (isCorrect) score++;

            const statusColor = isCorrect ? 'var(--success-color, #2ed573)' : 'var(--danger-color, #e74c3c)';
            const statusIcon = isCorrect ? '✅' : '❌';

            let optionsHtml = q.options.map((opt, oIndex) => {
                let bgStyles = "background: var(--bg-primary); border: 1px solid var(--border-color); opacity: 0.6;";
                let icon = "";
                if (oIndex === q.correct_index) {
                    bgStyles = "background: rgba(46, 213, 115, 0.1); border: 1px solid #2ed573; font-weight: bold;";
                    icon = " ✓";
                } else if (oIndex === userAns && !isCorrect) {
                    bgStyles = "background: rgba(231, 76, 60, 0.1); border: 1px solid #e74c3c; color: #e74c3c;";
                    icon = " ✗";
                }
                return `<div style="padding: 12px 15px; margin-bottom: 8px; border-radius: 8px; ${bgStyles}">${opt}${icon}</div>`;
            }).join('');

            return `
                <div style="background: var(--bg-card); border: 1px solid ${statusColor}; border-radius: 12px; padding: 25px; margin-bottom: 25px;">
                    <h4 style="margin-top: 0; margin-bottom: 15px; color: var(--text-main);">${statusIcon} <span style="color: var(--text-muted); margin-right: 10px;">Q${qIndex + 1}.</span>${q.question}</h4>
                    <div class="options-container" style="margin-bottom: 15px;">${optionsHtml}</div>
                    <div style="background: var(--bg-primary); padding: 15px; border-radius: 8px; border-left: 4px solid var(--accent-color);">
                        <p style="margin: 0; font-size: 0.9rem; color: var(--text-main);"><strong>Tenjin's Feedback:</strong> ${q.explanation}</p>
                    </div>
                </div>
            `;
        }).join('');

        const passRate = (score / this.quizData.questions.length) * 100;
        
        const scoreRecord = {
            level: this.currentLevel,
            topic: this.topicFocus,
            score: score,
            total: this.quizData.questions.length,
            percentage: passRate,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };

        let history = JSON.parse(localStorage.getItem('tenjin_score_history')) || [];
        history.unshift(scoreRecord);
        localStorage.setItem('tenjin_score_history', JSON.stringify(history));

        let passMessage = passRate >= 80 ? "Subarashii! (Excellent!) 🎉" : "Ganbatte! (Keep practicing!) 💪";

        container.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto; padding-bottom: 40px;">
                <div style="text-align: center; background: var(--bg-card); padding: 40px; border-radius: 12px; border: 1px solid var(--border-color); margin-bottom: 30px;">
                    <h1 style="font-size: 3.5rem; margin: 0; color: var(--accent-color);">${score}/${this.quizData.questions.length}</h1>
                    <h2 style="margin: 10px 0 0 0;">${passMessage}</h2>
                </div>
                ${resultsHtml}
                <div style="text-align: center; margin-top: 30px;">
                    <button class="btn btn-primary" style="padding: 12px 30px; font-size: 1.1rem; border-radius: 8px;" onclick="window.navigateTo('profile')">View Profile</button>
                </div>
            </div>
        `;
    }
};