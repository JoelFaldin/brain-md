import { useDispatch, useSelector } from "react-redux"

import { PanelLeft } from "@icons/default"
import { EditorScreen, EditorSidebar } from "./"
import type { AppDispatch, RootState } from "@store/store"
import { toggleSidebar } from "@store/noteSlice"

const EditorComponent = () => {
  const { notes, isSidebarOpen, activeNoteId } = useSelector(
    (state: RootState) => state.notes
  )

  const dispatch = useDispatch<AppDispatch>()

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar())
  }

  return (
    <div className="flex flex-row bg-[var(--card)]">
      <EditorSidebar isOpen={isSidebarOpen} toggleSidebar={handleToggleSidebar} notes={notes} />

      <div className="absolute bottom-10 left-3 z-10 p-1 bg-transparent hover:bg-[var(--primary)] rounded-full cursor-pointer transition-colors">
        {!isSidebarOpen && (
          <span onClick={handleToggleSidebar}>
            <PanelLeft className="h-8 w-8" />
          </span>
        )}
      </div>

      <EditorScreen activeNote={activeNoteId!} />
    </div>
  )
}

export default EditorComponent