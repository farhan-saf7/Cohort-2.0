import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {

  const [notes, setNotes] = useState([
    {
      title: "test title",
      description: "test description"
    }
  ])

  axios.get('http://localhost:3000/api/notes')
  .then((res)=>{
    setNotes(res.data.notes)
  })

  return (
    <>
      <div className='notes'>
        {
          notes.map(note => {
            return <div className='note'>
              <h1>title</h1>
              <p>description</p>
            </div>
          })
        }
      </div>
    </>
  )
}

export default App
