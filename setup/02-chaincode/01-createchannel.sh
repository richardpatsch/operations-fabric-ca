#!/bin/bash
source _variables.sh

#create channel on peer0
peer channel create -c channel1 -f /opt/gopath/src/github.com/hyperledger/fabric/peer/channel-artifacts/channel1.tx -o orderer-org0:7050 --outputBlock /tmp/hyperledger/org1/peer1/assets/mychannel.block --tls --cafile /tmp/hyperledger/org1/peer1/msp/tls-0-0-0-0-8052.pem
