import React from 'react'

const TopicCard = ({ topic, onDelete }) => {
  return (
    <div>
      <h3>{topic.title}</h3>
      <p>{topic.subject}</p>
      <button onClick={() => onDelete(topic.id)}>🗑️</button>
    </div>
  )
}

export default TopicCard
