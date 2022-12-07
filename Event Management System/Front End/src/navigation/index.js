import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from '../auth/login'
import Register from '../auth/register'
import Home from '../home'
import Header from '../layout/header'
import Footer from '../layout/footer'
import EventDashboard from './../event/EventDashboard.js'
import OrganizationDashboard from './../organization/OrganizationDashboard.js'
import EventCreate from './../event/EventCreate.js'
import EventInvitationForm from './../event/EventInvitationForm.js'
import auth from './../services/auth.service'
import MeetingCreate from './../meeting/MeetingCreate.js'
import toast from 'toasted-notes'
import PaymentCreate from './../payment/'


//import MeetingBox from "./../meeting/index.js";

//        <Route path="/meeting/create" component={MeetingCreate} />
//
//         <Route path="/meeting/box" component={MeetingBox} />

function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(auth.isLoggedIn())

  return (
    <Router>
      <Header
        isLoggedIn={isLoggedIn}
        handleLogout={() => {
          setIsLoggedIn(false)
        }}
      ></Header>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/login"
          render={() => (
            <Login
              handleLogin={() => {
                setIsLoggedIn(true)
              }}
              redirect={true}
            />
          )}
        />
        <Route
          path="/register"
          render={() => (
            <Register
              handleLogin={() => {
                setIsLoggedIn(true)
                toast.notify('You are now logged in', {
                  position: 'bottom-right',
                  duration: 3,
                })
              }}
              redirect={true}
            />
          )}
        />
        <Route
          path="/event/invitation/:eventId"
          component={EventInvitationForm}
        />
        <Route path="/event/create" component={EventCreate} />
        <Route path="/event/:id" component={EventDashboard} />
        <Route path="/meeting/create" component={MeetingCreate} />
        <Route path="/payment/create" component={PaymentCreate} />
        <Route path="/organization/:id" component={OrganizationDashboard} />


        
      </Switch>
      <Footer></Footer>
    </Router>
  )
}

export default Navigation
