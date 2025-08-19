import { createFileRoute } from "@tanstack/react-router"
import { Provider } from "react-redux"

import { LoginForm } from "../components/auth"
import { store } from "../store/store"

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

