#!/bin/sh
echo "PORT=$PORT"
git fetch origin && git reset --hard origin/main && git clean -f -d
GATEWAY_PORT=$PORT docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up --build -d