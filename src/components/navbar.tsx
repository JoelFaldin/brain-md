import GitHub from "../icons/Github"

const Navbar = () => {
  return (
    <header className="bg-[var(--background)] w-full sticky border-b border-[var(--border)] backdrop-blur-sm">
      <div className="contianer flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <div className="relative">
              {/* Logo here */}
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <a className="text-[var(--foreground)]/80 hover:text-[var(--foreground)] transition-colors cursor-pointer">
            Features
          </a>
          <a className="text-[var(--foreground)]/80 hover:text-[var(--foreground)] transition-colors cursor-pointer">
            About
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <a href="https://github.com/JoelFaldin/brain-md" target="_blank" className="hidden md:flex cursor-pointer">
            <GitHub className="h-5 w-5" />
          </a>
          <a className="hidden md:flex h-fit w-fit btn  hover:bg-[var(--glow-primary)] transition-colors">
            Sign In
          </a>
          <a className="hidden md:flex h-fit w-fit btn bg-[image:var(--gradient-primary)] hover:shadow-[0_0_12px_var(--glow-primary)] transition-colors">
            Get Started
          </a>
        </div>
      </div>
    </header>
  )
}

export default Navbar
