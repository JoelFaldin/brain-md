import { configureStore } from "@reduxjs/toolkit";

import notesReducer from "./noteSlice"
import userReducer from "./userSlice"
import type { NotesState } from "../interfaces/NoteInterface";
import type { LoginUser, Nullable } from "../interfaces/UserInterface";

export type RootState = {
  notes: NotesState,
  user: Nullable<LoginUser>,
}

const loadState = (): RootState | undefined => {
  try {
    const serializedState = localStorage.getItem("reduxState")
    return serializedState ? JSON.parse(serializedState) : undefined
  } catch (error) {
    console.log("Couldnt load state", error)
    return undefined
  }
}

const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem("reduxState", serializedState)
  } catch (error) {
    console.log("Couldnt save state", error)
  }
}

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    user: userReducer,
  },
  preloadedState: loadState()
})

store.subscribe(() => {
  saveState({
    notes: store.getState().notes,
    user: store.getState().user,
  })
})

export type AppDispatch = typeof store.dispatch