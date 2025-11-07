@echo off
title Lancement du projet API + React
echo ==========================================
echo      Démarrage du backend et frontend
echo ==========================================

:: Ouvre un nouvel onglet pour le backend
echo [1/2] Lancement du serveur API (backend)...
start "Backend" cmd /k "cd backend && npm start"

:: Ouvre un deuxième onglet pour le frontend
echo [2/2] Lancement de l'application React (frontend)...
start "Frontend" cmd /k "cd frontend && npm start"

echo.
echo ✅ Les deux serveurs sont en cours d’exécution !
echo    - Backend : http://localhost:5000
echo    - Frontend : http://localhost:3000
echo.
pause
