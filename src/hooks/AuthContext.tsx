import { useContext, createContext } from "react"

export const initialAuth: AuthContext = {
  user: null,
  initialized: false,
  isPending: false,
  updateUser: () => ({}),
  fetchUser: () => {},
}

export const authContext = createContext(initialAuth)

export const useAuth = () => useContext(authContext)
