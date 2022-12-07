import React from 'react'
import { Box, Typography, Paper } from '@material-ui/core'

function OrganizationDetails({ title, description, owner, organization }) {
  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Typography variant="h5">{title}</Typography>
          <Typography>{description}</Typography>
          <Box>
            Owned by:
            <Typography variant="subtitle2" gutterBottom>
              {owner.firstName} {owner.lastName}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default OrganizationDetails
