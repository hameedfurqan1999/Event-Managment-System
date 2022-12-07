import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'


export default function PaymentsList({ open, handleClose }) {


const users = [
   ['Pesho', 'Ivan', 'Adnan']
]

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          List of current active purchases
        </DialogTitle>
        
        <DialogContent>
        {users.map((user) => (
            <div>
                <TextField
                    disabled 
                    autoFocus
                    margin="dense"
                    id="title"
                    name="title"
                    label={user}
                    type="text"
                    fullWidth
                />
                </div>
        ))}
    
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
