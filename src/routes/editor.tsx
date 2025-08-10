import { createFileRoute } from "@tanstack/react-router"

import EditorSidebar from "../components/EditorSidebar"

export const Route = createFileRoute('/editor')({
  component: Editor,
})

function Editor() {
  return (
    <>
      <EditorSidebar />
      {/* <p>hello from editor :D</p> */}
    </>
  )
}