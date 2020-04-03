#!/bin/bash
scriptPath=$PWD/setup/01-crypto

sh $scriptPath/01-enrollCAadmin.sh
sleep 5
sh $scriptPath/02-orgOrd.sh
sleep 5
sh $scriptPath/03-org1.sh
sleep 5
sh $scriptPath/04-org2.sh
sleep 5
sh $scriptPath/05-generateCerts-org1.sh
sleep 5
sh $scriptPath/06-generateCerts-org2.sh
sleep 5
sh $scriptPath/07-generateCerts-ord.sh
sleep 5
sh $scriptPath/08-generateMSP.sh
sleep 5
sh $scriptPath/09-generateChannel.sh

docker-compose -f docker-compose-peer.yaml up -d
docker-compose -f docker-compose-peer-ord.yaml up -d
docker-compose -f docker-compose-cli.yaml up -d
