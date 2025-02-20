import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/home"
import Login from "../pages/login"
import { useAuth } from "../hooks"
import { Loading } from "../component"
import MyPage from "../pages/my"
import SlidePage from "../pages/my/[slideId]"

const AppRouter = () => {
  const { initialized } = useAuth()
  return !initialized ? (
    <Loading />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="my">
          <Route index element={<MyPage />} />
          <Route path=":slideId" element={<SlidePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
