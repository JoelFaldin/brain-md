import { createRoot, hydrateRoot } from "react-dom/client"

import App from "./App"
import { GoogleOAuthProvider } from "@react-oauth/google"

const rootElement = document.getElementById('root')!

if (rootElement.innerHTML) {
  hydrateRoot(rootElement, <App />)
} else {
  const root = createRoot(rootElement)
  root.render(
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  )
}
