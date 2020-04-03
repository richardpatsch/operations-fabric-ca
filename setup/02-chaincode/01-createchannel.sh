#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
source $DIR/_variables.sh

#creat channel on peer1.org1
docker exec -e $evPeerAddressP1O1 -e $evLocalMspidOrg1 -e $evMspConfigPathOrg1Admin cli peer channel create -c $CHANNEL_NAME -f /opt/gopath/src/github.com/hyperledger/fabric/peer/channel-artifacts/channel1.tx -o $ORDERER_ADDRESS --outputBlock $ChannelBlockPath --tls --cafile $CaFilePeer1Org1
