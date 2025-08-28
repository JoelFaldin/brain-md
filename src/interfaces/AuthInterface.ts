export interface AuthInterface {
  email: string,
  name: string,
}

export interface ExtendedAuthInterface extends AuthInterface {
  picture: string,
}