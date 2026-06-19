from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import requests
import asyncio
import edge_tts
import tempfile
import sys
import os

# Serve static files from the current directory to fix Microphone 'file://' CORS blocks
app = Flask(__name__, static_folder='.', static_url_path='')
import logging
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)
CORS(app)

# Serve the frontend UI
@app.route('/')
def serve_index():
    return send_file('index.html')


# --- CLOUD CHAT & VISION ROUTER ---
@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    messages = data.get('messages', [])
    api_key = data.get('api_key')
    provider = data.get('provider', 'Google')
    target_model = data.get('cloud_model', 'gemini-1.5-flash') # Defaulting to a Vision-capable model
    
    if not api_key:
        return jsonify({"error": "Cloud API Key missing. Please provide it in Settings."}), 400

    try:
        if provider == 'Google':
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{target_model}:generateContent?key={api_key}"
            
            contents = []
            system_text = ""
            
            for msg in messages:
                if msg['role'] == 'system':
                    system_text = msg['content']
                else:
                    role = "model" if msg['role'] == 'assistant' else "user"
                    part = {"text": msg['content']}
                    
                    # Handle Image Payloads (Vision)
                    if 'image' in msg and msg['image']:
                        mime_type = "image/png"
                        if str(msg['image']).startswith("data:image/jpeg"): mime_type = "image/jpeg"
                        
                        base64_data = msg['image'].split(',')[1]
                        contents.append({"role": role, "parts": [{"inlineData": {"mimeType": mime_type, "data": base64_data}}, part]})
                    else:
                        contents.append({"role": role, "parts": [part]})
            
            payload = {"contents": contents, "generationConfig": {"temperature": 0.4}}
            if system_text: payload["system_instruction"] = {"parts": [{"text": system_text}]}
            
            # INCREASED TIMEOUT TO 60 SECONDS FOR IMAGE PROCESSING
            res = requests.post(url, json=payload, timeout=120)
            res_json = res.json()
            
            if res.status_code != 200:
                return jsonify({"error": res_json.get('error', {}).get('message', 'Google API rejection.')}), res.status_code
            return jsonify({"reply": res_json['candidates'][0]['content']['parts'][0]['text']})

        elif provider == 'OpenAI':
            url = "https://api.openai.com/v1/chat/completions"
            headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
            payload = {"model": target_model, "messages": [{"role": m["role"], "content": m["content"]} for m in messages if 'image' not in m], "temperature": 0.4}
            
            res = requests.post(url, headers=headers, json=payload, timeout=120)
            res_json = res.json()
            if res.status_code != 200:
                return jsonify({"error": res_json.get('error', {}).get('message', 'Cloud API rejection.')}), res.status_code
            return jsonify({"reply": res_json['choices'][0]['message']['content']})

    except Exception as e:
        return jsonify({"error": f"Cloud Communication crash: {str(e)}"}), 500
    

    data = request.json
    messages = data.get('messages', [])
    api_key = data.get('api_key')
    provider = data.get('provider', 'Google')
    target_model = data.get('cloud_model', 'gemma-4-31b-it')
    
    if not api_key:
        return jsonify({"error": "Cloud API Key missing. Please provide it in Settings."}), 400

    try:
        if provider == 'Google':
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{target_model}:generateContent?key={api_key}"
            
            contents = []
            system_text = ""
            
            for msg in messages:
                if msg['role'] == 'system':
                    system_text = msg['content']
                else:
                    role = "model" if msg['role'] == 'assistant' else "user"
                    part = {"text": msg['content']}
                    
                    # Handle Image Payloads (Vision)
                    if 'image' in msg and msg['image']:
                        mime_type = "image/png"
                        if str(msg['image']).startswith("data:image/jpeg"): mime_type = "image/jpeg"
                        
                        base64_data = msg['image'].split(',')[1]
                        contents.append({"role": role, "parts": [{"inlineData": {"mimeType": mime_type, "data": base64_data}}, part]})
                    else:
                        contents.append({"role": role, "parts": [part]})
            
            payload = {"contents": contents, "generationConfig": {"temperature": 0.4}}
            if system_text: payload["system_instruction"] = {"parts": [{"text": system_text}]}
            
            res = requests.post(url, json=payload, timeout=20)
            res_json = res.json()
            
            if res.status_code != 200:
                return jsonify({"error": res_json.get('error', {}).get('message', 'Google API rejection.')}), res.status_code
            return jsonify({"reply": res_json['candidates'][0]['content']['parts'][0]['text']})

        elif provider == 'OpenAI':
            url = "https://api.openai.com/v1/chat/completions"
            headers = {"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"}
            payload = {"model": target_model, "messages": [{"role": m["role"], "content": m["content"]} for m in messages], "temperature": 0.4}
            
            res = requests.post(url, headers=headers, json=payload, timeout=20)
            res_json = res.json()
            if res.status_code != 200:
                return jsonify({"error": res_json.get('error', {}).get('message', 'Cloud API rejection.')}), res.status_code
            return jsonify({"reply": res_json['choices'][0]['message']['content']})

    except Exception as e:
        return jsonify({"error": f"Cloud Communication crash: {str(e)}"}), 500

# --- EDGE-TTS SERVER ---
async def generate_tts(text, output_path):
    communicate = edge_tts.Communicate(text, "ja-JP-NanamiNeural")
    await communicate.save(output_path)

@app.route('/api/tts', methods=['POST'])
def tts():
    text = request.json.get("text", "")
    if not text: return {"error": "Empty text block"}, 400
    temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3")
    temp_path = temp_file.name
    temp_file.close()
    asyncio.run(generate_tts(text, temp_path))
    return send_file(temp_path, mimetype="audio/mpeg")

if __name__ == '__main__':
    print(f"✅ Tenjin running! Open your browser to: http://localhost:5000")
    app.run(port=5000, host='127.0.0.1')