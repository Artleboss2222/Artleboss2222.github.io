#!/bin/bash
while true; do
  # Vérifie s'il y a des changements
  if [[ -n $(git status -s) ]]; then
    echo "Changements détectés, envoi en cours..."
    git add .
    git commit -m "Auto-commit : $(date)"
    git push
  fi
  sleep 60 # Attend 60 secondes avant la prochaine vérification
done
