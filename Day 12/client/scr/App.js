import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TopicCard from './components/TopicCard'
import TopicForm from './components/TopicForm'

const App = () => {
  const [topics, setTopics] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/topics')
      .then(response => setTopics(response.data.topics))
      .catch(error => console.error(error))
  }, [])

  const handleDeleteTopic = (id) => {
    axios.delete(`http://localhost:5000/topics/${id}`)
      .then(() => {
        setTopics(topics.filter(topic => topic.id !== id))
      })
      .catch(error => console.error(error))
  }

  const handleNewTopic = (newTopic) => {
    axios.post('http://localhost:5000/topics', newTopic)
      .then(response => {
        setTopics([...topics, response.data])
      })
      .catch(error => console.error(error))
  }

  return (
    <div>
      <h1>My JEE Prep Tracker</h1>
      <TopicForm onNewTopic={handleNewTopic} />
      {topics.map(topic => (
        <TopicCard key={topic.id} topic={topic} onDelete={handleDeleteTopic} />
      ))}
    </div>
  )
}

export default App
