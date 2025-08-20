import { Email, Github } from "@icons/brand"

const Footer = () => {
  const footerLinks = [
    {
      text: 'Home',
      url: '/'
    },
    {
      text: 'About',
      url: '/about'
    },
    {
      text: 'Sign in',
      url: '/login'
    },
    {
      text: 'Get Started',
      url: '/'
    }
  ]

  return (
    <footer className="bg-[var(--muted)]/50 border-t border-[var(--border)]">
      <div className="container mx-auto px-4">
        <div className="py-16 px-16 grid md:grid-cols-2 gap-8">

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {/* Logo */}
              <span className="text-2xl font-bold bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                BrainMD
              </span>
            </div>
            <p className="text-[var(--muted-foreground)] leading-relaxed">
              Get a second brain available at every time, with this powerful note-taking app.
              <br />
              Transform ideas into knowledge.
            </p>
          </div>

          <div className="flex md:flex-row flex-col justify-end space-x-16">
            <ul className="flex flex-row items-center justify-center space-x-4">
              {
                footerLinks.map(({ text, url }) => (
                  <li key={`${text}:${url}`} className="items-center">
                    <a href={url} className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                      {text}
                    </a>
                  </li>
                ))
              }
            </ul>
            <ul className="flex flex-row items-center justify-center space-x-4">
              <li className="rounded-full p-2 bg-[var(--primary)]/20 hover:bg-[var(--primary)]/60 transition-colors">
                <a href="mailto:joelfaldin@gmail.com" target="_blank">
                  <Email className="h-5 w-5 color-white" />
                </a>
              </li>
              <li className="rounded-full p-2 bg-[var(--primary)]/20 hover:bg-[var(--primary)]/60 transition-colors">
                <a href="https://github.com/JoelFaldin/brain-md" target="_blank">
                  <Github className="h-5 w-5 color-white" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-6 py-6 border-t border-[var(--muted)] text-center">
          <p>
            <span>Design by </span>
            <a href="https://lovable.dev/" target="_blank" className="underline text-[var(--glow-primary)]">
              Lovable
            </a>! ❤️
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer