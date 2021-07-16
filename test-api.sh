#!/bin/bash
docker-compose -f docker-compose.test.api.yaml build && docker-compose -f docker-compose.test.api.yaml run --rm test-api