import { useCallback, useMemo, useState } from "react"
import { AppForm, Button, Select, TextInput } from "../../../component"
import alertStore from "../../../zustand/alertStore"
import { useNavi, useSlide } from "../../../hooks"

interface Props extends FormProps<SimplySlide> {}

const SlideForm = ({ onCancel, payload }: Props) => {
  const initialSlide = useMemo<SimplySlide>(
    () =>
      payload ?? {
        title: "",
        themeBg: "zinc",
        themeColor: "blue",
        uid: "",
        createdAt: "",
      },
    []
  )

  const [slide, setSlide] = useState(initialSlide)

  const Title = TextInput()
  const Bg = Select()
  const Color = Select()
  const Option = useCallback(
    ({ item, index }: ItemProps<SimplySlideThemeBg>) => {
      const selected = item === slide.themeBg
      const onClick = () => {
        setSlide((prev) => ({ ...prev, themeBg: item }))
        Bg.hide()
      }
      return (
        <button
          onClick={onClick}
          className={`border h-5  cursor-pointer w-5 ${
            item === "white"
              ? "bg-white active:opacity-50 hover:opacity-70"
              : "bg-zinc-600 hover:opacity-80 active:opacity-60"
          } rounded-full mt-2.5 ${
            selected ? "border-blue-300" : "border-gray-300"
          }`}
          type="button"
        />
      )
    },
    [Bg, slide]
  )

  const ColorOption = useCallback(
    ({ item }: ItemProps<SimplySlideThemeColor>) => {
      const selected = item === slide.themeColor
      const onClick = () => {
        setSlide((prev) => ({ ...prev, themeColor: item }))
        Color.hide()
      }
      return (
        <button
          onClick={onClick}
          className={`border h-5  cursor-pointer w-5 bg-${item}-600
            hover:opacity-80 active:opacity-60
          rounded-full mt-2.5 ${
            selected ? "border-blue-300" : "border-gray-300"
          }`}
          type="button"
        />
      )
    },
    [Color, slide]
  )

  const titleMessage = useMemo(() => {
    if (slide.title.length === 0) {
      return "제목을 입력해주세요."
    }
    return null
  }, [slide.title])

  const { alert } = alertStore()
  const { slideHandler } = useSlide()
  const navi = useNavi()
  const onSubmit = useCallback(() => {
    if (titleMessage) {
      return alert(titleMessage, [{ onPress: Title.focus }])
    }
    slideHandler(payload ? "UPDATE" : "CREATE", slide, (newSlide) =>
      navi(`/my/${newSlide.uid}`)
    )
  }, [slide, titleMessage, alert, Title, slideHandler, navi])
  return (
    <AppForm className="w-100 mx-auto my-5 gap-y-2.5" onSubmit={onSubmit}>
      <Title.Component
        onChangeText={(title) => setSlide((prev) => ({ ...prev, title }))}
        value={slide.title}
        title="Simply Slide Title"
      />
      <div className="flex gap-x-2.5">
        <div className="flex-1">
          <Bg.Component
            title="바탕색"
            Option={Option}
            data={["white", "zinc"] as SimplySlideThemeBg[]}
            horizontal
            columnGap={5}
            Placeholder={({ handler }) => (
              <button
                onClick={handler}
                type="button"
                className={`cursor:pointer w-5 h-5 rounded-full border border-gray-300 ${
                  slide.themeBg === "white" ? "bg-white" : "bg-zinc-600"
                } cursor-pointer`}
              />
            )}
          />
        </div>
        <div className="flex-2">
          <Color.Component
            columnGap={5}
            Option={ColorOption}
            data={
              [
                "blue",
                "orange",
                "red",
                "cyan",
                "violet",
              ] as SimplySlideThemeColor[]
            }
            title="색상"
            horizontal
            Placeholder={({ handler }) => (
              <button
                onClick={handler}
                type="button"
                className={`cursor:pointer w-5 h-5 rounded-full border border-gray-300 bg-${slide.themeColor}-600 cursor-pointer`}
              />
            )}
          />
        </div>
      </div>
      <div className="flex gap-x-2.5 mt-2.5">
        <Button.Submit className="flex-2">
          {payload ? "수정하기" : "생성하기"}
        </Button.Submit>
        <Button.Simple className="flex-1">취소</Button.Simple>
      </div>
    </AppForm>
  )
}

export default SlideForm
