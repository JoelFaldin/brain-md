import { useGoogleLogin, type TokenResponse } from "@react-oauth/google"
import { useNavigate } from "@tanstack/react-router"
import { useDispatch } from "react-redux"

import { Google } from "../../icons/brand"
import AuthProvider from "./AuthButton"
import { login } from "../../store/userSlice"
import type { UserInterface } from "../../interfaces/UserInterface"

type GoogleErrorInterface = Pick<Error, 'message'> | unknown

const GoogleButton = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const googleLogin = useGoogleLogin({
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

      const userData = await res.json()

      const user: UserInterface = {
        name: userData.name,
        email: userData.email,
        picture: userData.picture
      }

      dispatch(login(user))

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
    <AuthProvider text="Continue with google" onClick={() => googleLogin()}>
      <Google className="w-4 h-4" />
    </AuthProvider>
  )
}

export default GoogleButton