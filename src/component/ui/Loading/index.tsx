import styles from "./loading.css"

interface Props {
  isAbs?: boolean
  message?: string
}

const Loading = ({ isAbs, message }: Props) => {
  return (
    <div className={styles.container({ isAbs })}>
      <div className={styles.wrap}>
        <span className={styles.span1}></span>
        <span className={styles.span2}></span>
        <span className={styles.span3}></span>
      </div>

      <p className={styles.message}>
        {message ? message : "잠시만 기다려주세요..."}
      </p>
    </div>
  )
}

export default Loading
