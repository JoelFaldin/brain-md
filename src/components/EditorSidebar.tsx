import Logout from "../icons/Logout"
import Plus from "../icons/Plus"
import Search from "../icons/Search"

const EditorSidebar = () => {
  return (
    <aside className="w-80 bg-[var(--card)] flex flex-col gap-y-3">

      <section className="flex flex-row gap-x-3 p-4 items-center border-b border-[var(--border)]">
        <div className="bg-[var(--muted-foreground)] rounded-full w-5 h-5 p-2" />
        <span>
          <div>John Doe</div>
          <div>johnd@example.com</div>
        </span>
        <div className="bg-transparent p-2 hover:bg-[var(--primary)] rounded-xl transition-colors">
          <Logout className="h-5 w-5" />
        </div>
      </section>

      {/* <section className="flex flex-col">
        <span className="relative block mx-auto">
          <Search className="absolute left-7 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
          <input
            placeholder="Search notes..."
            className="pl-10 bg-[var(--card)] border border-[var(--border)] rounded-md p-2 m-4"
          />
        </span>
        <button className="bg-[var(--primary)] p-2 m-4 rounded-md flex flex-row items-center justify-center gap-x-3">
          <Plus className="h-4 w-4 text-[var(--muted)]" />
          <span className="text-[var(--muted)]">New Note</span>
        </button>
      </section> */}

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

    </aside>
  )
}

export default EditorSidebar