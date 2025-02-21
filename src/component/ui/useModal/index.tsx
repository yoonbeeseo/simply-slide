import { useState, useCallback, PropsWithChildren, useEffect } from "react"
import styles from "./modal.css"

const useModal = () => {
  const [visible, setVisible] = useState(false)
  const show = () => setVisible(true)
  const hide = () => setVisible(false)
  const handler = () => setVisible((prev) => !prev)

  const Component = useCallback(
    (props: ModalProps) => {
      return <Modal {...props} visible={visible} hide={hide} />
    },
    [visible, hide]
  )
  return {
    visible,
    show,
    hide,
    handler,
    Component,
  }
}

export default useModal

export interface ModalProps extends PropsWithChildren {}
interface Props extends ModalProps {
  top?: number
  left?: number
  bottom?: number
  right?: number
  visible: boolean
  hide: Func
}
export function Modal({ hide, visible, bottom, left, right, top, children }: Props) {
  useEffect(() => {
    console.log({ visible })
  }, [visible])
  return !visible ? null : (
    <div className={styles.container} style={{ top, left, bottom, right }}>
      <div className={styles.content({ visible })}>
        <button
          onClick={() => {
            console.log("hide")
            hide()
          }}
          className={styles.hide}
        >
          <span className={styles.span} />
        </button>
        {children}
      </div>
      <span onClick={hide} className={styles.bg} />
    </div>
  )
}

// function App (){
//     const [users, setUsers] = useState([])

//     useEffect(() =>{
//         const savedUser = localStorage...
//         if ( !savedUser ){
//             setUsers([])
//         } else {
//             const parsedData = JSON.parse()
//             setUsers( parsedData)
//         }
//     }, [ ])

//     useEffect(() =>{
//         const stringfiedData = JSON.stringify(users)
//         localStorage.setItem()
//     }, [ users])
//     return (
//         <div></div>
//     )
// }
