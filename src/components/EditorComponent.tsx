import { useDispatch, useSelector } from "react-redux"

import EditorSidebar from "./EditorSidebar"
import EditorScreen from "./EditorScreen"
import PanelLeft from "../icons/PanelLeft"
import type { AppDispatch, RootState } from "../store/store"
import { toggleSidebar } from "../store/noteSlice"

const EditorComponent = () => {
  const { notes, isSidebarOpen, activeNoteId } = useSelector(
    (state: RootState) => state.notes
  )

  const dispatch = useDispatch<AppDispatch>()

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar())
  }

  return (
    <div className="flex flex-row">
      <EditorSidebar isOpen={isSidebarOpen} toggleSidebar={handleToggleSidebar} notes={notes} />

      <div className="absolute bottom-10 left-3 z-10 p-1 bg-transparent hover:bg-[var(--primary)] rounded-full cursor-pointer transition-colors">
        {!isSidebarOpen && (
          <span onClick={handleToggleSidebar}>
            <PanelLeft className="h-8 w-8" />
          </span>
        )}
      </div>

      <EditorScreen activeNote={activeNoteId} />
    </div>
  )
}

export default EditorComponent