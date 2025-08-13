import React, { useRef, useState } from "react"
import { useDispatch } from "react-redux"

import Note from "../icons/Note"
import Plus from "../icons/Plus"
import Modal from "./Modal"
import NewNoteForm from "./NewNoteForm"
import { addNote } from "../store/noteSlice"
import type { NoteInterface } from "../interfaces/NoteInterface"

interface EditorScreenInterface {
  activeNote: number | null,
}

const EditorScreen = ({ activeNote }: EditorScreenInterface) => {
  const [text, setText] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const dispatch = useDispatch()

  const textAreaRef = useRef(null)
  const lineNumbersRef = useRef<HTMLDivElement>(null)

  const lineNumbers = text.split('\n').map((_, index) => index + 1).join('\n')

  const syncScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (lineNumbersRef.current && textAreaRef.current) {
      lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  }

  const handleCreateNewNote = (title: string) => {
    const newNote: NoteInterface = {
      id: 1,
      title,
    }

    dispatch(addNote(newNote))
  }

  return (
    <div className="flex-1 p-4 overflow-hidden relative">

      {activeNote ? (
        <div className="">
          <div className="flex w-full h-full p-4 overflow-y-auto rounded-lg shadow">
              <div
                ref={lineNumbersRef}
                className="text-right pr-4 text-gray-400 dark:text-gray-500 text-lg leading-relaxed font-mono overflow-hidden resize-none"
                style={{ width: '2em' }}
              >
              {lineNumbers}
            </div>

            <textarea
              ref={textAreaRef}
              className="flex-1 resize-none outline-none text-lg leading-relaxed bg-transparent font-mono"
              placeholder="Start typing now..."
              value={text}
              onChange={e => setText(e.target.value)}
              onScroll={syncScroll}
              rows={lineNumbers.split('\n').length}
            >
              
            </textarea>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <span className="flex flex-col justify-center items-center gap-5 max-w-md">
            <Note className="w-36 h-36 text-[var(--muted-foreground)]" />
            <h2 className="font-bold text-2xl">Welcome to the editor!</h2>
            <p className="text-[var(--muted-foreground)] text-center">Start creating notes of your favorite topics! Or you can create a brand new one.</p>
            <button
              className="w-sm flex flex-row justify-center items-center gap-4 border border-[var(--border)] p-2 rounded-md bg-[var(--primary)] hover:bg-[var(--primary)]/80 cursor-pointer transition-colors"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="w-5 h-5" />
              <span>New note</span>
            </button>
          </span>
        </div>
      )}

      <Modal open={isModalOpen}>
        <NewNoteForm closeModal={() => setIsModalOpen(false)} createNote={handleCreateNewNote} />
      </Modal>

    </div>
  )
}

export default EditorScreen