import React from 'react'
import { TextField, Button } from '@material-ui/core'

export default function FoodView() {
  const style = {
    flex: '0 48%',
    height: '250px',
    marginBottom: '2%',
    margin: 0,
    padding: 5,
    backgroundColor: 'rgba(255,255,255,.5)',
    textAlign: 'center',
  }

  const transferFoodRequest = (e) => {
    const data = new FormData(e.target)
    const obj = {
      id: data.get('id'),
      to: data.get('to'),
    }

    console.log(obj)

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    }
    fetch('http://localhost:4000/transferFood', requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
  }

  return (
    <div style={style}>
      <h4>Transfer Food</h4>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          transferFoodRequest(e)
        }}
      >
        <table style={{ width: '100%', borderSpacing: '0 8px' }}>
          <tr>
            <td>
              <TextField
                id="food-id"
                label="Id"
                name="id"
                variant="outlined"
                size="small"
                fullWidth
              />
            </td>
          </tr>
          <tr>
            <td>
              <TextField
                id="food-to"
                label="To"
                name="to"
                variant="outlined"
                size="small"
                fullWidth
              />
            </td>
          </tr>
          <tr>
            <td>
              <Button
                type="submit"
                variant="outlined"
                color="secondary"
                fullWidth
              >
                Transfer
              </Button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  )
}
