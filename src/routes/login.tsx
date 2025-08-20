import { createFileRoute } from "@tanstack/react-router"
import { Provider } from "react-redux"

import { store } from "@store/store"
import { LoginForm } from "@components/auth"

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login() {
  return (
    <Provider store={store}>
      <LoginForm />
    </Provider>
  )
}

