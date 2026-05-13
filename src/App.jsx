import { useState, useEffect, useRef } from 'react'
import Footer from './components/Footer'
import Note from './components/Note'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import noteService from './services/notes'
import Toggleable from './components/Toggleable'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    return loggedUserJSON
      ? JSON.parse(loggedUserJSON)
      : null
  })

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        console.log(initialNotes)
        setNotes(initialNotes)
      })
  }, [])
  
  useEffect(() => {
    if (user) {
      console.log(user)
      noteService.setToken(user.token)
    }
  }, [user])
  
  const notesToShow = showAll ? notes : notes.filter((note) => note.important)
  
  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(error => {
        console.log(error);
        
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )

        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const createNote = async (noteObject) => {
    noteFormRef.current.toggleVisibility()
    const returnedNote = await noteService.create(noteObject)
    console.log(returnedNote);
    setNotes(notes.concat(returnedNote))
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const loginForm = () => (
    <Toggleable buttonLabel='log in'>
      <LoginForm setUser={setUser} setErrorMessage={setErrorMessage}/>
    </Toggleable>
  )

  const noteFormRef = useRef()
  const noteForm = () => (
    <Toggleable buttonLabel='new note' ref={noteFormRef}>
      <NoteForm createNote={createNote} />
    </Toggleable>
  )

  return (
    <div>
      <h1>Notes app</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user && (
        <div>
          <p>logged in as: {user.name} </p>
          <button onClick={logOut}>Log out</button>
          {noteForm()}
        </div>
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)} />
        ))}
      </ul>
      <Footer />
    </div>
  )
}

export default App