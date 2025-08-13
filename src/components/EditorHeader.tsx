import { useSelector } from "react-redux"

import type { RootState } from "../store/store"
import EditorTab from "./EditorTab"

const EditorHeader = () => {
  const { notes } = useSelector(
    (state: RootState) => state.notes
  )

  return (
    <header className="flex-1">
      {
        notes.length > 0 && (
          <EditorTab />
        )
      }
    </header>
  )
}

export default EditorHeader