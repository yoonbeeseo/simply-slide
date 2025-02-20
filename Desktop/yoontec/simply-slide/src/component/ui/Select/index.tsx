import React, { useCallback, useId, useMemo, useRef, useState } from "react"
import styles from "./select.css"

const Select = () => {
  const ref = useRef<HTMLDivElement>(null)

  const focus = useCallback(() => ref.current?.focus(), [ref])

  const [showing, setShowing] = useState(false)
  const show = () => setShowing(true)
  const hide = () => setShowing(false)
  const handler = () => setShowing((prev) => !prev)

  const Component = useCallback(
    (props: SelectProps) => {
      return (
        <SelectComponent
          {...props}
          ref={ref}
          show={show}
          showing={showing}
          hide={hide}
          handler={handler}
        />
      )
    },
    [ref, show, hide, showing, handler]
  )
  return { Component, focus, show, ref, hide, handler, state: showing }
}

export default Select

export interface SelectProps {
  title?: string
  placeholder?: string
  id?: string
  name?: string
  onChange?: PropsFunc
  ref?: React.Ref<HTMLDivElement>
  value?: string | number
  horizontal?: boolean
  data: any[]
  Option: (props: ItemProps) => React.ReactNode
  rowGap?: number
  columnGap?: number
  Placeholder?: (handler: { handler: Func }) => React.ReactNode
}

interface Props extends SelectProps {
  show: Func
  showing: boolean
  hide: Func
  handler: Func
}

export function SelectComponent({
  show,
  id,
  name,
  onChange,
  placeholder,
  ref,
  title,
  value,
  horizontal,
  data,
  hide,
  showing,
  Option,
  columnGap,
  rowGap,
  handler,
  Placeholder,
}: Props) {
  const randomId = useId()

  const selectId = useMemo(() => id ?? randomId, [id])

  return (
    <div className="relative flex flex-col gap-y-1.25">
      {title && (
        <label className="text-zinc-500 text-sm" htmlFor={selectId}>
          {title}
        </label>
      )}
      {Placeholder ? (
        <Placeholder handler={handler} />
      ) : (
        <button
          id={selectId}
          type="button"
          onClick={handler}
          className={`${styles.option()} border-gray-200 rounded border h-12 bg-gray-50 justify-center hover:bg-gray-100 active:bg-gray-50 transition `}
        >
          {placeholder ?? "옵션 보기"}
        </button>
      )}
      {showing && (
        <>
          <ul
            style={{
              rowGap,
              columnGap,
            }}
            className={`${styles.ul({ showing })} flex ${
              horizontal ? "flex-row" : "flex-col"
            }
             ${showing ? "relative z-1" : ""}
            `}
          >
            {data.map((item, index) => (
              <Option item={item} index={index} key={index} />
            ))}
          </ul>
          <span
            onClick={hide}
            className="fixed top-0 left-0 w-screen h-screen"
          />
        </>
      )}
    </div>
  )
}
