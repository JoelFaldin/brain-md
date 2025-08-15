export interface NoteInterface {
  id: string,
  title: string,
  content?: string,
}

export interface AddNoteInterface {
  id: string,
  title: string,
}

export interface NotesState {
  notes: NoteInterface[],
  activeNoteId: string | null,
  openedNotes: NoteInterface[],
  isSidebarOpen: boolean,
}