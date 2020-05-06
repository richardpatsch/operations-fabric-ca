import React from 'react'
import FoodView from './components/FoodView'
import DeliveryView from './components/DeliveryView'
import CreateFood from './components/CreateFood'
import TransferFood from './components/TransferFood'
import './App.css'

function App() {
  //make this component the container
  const appStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '65%',
    margin: '35px auto',
  }

  return (
    <div style={appStyle}>
      <FoodView />
      <DeliveryView />
      <CreateFood />
      <TransferFood />
    </div>
  )
}

export default App
