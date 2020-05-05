#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
source $DIR/_variables.sh

#invoke on peer1.org1
docker exec -e $evPeerAddressP1O1 -e $evLocalMspidOrg1 -e $evMspConfigPathOrg1Admin cli peer chaincode invoke -o $ORDERER_ADDRESS -C $CHANNEL_NAME -n $CC_NAME -c '{"Args":["createFood","{\"quantity\": \"10\", \"name\": \"spinach\", \"best_before\":\"2020-05-20\"}"]}' --tls --cafile $CaFilePeer1Org1
docker exec -e $evPeerAddressP2O1 -e $evLocalMspidOrg1 -e $evMspConfigPathOrg1Admin cli peer chaincode invoke -o $ORDERER_ADDRESS -C $CHANNEL_NAME -n $CC_NAME -c '{"Args":["createFood","{\"quantity\": \"5\", \"name\": \"eggs\", \"best_before\":\"2020-05-07\"}"]}' --tls --cafile $CaFilePeer1Org1
docker exec -e $evPeerAddressP1O2 -e $evLocalMspidOrg2 -e $evMspConfigPathOrg2Admin cli peer chaincode invoke -o $ORDERER_ADDRESS -C $CHANNEL_NAME -n $CC_NAME -c '{"Args":["createFood","{\"quantity\": \"12\", \"name\": \"water\", \"best_before\":\"2020-05-24\"}"]}' --tls --cafile $CaFilePeer1Org1
docker exec -e $evPeerAddressP2O2 -e $evLocalMspidOrg2 -e $evMspConfigPathOrg2Admin cli peer chaincode invoke -o $ORDERER_ADDRESS -C $CHANNEL_NAME -n $CC_NAME -c '{"Args":["createFood","{\"quantity\": \"2\", \"name\": \"wine\", \"best_before\":\"2020-06-20\"}"]}' --tls --cafile $CaFilePeer1Org1
