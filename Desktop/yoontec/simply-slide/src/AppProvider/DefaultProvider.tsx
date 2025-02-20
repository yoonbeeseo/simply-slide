import { PropsWithChildren, useEffect, useState } from "react"
import { defaultContext, initialDefault } from "../hooks"
import { Alert, ToastComponent } from "../component"
import toastStore from "../zustand/toastStore"
import styles from "../component/ui/ToastComponent/toast.css"

const DefaultProvider = ({ children }: PropsWithChildren) => {
  const [screen, setScreen] = useState(initialDefault)
  useEffect(() => {
    const getScreen = () =>
      setScreen((prev) => ({
        ...prev,
        width: window?.innerWidth,
        height: window?.innerHeight,
      }))
    const getScroll = () =>
      setScreen((prev) => ({ ...prev, scroll: window?.scrollY }))

    getScreen()
    getScroll()
    window?.addEventListener("resize", getScreen)
    window?.addEventListener("scroll", getScroll)

    return () => {
      getScreen()
      getScroll()
      window?.removeEventListener("resize", getScreen)
      window?.removeEventListener("scroll", getScroll)
    }
  }, [])

  const { toasts } = toastStore()

  return (
    <defaultContext.Provider value={screen}>
      <Alert />
      <div className={styles.container}>
        {toasts?.map((toast, index) => (
          <ToastComponent key={index} {...toast} />
        ))}
      </div>
      {children}
    </defaultContext.Provider>
  )
}

export default DefaultProvider
