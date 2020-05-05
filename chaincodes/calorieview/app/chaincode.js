import shim from 'fabric-shim'
import util from 'util'
import * as Food from './controllers/food'

export default class Chaincode {
  async Init(stub) {
    const ret = stub.getFunctionAndParameters()
    console.info(ret)
    console.info('=========== Instantiated Food Tracking Chaincode ===========')
    return shim.success()
  }

  async Invoke(stub) {
    console.info('########################################')
    console.info(`Transaction ID: ${stub.getTxID()}`)
    console.info(util.format('Args: %j', stub.getArgs()))

    const ret = stub.getFunctionAndParameters()
    console.info(ret)

    const method = this[ret.fcn]

    // Verifies if method exist
    if (!method) {
      return shim.error(`function named "${ret.fcn}" not found`)
    }

    try {
      const payload = await method(stub, ret.params, this)
      return shim.success(payload)
    } catch (err) {
      console.log('errors definition:')
      console.log(err.stack)
      return shim.error(err.message ? err.message : 'Please try again later')
    }
  }

  // Function for retrieving state value
  async getDataById(stub, args) {
    // Assigns id to data
    const data = args[0]

    // Verifies id is not empty
    if (!data) {
      throw new Error('Please provide an ID')
    }

    console.info('--- start getDataById ---')

    const dataAsBytes = await stub.getState(data)

    console.info('==================')
    console.log(dataAsBytes.toString())
    console.info('==================')

    console.info('--- end getDataById ---')

    return dataAsBytes
  }

  // The keys are returned by the iterator in lexical order. Note that startKey and endKey can be empty string
  // Query is re-executed during validation phase
  async getDataByRange(stub, args, thisClass) {
    let data

    // 1. Parses JSON stringified request
    try {
      data = JSON.parse(args.toString())
    } catch (err) {
      throw new Error('JSON decoding not possible; check format')
    }

    // 2. Gets identifier
    const { startKey, endKey } = data
    if (startKey === undefined || endKey === undefined) {
      throw new Error('startKey/endKey nao pode ser "undefined"')
    }

    console.info('--- start getDataByRange ---')

    const resultsIterator = await stub.getStateByRange(startKey, endKey)
    const method = thisClass['getAllResults']
    const results = await method(resultsIterator, false)

    console.info('--- end getDataByRange ---')

    return Buffer.from(JSON.stringify(results))
  }

  async createFood(stub, args) {
    try {
      //await Codigo.solicitarCodigo(stub, args)
      await Food.createFood(stub, args)
    } catch (err) {
      throw new Error(err.message ? err.message : 'Please try again later')
    }
  }

  async transferFood(stub, args) {
    try {
      await Food.transferFood(stub, args)
    } catch (err) {
      throw new Error(err.message ? err.message : 'Please try again later')
    }
  }

  // Rich Query (Only supported if CouchDB is used as state database):
  // ex: peer chaincode query -C myc -n mycc -c '{"Args":["richQuery","{\"selector\":{\"docType\":\"batch\"}}"]}'
  async richQuery(stub, args, thisClass) {
    let data
    let method
    let params

    // 1. Parses JSON stringified request
    try {
      data = JSON.parse(args.toString())
    } catch (err) {
      throw new Error('Decoding not possible, please check JSON')
    }

    // Verifies if queryString is passed
    if (!data) {
      throw new Error('queryString does not exist')
    }

    const queryString = JSON.stringify(data)

    // If pagination params are passed gets QueryResult with pagination
    if (data.pagination && data.pagination.pageSize) {
      params = { queryString, pagination: data.pagination }
      method = thisClass['getQueryResultForQueryStringWithPagination']
    } else {
      params = queryString
      method = thisClass['getQueryResultForQueryString']
    }
    let queryResults
    try {
      queryResults = await method(stub, params, thisClass)
    } catch (err) {
      throw new Error(err.message ? err.message : 'Try again later')
    }

    return queryResults
  }

  // getQueryResultForQueryString executes the query passed in query string.
  async getQueryResultForQueryString(stub, queryString, thisClass) {
    console.info('- getQueryResultForQueryString ---')

    const resultsIterator = await stub.getQueryResult(queryString)
    const method = thisClass['getAllResults']
    const results = await method(resultsIterator, false)

    console.log('--- end using getQueryResultForQueryString ---')

    return Buffer.from(JSON.stringify(results))
  }

  // ====== Pagination =========================================================================
  // queryString, pageSize, bookmark
  async getQueryResultForQueryStringWithPagination(stub, args, thisClass) {
    console.log(
      '--- start using getQueryResultForQueryStringWithPagination ---'
    )

    const { queryString, pagination } = args
    const pageSize = parseInt(pagination.pageSize, 10)
    const bookmark = pagination.bookmark || ''

    const { iterator, metadata } = await stub.getQueryResultWithPagination(
      queryString,
      pageSize,
      bookmark
    )

    const getAllResults = thisClass['getAllResults']
    const results = await getAllResults(iterator, false)
    // use RecordsCount and Bookmark to keep consistency with the go sample
    results.ResponseMetadata = {
      RecordsCount: metadata.fetched_records_count,
      Bookmark: metadata.bookmark,
    }

    console.log('--- end using getQueryResultForQueryStringWithPagination ---')

    return Buffer.from(JSON.stringify(results))
  }

  async getAllResults(iterator, isHistory) {
    console.log('--- start using getAllResults ---')
    const allResults = []
    while (true) {
      /* eslint-disable no-await-in-loop */
      const res = await iterator.next()

      if (res.value && res.value.value.toString()) {
        const jsonResponse = {}

        if (isHistory && isHistory === true) {
          jsonResponse.TxId = res.value.tx_id
          jsonResponse.Timestamp = res.value.timestamp
          jsonResponse.IsDelete = res.value.is_delete.toString()
          try {
            jsonResponse.Value = JSON.parse(res.value.value.toString('utf8'))
          } catch (err) {
            console.log(err)
            jsonResponse.Value = res.value.value.toString('utf8')
          }
        } else {
          jsonResponse.Key = res.value.key
          try {
            jsonResponse.Record = JSON.parse(res.value.value.toString('utf8'))
          } catch (err) {
            console.log(err)
            jsonResponse.Record = res.value.value.toString('utf8')
          }
        }
        allResults.push(jsonResponse)
      }
      if (res.done) {
        await iterator.close()
        console.info(JSON.stringify(allResults))
        console.log('--- end using getAllResults ---')
        return allResults
      }
    }
  }

  async getHistory(stub, args, thisClass) {
    if (args.length < 1) {
      throw new Error(
        'Incorrect number of arguments. Expecting an id to look for'
      )
    }
    const id = args[0]
    console.info(`--- start getHistoryFor:\n ${id}`)

    const resultsIterator = await stub.getHistoryForKey(id)
    const method = thisClass['getAllResults']

    const results = await method(resultsIterator, true)

    return Buffer.from(JSON.stringify(results))
  }
}
