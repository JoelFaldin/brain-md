import React, { useRef, useState } from "react"

import Note from "../icons/Note"
import Plus from "../icons/Plus"
import Modal from "./Modal"
import NewNoteForm from "./NewNoteForm"
import EditorHeader from "./EditorHeader"
import Close from "../icons/Close";
import { useCreateNote } from "../hooks/useCreateNote";

interface EditorScreenInterface {
  activeNote: string | null,
}

const EditorScreen = ({ activeNote }: EditorScreenInterface) => {
  const [text, setText] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const lineNumbersRef = useRef<HTMLDivElement>(null)

  const lineNumbers = text.split('\n').map((_, index) => index + 1).join('\n')

  const syncScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (lineNumbersRef.current && textAreaRef.current) {
      lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  }

  const createNewNote = useCreateNote()

  return (
    <div className="flex-1 overflow-hidden relative">

      <EditorHeader />

      {activeNote ? (
        <div className="bg-[var(--card)]">
          <div className="flex w-full h-auto p-2 overflow-y-auto rounded-lg bg-[var(--card)]">
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

      <Modal open={isModalOpen} closeModal={() => setIsModalOpen(false)}>
        <NewNoteForm closeModal={() => setIsModalOpen(false)} createNote={createNewNote} />
        <span onClick={() => setIsModalOpen(false)}>
          <Close className="w-4 h-4 absolute top-4 right-4 hover:text-[var(--muted-foreground)] transition-colors cursor-pointer" />
        </span>
      </Modal>

    </div>
  )
}

export default EditorScreen