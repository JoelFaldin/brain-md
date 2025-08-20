import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "@tanstack/react-router"

import Modal from "@components/Modal";
import NewNoteForm from "@components/NewNoteForm";
import type { NoteInterface } from "@/interfaces/NoteInterface"
import { useCreateNote } from "../../hooks/useCreateNote";
import type { RootState } from "@store/store"
import { logout } from "@store/userSlice"
import OptionsModal from "@components/OptionsModal"
import { Close, Logout, Note, Options, Plus, Search, UserProfile } from "@icons/default"

interface EditorSidebarInterface {
  isOpen: boolean,
  toggleSidebar: () => void,
  notes: NoteInterface[],
  openNote: (id: string) => void,
}

interface ModalPositionInterface {
  x: number,
  y: number,
}

const EditorSidebar = ({ isOpen, toggleSidebar, notes, openNote }: EditorSidebarInterface) => {  
  const [isCreateOpen, setIsCreateModal] = useState(false)
  const [modalPosition, setModalPosition] = useState<ModalPositionInterface | null>(null)
  const [noteIdOptions, setNoteIdOptions] = useState<string | null>(null)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { name, email, picture } = useSelector(
    (state: RootState) => state.user
  )

  const createNewNote = useCreateNote()

  const handleLogout = () => {
    dispatch(logout())
    navigate({
      to: "/"
    })
  }

  const handleNoteOptions = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    event.stopPropagation()

    setNoteIdOptions(id)

    setModalPosition({
      x: event.clientX,
      y: event.clientY,
    })
  }

  const closeOptionsModal = () => {
    setModalPosition(null)
  }

  return (
    <aside className={`${isOpen ? "w-80 opacity-100" : "w-0 opacity-0"} h-screen bg-[var(--card)] flex flex-col gap-y-3 transition-all duration-250 ease-in-out border-r border-[var(--border)]`}>
      <div className={`${isOpen ? "block" : "hidden"}`}>

        <section className="flex flex-row gap-x-3 p-4 items-center border-b border-[var(--border)]">
          {
            picture ? (
              <img src={picture!} className="rounded-full w-12 h-12 p-2" />
            ) : (
              <UserProfile className="w-8 h-8" />
            )
          }
          <span className="flex-1 flex flex-col">
            <span>{ name }</span>
            <span className="text-sm text-[var(--muted-foreground)]">{ email }</span>
          </span>
          <button onClick={handleLogout} className="bg-transparent p-2 hover:bg-[var(--primary)] rounded-xl transition-colors cursor-pointer">
            <Logout className="h-5 w-5" />
          </button>
        </section>

        <section>
          <div className="p-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
              <input
                placeholder="Search notes..."
                className="pl-9 p-2 border border-[var(--border)] w-full"
              />
            </div>
            <button
              onClick={() => setIsCreateModal(true)}
              className="w-full p-2 rounded-md flex flex-row items-center justify-center bg-[var(--primary)] hover:bg-[var(--primary)]/80 transition-colors cursor-pointer"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Note
            </button>
          </div>
        </section>

        <section className="p-2 flex-1">
          <span className="text-[var(--muted-foreground)] text-sm mb-4 block">Notes</span>
          <ul className="flex flex-col gap-y-1 w-full">
            {
              notes.length > 0 ? notes.map((note) => (
                <li
                  key={`noteList${note.title}-${note.id}`}
                  onClick={() => openNote(note.id)}
                  className="flex flex-row items-center justify-between gap-x-3 pl-5 p-2 rounded-md bg-transparent hover:bg-[var(--primary)]/80 border border-[var(--border)] cursor-pointer transition-colors"
                >
                  <span className="flex flex-row items-center gap-3 select-none">
                    <Note className="w-5 h-5" />
                    {note.title}
                  </span>
                  <button onClick={(event) => handleNoteOptions(event, note.id)}>
                    <Options className="bg-transparent hover:bg-[var(--primary)]/90 rounded-md transition-colors cursor-pointer" />
                  </button>
                </li>
              ))
              : <li>No notes created (yet).</li>
            }
          </ul>
        </section>

        <button type="button" onClick={toggleSidebar} className="absolute p-1 bg-transparent hover:bg-[var(--primary)] rounded-full bottom-10 left-3 cursor-pointer transition-colors">
          <Close className="h-8 w-8" />
        </button>

      </div>

      <Modal open={isCreateOpen} closeModal={() => setIsCreateModal(false)}>
        <NewNoteForm closeModal={() => setIsCreateModal(false)} createNote={createNewNote} />
        <span onClick={() => setIsCreateModal(false)}>
          <Close className="w-4 h-4 absolute top-4 right-4 hover:text-[var(--muted-foreground)] transition-colors cursor-pointer" />
        </span>
      </Modal>

      {
        modalPosition && (
          <OptionsModal
            x={modalPosition.x}
            y={modalPosition.y}
            noteIdOptions={noteIdOptions}
            onClose={closeOptionsModal}
          />
        )
      }
    </aside>
  )
}

export default EditorSidebar