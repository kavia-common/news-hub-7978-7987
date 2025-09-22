#!/bin/bash
cd /home/kavia/workspace/code-generation/news-hub-7978-7987/news_aggregator_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

