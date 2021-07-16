#!/bin/bash
docker-compose -f docker-compose.test.api.yaml -f docker-compose.test.api.watch.yaml build \
&& docker-compose -f docker-compose.test.api.yaml -f docker-compose.test.api.watch.yaml run --rm test-api