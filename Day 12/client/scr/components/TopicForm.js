import React, { useState } from 'react'

const TopicForm = ({ onNewTopic }) => {
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newTopic = { title, subject }
    onNewTopic(newTopic)
    setTitle('')
    setSubject('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Topic Title"
      />
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
      />
      <button type="submit">Add Topic</button>
    </form>
  )
}

export default TopicForm
