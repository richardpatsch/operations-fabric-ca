#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
source $DIR/_variables.sh

#invoke on peer1.org1
docker exec -e $evPeerAddressP1O1 -e $evLocalMspidOrg1 -e $evMspConfigPathOrg1Admin cli peer chaincode invoke -o $ORDERER_ADDRESS -C $CHANNEL_NAME -n $CC_NAME -c '{"Args":["initMarble","marble1","blue","35","tom"]}' --tls --cafile $CaFilePeer1Org1
