import React, { Fragment } from 'react'
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@material-ui/lab/Alert';

function SuccessAlert(props) {
    
    return (
        <Fragment>
            <Snackbar open={true} autoHideDuration={3000} onClose={props.onClose}>
                <Alert severity="success">
                    {props.msg}
                </Alert>
            </Snackbar>
        </Fragment>
    )
  }


export default SuccessAlert;
