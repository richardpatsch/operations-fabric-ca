import React from 'react'
import { TextField, Button } from '@material-ui/core'

export default function CreateFood() {
  const style = {
    flex: '0 48%',
    height: '250px',
    marginBottom: '2%',
    padding: 5,
    backgroundColor: 'rgba(255,255,255,.5)',
    textAlign: 'center',
  }

  const createFoodRequest = (e) => {
    const data = new FormData(e.target)
    const obj = {
      name: data.get('name'),
      quantity: data.get('quantity'),
      best_before: data.get('best_before'),
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj),
    }
    fetch('http://localhost:4000/createFood', requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
  }

  return (
    <div style={style}>
      <h4>Create Food</h4>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          createFoodRequest(e)
        }}
      >
        <table style={{ width: '100%', borderSpacing: '0 8px' }}>
          <tr>
            <td>
              <TextField
                id="food-name"
                name="name"
                label="Name"
                variant="outlined"
                size="small"
                fullWidth
              />
            </td>
          </tr>
          <tr>
            <td>
              <TextField
                id="food-quantity"
                label="Quantity"
                name="quantity"
                variant="outlined"
                size="small"
                fullWidth
              />
            </td>
          </tr>
          <tr>
            <td>
              <TextField
                id="food-best-before"
                label="Best Before"
                name="best_before"
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
                Create
              </Button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  )
}
