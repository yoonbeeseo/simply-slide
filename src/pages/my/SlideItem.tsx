import { Link } from "react-router-dom"
import { getFromNow } from "../../utils"

interface Props extends ItemProps<SimplySlide> {}

const SlideItem = ({ index, item }: Props) => {
  console.log(`border-${item.themeColor}-600`)
  return (
    <li>
      <Link
        to={item.uid}
        className={`relative overflow-hidden rounded p-2.5 flex justify-between w-full font-light cursor-pointer hover:shadow-md items-center transition ${
          item.themeBg === "zinc"
            ? "bg-zinc-600 text-white hover:opacity-90 "
            : `bg-white text-black border border-${item.themeColor}-600 hover:opacity-60 `
        }`}
      >
        <span
          className={`absolute top-0 left-0 w-1 h-full bg-${item.themeColor}-600`}
        />
        <p>SlideItem: {item.title} </p>
        <p className="text-xs">{getFromNow(item.createdAt)}</p>
      </Link>
    </li>
  )
}

export default SlideItem
