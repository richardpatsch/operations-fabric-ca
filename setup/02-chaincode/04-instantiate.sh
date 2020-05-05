#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
source $DIR/_variables.sh

#instantiate on peer1.org1
docker exec -e $evPeerAddressP1O1 -e $evLocalMspidOrg1 -e $evMspConfigPathOrg1Admin cli peer chaincode instantiate -o $ORDERER_ADDRESS -C $CHANNEL_NAME -n $CC_NAME -v $CC_VERSION -c '{"Args":["init","a","100","b","200"]}' --tls --cafile $CaFilePeer1Org1
#docker exec -e $evPeerAddressP1O1 -e $evLocalMspidOrg1 -e $evMspConfigPathOrg1Admin cli peer chaincode upgrade -o $ORDERER_ADDRESS -C $CHANNEL_NAME -n $CC_NAME -v $CC_VERSION -c '{"Args":["init","a","100","b","200"]}' --tls --cafile $CaFilePeer1Org1
