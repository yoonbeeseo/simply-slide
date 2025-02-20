import { useNavigate } from "react-router-dom"

export default function useNavi() {
  const router = useNavigate()
  const navi = (path: AppRoute) => router(path[0] === "/" ? path : `/${path}`)
  return navi
}
