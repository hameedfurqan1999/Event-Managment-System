import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  Card,
  Box,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
} from '@material-ui/core'
import { api } from './../config/axios'
import moment from 'moment'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
})

export default function OrganizationFeed(props) {
  const classes = useStyles()
  const [posts, setPosts] = useState([])
  const [content, setContent] = useState('')

  function createNewPost() {
    api
      .post(`/organization/${props.organizationId}/post/create`, {
        content,
      })
      .then(({ data }) => {
        if (data.success) {
          setPosts([data.post, ...posts])
          setContent('')
        }
      })
      .catch(console.error)
  }

  useEffect(() => {
    api
      .get(`/organization/${props.organizationId}/post`)
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          setPosts(res.data.posts)
        }
      })
      .catch(console.error)
  }, [props.organizationId])

  return (
    <Box my={4}>
      <Grid container>
        <Grid item lg={2} md={2} sm={false}></Grid>
        <Grid item lg={8} md={8} sm={12}>
          <Box mb={2}>
            <Grid container>
              <Grid item xs={10}>
                <TextField
                  label="Create a new post"
                  multiline
                  fullWidth
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={createNewPost}
                >
                  Create
                </Button>
              </Grid>
            </Grid>
          </Box>

          {posts.map((post) => (
            <Box mb={3} key={post._id}>
              <Card className={classes.root}>
                <CardContent>
                  <Typography variant="subtitle2" gutterBottom>
                    {post.content}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    {moment(post.createdAt).format('LLLL')}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Grid>
        <Grid item lg={2} md={2} sm={false}></Grid>
      </Grid>
    </Box>
  )
}
