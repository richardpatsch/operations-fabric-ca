'use strict'

const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network')
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

// capture network variables from config.json
const configPath = path.join(process.cwd(), '/config.json')
const configJSON = fs.readFileSync(configPath, 'utf8')
const config = JSON.parse(configJSON)
var connection_file = config.connection_file
var userName = config.userName
var gatewayDiscovery = config.gatewayDiscovery

// connect to the connection file
const filePath = path.join(process.cwd(), '/connection.yaml')
let fileContents = fs.readFileSync(filePath, 'utf8')
let connectionFile = yaml.safeLoad(fileContents)

async function getGatewayAndContract() {
  // Create a new file system based wallet for managing identities.
  const walletPath = path.join(process.cwd(), '/wallet')
  const wallet = new FileSystemWallet(walletPath)
  console.log(`Wallet path: ${walletPath}`)

  // Check to see if we've already enrolled the user.
  const userExists = await wallet.exists(userName)
  if (!userExists) {
    console.log(
      'An identity for the user ' + userName + ' does not exist in the wallet'
    )
    console.log('Run the registerUser.js application before retrying')
    response.error =
      'An identity for the user ' +
      userName +
      ' does not exist in the wallet. Register ' +
      userName +
      ' first'
    return response
  }

  const gateway = new Gateway()
  await gateway.connect(connectionFile, {
    wallet,
    identity: userName,
    discovery: gatewayDiscovery,
  })

  // Get the network (channel) our contract is deployed to.
  const network = await gateway.getNetwork('channel1')

  // Get the contract from the network.
  const contract = network.getContract('calorieview')

  return { gateway, contract }
}

exports.createFood = async function (quantity, name, best_before) {
  try {
    var response = {}

    const { gateway, contract } = await getGatewayAndContract()

    await contract.submitTransaction(
      'createFood',
      JSON.stringify({
        quantity,
        name,
        best_before,
      })
    )
    console.log('Transaction has been submitted')

    // Disconnect from the gateway.
    await gateway.disconnect()

    response.msg = 'createFood Transaction has been submitted'
    return response
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`)
    response.error = error.message
    return response
  }
}

exports.transferFood = async function (id, to) {
  try {
    var response = {}
    const { gateway, contract } = await getGatewayAndContract()

    await contract.submitTransaction(
      'transferFood',
      JSON.stringify({
        id,
        to,
      })
    )
    console.log('Transaction has been submitted')

    // Disconnect from the gateway.
    await gateway.disconnect()

    response.msg = 'transferFood Transaction has been submitted'
    return response
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`)
    response.error = error.message
    return response
  }
}

exports.queryAllFoods = async function () {
  try {
    var response = {}

    const { gateway, contract } = await getGatewayAndContract()

    response = await contract.submitTransaction(
      'richQuery',
      JSON.stringify({
        selector: {
          docType: 'food',
        },
      })
    )

    console.log('Transaction has been submitted')

    // Disconnect from the gateway.
    await gateway.disconnect()

    response.msg = 'queryFood Transaction has been submitted'
    return response
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`)
    response.error = error.message
    return response
  }
}

exports.queryAllDeliveries = async function () {
  try {
    var response = {}

    const { gateway, contract } = await getGatewayAndContract()

    response = await contract.submitTransaction(
      'richQuery',
      JSON.stringify({
        selector: {
          docType: 'delivery',
        },
      })
    )
    contract.console.log('Transaction has been submitted')

    // Disconnect from the gateway.
    await gateway.disconnect()

    response.msg = 'queryFood Transaction has been submitted'
    return response
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`)
    response.error = error.message
    return response
  }
}
