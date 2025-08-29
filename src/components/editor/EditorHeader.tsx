import { useDispatch, useSelector } from "react-redux"

import type { RootState } from "@store/store"
import { setActiveNote } from "@store/noteSlice"
import { createSelector } from "@reduxjs/toolkit"

const EditorHeader = () => {
  const { notes, openedNotes, activeNoteId } = useSelector(
    (state: RootState) => state.notes
  )

  const selectNotesById = createSelector(
    (state: RootState) => state.notes.notes,
    (notes) => Object.fromEntries(notes.map(n => [n.id, n]))
  )

  const notesById = useSelector(selectNotesById)

  const dispatch = useDispatch()

  const handleActiveTab = (id: string) => {
    dispatch(setActiveNote(id))
  }

  return (
    <header>
      {
        notes.length > 0 && (
          <div className="flex flex-row w-full bg-[var(--background)] border-b border-[var(--border)] relative">
          {
            openedNotes.map(note => {
              const isActive = activeNoteId === note.id
              const isDirty = notesById[note.id]?.dirty

              return (
                <div
                  key={`title:${note.id}-${note.title}`}
                  onClick={() => handleActiveTab(note.id)}
                  className={`flex flex-row items-center gap-2 px-4 py-2 border-r border-[var(--border)] border-t-2 cursor-pointer
                    ${isActive ? "bg-[var(--card)] border-t-white z-10 relative -mb-[1px]" : "bg-[var(--background)]"}`}
                >
                  <span className="text-lg select-none">{note.title}.md</span>
                  {
                    isDirty && (
                      <div className="h-2 w-2 rounded-full bg-white" />
                    )
                  }
                </div>
              )
            })
          }
          </div>
        )
      }
    </header>
  )
}

export default EditorHeader