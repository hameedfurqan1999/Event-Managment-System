import React, { useEffect } from 'react'
import { Widget, addResponseMessage, addUserMessage } from 'react-chat-widget'
import socketIOClient from 'socket.io-client'
import auth from './../services/auth.service'
import { api } from './../config/axios'
import 'react-chat-widget/lib/styles.css'
import toast from 'toasted-notes'

const currentUserId = auth.parse() ? auth.parse().userId : ''
const socket = socketIOClient(process.env.REACT_APP_SOCKET_SERVER)

socket.on('message-created', (message) => {
  console.log(message)
  if (message.user._id !== currentUserId) {
    addResponseMessage(`${message.user.firstName}: ${message.content}`)
  }
})

socket.on('message-error', (error) => {
  console.log(error)
  toast.notify('Error in storing message!', {
    position: 'bottom-right',
    duration: 3000,
  })
})

export default function MeetingBox(props) {
  function handleNewUserMessage(messageContent) {
    socket.emit('new-message', {
      content: messageContent,
      userId: auth.parse().userId,
      meetingId: props.id,
    })
  }

  useEffect(() => {
    api
      .get(`/meeting/${props.id}/messages`)
      .then(({ data }) => {
        if (data.success) {
          for (const message of data.messages) {
            if (message.user._id === currentUserId) {
              addUserMessage(message.content)
            } else {
              addResponseMessage(
                `${message.user.firstName}: ${message.content}`
              )
            }
          }
        }
      })
      .catch((err) => {
        console.error(err)
        toast.notify('Error in getting messages!', {
          position: 'bottom-right',
          duration: 3000,
        })
      })
  }, [currentUserId, props.id])

  return (
    <React.Fragment>
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title={props.title}
        subtitle={props.description}
      />
    </React.Fragment>
  )
}
