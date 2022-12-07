import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import SuccessAlert from '../../common/alerts/successAlert'
import FailAlert from '../../common/alerts/failAlert'
import constants from '../../constants'

import { useHistory } from 'react-router-dom'

import auth from './../../services/auth.service'

function Login(props) {
  const history = useHistory()
  const [email, setEmail] = useState(undefined)
  const [password, setPassword] = useState(undefined)
  const [hasLogged, sethasLogged] = useState(false)
  const [intStatus, setIntStatus] = useState('success')
  const [promptMsg, setPromptMsg] = useState('')

  function handleSubmit() {
    const formData = {
      email: email,
      password: password,
    }

    axios({
      method: 'post',
      url: '/login',
      data: formData,
    })
      .then(function (response) {
        auth.login(response.data)
        props.handleLogin()
        if (props.redirect) {
          history.push('/')
        }
      })
      .catch(function (error) {
        console.log('Error after request')
        console.error(error)

        if (error.response && error.response.status === 404) {
          setPromptMsg(constants.userMessages.FAIL_LOGIN)
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
            id="email"
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
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
          >
            Login
          </Button>
          {hasLogged ? (
            <SuccessAlert msg={promptMsg} onClose={() => {}} />
          ) : intStatus === 'fail' ? (
            <FailAlert msg={promptMsg} onClose={() => {}} />
          ) : null}
        </form>
      </Container>
    </div>
  )
}

export default Login
