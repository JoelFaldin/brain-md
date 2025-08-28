import { useGoogleLogin, type TokenResponse } from "@react-oauth/google"
import { useNavigate } from "@tanstack/react-router"
import { useDispatch } from "react-redux"

import { Google } from "../../icons/brand"
import AuthProvider from "./AuthButton"
import { login } from "../../store/userSlice"
import type { UserInterface } from "@/interfaces/UserInterface"
import { authApi } from "@store/auth"
import type { ExtendedAuthInterface } from "@/interfaces/AuthInterface"

type GoogleErrorInterface = Pick<Error, 'message'> | unknown

const GoogleButton = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [googleOAuth] = authApi.useGoogleOAuthMutation()
  const [backendOAuth] = authApi.useGoogleBackendOAuthMutation()

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse: TokenResponse) => {
      const res = await googleOAuth(tokenResponse.access_token)

      googleAuthHandler(res.data)
    },
    onError: (errorResponse: GoogleErrorInterface) => handleError(errorResponse),
  })

  const googleAuthHandler = async (response: ExtendedAuthInterface) => {
    try {

      const res = await backendOAuth({ email: response.email, name: response.name })
      const data = res.data;

      if (response && data) {
        const user: UserInterface = {
          name: response.name,
          email: response.email,
          picture: response.picture,
          token: data.token,
        }

        dispatch(login(user))

        navigate({
          to: "/editor"
        })
      }
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