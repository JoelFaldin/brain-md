import { useState } from "react"

interface NewNoteInterface {
  closeModal: () => void,
  createNote: (title: string) => void,
}

const EditorNewNote = ({ closeModal, createNote }: NewNoteInterface) => {
  const [noteName, setNoteName] = useState('')

  const handleCreateNote = () => {
    createNote(noteName)
    closeModal()
  }

  return (
    <div className="flex flex-col gap-3 w-md">
      <h3 className="font-bold text-xl">Create New Note</h3>
      <input
        value={noteName}
        onChange={event => setNoteName(event.target.value)}
        placeholder="Enter note title..."
        className="p-2 rounded-lg bg-transparent border border-[var(--border)]"
        autoFocus
      />

      <section className="flex flex-row gap-4 justify-end">
        <button
          onClick={closeModal}
          className="p-2 border border-[var(--border)] rounded-md bg-[var(--card)] hover:bg-[var(--primary)] transition-colors cursor-pointer"
        >
          <span className="text-white">Cancel</span>
        </button>
        <button
          onClick={handleCreateNote}
          disabled={!noteName}
          className="p-2 rounded-md bg-[var(--primary)] hover:bg-[var(--primary)]/80 disabled:bg-[var(--primary)]/30 text-black disabled:text-black/70 transition-colors cursor-pointer disabled:cursor-default"
        >
          Create Note
        </button>
      </section>

    </div>
  )
}

export default EditorNewNote