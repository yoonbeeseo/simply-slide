interface User {
  email: string
  uid: string
  createdAt: string | null
  name: string | null
}

interface AuthContext {
  user: null | User
  initialized: boolean
  isPending: boolean
  updateUser: (target: keyof User, value: any) => void
  fetchUser: (payload: User | string) => void
}

type AlertFunc = (
  message?: string | null,
  alertButtons?: AlertButton[],
  title?: string | null
) => void

interface AlertButton {
  text?: string
  onPress?: Func
}

type ToastType = "Success" | "Warning" | "Error" | "Message"

interface Toast extends AlertButton {
  type: ToastType
  message: string | null
  id?: string
  time?: number // 초단위
}

interface DefaultContext {
  width: number
  height: number
  scroll: number
}

interface SimplySlide {
  title: string
  uid: string
  createdAt: string
  themeColor: SimplySlideThemeColor
  themeBg: SimplySlideThemeBg
}

type SimplySlideThemeColor = "blue" | "red" | "orange" | "cyan" | "violet"

type SimplySlideThemeBg = "zinc" | "white"

interface SlideContext {
  slides: SimplySlide[]
  isPending: boolean
  slideHandler: (
    action: CRUD,
    slide: SimpleSlide,
    onSuccess?: PropsFunc<SimpleSlide>
  ) => void
}
