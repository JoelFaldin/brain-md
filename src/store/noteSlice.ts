import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { AddNoteInterface, NotesState, SaveContent, Dirty } from "@/interfaces";
import type { NoteInterface, NoteInterfaceDirty, ReplaceNoteInterface } from "@/interfaces/NoteInterface";

const initialState: NotesState = {
  notes: [],
  activeNoteId: null,
  activeNoteContent: null,
  openedNotes: [],
  isSidebarOpen: true,
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<AddNoteInterface>) => {
      const newNote: NoteInterfaceDirty = {
        id: action.payload.id,
        title: action.payload.title,
        dirty: false,
      }

      state.notes.push(newNote)
      state.activeNoteId = newNote.id
    },
    injectNotes: (state, action: PayloadAction<NoteInterface[]>) => {
      const notes = action.payload.map(notes => ({
        ...notes,
        dirty: false,
      }))

      state.notes = notes
      state.activeNoteId = null
    },
    updateNote: (state, action: PayloadAction<{id: string; title?: string, content?: string}>) => {
      const note = state.notes.find(n => n.id === action.payload.id)

      if (note) {
        if (action.payload.title !== undefined) note.title = action.payload.title
        if (action.payload.content !== undefined) note.content = action.payload.content
        note.dirty = true
      }
    },
    deleteNote: (state, action: PayloadAction<string | null>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload)

      if (state.activeNoteId === action.payload) {
        state.activeNoteId = null
      }

      // Removing note from opened tabs if exists and autofocusing next tab:
      state.openedNotes = state.openedNotes.filter(note => note.id !== action.payload)

      if (state.openedNotes.length != 0) {
        state.activeNoteId = state.openedNotes[0].id
      } else {
        state.activeNoteId = null
      }
    },
    setActiveNote: (state, action: PayloadAction<string | null>) => {
      state.activeNoteId = action.payload
    },
    openTab: (state, action: PayloadAction<string>) => {
      if (state.openedNotes.some(n => n.id === action.payload)) return

      const note = state.notes.find(n => n.id === action.payload)

      if (note) {
        state.openedNotes.push(note)
      }
    },
    replaceNoteId: (state, action: PayloadAction<ReplaceNoteInterface>) => {
      const { tempId, realId } = action.payload
      const note = state.notes.find(n => n.id === tempId)
      const openedNote = state.openedNotes.find(n => n.id === tempId)

      if (note) note.id = realId
      if (openedNote) openedNote.id = realId
      state.activeNoteId = realId
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    saveNote: (state, action: PayloadAction<SaveContent>) => {
      const note = state.notes.find(n => n.id === action.payload.id)

      if (note) {
        note.content = action.payload.content
        note.dirty = false
      }
    },
    makeDirty: (state, action: PayloadAction<Dirty>) => {
      const note = state.notes.find(n => n.id === action.payload.id)
      
      if (note) {
        note.dirty = action.payload.dirty
      }
    },
    clearNotes: (state) => {
      state.notes = []
      state.openedNotes = []
    }
  }
})

export const {
  addNote,
  injectNotes,
  updateNote,
  deleteNote,
  setActiveNote,
  openTab,
  replaceNoteId,
  toggleSidebar,
  saveNote,
  makeDirty,
  clearNotes,
} = notesSlice.actions

export default notesSlice.reducer