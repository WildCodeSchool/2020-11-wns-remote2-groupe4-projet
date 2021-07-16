#!/bin/sh
echo "WEB_CLIENT_PORT=$WEB_CLIENT_PORT"
echo "API_PORT=$API_PORT"
WEB_CLIENT_PORT=$WEB_CLIENT_PORT API_PORT=$API_PORT docker-compose -f docker-compose.yaml -f docker-compose.dev.yaml up --build