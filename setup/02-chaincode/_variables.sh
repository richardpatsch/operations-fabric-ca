CHANNEL_NAME="channel1"
CC_VERSION=1.0
CC_NAME=mycontract
CC_PATH=github.com/hyperledger/fabric-samples/chaincode/chaincode_example02

evPeerAddressP1O1="CORE_PEER_ADDRESS=peer1.org1:7051"
evPeerAddressP2O1="CORE_PEER_ADDRESS=peer2.org1:7051"
evPeerAddressP1O2="CORE_PEER_ADDRESS=peer1.org2:7051"
evPeerAddressP2O2="CORE_PEER_ADDRESS=peer2.org2:7051"

evLocalMspidOrg1="CORE_PEER_LOCALMSPID=org1MSP"
evLocalMspidOrg2="CORE_PEER_LOCALMSPID=org2MSP"

evMspConfigPathOrg1Admin="CORE_PEER_MPSCONFIGPATH=/tmp/hyperledger/crypto/org1/admin/msp"
evMspConfigPathOrg2Admin="CORE_PEER_MSPCONFIGPATH=/tmp/hyperledger/crypto/org2/admin/msp"

CaFilePeer1Org1="/tmp/hyperledger/crypto/org1/peer1/msp/tls-0-0-0-0-8052.pem"
CaFilePeer2Org1="/tmp/hyperledger/crypto/org1/peer2/msp/tls-0-0-0-0-8052.pem"
CaFilePeer1Org2="/tmp/hyperledger/crypto/org2/peer1/msp/tls-0-0-0-0-8052.pem"
CaFilePeer2Org2="/tmp/hyperledger/crypto/org2/peer2/msp/tls-0-0-0-0-8052.pem"

ChannelBlockPath="/tmp/hyperledger/crypto/org1/peer1/assets/mychannel.block"
ORDERER_ADDRESS="orderer.org0:7050"
