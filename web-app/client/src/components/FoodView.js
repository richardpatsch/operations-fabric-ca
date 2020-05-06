import React from 'react'
import ReactLoading from 'react-loading'
import FancyFoodTable from './FancyFoodTable'
import { useFetch } from '../utils/hooks'

export default function FoodView() {
  const [data, loading] = useFetch('http://localhost:4000/queryAllFoods')

  const style = {
    flex: '0 100%',
    height: '250px',
    marginBottom: '2%',
    backgroundColor: 'rgba(255,255,255,.5)',
  }

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
          <b>Loading all Food Records...</b>
        </div>
      ) : (
        <FancyFoodTable data={data} />
      )}
    </div>
  )
}
