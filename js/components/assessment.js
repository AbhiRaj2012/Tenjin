// js/components/assessment.js
window.TenjinAssessmentView = {
    quizData: null,
    userAnswers: {},
    isFullQuiz: false,
    quizTitle: "",

    // Generates a quiz specific to ONE level (10 random questions)
    gen_assessment: function(levelKey, container) {
        try {
            if (!window.TenjinQuizBank) throw new Error("Quiz Bank data file is missing.");
            if (!window.TenjinQuizBank[levelKey]) throw new Error(`Level data for ${levelKey} not found.`);

            this.isFullQuiz = false;
            this.userAnswers = {};
            this.quizTitle = `${levelKey.toUpperCase()} Assessment`;

            // Pull the pool of 40 questions and shuffle them
            let pool = [...window.TenjinQuizBank[levelKey]];
            let shuffled = pool.sort(() => 0.5 - Math.random());

            // Select 10 questions for the test
            this.quizData = { questions: shuffled.slice(0, 10) };
            
            this.renderExamUI(container);
        } catch (error) {
            console.error(error);
            this.renderError(container, error.message);
        }
    },

    // Generates a comprehensive quiz pulling from ALL 4 levels (20 questions total)
    full_quiz: function(container) {
        try {
            if (!window.TenjinQuizBank) throw new Error("Quiz Bank data file is missing.");

            this.isFullQuiz = true;
            this.userAnswers = {};
            this.quizTitle = "Ultimate Mastery Quiz (Levels 1-4)";
            let combinedQuestions = [];

            // Pull 5 random questions from each of the 4 levels
            const levels = ['level1', 'level2', 'level3', 'level4'];
            levels.forEach(level => {
                let pool = [...window.TenjinQuizBank[level]];
                let shuffled = pool.sort(() => 0.5 - Math.random());
                combinedQuestions = combinedQuestions.concat(shuffled.slice(0, 5));
            });

            this.quizData = { questions: combinedQuestions };
            this.renderExamUI(container);
        } catch (error) {
            console.error(error);
            this.renderError(container, error.message);
        }
    },

    renderError: function(container, errorMsg) {
        container.innerHTML = `
            <div style="max-width: 800px; margin: 0 auto; text-align: center; padding: 50px 20px;">
                <div style="font-size: 3rem; margin-bottom: 15px;">⚠️</div>
                <h2 style="color: var(--accent-color); margin-bottom: 10px;">Failed to Load Exam</h2>
                <p style="color: var(--text-muted); margin-bottom: 30px;">${errorMsg}</p>
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
                        <h2 style="margin: 0 0 5px 0;">${this.quizTitle}</h2>
                        <p style="margin: 0; color: var(--text-muted);">Please answer all ${this.quizData.questions.length} questions.</p>
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
        
        // Save to Profile Statistics
        const scoreRecord = {
            level: this.isFullQuiz ? "Full Mastery Exam" : this.quizTitle,
            topic: this.isFullQuiz ? "All Levels" : "Level Review",
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
                    <button class="btn btn-primary" style="padding: 12px 30px; font-size: 1.1rem; border-radius: 8px;" onclick="window.navigateTo('profile')">View Profile Dashboard</button>
                </div>
            </div>
        `;
    }
};