import { Link } from "@tanstack/react-router"
import GitHub from "../icons/Github"

const Header = () => {
  return (
    <header className="bg-[var(--background)] w-full sticky top-0 border-b border-[var(--border)] backdrop-blur-sm z-50">
      <div className="contianer flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <div className="relative">
              {/* Logo here */}
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-[var(--foreground)]/80 hover:text-[var(--foreground)] transition-colors cursor-pointer">
            Home
          </Link>
          <Link to="/about" className="text-[var(--foreground)]/80 hover:text-[var(--foreground)] transition-colors cursor-pointer">
            About
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <a href="https://github.com/JoelFaldin/brain-md" target="_blank" className="hidden md:flex cursor-pointer">
            <GitHub className="h-5 w-5" />
          </a>
          <a className="hidden md:flex h-fit w-fit btn-text hover:bg-[var(--glow-primary)] transition-colors">
            <span className="text-md">Sign In</span>
          </a>
          <a className="hidden md:flex h-fit w-fit btn bg-[image:var(--gradient-primary)] hover:shadow-[0_0_12px_var(--glow-primary)] transition-colors">
            <span className="text-md">Get Started</span>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
