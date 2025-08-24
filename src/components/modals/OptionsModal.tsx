import { useEffect, useRef } from "react"

import { Delete, Edit } from "@icons/default"

interface OptionsModalInterface {
  x: number,
  y: number,
  noteIdOptions: string | null,
  onClose: () => void,
  triggerDeleteModal: (arg: boolean) => void,
}

const OptionsModal = ({ x, y, noteIdOptions, onClose, triggerDeleteModal }: OptionsModalInterface) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside as unknown as EventListener)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside as unknown as EventListener)
    }
  }, [onClose])

  const edit = () => {
    console.log("editing!", noteIdOptions)
  }

  return (
    <div
      ref={modalRef}
      className="absolute rounded-lg p-1 z-50 text-sm bg-[var(--card)] border shadow-xl"
      style={{ top: y, left: x }}
    >
      <ul className="flex flex-col gap-1">
        <li>
          <button onClick={edit} className="flex flex-row gap-2 w-full rounded-md hover:bg-[var(--muted)] p-2">
            <Edit className="h-5 w-5" />
            Edit
          </button>
        </li>
        <li>
          <button onClick={() => triggerDeleteModal(true)} className="flex flex-row gap-2 w-full rounded-md hover:bg-[var(--muted)] p-2">
            <Delete className="h-5 w-5" />
            Delete
          </button>
        </li>
      </ul>
    </div>
  )
}

export default OptionsModal