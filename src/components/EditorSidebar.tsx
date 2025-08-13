import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";

import Close from "../icons/Close"
import Logout from "../icons/Logout"
import Note from "../icons/Note"
import Plus from "../icons/Plus"
import Search from "../icons/Search"
import type { AddNoteInterface, NoteInterface } from "../interfaces/NoteInterface"
import Modal from "./Modal"
import NewNoteForm from "./NewNoteForm"
import { addNote, openTab } from "../store/noteSlice"

interface EditorSidebarInterface {
  isOpen: boolean,
  toggleSidebar: () => void,
  notes: NoteInterface[],
  openNote: (id: string) => void,
}

const EditorSidebar = ({ isOpen, toggleSidebar, notes, openNote }: EditorSidebarInterface) => {  
  const [isModalOpen, setIsModalOpen] = useState(false)

  const dispatch = useDispatch()

  const handleCreateNewNote = (title: string) => {
    const newNote: AddNoteInterface = {
      id: uuidv4(),
      title,
    }

    dispatch(addNote(newNote))
    dispatch(openTab(newNote.id))
  }

  return (
    <aside className={`${isOpen ? "w-80 opacity-100" : "w-0 opacity-0"} h-screen bg-[var(--card)] flex flex-col gap-y-3 transition-all duration-250 ease-in-out border-r border-[var(--border)]`}>
      <div className={`${isOpen ? "block" : "hidden"}`}>

        <section className="flex flex-row gap-x-3 p-4 items-center border-b border-[var(--border)]">
          <div className="bg-[var(--muted-foreground)] rounded-full w-8 h-8 p-2" />
          <span className="flex-1">
            <div>John Doe</div>
            <div>johnd@example.com</div>
          </span>
          <div className="bg-transparent p-2 hover:bg-[var(--primary)] rounded-xl transition-colors">
            <Logout className="h-5 w-5" />
          </div>
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
              onClick={() => setIsModalOpen(true)}
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
              notes.length > 0 ?notes.map((note) => (
                <li
                  key={`noteList${note.title}-${note.id}`}
                  onClick={() => openNote(note.id)}
                  className="flex flex-row items-center justify-start gap-x-3 pl-5 p-2 rounded-md bg-transparent hover:bg-[var(--primary)]/80 border border-[var(--border)] cursor-pointer transition-colors"
                >
                  <Note className="w-5 h-5" />
                  {note.title}
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

      <Modal open={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <NewNoteForm closeModal={() => setIsModalOpen(false)} createNote={handleCreateNewNote} />
        <span onClick={() => setIsModalOpen(false)}>
          <Close className="w-4 h-4 absolute top-4 right-4 hover:text-[var(--muted-foreground)] transition-colors cursor-pointer" />
        </span>
      </Modal>
    </aside>
  )
}

export default EditorSidebar