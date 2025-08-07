import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import Header from '../components/Header'
import Hero from '../components/Hero'


export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <Hero />

      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
