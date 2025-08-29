import type { NoteInterface } from "./NoteInterface";

export interface AuthInterface {
  response: string,
  token: string,
  name: string,
  email: string,
  picture: string,
  notes?: NoteInterface[],
}