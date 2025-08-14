import { useGoogleLogin, type TokenResponse } from "@react-oauth/google"
import Google from "../icons/Google"
import AuthProvider from "./AuthButton"
import { useNavigate } from "@tanstack/react-router"

type GoogleErrorInterface = Pick<Error, 'message'> | unknown

const GoogleButton = () => {
  const navigate = useNavigate()

  const login = useGoogleLogin({
    onSuccess: (tokenResponse: TokenResponse) => googleAuthHandler(tokenResponse),
    onError: (errorResponse: GoogleErrorInterface) => handleError(errorResponse),
  })

  const googleAuthHandler = async (tokenResponse: TokenResponse) => {
    try {
      const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`
        }
      })

      const user = await res.json()
      console.log(user)

      navigate({
        to: "/editor"
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleError = (errorResponse: GoogleErrorInterface) => {
    console.log(errorResponse)
  }

  return (
    <AuthProvider text="Continue with google" onClick={() => login()}>
      <Google className="w-4 h-4" />
    </AuthProvider>
  )
}

export default GoogleButton