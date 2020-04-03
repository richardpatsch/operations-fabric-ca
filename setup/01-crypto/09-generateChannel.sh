mkdir -p channel-artifacts
configtxgen -profile OrdererGenesis -outputBlock ./channel-artifacts/genesis.block -channelID testchainid
configtxgen -profile Channel -outputCreateChannelTx ./channel-artifacts/channel1.tx -channelID channel1

mv crypto/org0/orderer/tls-msp/keystore/* crypto/org0/orderer/tls-msp/keystore/key.pem
mv crypto/org1/peer1/tls-msp/keystore/* crypto/org1/peer1/tls-msp/keystore/key.pem
mv crypto/org1/peer2/tls-msp/keystore/* crypto/org1/peer2/tls-msp/keystore/key.pem
mv crypto/org2/peer1/tls-msp/keystore/* crypto/org2/peer1/tls-msp/keystore/key.pem
mv crypto/org2/peer2/tls-msp/keystore/* crypto/org2/peer2/tls-msp/keystore/key.pem

mkdir -p crypto/org1/admin/msp/admincerts
cp crypto/org1/admin/msp/signcerts/cert.pem crypto/org1/admin/msp/admincerts
cp crypto/org0/orderer/tls-msp/tlscacerts/tls-0-0-0-0-8052.pem crypto/org1/peer1/msp
cp crypto/org0/orderer/tls-msp/tlscacerts/tls-0-0-0-0-8052.pem crypto/org1/peer2/msp

mkdir -p crypto/org2/admin/msp/admincerts
cp crypto/org2/admin/msp/signcerts/cert.pem crypto/org2/admin/msp/admincerts
cp crypto/org0/orderer/tls-msp/tlscacerts/tls-0-0-0-0-8052.pem crypto/org2/peer1/msp
cp crypto/org0/orderer/tls-msp/tlscacerts/tls-0-0-0-0-8052.pem crypto/org2/peer2/msp
