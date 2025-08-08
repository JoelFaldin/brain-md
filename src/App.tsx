import { RouterProvider } from "@tanstack/react-router"

import router from "./main"

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
