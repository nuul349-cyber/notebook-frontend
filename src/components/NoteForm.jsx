import { useState } from "react"

const NoteForm = ({createNote}) => {
  const [newNote, setNewNote] = useState('')

  const addNote = async (event) => {
    event.preventDefault()
    createNote({
      content: newNote,
      important: true,
    })
    setNewNote('')
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