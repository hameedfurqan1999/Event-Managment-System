import React, { useEffect, useState } from 'react'
import EventCard from './eventCard'
import { api } from './../../config/axios'
import toast from 'toasted-notes'
import 'toasted-notes/src/styles.css'
import Alert from '@material-ui/lab/Alert'
import { Link, Grid } from '@material-ui/core'

export default function EventList() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    api.get(`/event/get-own`).then(({ data }) => {
        console.log(data);
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

  return (
    <Grid container>
      <Grid item md={2} sm={false}></Grid>
      <Grid item md={8} sm={12}>
        {events.length ? (
          events.map((event) => (
            <EventCard
              key={event._id}
              id={event._id}
              title={event.title}
              description={event.description}
              date={event.date}
              time={event.time}
            />
          ))
        ) : (
          <Alert severity="info">
            You don't have any events yet. Click&nbsp;
            <Link href="/event/create">here</Link> to create one.
          </Alert>
        )}
      </Grid>
      <Grid item md={2} sm={false}></Grid>
    </Grid>
  )
}
