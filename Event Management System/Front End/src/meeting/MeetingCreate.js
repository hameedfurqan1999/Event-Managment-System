import 'date-fns'
import React, { useState, useEffect } from 'react'
import { api } from './../config/axios'
import toast from 'toasted-notes'
import { TextField, Grid, Container } from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import Button from '@material-ui/core/Button'
import './styles.css'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
}))

function MeetingCreate(props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date())
  const [time, setTime] = useState(new Date())
  const [event, setEvent] = useState('')
  const [events, setEvents] = useState([])
  const classes = useStyles()
  const history = useHistory()

  useEffect(() => {
    api.get(`/event/get-own`).then(({ data }) => {
      if (data.success) {
        setEvents(data.events)
      } else {
        toast.notify('Error', {
          position: 'bottom-right',
          duration: 1500,
        })
      }
    })
  }, [])

  function handleSubmit() {
    api
      .post(`/meeting/create`, {
        title,
        description,
        date,
        time,
        event,
      })
      .then(({ data }) => {
        if (data.success) {
          toast.notify('Meeting created', {
            position: 'bottom-right',
            duration: 1500,
          })
          console.log(data)
          history.push('/event/' + data.meeting.event._id)
        } else {
          toast.notify('Error: ' + data.message, {
            position: 'bottom-right',
            duration: 1500,
          })
        }
      })
      .catch((error) => {
        console.log(error)
        if (error.response && error.response.status === 400) {
          return
        }
      })
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Container maxWidth="sm">
        <form noValidate autoComplete="off">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Title"
            name="title"
            autoComplete="title"
            autoFocus
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            multiline
            fullWidth
            label="Description"
            rows={6}
            name="description"
            autoComplete="description"
            autoFocus
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          <FormControl className={classes.formControl}>
            <InputLabel id="select-label">Select event</InputLabel>
            <Select
              labelId="select-label"
              id="demo-select-labelt"
              value={event}
              onChange={(e) => {
                setEvent(e.target.value)
              }}
            >
              {events.map((event) => {
                return (
                  <MenuItem key={event._id} value={event._id}>
                    {event.title}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>

          <Grid container>
            <Grid item xs={12} sm={5}>
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Meeting start time"
                value={time}
                onChange={setTime}
                KeyboardButtonProps={{
                  'aria-label': 'change time',
                }}
              />
            </Grid>
            <Grid item xs={false} sm={2}></Grid>
            <Grid item xs={12} sm={5}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Choose date"
                value={date}
                onChange={setDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </Grid>
        </form>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
        >
          Create meeting
        </Button>
      </Container>
    </MuiPickersUtilsProvider>
  )
}

export default MeetingCreate
