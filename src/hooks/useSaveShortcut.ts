import { useEffect } from "react"
import { useDispatch } from "react-redux"
import type { UnknownAction } from "@reduxjs/toolkit"

import type { SaveContent } from "../interfaces/NoteInterface"

export const useSaveShortCut = (content: SaveContent, actionCreator: (payload: SaveContent) => UnknownAction) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        console.log("saving :D:D:D")
        dispatch(actionCreator(content))
      }
    }

    window.addEventListener("keydown", handler)

    return () => window.removeEventListener("keydown", handler)
  }, [actionCreator, content, dispatch])
}