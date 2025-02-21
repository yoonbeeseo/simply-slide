import React, { useCallback, useId, useMemo, useRef } from "react"

const TextInput = () => {
  const ref = useRef<HTMLInputElement>(null)
  const focus = useCallback(() => ref.current?.focus(), [ref])
  const Component = useCallback(
    (props: InputProps) => {
      return <Input {...props} ref={ref} />
    },
    [ref]
  )
  return {
    ref,
    focus,
    Component,
  }
}

export default TextInput

export interface InputProps {
  props?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  title?: string
  placeholder?: string
  id?: string
  name?: string
  type?: React.HTMLInputTypeAttribute
  className?: string
  onChangeText?: PropsFunc<string>
  ref?: React.Ref<HTMLInputElement>
  value?: string | number
}
export function Input({ id, name, placeholder, props, title, type, className, ref, onChangeText, value }: InputProps) {
  const randomId = useId()
  const inputId = useMemo(() => id ?? randomId, [id, randomId])
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChangeText) {
        onChangeText(e.target.value)
      }
      if (props?.onChange) {
        onChange(e)
      }
    },
    [onChangeText]
  )

  const st = "border rounded border-gray-200 h-12 px-3 bg-gray-50 outline-none focus:border-blue-600 "
  return (
    <div className="flex flex-col gap-y-1">
      {title && (
        <label htmlFor={inputId} className="text-zinc-500 text-sm">
          {title}
        </label>
      )}
      <input
        {...props}
        ref={props?.ref ?? ref}
        type={props?.type ?? type ?? "text"}
        id={props?.id ?? inputId}
        name={props?.name ?? name}
        title={props?.title ?? title}
        placeholder={props?.placeholder ?? placeholder}
        value={props?.value ?? value}
        onChange={props?.onChange ?? onChange}
        className={props?.className ? props.className : className ? st.concat(className) : st}
      />
    </div>
  )
}
