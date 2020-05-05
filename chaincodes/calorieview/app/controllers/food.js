import { v4 as uuidv4 } from 'uuid'
import { parseArgs, generateCode } from '../utils'
import {
  deliverySchema,
  foodSchema,
  createFoodSchema,
  transferFoodSchema,
} from '../models/food'

const shim = require('fabric-shim')
const testLog = shim.newLogger('loggerName')
testLog.info('============= START : createSpend ===========')

const ClientIdentity = require('fabric-shim').ClientIdentity

const validationOptions = {
  recursive: true,
  abortEarly: true,
  stripUnknown: true,
}

export const createFood = async (stub, args) => {
  let data = await createFoodSchema.validate(parseArgs(args), validationOptions)

  let tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  if (data.best_before < tomorrow) {
    throw new Error(
      'Every product has to be good for at least a day when creating it'
    )
  }

  const foodPutStatePromises = []

  let cid = new ClientIdentity(stub)
  let mspID = cid.getMSPID()

  //get creator
  const supplier = mspID
  console.log('SUPPLIER___')
  console.log(supplier)
  console.log('-------')
  console.log(stub.getCreator())
  testLog.error('SUPPLIER')
  testLog.error(supplier)
  testLog.error(stub.getCreator())
  testLog.info('hallo')

  //check if the food is one of the allowed foods
  const selectedFood = data.name.toLowerCase()
  const availableFoods = ['eggs', 'water', 'spinach', 'wine', 'cheese']

  if (!availableFoods.includes(selectedFood)) {
    throw new Error(`Food with name ${selectedFood} is not allowed`)
  }

  const timestamp = new Date(
    stub.getTxTimestamp().getSeconds() * 1000
  ).toISOString()

  const delivery = {
    docType: 'delivery',
    id: uuidv4(),
    foods: [],
    supplier,
    quantity: data.quantity,
    dateOfProposalCreation: timestamp,
    dateOfLastProposalUpdate: timestamp,
  }

  for (let i = 0; i < data.quantity; i += 1) {
    let food

    while (true) {
      food = await foodSchema.validate(
        {
          ...data,
          deliveryId: delivery.id,
          docType: 'food',
          id: generateCode(),
          supplier,
          hops: 1,
        },
        validationOptions
      )

      const newFoodAsBytes = await stub.getState(food.id)

      if (!newFoodAsBytes.toString()) {
        break
      }
    }

    delivery.foods.push(food.id)
    foodPutStatePromises.push(
      stub.putState(food.id, Buffer.from(JSON.stringify(food)))
    )
  }

  await Promise.all(foodPutStatePromises)

  console.log('KLJDFKLÖJKLAÖJLKÖFD')
  console.log(delivery)
  console.log('KLJDFKLÖJKLAÖJLKÖFD')

  const deliveryAsBytes = Buffer.from(
    JSON.stringify(await deliverySchema.validate(delivery, validationOptions))
  )

  await stub.putState(delivery.id, deliveryAsBytes)

  stub.setEvent('deliveryCreated', deliveryAsBytes)
}

export const transferFood = async (stub, args) => {
  let data
  let formattedData

  try {
    formattedData = await transferFoodSchema.validate(
      parseArgs(args),
      validationOptions
    )
  } catch (e) {
    console.log(e)
    throw new Error(e.message)
  }

  const dataAsBytes = await stub.getState(formattedData.id)

  if (!dataAsBytes.toString()) {
    throw new Error(`Food with id: ${formattedData.id} not found`)
  }

  const dataToUpdate = JSON.parse(dataAsBytes.toString())

  if (dataToUpdate.best_before < new Date()) {
    throw new Error("can't transfer expired goods")
  }

  if (dataToUpdate.owner === formattedData.to) {
    throw new Error('You already own this food')
  }

  console.log(dataToUpdate.owner)
  console.log(stub.getCreator().mspId)

  let cid = new ClientIdentity(stub)
  let mspID = cid.getMSPID()

  if (dataToUpdate.owner !== mspID && dataToUpdate.owner) {
    console.log('HELLO')
    throw new Error('you can not change ownership of food that is not yours')
  }

  formattedData.dateOfLastProposalUpdate = new Date(
    stub.getTxTimestamp().getSeconds() * 1000
  ).toISOString()

  const updatedData = {
    ...dataToUpdate,
    owner: formattedData.to,
    hops: dataToUpdate.hops + 1,
  }
  const updatedDataAsBytes = Buffer.from(JSON.stringify(updatedData))

  await stub.putState(updatedData.id, updatedDataAsBytes)

  stub.setEvent('something used', updatedDataAsBytes)
}
