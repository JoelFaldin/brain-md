import { Link } from "@tanstack/react-router"
import Google from "../icons/Google"
import AuthProvider from "./AuthButton"
import Return from "../icons/Return"

const LoginForm = () => {
  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
      <Link to="/" className="absolute top-2 left-2 p-2 flex flex-row gap-x-2 items-center text-white hover:text-[var(--muted)] hover:bg-[var(--primary)] border border-[var(--border)] rounded-md transition-colors">
        <Return />
        <span className="font-bold">Return</span>
      </Link>

      <div className="w-full max-w-md">
        <section className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[image:var(--primary)]">BrainMD</h1>
          <p className="text-[var(--muted-foreground)]">Log in to your account</p>
        </section>

        <section className="border border-[var(--border)] rounded-md bg-[var(--card)] text-center p-4">
          <span className="p-6 space-y-2">
            <h2 className="font-bold text-xl text-[var(--foreground)]">Welcome back</h2>
            <p className="text-md text-[var(--muted-foreground)]">Choose your prefered log-in method</p>
          </span>

          <AuthProvider text="Continue with google">
            <Google className="w-4 h-4" />
          </AuthProvider>
          
          <hr className="px-6 my-6 mx-auto" />

          <p className="text-[var(--muted-foreground)] text-sm py-2">Don't want to log in? Don't worry!</p>
          <AuthProvider text="Continue as a guest" />
        </section>

      </div>
    </div>
  )
}

export default LoginForm
