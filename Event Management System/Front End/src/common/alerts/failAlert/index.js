import React, { Fragment } from 'react'
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@material-ui/lab/Alert';

function FailAlert(props) {  
    return (
        <Fragment>
            <Snackbar open={true} autoHideDuration={3000} onClose={props.onClose}>
                <Alert severity="error">
                    {props.msg}
                </Alert>
            </Snackbar>
        </Fragment>
    )
  }

export default FailAlert;
