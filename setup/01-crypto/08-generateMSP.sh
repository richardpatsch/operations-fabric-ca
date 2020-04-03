mkdir -p crypto/org0/msp/{admincerts,cacerts,tlscacerts}
cp crypto/org0/admin/msp/signcerts/cert.pem crypto/org0/msp/admincerts
cp crypto/org0/admin/msp/cacerts/0-0-0-0-7053.pem crypto/org0/msp/cacerts/org0-ca-cert.pem
cp crypto/org0/orderer/assets/tlsca/ca-cert.pem crypto/org0/msp/tlscacerts/tls-ca.cert

mkdir -p crypto/org1/msp/{admincerts,cacerts,tlscacerts}
cp crypto/org1/admin/msp/signcerts/cert.pem crypto/org1/msp/admincerts
cp crypto/org1/admin/msp/cacerts/0-0-0-0-7054.pem crypto/org1/msp/cacerts/org0-ca-cert.pem
cp crypto/org1/peer1/assets/tlsca/ca-cert.pem crypto/org1/msp/tlscacerts/tls-ca.cert

mkdir -p crypto/org2/msp/{admincerts,cacerts,tlscacerts}
cp crypto/org2/admin/msp/signcerts/cert.pem crypto/org2/msp/admincerts
cp crypto/org2/admin/msp/cacerts/0-0-0-0-7055.pem crypto/org2/msp/cacerts/org0-ca-cert.pem
cp crypto/org2/peer1/assets/tlsca/ca-cert.pem crypto/org2/msp/tlscacerts/tls-ca.cert
