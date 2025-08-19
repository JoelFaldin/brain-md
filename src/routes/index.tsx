import { createFileRoute } from '@tanstack/react-router'

import { Footer, Header, Hero } from '../components/home'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <>
      <Header />
      <Hero />
      <Footer />
    </>
  )
}
