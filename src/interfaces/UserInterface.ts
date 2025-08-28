export interface UserInterface {
  name: string,
  email: string,
  picture: string,
  token: string,
}

export type Nullable<T> = { [K in keyof T]: T[K] | null }

export interface LoginUser extends UserInterface {
  isLoggedIn: boolean,
}