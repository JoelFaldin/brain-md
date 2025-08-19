import type { ReactNode } from "react"

interface AuthProviderInterface {
  children?: ReactNode,
  text: string,
  onClick: () => void,
}

const AuthProvider = ({ children, text, onClick }: AuthProviderInterface) => {
  return (
    <button type="button" onClick={onClick} className="border border-[var(--border)]/30 bg-[var(--background)] hover:bg-[var(--primary)] text-white hover:text-[var(--muted)] rounded-md p-2 flex items-center justify-center space-x-2 cursor-pointer transition-colors">
      {children}
      <p>{text}</p>
    </button>
  )
}

export default AuthProvider