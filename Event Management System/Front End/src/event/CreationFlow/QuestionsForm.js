import React from 'react'
import { Container, TextField } from '@material-ui/core'
import QuestionCreation from './QuestionCreation.js'

function QuestionsForm(props) {
  return (
    <Container maxWidth="sm">
      {props.questions.map((question, index) => (
        <QuestionCreation
          key={index}
          indexProp={index}
          question={question}
          addAnswer={props.addAnswer}
          deleteAnswer={props.deleteAnswer}
        />
      ))}

      <form onSubmit={props.addQuestion}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Add New Question"
          name="question"
          autoComplete="question"
          autoFocus
          value={props.newQuestionContent}
          onChange={(event) => props.setNewQuestionContent(event.target.value)}
        />
      </form>
    </Container>
  )
}

export default QuestionsForm
