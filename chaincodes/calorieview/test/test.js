import { expect } from 'chai'
import { ChaincodeMockStub } from '@theledger/fabric-mock-stub'

import Chaincode from '../app/chaincode'

const MyChaincode = new Chaincode()

describe('test chaincode', () => {
  let dateIn2Days = new Date()
  dateIn2Days.setDate(dateIn2Days.getDate() + 2)

  const mockStub = new ChaincodeMockStub('MyMockStub', MyChaincode)

  it('should init without issues', async () => {
    const response = await mockStub.mockInit('tx1', [])
    expect(response.status).to.equal(200)
  })

  it('Return errors if method does not exist', async () => {
    const testFunction = 'nonExistentFunction'
    const response = await mockStub.mockInvoke('tx1', [
      testFunction,
      'doesNotMatter',
      'because',
      'function',
      'does',
      'not',
      'exist',
    ])
    expect(response.message).to.equal(
      `function named "${testFunction}" not found`
    )
  })

  it('Should return empty string if the data requested does not exist', async () => {
    const response = await mockStub.mockInvoke('tx1', ['getDataById', 'test'])
    expect(response.payload.toString()).to.equal('')
  })

  it('Should be able to create a delivery', async () => {
    const request = {
      quantity: 10,
      name: 'spinach',
      best_before: dateIn2Days,
    }
    const response = await mockStub.mockInvoke('tx1', [
      'createFood',
      JSON.stringify(request),
    ])
    expect(response.status).to.equal(200)
  })

  it('Should be not able to create a delivery with foods that are only valid until right now', async () => {
    const request = {
      quantity: 1,
      name: 'spinach',
      best_before: new Date(),
    }
    const response = await mockStub.mockInvoke('tx1', [
      'createFood',
      JSON.stringify(request),
    ])
    expect(response.message).to.equal(
      'Every product has to be good for at least a day when creating it'
    )
  })

  it('Should be not able to create a delivery with foods that are already expired', async () => {
    let oldDate = new Date()
    oldDate.setDate(oldDate.getDate() - 10)

    const request = {
      quantity: 1,
      name: 'spinach',
      best_before: oldDate,
    }
    const response = await mockStub.mockInvoke('tx1', [
      'createFood',
      JSON.stringify(request),
    ])
    expect(response.message).to.equal(
      'Every product has to be good for at least a day when creating it'
    )
  })

  it('Should NOT be able to create a delivery with an invalid Food name', async () => {
    const request = {
      quantity: 10,
      name: 'carrot',
      best_before: dateIn2Days,
    }
    const response = await mockStub.mockInvoke('tx1', [
      'createFood',
      JSON.stringify(request),
    ])
    expect(response.status).to.equal(500)
  })

  it('Should be able to Create & Transfer a Delivery by ID', async () => {
    const request = {
      quantity: 10,
      name: 'spinach',
      best_before: dateIn2Days,
    }
    await mockStub.mockInvoke('tx1', ['createFood', JSON.stringify(request)])
    const eventPayload = await mockStub.getEvent('deliveryCreated')

    const deliveryId = JSON.parse(eventPayload.toString()).id
    const response = await mockStub.mockInvoke('tx2', [
      'getDataById',
      deliveryId,
    ])
    expect(JSON.parse(response.payload.toString()).id).to.equal(deliveryId)
  })

  it('Should be able to CREATE a Batch & GET a Food by ID', async () => {
    const request = {
      quantity: 10,
      name: 'spinach',
      best_before: dateIn2Days,
      hops: 1,
    }
    await mockStub.mockInvoke('tx1', ['createFood', JSON.stringify(request)])
    const eventPayload = await mockStub.getEvent('deliveryCreated')
    const foodId = JSON.parse(eventPayload.toString()).foods[0]
    const response = await mockStub.mockInvoke('tx2', ['getDataById', foodId])
    expect(JSON.parse(response.payload.toString()).id).to.equal(foodId)
  })

  it('Should be able to CREATE a Batch & TRANSFER a Food', async () => {
    const request = {
      quantity: 5,
      name: 'eggs',
      best_before: dateIn2Days,
    }
    await mockStub.mockInvoke('tx1', ['createFood', JSON.stringify(request)])

    const eventPayload = await mockStub.getEvent('deliveryCreated')
    const foodId = JSON.parse(eventPayload.toString()).foods[0]

    const transferFoodRequest = {
      id: foodId,
      to: 'me',
    }

    await mockStub.mockInvoke('tx2', [
      'transferFood',
      JSON.stringify(transferFoodRequest),
    ])

    const response = await mockStub.mockInvoke('tx3', ['getDataById', foodId])

    expect(JSON.parse(response.payload.toString()).owner).to.equal('me')
  })

  it('I can not transfer food that does not exist', async () => {
    const transferFoodRequest = {
      id: 'notExistentId',
      to: 'someoneWhoDoesNotMatterBecauseThisShouldFail',
    }

    const transferFoodResponse = await mockStub.mockInvoke('tx2', [
      'transferFood',
      JSON.stringify(transferFoodRequest),
    ])
    expect(transferFoodResponse.message).to.equal(
      `Food with id: ${transferFoodRequest.id} not found`
    )
  })

  it('I can not transfer food that is owned by someone else', async () => {
    const request = {
      quantity: 1,
      name: 'cheese',
      best_before: dateIn2Days,
    }

    await mockStub.mockInvoke('tx1', ['createFood', JSON.stringify(request)])

    const eventPayload = await mockStub.getEvent('deliveryCreated')
    const foodId = JSON.parse(eventPayload.toString()).foods[0]

    const transferFoodRequest = {
      id: foodId,
      to: 'SomeoneElse',
    }

    await mockStub.mockInvoke('tx2', [
      'transferFood',
      JSON.stringify(transferFoodRequest),
    ])

    const foodCreated = await mockStub.mockInvoke('tx3', [
      'getDataById',
      foodId,
    ])

    console.log('HIT IT')
    console.log(foodCreated.payload.toString())

    const takenFoodId = JSON.parse(foodCreated.payload.toString()).id

    const transferFoodRequestTwo = {
      id: takenFoodId,
      to: 'me',
    }

    const takeFoodResponseTwo = await mockStub.mockInvoke('tx4', [
      'transferFood',
      JSON.stringify(transferFoodRequestTwo),
    ])

    expect(takeFoodResponseTwo.message).to.equal(
      'you can not change ownership of food that is not yours'
    )
  })

  it('I can getDataByRange', async () => {
    const response = await mockStub.mockInvoke('tx1', [
      'getDataByRange',
      JSON.stringify({ startKey: '', endKey: '' }),
    ])
    expect(response.status).to.equal(200)
  })
})
