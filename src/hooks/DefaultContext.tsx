import { useContext, createContext } from "react"

export const initialDefault: DefaultContext = {
  height: 0,
  scroll: 0,
  width: 0,
}

export const defaultContext = createContext(initialDefault)

export const useDefault = () => useContext(defaultContext)
