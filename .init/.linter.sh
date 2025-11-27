#!/bin/bash
cd /home/kavia/workspace/code-generation/notification-banner-3295-3304/notification_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

