import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"

import EditorSidebar from "../components/EditorSidebar"
import PanelLeft from "../icons/PanelLeft"

export const Route = createFileRoute('/editor')({
  component: Editor,
})

function Editor() {
    const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <EditorSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="absolute top-4 left-4 z-10 p-1 bg-transparent hover:bg-[var(--primary)] rounded-full cursor-pointer transition-colors">
        {!isOpen && (
          <span onClick={toggleSidebar}>
            <PanelLeft className="h-8 w-8" />
          </span>
        )}
      </div>
    </>
  )
}