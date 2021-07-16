
#!/bin/bash
docker-compose -f docker-compose.test.web-client.yaml -f docker-compose.test.web-client.watch.yaml build \
&& docker-compose -f docker-compose.test.web-client.yaml -f docker-compose.test.web-client.watch.yaml run --rm test-web-client