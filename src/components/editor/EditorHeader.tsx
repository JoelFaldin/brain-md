import { useSelector } from "react-redux"

import type { RootState } from "../../store/store"
import { EditorTab } from "./"

const EditorHeader = () => {
  const { notes } = useSelector(
    (state: RootState) => state.notes
  )

  return (
    <header>
      {
        notes.length > 0 && (
          <EditorTab />
        )
      }
    </header>
  )
}

export default EditorHeader