import { useCallback, useEffect, useState } from "react"
import { AppForm, TextInput, useModal } from "../../../component"
import { AiOutlineCheck, AiOutlineClose, AiOutlineEdit, AiOutlineSetting } from "react-icons/ai"
import alertStore from "../../../zustand/alertStore"
import { useSlide } from "../../../hooks"

const ProjectHeader = (slide: SimplySlide) => {
  const [title, setTitle] = useState(slide.title)
  const [isTitleEditing, setIsTitleEditing] = useState(false)
  const handler = () => setIsTitleEditing((prev) => !prev)
  const Title = TextInput()

  const { alert } = alertStore()
  const { slideHandler } = useSlide()

  const Modal = useModal()
  const onSubmit = useCallback(() => {
    if (title === slide.title) {
      return alert("변경사항이 없습니다.", [
        { onPress: Title.focus, text: "계속 수정" },
        { text: "수정 취소", onPress: handler },
      ])
    }
    slideHandler("UPDATE", { ...slide, title }, handler)
  }, [alert, Title, title, slide, slideHandler])

  useEffect(() => {
    if (isTitleEditing) {
      Title.focus()
      return () => {
        Title.focus()
      }
    }
  }, [isTitleEditing, Title])
  return (
    <div className="flex gap-x-2.5 items-center">
      <div className="flex-1">
        {isTitleEditing ? (
          <AppForm className="flex flex-row gap-x-2.5" onSubmit={onSubmit}>
            <div className="flex-1">
              <Title.Component
                value={title}
                onChangeText={setTitle}
                props={{
                  className: "h-8 bg-gray-50 rounded p-2.5",
                }}
              />
            </div>
            <button className="text-left rounded bg-blue-500 text-white w-8 h-8 px-2.5 hover:opacity-80 active:opacity-50 hover:shadow-md flex justify-between items-center">
              <AiOutlineCheck />
            </button>
            <button
              className="text-left rounded bg-gray-50 w-8 h-8 px-2.5 hover:opacity-80 active:opacity-50 hover:shadow-md flex justify-between items-center"
              type="button"
              onClick={handler}
            >
              <AiOutlineClose />
            </button>
          </AppForm>
        ) : (
          <button
            className="flex-1 text-left rounded bg-gray-50 h-8 px-2.5 hover:opacity-80 active:opacity-50 hover:shadow-md flex justify-between items-center gap-x-5 font-light"
            onClick={handler}
          >
            {slide.title} <AiOutlineEdit />
          </button>
        )}
      </div>

      <button
        className="h-8 w-8 rounded bg-gray-50 flex items-center justify-center text-md hover:opacity-80 active:opacity-50 hover:shadow-md"
        onClick={Modal.handler}
      >
        <AiOutlineSetting />
      </button>
      <Modal.Component>Hello!</Modal.Component>
    </div>
  )
}

export default ProjectHeader
