import ProjectHeader from "./ProjectHeader"

const SlideProject = (slide: SimplySlide) => {
  return (
    <div className="p-5">
      <ProjectHeader {...slide} />
    </div>
  )
}

export default SlideProject
