@echo off
title Tenjin AI Launcher
color 0B
echo ===================================================
echo             Starting Tenjin AI Platform
echo ===================================================
echo.

:: 1. Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed or not in your PATH.
    echo Please install Python from https://www.python.org/
    pause
    exit /b
)

:: 2. Ensure dependencies are installed (quietly)
echo [*] Checking dependencies...
pip install -q flask flask-cors requests edge-tts asyncio

:: 3. Start the Python Backend in a separate background window
echo [*] Starting Python Server...
start "Tenjin Backend Server" /MIN python server.py

:: 4. Wait a moment for the server to spin up
timeout /t 3 /nobreak >nul

:: 5. Open the Frontend in the default browser
echo [*] Launching Application in Browser...
start "" "index.html"

echo.
echo ===================================================
echo   Tenjin is running! You can close this window.
echo ===================================================
timeout /t 3 >nul
exit