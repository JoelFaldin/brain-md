import { useGoogleLogin, type TokenResponse } from "@react-oauth/google"
import { useNavigate } from "@tanstack/react-router"
import { useDispatch } from "react-redux"

import { Google } from "@icons/brand"
import AuthProvider from "./AuthButton"
import { login } from "@store/userSlice"
import { authApi } from "@store/auth"
import type { AuthInterface, UserInterface } from "@/interfaces"

type GoogleErrorInterface = Pick<Error, 'message'> | unknown

const GoogleButton = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [backendOAuth] = authApi.useGoogleBackendOAuthMutation()

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse: TokenResponse) => {
      const res = await backendOAuth({ token: tokenResponse.access_token })

      googleAuthHandler(res.data)
    },
    onError: (errorResponse: GoogleErrorInterface) => handleError(errorResponse),
  })

  const googleAuthHandler = async (response: AuthInterface) => {
    try {
      const user: UserInterface = {
        name: response.name,
        email: response.email,
        picture: response.picture,
        token: response.token,
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