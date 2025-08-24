export interface NoteInterface {
  id: string,
  title: string,
  content?: string,
  dirty: boolean,
}

export interface AddNoteInterface {
  id: string,
  title: string,
}

export interface NotesState {
  notes: NoteInterface[],
  activeNoteId: string | null,
  activeNoteContent: string | null,
  openedNotes: NoteInterface[],
  isSidebarOpen: boolean,
}

export interface SaveContent {
  id: string,
  content: string
}

export interface Dirty {
  id: string,
  dirty: boolean,
}