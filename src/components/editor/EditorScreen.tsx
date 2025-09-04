import { useEffect, useState } from "react"
import MDEditor from "@uiw/react-md-editor"
import rehypeSanitize from "rehype-sanitize"
import { useDispatch, useSelector } from "react-redux"

import { Close, Note, Plus } from "@icons/default";
import { useCreateNote, useSaveShortCut } from "@hooks/index";
import { EditorHeader, EditorNewNote } from "./"
import { makeDirty, saveNote } from "@store/noteSlice";
import type { RootState } from "@store/store";
import { Modal } from "@components/modals";

interface EditorScreenInterface {
  activeNote: string,
}

const EditorScreen = ({ activeNote }: EditorScreenInterface) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editorValue, setEditorValue] = useState<string | undefined>()

  const { notes } = useSelector(
    (state: RootState) => state.notes
  )

  const createNewNote = useCreateNote()
  const dispatch = useDispatch()

  useSaveShortCut({ id: activeNote, content: editorValue ?? "" }, saveNote)

  useEffect(() => {
    const noteContent = notes.find(n => n.id === activeNote)

    setEditorValue(noteContent?.content ?? "")
  }, [activeNote, notes])

  const handleChange = (event: string | undefined) => {
    const findNote = notes.find(n => n.id === activeNote)

    if (findNote && !findNote.dirty) {
      dispatch(makeDirty({ id: activeNote, dirty: true }))
    }
    setEditorValue(event)
  }

  return (
    <div className="flex-1 overflow-hidden relative">

      <EditorHeader />

      {activeNote ? (
        <div className="bg-[var(--card)]">
          <div className="flex w-full h-auto p-2 overflow-y-auto rounded-lg bg-[var(--card)]">
            <MDEditor
              value={editorValue}
              onChange={(event) => handleChange(event)}
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]]
              }}
              className="w-full"
              height={800}
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
        <EditorNewNote closeModal={() => setIsModalOpen(false)} createNote={createNewNote} />
        <span onClick={() => setIsModalOpen(false)}>
          <Close className="w-4 h-4 absolute top-4 right-4 hover:text-[var(--muted-foreground)] transition-colors cursor-pointer" />
        </span>
      </Modal>

    </div>
  )
}

export default EditorScreen