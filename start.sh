#!/bin/bash
scriptPath=$PWD/setup/01-crypto

#setup MSPs/artifacts<
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

#tactical sleep
temp_cnt=20
while [[ ${temp_cnt} -gt 0 ]]; do
    printf "\rPlease wait %2d second(s) to make sure that all containers are running properly; Hit Ctrl+C to cancel that operation!" ${temp_cnt}
    sleep 1
    ((temp_cnt--))
done

#update scriptPath
scriptPath=$PWD/setup/02-chaincode

#install chaincode
sh $scriptPath/01-createchannel.sh
sh $scriptPath/02-joinchannel.sh
sh $scriptPath/03-installcc.sh
sh $scriptPath/04-instantiate.sh
sh $scriptPath/05-invoke.sh
sh $scriptPath/06-querycc.sh
