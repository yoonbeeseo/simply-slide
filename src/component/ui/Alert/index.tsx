import { useCallback, useEffect } from "react"
import alertStore from "../../../zustand/alertStore"
import styles from "./alert.css"

const Alert = () => {
  const { state, message, turnOffAlert, alertButtons, title } = alertStore()

  const Button = useCallback(
    ({ text, onPress, isLeft }: AlertButton & { isLeft?: boolean }) => {
      const onClick = () => {
        if (onPress) {
          onPress()
        }
        turnOffAlert()
      }

      return (
        <button onClick={onClick} className={styles.button({ isLeft })}>
          {text ?? "확인"}
        </button>
      )
    },
    [turnOffAlert]
  )

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (alertButtons) {
          if (alertButtons.length === 0) {
          } else {
            alertButtons[0].onPress && alertButtons[0].onPress()
          }
        }
        setTimeout(turnOffAlert, 300)
      } else if (e.key === "Escape") {
        turnOffAlert()
      }
    }
    window?.addEventListener("keydown", fn)
  }, [alertButtons, turnOffAlert])
  return (
    <div className={styles.container({ state })}>
      <div className={styles.wrap({ state })}>
        <p className={styles.title}>{title ?? "알림"}</p>
        <p className={styles.message}>{message ?? "Message!"}</p>
        <ul className={styles.ul}>
          {alertButtons ? (
            alertButtons.map((btn, index) => (
              <li className="flex-1" key={index}>
                <Button {...btn} isLeft={index !== 0} />
              </li>
            ))
          ) : (
            <Button />
          )}
        </ul>
      </div>
      {/* <span className={styles.shadow} /> */}
    </div>
  )
}

export default Alert
