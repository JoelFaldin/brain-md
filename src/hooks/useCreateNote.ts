import { useDispatch } from "react-redux"
import { v4 as uuidv4 } from "uuid"

import type { AddNoteInterface } from "@/interfaces"
import { addNote, openTab } from "@store/noteSlice"

export const useCreateNote = () => {
  const dispatch = useDispatch()

    const createNewNote = (title: string) => {
    const newNote: AddNoteInterface = {
      id: uuidv4(),
      title,
    }

    dispatch(addNote(newNote))
    dispatch(openTab(newNote.id))
  }

  return createNewNote
}