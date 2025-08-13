import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { NoteInterface } from "../interfaces/NoteInterface";

interface NotesState {
  notes: NoteInterface[],
  activeNoteId: number | null,
  isSidebarOpen: boolean,
}

const initialState: NotesState = {
  notes: [],
  activeNoteId: null,
  isSidebarOpen: true,
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<NoteInterface>) => {
      state.notes.push(action.payload)
      state.activeNoteId = action.payload.id
    },
    updateNote: (state, action: PayloadAction<{id: number; title?: string, content?: string}>) => {
      const note = state.notes.find(n => n.id === action.payload.id)

      if (note) {
        if (action.payload.title !== undefined) note.title = action.payload.title
        if (action.payload.content !== undefined) note.content = action.payload.content
      }
    },
    deleteNote: (state, action: PayloadAction<number | null>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload)

      if (state.activeNoteId === action.payload) {
        state.activeNoteId = null
      }
    },
    setActiveNote: (state, action: PayloadAction<number | null>) => {
      state.activeNoteId = action.payload
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
  toggleSidebar
} = notesSlice.actions

export default notesSlice.reducer