#!/bin/bash
echo "==================================================="
echo "            Starting Tenjin AI Platform"
echo "==================================================="
echo ""

# 1. Check if Python3 is installed
if ! command -v python3 &> /dev/null; then
    echo "[ERROR] Python3 is not installed."
    exit 1
fi

# 2. Ensure dependencies are installed
echo "[*] Checking dependencies..."
pip3 install -q flask flask-cors requests edge-tts asyncio

# 3. Kill any existing backend process on port 5000 to prevent port-in-use errors
echo "[*] Clearing ports..."
lsof -ti:5000 | xargs kill -9 2>/dev/null

# 4. Start the Python Backend in the background
echo "[*] Starting Python Server..."
python3 server.py &
SERVER_PID=$!

# 5. Wait a moment for the server to spin up
sleep 2

# 6. Open the Frontend in the default browser
echo "[*] Launching Application in Browser..."
if which xdg-open > /dev/null; then
  xdg-open index.html
elif which gnome-open > /dev/null; then
  gnome-open index.html
elif which open > /dev/null; then
  open index.html
else
  echo "Could not detect the web browser to open. Please open index.html manually."
fi

echo ""
echo "==================================================="
echo "  Tenjin is running! You can close this terminal."
echo "==================================================="