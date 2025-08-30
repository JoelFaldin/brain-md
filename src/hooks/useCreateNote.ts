import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"

import type { AddNoteInterface } from "@/interfaces"
import { addNote, openTab, replaceNoteId } from "@store/noteSlice"
import { useCreateNoteMutation } from "@store/api"
import type { RootState } from "@store/store"

export const useCreateNote = () => {
  const { email } = useSelector(
    (state: RootState) => state.user
  )

  const { notes } = useSelector(
    (state: RootState) => state.notes
  )

  const dispatch = useDispatch()
  const [createNoteMutation] = useCreateNoteMutation()

  const createNewNote = async (title: string) => {
    const nameMatchingNotes = notes.filter(note => note.title === title)

    const newNote: AddNoteInterface = {
      id: uuidv4(),
      title: nameMatchingNotes.length !== 0 ? `${title} (${nameMatchingNotes.length})` : title,
    }

    dispatch(addNote(newNote))
    dispatch(openTab(newNote.id))
    
    if (email) {
      try {
        const createdNote = await createNoteMutation({ title: newNote.title, content: "", email: email }).unwrap()
        dispatch(replaceNoteId({ tempId: newNote.id, realId: createdNote.note.id }))
      } catch (error) {
        console.log(error)
      }
    }
  }

  return createNewNote
}