import React, { useState } from 'react'
import axios from 'axios'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import SuccessAlert from '../../common/alerts/successAlert'
import FailAlert from '../../common/alerts/failAlert'
import constants from '../../constants'
import auth from './../../services/auth.service'
import { useHistory } from 'react-router-dom'

function Register(props) {
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [hasRegistered, setHasRegister] = useState(false)
  const [intStatus, setIntStatus] = useState('success')
  const [promptMsg, setPromptMsg] = useState('')

  function handleSubmit() {
    const formData = {
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
      firstName: firstName,
      lastName: lastName,
    }
    axios({
      method: 'post',
      url: '/register',
      data: formData,
    })
      .then((response) => {
        auth.login(response.data)
        props.handleLogin()
        setHasRegister(true)
        setPromptMsg(constants.userMessages.SUCC_REGISTER)
        if (props.redirect) {
          history.push('/')
        }
      })
      .catch((error) => {
        console.log('Error after request')
        console.error(error.response)

        if (error.response.status === 400) {
          setPromptMsg(constants.userMessages.FAIL_REGISTER)
          setIntStatus('fail')
          return
        }
        setPromptMsg(constants.userMessages.ERR_INTERNAL)
        setIntStatus('fail')
      })
  }

  return (
    <div>
      <Container maxWidth="xs">
        <form noValidate autoComplete="off">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event) => setEmail(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="first-name"
            label="First Name"
            type="text"
            autoComplete="first-name"
            onChange={(event) => setFirstName(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="last-name"
            label="Last Name"
            type="text"
            autoComplete="last-name"
            onChange={(event) => setLastName(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password-confirm"
            label="Confirm password"
            type="password"
            autoComplete="current-password-confirm"
            onChange={(event) => setPasswordConfirm(event.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Register
          </Button>
          {hasRegistered ? (
            <SuccessAlert msg={promptMsg} />
          ) : intStatus === 'fail' ? (
            <FailAlert msg={promptMsg} onClose={() => {}} />
          ) : null}
        </form>
      </Container>
    </div>
  )
}

export default Register
