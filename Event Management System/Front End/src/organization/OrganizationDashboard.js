import React, { useState, useEffect } from 'react'
import { api } from './../config/axios'
import OrganizationDetails from './OrganizationDetails'
import { Box, Grid, List, ListItemText } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import ListItemLink from './../common/ListItemLink'
import OrganizationFeed from './../organization/OrganizationFeed'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}))

function OrganizationDashboard(props) {
  const [organization, setOrganization] = useState({})
  const [events, setEvents] = useState([])
  const [dataLoaded, setDataLoaded] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    api
      .get('/organization/' + props.match.params.id)
      .then(({ data }) => {
        setOrganization(data.organization)
        setDataLoaded(true)
      })
      .catch(console.error)

    api
      .get(`/organization/${props.match.params.id}/events`)
      .then(({ data }) => {
        setEvents(data.events)
      })
      .catch(console.error)
  }, [props.match.params.id])
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item lg={2} md={2} sm={false}></Grid>
        <Grid item lg={8} md={8} sm={12}>
          {dataLoaded ? (
            <OrganizationDetails
              title={organization.title}
              description={organization.description}
              owner={organization.owner}
            />
          ) : (
            ''
          )}
          <OrganizationFeed organizationId={organization._id} />
        </Grid>
        <Grid item lg={2} md={2} sm={false}>
          <List className={classes.root}>
            {events.map((event) => (
              <ListItemLink href={`/event/${event._id}`} key={event._id}>
                <ListItemText
                  primary={event.title}
                  secondary={moment().format('D MMM, YYYY')}
                />
              </ListItemLink>
            ))}
          </List>
        </Grid>
      </Grid>
    </Box>
  )
}

export default OrganizationDashboard
