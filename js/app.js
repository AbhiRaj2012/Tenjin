const AppState = {
    currentTab: 'dashboard',
    theme: 'light' // Engine state tracking completely removed
};

document.addEventListener('DOMContentLoaded', () => {
    initShellControls();
    loadActiveView();
});

// Global Navigation Helper
window.navigateTo = function(targetTab) {
    AppState.currentTab = targetTab;
    
    // Reset Learn View to Overview if returning to the learn tab
    if (targetTab === 'learn' && window.TenjinLearnView) {
        window.TenjinLearnView.activeLevel = null; 
    }

    // Update sidebar UI active states
    document.querySelectorAll('.nav-menu .nav-item').forEach(i => {
        i.classList.remove('active');
        if(i.getAttribute('data-tab') === targetTab || 
          (targetTab.startsWith('level') && i.getAttribute('data-tab') === 'learn')) {
            i.classList.add('active');
        }
    });

    loadActiveView();
};

function initShellControls() {
    // Dark/Light Theme Switching Engine
    const themeToggle = document.getElementById('theme-toggle');
    const themeStatus = document.getElementById('theme-status');
    
    if (themeToggle && themeStatus) {
        themeToggle.addEventListener('change', (e) => {
            AppState.theme = e.target.checked ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', AppState.theme);
            themeStatus.innerText = AppState.theme === 'dark' ? 'Dark' : 'Light';
        });
    }

    // Sidebar Tab Selection System
    document.querySelectorAll('.nav-menu .nav-item').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTab = btn.getAttribute('data-tab');
            window.navigateTo(targetTab);
        });
    });

    // Floating Chat Circle Router Hook (from index.html)
    const floatingTrigger = document.getElementById('floating-chat-trigger');
    if (floatingTrigger) {
        floatingTrigger.addEventListener('click', () => {
            window.navigateTo('chat');
        });
    }
}

function loadActiveView() {
    const viewContainer = document.getElementById('dynamic-view');
    const greeting = document.getElementById('header-greeting');
    const subtitle = document.getElementById('header-subtitle');
    
    viewContainer.innerHTML = '';

    switch (AppState.currentTab) {
        case 'dashboard':
            greeting.innerText = "Konnichiwa, Learner! 👋";
            subtitle.innerText = "Track your progress and continue your journey.";
            if (window.TenjinDashboardView) window.TenjinDashboardView.render(viewContainer);
            break;
            
        case 'learn':
            greeting.innerText = "Curriculum Modules 📚";
            subtitle.innerText = "Step-by-step Japanese mastery.";
            if (window.TenjinLearnView) window.TenjinLearnView.render(viewContainer);
            break;

        case 'level1':
            greeting.innerText = "Level 1: Alphabets 🎌";
            subtitle.innerText = "Master Hiragana, Katakana, and basic Kanji.";
            if (window.TenjinLevel1View) window.TenjinLevel1View.render(viewContainer);
            break;

        case 'level2':
            greeting.innerText = "Level 2: Vocabulary 📖";
            subtitle.innerText = "Expand your everyday dictionary.";
            if (window.TenjinLevel2View) window.TenjinLevel2View.render(viewContainer);
            break;

        case 'level3':
            greeting.innerText = "Level 3: Grammar 🧩";
            subtitle.innerText = "Learn sentence structure and particles.";
            if (window.TenjinLevel3View) window.TenjinLevel3View.render(viewContainer);
            break;

        case 'level4':
            greeting.innerText = "Level 4: Sentences 🗣️";
            subtitle.innerText = "Practice common phrases and translations.";
            if (window.TenjinLevel4View) window.TenjinLevel4View.render(viewContainer);
            break;
            
        case 'chat':
            greeting.innerText = "Tenjin Interactive Chat 💬";
            subtitle.innerText = "Practice conversational fluency and ask questions in real-time.";
            if (window.TenjinChatView) window.TenjinChatView.render(viewContainer);
            break;
            
        case 'settings':
            greeting.innerText = "System Configuration ⚙️";
            subtitle.innerText = "Connect to cloud intelligence and configure edge audio components.";
            if (window.TenjinSettingsView) window.TenjinSettingsView.render(viewContainer);
            break;


            case 'profile':
            greeting.innerText = "Your Profile 📊";
            subtitle.innerText = "View and manage your personal information and preferences.";
            if (window.TenjinProfileView) window.TenjinProfileView.render(viewContainer);
            break;
            
        default:
            greeting.innerText = "Module Under Construction 🚧";
            subtitle.innerText = "Check back later.";
            viewContainer.innerHTML = `<div style="text-align: center; padding: 50px;">View Not Found</div>`;
            break;
    }
}