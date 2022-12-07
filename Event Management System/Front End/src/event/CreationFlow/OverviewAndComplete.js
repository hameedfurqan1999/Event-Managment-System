import React from 'react'
import { Container, Grid } from '@material-ui/core'
import EventDetails from '../EventDetails.js'
import Questions from './Questions'

function OverviewAndComplete(props) {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <EventDetails my={0} event={props.event} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Questions questions={props.questions} />
        </Grid>
      </Grid>
    </Container>
  )
}

export default OverviewAndComplete
