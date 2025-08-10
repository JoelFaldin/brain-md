import Logout from "../icons/Logout"
import Note from "../icons/Note"
import Plus from "../icons/Plus"
import Search from "../icons/Search"

const EditorSidebar = () => {
  const notes = [
    "Project ideas",
    "CS Notes",
    "Lunch",
  ]

  return (
    <aside className="w-80 h-screen bg-[var(--card)] flex flex-col gap-y-3">

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
          <button className="w-full p-2 rounded-md flex flex-row items-center justify-center bg-[var(--primary)] hover:bg-[var(--primary)]/80 transition-colors cursor-pointer">
            <Plus className="h-4 w-4 mr-2" />
            New Note
          </button>
        </div>
      </section>

      <section className="p-2 flex-1">
        <span className="text-[var(--muted-foreground)] text-sm mb-4 block">Notes</span>
        <ul className="flex flex-col gap-y-1 w-full">
          {
            notes.length > 0 ?notes.map((text) => (
              <li key={`noteList${text}`} className="flex flex-row items-center justify-start gap-x-3 pl-5 p-2 rounded-md bg-transparent hover:bg-[var(--primary)]/80 border border-[var(--border)] cursor-pointer transition-colors">
                <Note className="w-5 h-5" />
                {text}
              </li>
            ))
            : <li>No notes created (yet).</li>
          }
        </ul>
      </section>

    </aside>
  )
}

export default EditorSidebar