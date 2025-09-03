import { ArrowRight } from "@icons/default"

import heroImage from "../../assets/heroImage.webp"

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[image:var(--gradient-hero)] overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/5 via-transparent to-[var(--secondary)]/5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[var(--primary)]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[var(--secondary)]/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center md:py-8">

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-[var(--muted)]/50 border border-border rounded-full text-sm">
                <span className="w-2 h-2 bg-[var(--primary)] rounded-full border-[var(--border)] mr-2 animate-pulse"></span>
                Under construction!
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Knowledge,
                <br />
                <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
                  Amplified
                </span>
              </h1>
              <p className="text-xl text-muted-[var(--foreground)] max-w-lg">
                Take the next step towards knowledge. Use the classical markdown format to store all of your thoughts.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="hidden items-center md:flex h-fit w-fit btn bg-[image:var(--gradient-primary)] hover:shadow-[0_0_12px_var(--glow-primary)] transition-colors">
                <span className="text-lg">Start writting</span>
                <ArrowRight className="ml-2 h-6 w-6" />
              </button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-[var(--muted-foreground)]">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[var(--primary)] rounded-full"></div>
                <span>No signup required</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[var(--secondary)] rounded-full"></div>
                <span>Works offline</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <img
                src={heroImage}
                alt="Code screen"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
            </div>

            <div className="absolute -top-6 -right-6 bg-[var(--card)] border border-[var(--border)] rounded-lg p-4 shadow-elevated">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[var(--primary)] rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Live Preview</span>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[var(--card)] border border-[var(--border)] rounded-lg p-4 shadow-elevated">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[var(--secondary)] rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Auto-Save</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero

