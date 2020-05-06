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

  return (
    <div style={style}>
      <h4>Transfer Food</h4>
      <form>
        <table style={{ width: '100%', borderSpacing: '0 8px' }}>
          <tr>
            <td>
              <TextField
                id="food-id"
                label="Id"
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
                variant="outlined"
                size="small"
                fullWidth
              />
            </td>
          </tr>
          <tr>
            <td>
              <Button variant="outlined" color="secondary" fullWidth>
                Transfer
              </Button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  )
}
