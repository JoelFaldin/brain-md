import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { AddNoteInterface, NoteInterface } from "../interfaces/NoteInterface";

interface NotesState {
  notes: NoteInterface[],
  activeNoteId: string | null,
  openedNotes: NoteInterface[],
  isSidebarOpen: boolean,
}

const initialState: NotesState = {
  notes: [],
  activeNoteId: null,
  openedNotes: [],
  isSidebarOpen: true,
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<AddNoteInterface>) => {
      const newNote: NoteInterface = {
        id: action.payload.id,
        title: action.payload.title,
      }
      
      state.notes.push(newNote)
      state.activeNoteId = newNote.id
    },
    updateNote: (state, action: PayloadAction<{id: string; title?: string, content?: string}>) => {
      const note = state.notes.find(n => n.id === action.payload.id)

      if (note) {
        if (action.payload.title !== undefined) note.title = action.payload.title
        if (action.payload.content !== undefined) note.content = action.payload.content
      }
    },
    deleteNote: (state, action: PayloadAction<string | null>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload)

      if (state.activeNoteId === action.payload) {
        state.activeNoteId = null
      }
    },
    setActiveNote: (state, action: PayloadAction<string | null>) => {
      state.activeNoteId = action.payload
    },
    openTab: (state, action: PayloadAction<string | null>) => {
      const note = state.notes.find(n => n.id === action.payload)

      if (note) {
        state.openedNotes.push(note)
      }
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    }
  }
})

export const {
  addNote,
  updateNote,
  deleteNote,
  setActiveNote,
  openTab,
  toggleSidebar
} = notesSlice.actions

export default notesSlice.reducer