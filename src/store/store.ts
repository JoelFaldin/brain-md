import { configureStore } from "@reduxjs/toolkit";

import notesReducer from "./noteSlice"
import userReducer from "./userSlice"
import { api } from "./api";
import type { LoginUser, NotesState, Nullable } from "@/interfaces";

export type RootState = {
  notes: NotesState,
  user: Nullable<LoginUser>,
}

// const loadState = (): RootState | undefined => {
//   try {
//     const serializedState = localStorage.getItem("reduxState")
//     return serializedState ? JSON.parse(serializedState) : undefined
//   } catch (error) {
//     console.log("Couldnt load state", error)
//     return undefined
//   }
// }

// const saveState = (state: RootState) => {
//   try {
//     const serializedState = JSON.stringify(state)
//     localStorage.setItem("reduxState", serializedState)
//   } catch (error) {
//     console.log("Couldnt save state", error)
//   }
// }

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  // preloadedState: loadState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

// store.subscribe(() => {
//   saveState({
//     notes: store.getState().notes,
//     user: store.getState().user,
//   })
// })

export type AppDispatch = typeof store.dispatch