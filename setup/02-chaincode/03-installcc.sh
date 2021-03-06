#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
source $DIR/_variables.sh

#install on every peer
docker exec -e $evPeerAddressP1O1 -e $evLocalMspidOrg1 -e $evMspConfigPathOrg1Admin cli peer chaincode install -n $CC_NAME -v $CC_VERSION -p $CC_PATH -l $CC_LANGUAGE
docker exec -e $evPeerAddressP2O1 -e $evLocalMspidOrg1 -e $evMspConfigPathOrg1Admin cli peer chaincode install -n $CC_NAME -v $CC_VERSION -p $CC_PATH -l $CC_LANGUAGE
docker exec -e $evPeerAddressP1O2 -e $evLocalMspidOrg2 -e $evMspConfigPathOrg2Admin cli peer chaincode install -n $CC_NAME -v $CC_VERSION -p $CC_PATH -l $CC_LANGUAGE
docker exec -e $evPeerAddressP2O2 -e $evLocalMspidOrg2 -e $evMspConfigPathOrg2Admin cli peer chaincode install -n $CC_NAME -v $CC_VERSION -p $CC_PATH -l $CC_LANGUAGE
