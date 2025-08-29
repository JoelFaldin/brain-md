import { useDispatch } from "react-redux"
import { useState } from "react"

import { deleteNote, openTab, setActiveNote } from "@store/noteSlice"
import type { NoteInterface } from "@/interfaces"
import { Close, Note, Options } from "@icons/default"
import { Modal, OptionsModal } from "@components/modals"
import { useDeleteNoteMutation } from "@store/api"

interface EditorSidebarNoteInterface {
  note: NoteInterface,
  noteId: string,
}

interface ModalPositionInterface {
  x: number,
  y: number,
}

const EditorSidebarNote = ({ note, noteId }: EditorSidebarNoteInterface) => {
  const [modalPosition, setModalPosition] = useState<ModalPositionInterface | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const dispatch = useDispatch()

  const handleOpenNote = (id: string) => {
    dispatch(setActiveNote(id))
    dispatch(openTab(id))
  }

  const handleNoteOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    setModalPosition({
      x: event.clientX,
      y: event.clientY,
    })
  }

  const closeOptionsModal = () => {
    setModalPosition(null)
  }

  const [deleteNoteMutation] = useDeleteNoteMutation()

  const handleDeleteNote = () => {
    setIsDeleteOpen(false)
    closeOptionsModal()

    deleteNoteMutation({ id: noteId })
    dispatch(deleteNote(noteId))
  }

  return (
    <>
      <li
        key={`noteList${note.title}-${note.id}`}
        onClick={() => handleOpenNote(note.id)}
        className="flex flex-row items-center justify-between gap-x-3 pl-5 p-2 rounded-md bg-transparent hover:bg-[var(--primary)]/80 border border-[var(--border)] cursor-pointer transition-colors"
      >
        <span className="flex flex-row items-center gap-3 select-none">
          <Note className="w-5 h-5" />
          {note.title}
        </span>
        <button onClick={(event) => handleNoteOptions(event)}>
          <Options className="bg-transparent hover:bg-[var(--primary)]/90 rounded-md transition-colors cursor-pointer" />
        </button>
      </li>

      {
        modalPosition && (
          <OptionsModal
            x={modalPosition.x}
            y={modalPosition.y}
            noteIdOptions={noteId}
            onClose={() => setModalPosition(null)}
            triggerDeleteModal={setIsDeleteOpen}
          />
        )
      }

      <Modal open={isDeleteOpen} closeModal={() => setIsDeleteOpen(false)}>
        <div className="flex flex-col gap-3" onClick={e => e.stopPropagation()}>
          <h2 className="font-bold text-xl">Confirm note deletion</h2>
          <p>You will never be able to see it again.</p>

          <span className="flex flex-row gap-3 justify-end">
            <button
              className="p-2 border border-[var(--border)] rounded-md bg-[var(--card)] hover:bg-[var(--primary)] transition-colors cursor-pointer"
              onClick={() => setIsDeleteOpen(false)}
            >
              <span className="text-white">Cancel</span>
            </button>
            <button
              className="p-2 rounded-md bg-[var(--primary)] hover:bg-[var(--primary)]/80 disabled:bg-[var(--primary)]/30 text-black disabled:text-black/70 transition-colors cursor-pointer disabled:cursor-default"
              onClick={handleDeleteNote}
            >
              I understand
            </button>
          </span>
        </div>
        <span onClick={() => setIsDeleteOpen(false)}>
          <Close className="w-4 h-4 absolute top-4 right-4 hover:text-[var(--muted-foreground)] transition-colors cursor-pointer" />
        </span>
      </Modal>
    </>
  )
}

export default EditorSidebarNote