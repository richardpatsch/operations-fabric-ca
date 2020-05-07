import React from 'react'
import ReactLoading from 'react-loading'
import FancyDeliveryTable from './FancyDeliveryTable'
import { useFetch } from '../utils/hooks'

export default function DeliveryView() {
  const style = {
    flex: '0 100%',
    height: '250px',
    marginBottom: '2%',
    backgroundColor: 'rgba(255,255,255,.5)',
  }

  const [data, loading] = useFetch('http://localhost:4000/queryAllDeliveries')

  return (
    <div style={style}>
      {loading ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <ReactLoading type={'bars'} color="#000" />
          <b>Loading All Delivery Records...</b>
        </div>
      ) : (
        <FancyDeliveryTable data={data} />
      )}
    </div>
  )
}
