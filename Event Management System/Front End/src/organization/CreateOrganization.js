import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { api } from './../config/axios'
import toast from 'toasted-notes'

export default function CreateOrganization({ open, handleClose }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const history = useHistory()

  const handleCreate = () => {
    api
      .post('/organization/create', {
        title,
        description,
      })
      .then(({ data }) => {
        if (data.success) {
          handleClose()
          setTitle('')
          setDescription('')
          history.push('/organization/' + data.organization._id)
        }
      })
      .catch((error) => {
        toast.notify(error)
      })
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Create new organization
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            multiline
            rows={3}
            fullWidth
            onChange={(event) => setDescription(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreate} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
