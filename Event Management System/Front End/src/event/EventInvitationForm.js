import React, { useEffect, useState } from 'react'
import EventDetails from './EventDetails.js'
import { Grid, Typography } from '@material-ui/core'
import Survey from 'material-survey/components/Survey'
import moment from 'moment'
import { api } from './../config/axios.js'
import LoginDialog from './LoginDialog'
import auth from './../services/auth.service'
import toast from 'toasted-notes'
import Payment from '../payment'

function EventInvitationForm(props) {
  const [event, setEvent] = useState({})
  const [host, setHost] = useState({})
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [isStored, setIsStored] = useState(false)
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false)
  const [hasUserPaid, setHasUserPaid] = useState(false)

  

  useEffect(() => {
    api.get(`/event/${props.match.params.eventId}`).then(({ data }) => {
      setEvent({
        id: data.event._id,
        title: data.event.title,
        description: data.event.description,
        price: data.event.price,
        dateTime: `${moment(data.event.date).format('DD-MM-YYYY')} ${moment(
          data.event.time
        ).format('HH:mm')}`,
      })

      setQuestions(data.event.questions)

      setHost({
        fullName: `${data.event.user.firstName} ${data.event.user.lastName}`,
      })
    })
  }, [props.match.params.eventId])

  function handleFinish(answers) {
    if (auth.isLoggedIn()) {
      submitInvitationForm(answers)
    } else {
      setIsLoginDialogOpen(true)
      setAnswers(answers)
      toast.notify('You need to login first', {
        position: 'bottom-right',
        duration: 1500,
      })
    }
  }

  function submitInvitationForm(answers) {
    api
      .post(`/event/${event.id}/submit-invitation`, answers)
      .then((res) => {
        if (res.status === 201) {
          setIsStored(true)
          setIsLoginDialogOpen(false)
        }
      })
      .catch(console.error)
  }

  return (
    <Grid container>
      <Grid item lg={1} sm={false} />
      <Grid item lg={10} sm={12}>
        <EventDetails event={event} host={host} />
        <LoginDialog
          open={isLoginDialogOpen}
          handleClickOpen={() => {
            setIsLoginDialogOpen(true)
          }}
          handleClose={() => {
            setIsLoginDialogOpen(false)
          }}
          handleLogin={() => {
            submitInvitationForm(answers)
               toast.notify('You are now logged in', {
                 position: 'bottom-right',
                 duration: 3,
               })
          }}
        />
        <Grid container>
          <Grid item lg={2} sm={false} />
          <Grid item lg={8} sm={12}>
            {event.price === 0 && isStored ? (
              <Typography variant="h4" component="h4">
                Your feedback was stored!
              </Typography>
            ) : isStored && event.price !== 0 && hasUserPaid ? (
                <Typography variant="h4" component="h4">
                  Your feedback was stored! Payment has been successful!
                </Typography>
            ) : isStored && event.price !== 0 && !hasUserPaid ? (
            <Payment
              eventId={event.id}
              price={event.price}
              onFinish={setHasUserPaid}
            />
            ) : (
              <Survey
                onFinish={handleFinish}
                form={{
                  questions: questions.map(
                    ({ _id, content, answers, ...rest }) => {
                      return {
                        name: _id,
                        title: content,
                        choices: answers.map((answer) => answer.content),
                        type: 'checkbox',
                        isRequired: true,
                      }
                    }
                  ),
                }}
              />
            )}
          </Grid>
          <Grid item lg={2} sm={false} />
        </Grid>
      </Grid>
      <Grid item lg={1} sm={false} />
    </Grid>
  )
}

export default EventInvitationForm
