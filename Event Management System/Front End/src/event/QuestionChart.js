import React from 'react'
import { Typography } from '@material-ui/core'
import { PieChart, Pie, Cell, Legend } from 'recharts'

function QuestionChart(props) {
  const { question } = props
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

  return (
    <React.Fragment>
      <Typography variant="h5">{question.content}</Typography>
      <PieChart width={400} height={400}>
        <Pie
          data={question.answers}
          cx={90}
          cy={140}
          labelLine={true}
          label
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {question.answers.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
          verticalAlign="top"
          align="right"
          height={36}
          layout="vertical"
        />
      </PieChart>
    </React.Fragment>
  )
}

export default QuestionChart
