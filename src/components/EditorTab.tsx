import { useSelector } from "react-redux"

import type { RootState } from "../store/store"

const EditorTab = () => {
  const { openedNotes } = useSelector(
    (state: RootState) => state.notes
  )

  return (
    <>
    {
      openedNotes.map(note => (
        <div key={`${note.id}-${note.title}`} className="p-2 bg-transparent">
          {note.title}
        </div>
      ))
    }
    </>
  )
}

export default EditorTab