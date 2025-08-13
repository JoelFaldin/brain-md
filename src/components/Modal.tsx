import type { ReactNode } from "react"
import { createPortal } from "react-dom"

interface ModalInterface {
  children: ReactNode,
  open: boolean,
}

const Modal = ({ children, open }: ModalInterface) => {
  if (!open) return null
  
  return createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/70 z-[1000]" />
      <div className="p-4 rounded-md border border-[var(--border)] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--background)] z-[1000]">
        {children}
      </div>
    </>,
    document.getElementById("portal")!
  )
}

export default Modal