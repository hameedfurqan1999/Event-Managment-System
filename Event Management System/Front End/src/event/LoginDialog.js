import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Paper,
  Tab,
  Tabs,
  Box,
  Typography,
  Link,
} from '@material-ui/core'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import PersonIcon from '@material-ui/icons/Person'
import { makeStyles } from '@material-ui/core/styles'
import Login from './../auth/login'
import Register from './../auth/register'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500,
  },
})

export default function AlertDialogSlide({
  open,
  handleClickOpen,
  handleClose,
  handleLogin,
}) {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          You need to login
        </DialogTitle>
        <DialogContent>
          <Paper square className={classes.root}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="secondary"
              aria-label="icon label tabs example"
            >
              <Tab icon={<PersonIcon />} label="LOGIN" />
              <Tab icon={<PersonAddIcon />} label="REGISTER" />
            </Tabs>
            <TabPanel value={value} index={0}>
              <Login handleLogin={handleLogin} />
              <Typography>
                If you don't have an account click&nbsp;
                <Link
                  href="#"
                  onClick={() => {
                    setValue(1)
                  }}
                  variant="body2"
                >
                  here
                </Link>
              </Typography>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Register handleLogin={handleLogin} />
              <Typography>
                If you already have an account click&nbsp;
                <Link
                  href="#"
                  onClick={() => {
                    setValue(0)
                  }}
                  variant="body2"
                >
                  here
                </Link>
              </Typography>
            </TabPanel>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
