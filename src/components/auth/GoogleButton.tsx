import { useGoogleLogin, type TokenResponse } from "@react-oauth/google"
import { useNavigate } from "@tanstack/react-router"
import { useDispatch } from "react-redux"

import { Google } from "../../icons/brand"
import AuthProvider from "./AuthButton"
import { login } from "../../store/userSlice"
import type { UserInterface } from "@/interfaces/UserInterface"
import { authApi } from "@store/auth"

type GoogleErrorInterface = Pick<Error, 'message'> | unknown

const GoogleButton = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [googleOAuth] = authApi.useGoogleOAuthMutation()

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse: TokenResponse) => googleAuthHandler(tokenResponse),
    onError: (errorResponse: GoogleErrorInterface) => handleError(errorResponse),
  })

  const googleAuthHandler = async (tokenResponse: TokenResponse) => {
    try {

      const res = await googleOAuth(tokenResponse.access_token)
      const data = res.data;

      if (data) {
        const user: UserInterface = {
          name: data.name,
          email: data.email,
          picture: data.picture
        }

        console.log(user)
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