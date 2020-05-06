#!/bin/bash

#function for waiting loop with feedback in console
#arg1: time in seconds
#arg2: text to display while waiting
sleepf() {
    timeinseconds=$1
    displaytext=$2

    while [[ ${timeinseconds} -gt 0 ]]; do
        printf "\rPlease wait %2d second(s) %s; Hit Ctrl+C to cancel that operation!" ${timeinseconds} "${displaytext}"
        sleep 1
        ((timeinseconds--))
    done
}

scriptPath=$PWD/setup/01-crypto

#setup MSPs/artifacts
sh $scriptPath/01-enrollCAadmin.sh
sleepf 3 "cause reasons"
sh $scriptPath/02-orgOrd.sh
sleepf 3 "cause reasons"
sh $scriptPath/03-org1.sh
sleepf 3 "cause reasons"
sh $scriptPath/04-org2.sh
sleepf 3 "cause reasons"
sh $scriptPath/05-generateCerts-org1.sh
sleepf 3 "cause reasons"
sh $scriptPath/06-generateCerts-org2.sh
sleepf 3 "cause reasons"
sh $scriptPath/07-generateCerts-ord.sh
sleepf 3 "cause reasons"
sh $scriptPath/08-generateMSP.sh
sleepf 3 "cause reasons"
sh $scriptPath/09-generateChannel.sh

docker-compose -f docker-compose-peer-ord.yaml up -d
docker-compose -f docker-compose-peer.yaml up -d
docker-compose -f docker-compose-cli.yaml up -d

#tactical sleep
sleepf 20 "to make sure all containers are running"

#update scriptPath
scriptPath=$PWD/setup/02-chaincode

#install chaincode
sh $scriptPath/01-createchannel.sh
sh $scriptPath/02-joinchannel.sh
sh $scriptPath/03-installcc.sh
sh $scriptPath/04-instantiate.sh

sleepf 10 "to wait for proper instantiation"

sh $scriptPath/05-invoke.sh

sleepf 3 "wait for state sync"

sh $scriptPath/06-querycc.sh

sleepf 3 "wait cause reasons"

docker-compose -f docker-compose-web.yaml up -d
