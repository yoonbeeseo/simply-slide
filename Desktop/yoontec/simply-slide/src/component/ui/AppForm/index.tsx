import React from "react"

const AppForm = (
  props: React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >
) => {
  const cn = "flex flex-col "
  return (
    <form
      {...props}
      onSubmit={(e) => {
        e.preventDefault()
        props?.onSubmit && props.onSubmit(e)
      }}
      className={props?.className ? cn.concat(props.className) : cn}
    />
  )
}

export default AppForm
