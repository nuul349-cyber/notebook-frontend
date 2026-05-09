import { useState } from "react"
import noteService from '../services/notes'

const NoteForm = ({notes, setNotes}) => {
  const [newNote, setNewNote] = useState('')

  const addNote = (event) => {
      event.preventDefault()
      const noteObject = {
        content: newNote,
        important: Math.random() > 0.5,
      }
  
      noteService
        .create(noteObject)
        .then(returnedNote => {
          console.log(returnedNote);
          setNotes(notes.concat(returnedNote))
          setNewNote('')
        })
    }

  return (
    <form onSubmit={addNote}>
      <label htmlFor="noteInput">New note</label>
        <input id='noteInput' value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button type="submit">save</button>
    </form>
  )
}

export default NoteForm