import { Suspense } from "react"
import { useParams } from "react-router-dom"
import { Loading } from "../../../component"
import { useSlide } from "../../../hooks"
import SlideForm from "./SlideForm"
import SlideProject from "./SlideProject"

const SlidePage = () => {
  const params = useParams<{ slideId: string }>()
  const { isPending, slides } = useSlide()
  return !params.slideId || params?.slideId === "new" ? (
    <SlideForm />
  ) : (
    <Suspense fallback={<Loading />}>
      {isPending && <Loading />}
      <SlideProject {...slides.find((item) => item.uid === params.slideId)!} />
    </Suspense>
  )
}

export default SlidePage
