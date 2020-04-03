#!/bin/bash
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
source $DIR/_variables.sh

#join every peer to the channel
docker exec -e $evPeerAddressP1O1 -e $evLocalMspidOrg1 -e $evMspConfigPathOrg1Admin cli peer channel join -b $ChannelBlockPath
docker exec -e $evPeerAddressP2O1 -e $evLocalMspidOrg1 -e $evMspConfigPathOrg1Admin cli peer channel join -b $ChannelBlockPath
docker exec -e $evPeerAddressP1O2 -e $evLocalMspidOrg2 -e $evMspConfigPathOrg2Admin cli peer channel join -b $ChannelBlockPath
docker exec -e $evPeerAddressP2O2 -e $evLocalMspidOrg2 -e $evMspConfigPathOrg2Admin cli peer channel join -b $ChannelBlockPath
