#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
source $DIR/_variables.sh

#query from every peer
docker exec -e $evPeerAddressP1O1 -e $evLocalMspidOrg1 -e $evMspConfigPathOrg1Admin cli peer chaincode query -C $CHANNEL_NAME -n $CC_NAME -c '{"Args":["readMarble","marble1"]}'
docker exec -e $evPeerAddressP2O1 -e $evLocalMspidOrg1 -e $evMspConfigPathOrg1Admin cli peer chaincode query -C $CHANNEL_NAME -n $CC_NAME -c '{"Args":["readMarble","marble1"]}'
docker exec -e $evPeerAddressP1O2 -e $evLocalMspidOrg2 -e $evMspConfigPathOrg2Admin cli peer chaincode query -C $CHANNEL_NAME -n $CC_NAME -c '{"Args":["readMarble","marble1"]}'
docker exec -e $evPeerAddressP2O2 -e $evLocalMspidOrg2 -e $evMspConfigPathOrg2Admin cli peer chaincode query -C $CHANNEL_NAME -n $CC_NAME -c '{"Args":["readMarble","marble1"]}'
