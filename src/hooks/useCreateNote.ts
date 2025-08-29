import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"

import type { AddNoteInterface } from "@/interfaces"
import { addNote, openTab } from "@store/noteSlice"
import { useCreateNoteMutation } from "@store/api"
import type { RootState } from "@store/store"

export const useCreateNote = () => {
  const { email } = useSelector(
    (state: RootState) => state.user
  )

  const dispatch = useDispatch()
  const [createNoteMutation] = useCreateNoteMutation()


  const createNewNote = (title: string) => {
    const newNote: AddNoteInterface = {
      id: uuidv4(),
      title,
    }

    if (email) {
      createNoteMutation({ title, content: "", email: email })
    }


    dispatch(addNote(newNote))
    dispatch(openTab(newNote.id))
  }

  return createNewNote
}