import { useState } from "react"
import MDEditor from "@uiw/react-md-editor"
import rehypeSanitize from "rehype-sanitize"

import Modal from "../Modal"
import NewNoteForm from "../NewNoteForm"
import { Close, Note, Plus } from "../../icons/default";
import { useCreateNote } from "../../hooks/useCreateNote";
import { EditorHeader } from "./"

interface EditorScreenInterface {
  activeNote: string | null,
}

const EditorScreen = ({ activeNote }: EditorScreenInterface) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editorValue, setEditorValue] = useState<string | undefined>()

  const createNewNote = useCreateNote()

  return (
    <div className="flex-1 overflow-hidden relative">

      <EditorHeader />

      {activeNote ? (
        <div className="bg-[var(--card)] h-screen">
          <div className="flex w-full h-full p-2 overflow-y-auto rounded-lg bg-[var(--card)]">
            <MDEditor
              value={editorValue}
              onChange={setEditorValue}
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]]
              }}
              className="w-full h-full"
            />
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