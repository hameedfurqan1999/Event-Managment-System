import React, { useState } from 'react'
import { TextField, Card, CardContent, Chip, Box } from '@material-ui/core'

function QuestionCreation(props) {
  const [answerContent, setAnswerContent] = useState('')

  function handleFormSubmit(event) {
    event.preventDefault()
    props.addAnswer(answerContent, props.indexProp)
    setAnswerContent('')
  }

  return (
    <Box my={3}>
      <Card variant="outlined">
        <CardContent>{props.question.content}</CardContent>
        <CardContent>
          {props.question.answers.map((answer, index) => (
            <Box key={index} component="span" m={1}>
              <Chip
                label={answer}
                onDelete={() => {
                  props.deleteAnswer(props.indexProp, index)
                }}
              />
            </Box>
          ))}
        </CardContent>
        <CardContent>
          <form onSubmit={handleFormSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Add New Answer"
              name="answer"
              autoComplete="answer"
              autoFocus
              value={answerContent}
              onChange={(event) => setAnswerContent(event.target.value)}
            />
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

export default QuestionCreation
