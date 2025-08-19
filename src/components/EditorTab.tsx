import { useDispatch, useSelector } from "react-redux"

import type { RootState } from "../store/store"
import { setActiveNote } from "../store/noteSlice"

const EditorTab = () => {
  const { openedNotes, activeNoteId } = useSelector(
    (state: RootState) => state.notes
  )

  const dispatch = useDispatch()

  const handleActiveTab = (id: string) => {
    dispatch(setActiveNote(id))
  }

  return (
    <div className="flex flex-row w-full bg-[var(--background)] border-b border-[var(--border)] relative">
    {
      openedNotes.map(note => (
        <div
          key={`title:${note.id}-${note.title}`}
          onClick={() => handleActiveTab(note.id)}
          className={`px-4 py-2 border-r border-[var(--border)] border-t-2
            ${activeNoteId === note.id ? "bg-[var(--card)] border-t-white z-10 relative -mb-[1px]" : "bg-[var(--background)]"}`}
        >
          <span className="text-lg">{note.title}.md</span>
        </div>
      ))
    }
    </div>
  )
}

export default EditorTab