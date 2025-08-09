import type { ReactNode } from "react"

interface AuthProviderInterface {
  children?: ReactNode,
  text: string,
}

const AuthProvider = ({ children, text }: AuthProviderInterface) => {
  return (
    <div className="border border-[var(--border)]/30 bg-[var(--background)] hover:bg-[var(--primary)] text-white hover:text-[var(--muted)] rounded-md p-2 flex items-center justify-center space-x-2 cursor-pointer transition-colors">
      {children}
      <p>{text}</p>
    </div>
  )
}

export default AuthProvider