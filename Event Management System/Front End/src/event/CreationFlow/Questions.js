import React from 'react'
import {
  List,
  ListItemIcon,
  Card,
  ListItem,
  ListItemText,
  CardContent,
} from '@material-ui/core'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
function Questions(props) {
  return (
    <React.Fragment>
      {props.questions.map((question, index) => (
        <Card key={index}>
          <CardContent>
              {(index + 1) + '. ' + question.content}
              <List dense={false}>
                {question.answers.map((answer, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <QuestionAnswerIcon />
                    </ListItemIcon>
                    <ListItemText primary={answer} />
                  </ListItem>
                ))}
              </List>
          </CardContent>
        </Card>
      ))}
    </React.Fragment>
  )
}

export default Questions
