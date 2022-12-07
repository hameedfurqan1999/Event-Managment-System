import React from 'react'
import EventList from './../event/EventList/index.js'
import auth from './../services/auth.service'
import './styles.css'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'

export default function Home() {
  const history = useHistory()

  function handleGettingStarted() {
    history.push('/login')
  }

  return auth.isLoggedIn() ? (
    <EventList />
  ) : (
    <React.Fragment>
      <section id="intro" className="intro">
        <div class="col-md-6 intro-info order-md-first order-last">
          <h2>
            Event Management System <br />
            for Your <span>Events!</span>
          </h2>
        </div>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleGettingStarted}
        >
          GET STARTED NOW!
        </Button>
      </section>
    </React.Fragment>
  )
}
