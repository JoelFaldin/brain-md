import { useDispatch, useSelector } from "react-redux"

import type { AppDispatch, RootState } from "../../store/store"
import { openTab, setActiveNote, toggleSidebar } from "../../store/noteSlice"
import { EditorScreen, EditorSidebar } from "."
import { PanelLeft } from "../../icons/default"

const EditorComponent = () => {
  const { notes, isSidebarOpen, activeNoteId } = useSelector(
    (state: RootState) => state.notes
  )

  const dispatch = useDispatch<AppDispatch>()

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar())
  }

  const handleOpenNote = (id: string) => {
    dispatch(setActiveNote(id))
    dispatch(openTab(id))
  }

  return (
    <div className="flex flex-row bg-[var(--card)]">
      <EditorSidebar isOpen={isSidebarOpen} toggleSidebar={handleToggleSidebar} notes={notes} openNote={handleOpenNote} />

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