docker-compose -f docker-compose-catls.yaml down
docker-compose -f docker-compose-cli.yaml down
docker-compose -f docker-compose-peer-ord.yaml down
docker-compose -f docker-compose-peer.yaml down
docker-compose down

rm -r channel-artifacts
rm -r crypto
