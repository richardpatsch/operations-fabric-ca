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

  return (
    <div style={style}>
      <h4>Create Food</h4>
      <form>
        <table style={{ width: '100%', borderSpacing: '0 8px' }}>
          <tr>
            <td>
              <TextField
                id="food-name"
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
                variant="outlined"
                size="small"
                fullWidth
              />
            </td>
          </tr>
          <tr>
            <td>
              <Button variant="outlined" color="secondary" fullWidth>
                Create
              </Button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  )
}
