import React from 'react'
import QuestionChart from './QuestionChart.js'
import { Grid } from '@material-ui/core'

function EventStatistics(props) {
  let { statistics } = props
  return (
    <React.Fragment>
      <Grid container>
        {statistics.map((question) => (
          <Grid key={question._id} item lg={6} sm={12}>
            <QuestionChart question={question} />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  )
}

export default EventStatistics
