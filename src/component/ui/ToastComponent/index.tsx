import { useCallback, useEffect, useState } from "react"
import styles from "./toast.css"
import toastStore from "../../../zustand/toastStore"
import {
  AiOutlineAlert,
  AiOutlineMessage,
  AiOutlineLike,
  AiOutlineWarning,
  AiOutlineCheckCircle,
} from "react-icons/ai"

const ToastComponent = (toast: Toast) => {
  const { toated } = toastStore()
  const onClick = useCallback(() => {
    toast.onPress && toast.onPress()
    setTimeout(() => {
      toated(toast)
    }, 100)
  }, [toated, toast])

  const [sec, setSec] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setSec((prev) => (prev <= 2 ? prev + 1 : prev))
    }, 1000)
    return () => {
      clearInterval(id)
    }
  }, [])

  useEffect(() => {
    if (toast.time && toast.time === sec) {
      onClick()
    } else if (sec === 3) {
      onClick()
    }
  }, [sec, toast, onClick])

  return (
    <div className={styles.toast({ type: toast.type })}>
      <div className={styles.wrap}>
        {
          {
            Success: <AiOutlineLike className={styles.icon} />,
            Message: <AiOutlineMessage className={styles.icon} />,
            Warning: <AiOutlineWarning className={styles.icon} />,
            Error: <AiOutlineAlert className={styles.icon} />,
          }[toast.type]
        }
        <p className="flex-1 text-sm font-light">{toast.message}</p>
      </div>
      <button className={styles.btn({ type: toast.type })} onClick={onClick}>
        {toast.text ?? <AiOutlineCheckCircle />}
      </button>
    </div>
  )
}

export default ToastComponent
