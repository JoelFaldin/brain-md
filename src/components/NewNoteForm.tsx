import { useState } from "react"

interface NewNoteInterface {
  closeModal: () => void,
}

const NewNoteForm = ({ closeModal }: NewNoteInterface) => {
  const [noteName, setNoteName] = useState('')

  const handleCreateNote = () => {
    console.log(":D")
  }

  return (
    <div className="flex flex-col gap-3 w-md">
      <h3 className="font-bold text-xl">Create New Note</h3>
      <input
        value={noteName}
        onChange={event => setNoteName(event.target.value)}
        placeholder="Enter note title..."
        className="p-2 rounded-lg bg-transparent border border-[var(--border)]"
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
          className="p-2 bg-[var(--primary)] rounded-md hover:bg-[var(--primary)]/80 transition-colors cursor-pointer"
        >
          <span className="text-black">Create Note</span>
        </button>
      </section>

    </div>
  )
}

export default NewNoteForm