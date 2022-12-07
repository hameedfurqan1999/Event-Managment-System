import 'date-fns'
import React, { useState} from 'react'
import { api } from './../config/axios'
import toast from 'toasted-notes'
import { TextField,  Container } from '@material-ui/core'
import paymentIcons from './payment_icons.jpg';

import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import Button from '@material-ui/core/Button'
import './styles.css'

function Payment(props) {
  const [cardNumber, setCardNumber] = useState(undefined)

  function handleSubmit() {
    const formData = {
      eventId: props.eventId,
      price: props.price,
      cardNumber: cardNumber,
    }

    console.log(JSON.stringify(formData))
    api
      .post('/payment/create', formData)
      .then(({ data }) => {
        console.log('Response from server' + JSON.stringify(data))
        setCardNumber('')
        props.onFinish(true)
      })
      .catch((error) => {
        console.log('Error after request')
        console.error(error.response)

        toast.notify('Error sending request. Please check if info is valid!', {
          position: 'bottom-right',
          duration: 1500,
        })
      })
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className="header">
        <h1>Finalize event details</h1>
        <p>Enter purchase details below</p>
      </div>
      <Container maxWidth="sm">
        <form noValidate autoComplete="off">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Please enter your Card Number"
            name="cardNumber"
            autoComplete="cardNumber"
            autoFocus
            value={cardNumber}
            onChange={(event) => setCardNumber(event.target.value)}
          />
        </form>
        <div>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            {' '}
            Submit payment detils
          </Button>
        </div>
        <div>
          <img src={paymentIcons} alt="icons" width="100%" height="20%" />
        </div>
      </Container>
    </MuiPickersUtilsProvider>
  )
}

export default Payment
