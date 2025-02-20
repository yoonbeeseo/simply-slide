import { useContext, createContext } from "react"

export const initialSlide: SlideContext = {
  isPending: false,
  slides: [],
  slideHandler: async () => ({}),
}
export const slideContext = createContext(initialSlide)

export const useSlide = () => useContext(slideContext)
