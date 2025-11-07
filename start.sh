#!/bin/bash

echo "=========================================="
echo "  Lancement du backend et du frontend..."
echo "=========================================="

# Démarrage du backend
echo "[1/2] Démarrage de l'API Express (backend)..."
cd backend
npm start &
BACK_PID=$!

# Démarrage du frontend
echo "[2/2] Démarrage de l'application React (frontend)..."
cd ../frontend
npm start &
FRONT_PID=$!

# Définir le comportement à la fermeture (Ctrl+C)
trap "echo; echo '🛑 Arrêt des serveurs...'; kill $BACK_PID $FRONT_PID; exit 0" SIGINT SIGTERM

# Message de confirmation
echo
echo "✅ Les deux serveurs sont en cours d'exécution !"
echo "   - Backend : http://localhost:5000"
echo "   - Frontend : http://localhost:3000"
echo
echo "Appuyez sur Ctrl+C pour arrêter les serveurs."
echo

# Attendre que les processus se terminent
wait $BACK_PID $FRONT_PID
