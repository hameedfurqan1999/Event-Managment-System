import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { Link, useHistory } from 'react-router-dom'
import { useStyles } from './styles'
import auth from './../../services/auth.service'
import CrateOrganization from './../../organization/CreateOrganization'

function Header(props) {
  const classes = useStyles()
  const [organizationFormOpen, setOrganizationFormOpen] = useState(false)
  let history = useHistory()

  return (
    <AppBar position="static" styles={{ fontsize: '50em'}}>
      <Toolbar>
        <Link to="/">
          <Button className={classes.navLink}>Home</Button>
        </Link>
        {props.isLoggedIn ? (
          <React.Fragment>
            <Link to="/event/create">
              <Button className={classes.navLink}>Create event</Button>
            </Link>
            <Link to="/meeting/create">
              <Button className={classes.navLink}>Create meeting</Button>
            </Link>
            <Link to="#">
              <Button
                className={classes.navLink}
                onClick={() => {
                  setOrganizationFormOpen(true)
                }}
              >
                Create organization
              </Button>
              <CrateOrganization
                open={organizationFormOpen}
                handleClose={() => {
                  setOrganizationFormOpen(false)
                }}
              />
            </Link>
            <div className={classes.right}>
              <Link to="#">
                <Button className={classes.navLink}>{auth.parse().name}</Button>
              </Link>
              <Link to="#">
                <Button
                  className={classes.navLink}
                  onClick={() => {
                    auth.logout()
                    props.handleLogout()
                    history.push('/login')
                  }}
                >
                  Logout
                </Button>
              </Link>
            </div>
          </React.Fragment>
        ) : (
          <div className={classes.right}>
            <Link to="/login">
              <Button className={classes.navLink}>Login</Button>
            </Link>
            <Link to="/register">
              <Button className={classes.navLink}>Register</Button>
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
