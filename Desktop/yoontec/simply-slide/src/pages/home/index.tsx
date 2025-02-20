import { useCallback } from "react"
import pkg from "../../../package.json"
import { useAuth, useNavi } from "../../hooks"

const Home = () => {
  const navi = useNavi()
  const { user } = useAuth()
  const onButton = useCallback(() => {
    navi(user ? "my" : "login")
  }, [navi, user])
  return (
    <>
      <title>{pkg.name.toUpperCase()}</title>
      <div className="flex flex-col gap-y-5 justify-center items-center h-screen">
        <h1 className="text-4xl font-black selection:bg-blue-600 selection:text-white">
          Sick of making Slides?
        </h1>
        <button
          className="bg-blue-600 rounded p-3 px-5 text-white cursor-pointer hover:bg-blue-500 active:bg-blue-400 active:scale-98 transition"
          onClick={onButton}
        >
          Start Simply Slides
        </button>
      </div>
    </>
  )
}

export default Home
