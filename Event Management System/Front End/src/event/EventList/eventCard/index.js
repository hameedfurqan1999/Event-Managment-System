import React from 'react'
import { Link } from '@material-ui/core'
import './styles.css'
import moment from 'moment'

export default function EventCard(props) {
  const { id, title, description, date, time } = props
  return (
    <div className="card">
      <Link href={`/event/${id}`}>
        <h1>{title}</h1>
      </Link>
      <h2>Date and time:</h2>
      <p className="dateTime">
        {moment(date).format('MMMM Do YYYY')} {moment(time).format('h:mm:ss a')}
      </p>
      <p>{description}</p>
      <p>
        <Link href={`/event/${id}`}>
          <button>View event info</button>
        </Link>
      </p>
    </div>
  )
}
