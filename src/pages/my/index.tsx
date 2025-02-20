import { useCallback, useOptimistic } from "react"
import { useAuth, useNavi, useSlide } from "../../hooks"
import { Button } from "../../component"
import SlideItem from "./SlideItem"
import { AiOutlinePlus } from "react-icons/ai"

const MyPage = () => {
  const { user } = useAuth()
  const { slides } = useSlide()
  const navi = useNavi()

  const onAdd = useCallback(() => navi("my/new"), [navi])
  return (
    <div className="p-5 flex flex-col items-start gap-y-5 h-screen">
      <div className="flex justify-between w-full">
        <Button.Simple className="p-5">Hi, {user?.email} !</Button.Simple>
        <ul className="flex gap-x-2.5 items-center">
          <li>
            <button
              className="w-10 h-10 bg-zinc-50 flex justify-center items-center rounded cursor-pointer hover:bg-zinc-100 hover:shadow-md hover:opacity-90 active:opacity-50 active:scale-95 transition"
              onClick={onAdd}
            >
              <AiOutlinePlus />
            </button>
          </li>
        </ul>
      </div>
      <ul className="w-full h-full gap-y-2.5 flex flex-col overflow-y-auto">
        {slides.map((slide, index) => (
          <SlideItem key={slide.uid} index={index} item={slide} />
        ))}
        <Button.Simple onClick={onAdd}>
          Click here to start Simply-Slide
        </Button.Simple>
      </ul>
    </div>
  )
}

export default MyPage
