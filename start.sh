sh ./setup/01-enrollCAadmin.sh
sleep 5
sh ./setup/02-orgOrd.sh
sleep 5
sh ./setup/03-org1.sh
sleep 5
sh ./setup/04-org2.sh
sleep 5
sh ./setup/05-generateCerts-org1.sh
sleep 5
sh ./setup/06-generateCerts-org2.sh
sleep 5
sh ./setup/07-generateCerts-ord.sh
sleep 5
sh ./setup/08-generateMSP.sh
sleep 5
sh ./setup/09-generateChannel.sh

docker-compose -f docker-compose-peer.yaml up -d
docker-compose -f docker-compose-peer-ord.yaml up -d
docker-compose -f docker-compose-cli.yaml up -d
