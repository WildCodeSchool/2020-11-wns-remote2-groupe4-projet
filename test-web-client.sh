#!/bin/bash
docker-compose -f docker-compose.test.web-client.yaml build && docker-compose -f docker-compose.test.web-client.yaml run --rm test-web-client