window.TenjinSettingsView = {
    render: function(container) {
        const savedKey = localStorage.getItem('tenjin_api_key') || '';
        const savedProvider = localStorage.getItem('tenjin_cloud_provider') || 'Google';
        const savedCloudModel = localStorage.getItem('tenjin_cloud_model') || 'gemma-4-31b-it';

        container.innerHTML = `
            <div class="settings-container" style="max-width: 800px; margin: 0 auto; padding: 20px;">
                <h2>Platform Configuration</h2>
                <p style="color: var(--text-muted); margin-bottom: 25px;">Connect Tenjin to your preferred cloud infrastructure. Audio synthesis (TTS) and speech recognition (STT) run locally to minimize latency.</p>

                <div class="settings-section" style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 20px; border-radius: 12px; margin-bottom: 25px;">
                    <h3 style="margin-top:0;">☁️ Cloud Intelligence Core</h3>
                    <div class="form-group" style="margin-bottom: 15px;">
                        <label style="display:block; margin-bottom:5px; font-weight:600;">Cloud Provider</label>
                        <select id="cloud-provider-select" class="form-control" style="width:100%; padding:10px; border-radius:6px; background:var(--bg-primary); color:var(--text-main); border:1px solid var(--border-color);">
                            <option value="Google" ${savedProvider === 'Google' ? 'selected' : ''}>Google AI Studio (Gemini/Gemma Native)</option>
                            <option value="OpenAI" ${savedProvider === 'OpenAI' ? 'selected' : ''}>OpenAI / Groq Ecosystem</option>
                        </select>
                    </div>
                    <div class="form-group" style="margin-bottom: 15px;">
                        <label style="display:block; margin-bottom:5px; font-weight:600;">Secure Access Key</label>
                        <input type="password" id="cloud-api-key" class="form-control" style="width:100%; padding:10px; border-radius:6px; border:1px solid var(--border-color); background:var(--bg-primary); color:var(--text-main);" placeholder="Paste API token here..." value="${savedKey}">
                    </div>
                    <div class="form-group" style="margin-bottom: 20px;">
                        <label style="display:block; margin-bottom:5px; font-weight:600;">Target Cloud Model Profile</label>
                        <input type="text" id="cloud-model-input" class="form-control" style="width:100%; padding:10px; border-radius:6px; border:1px solid var(--border-color); background:var(--bg-primary); color:var(--text-main);" placeholder="e.g., gemma-4-31b-it" value="${savedCloudModel}">
                    </div>
                    <button class="btn btn-primary" onclick="window.TenjinSettingsView.saveCloudSettings()">Apply Token Infrastructure</button>
                    <span id="save-confirmation" style="color: var(--success-color); font-weight: bold; margin-left: 15px; display: none;">✓ Credentials Cached</span>
                </div>

                <div class="settings-section" style="background: var(--bg-card); border: 1px solid var(--border-color); padding: 20px; border-radius: 12px;">
                    <h3 style="margin-top:0;">🎙️ Native Audio Subsystems</h3>
                    <p style="font-size:0.88rem; color:var(--text-muted); margin-bottom: 15px;">
                        To guarantee zero-latency voice interaction, Tenjin processes speech locally bypassing cloud constraints.
                    </p>
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dashed var(--border-color); padding-bottom: 10px; margin-bottom: 10px;">
                        <div>
                            <span style="font-weight: 600;">Web Speech STT</span>
                            <div style="font-size: 0.8rem; color: var(--text-muted);">Browser-native microphone input processing.</div>
                        </div>
                        <span style="color: var(--success-color); font-weight: bold; font-size: 0.85rem;">Active ✓</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <span style="font-weight: 600;">Edge-TTS (Nanami)</span>
                            <div style="font-size: 0.8rem; color: var(--text-muted);">Python-native Japanese voice synthesis.</div>
                        </div>
                        <span style="color: var(--success-color); font-weight: bold; font-size: 0.85rem;">Active ✓</span>
                    </div>
                </div>
            </div>
        `;
    },

    saveCloudSettings: function() {
        localStorage.setItem('tenjin_api_key', document.getElementById('cloud-api-key').value.trim());
        localStorage.setItem('tenjin_cloud_provider', document.getElementById('cloud-provider-select').value);
        localStorage.setItem('tenjin_cloud_model', document.getElementById('cloud-model-input').value.trim());
        const feedback = document.getElementById('save-confirmation');
        feedback.style.display = 'inline-block';
        setTimeout(() => feedback.style.display = 'none', 2500);
    }
};