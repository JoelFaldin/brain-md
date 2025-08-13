import { createFileRoute } from "@tanstack/react-router"
import { Provider } from "react-redux"

import { store } from "../store/store"
import EditorComponent from "../components/EditorComponent"

export const Route = createFileRoute('/editor')({
  component: Editor,
})

function Editor() {
  return (
    <Provider store={store}>
      <EditorComponent />
    </Provider>
  )
}