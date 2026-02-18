#!/bin/bash
while true; do
  if [[ -n $(git status -s) ]]; then
    echo "Changements détectés, envoi en cours..."
    git add .
    git commit -m "Auto-commit : $(date)"
    git push
  fi
  sleep 60 
done
