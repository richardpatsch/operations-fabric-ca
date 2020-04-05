# Operations-fabric-ca

Proof of concept following this tutorial https://hyperledger-fabric-ca.readthedocs.io/en/latest/operations_guide.html#create-and-join-channel

In this case, instead of having only one TLS CA for issue all the TLS certificates, the organizations org1 and org2 share their own TLS CA and the orderer org (org0) uses its own dedicated TLS CA.

---

trying to create an offline/prod setup.
work in progress...

(right now it is still mandatory to have fabric binaries installed locally to set up the MSPs. Procedure will be moved into the CLI container eventually to remove that dependency on the host machine)
