type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const basic =
  "flex justify-center items-center gap-y-2.5 border-none rounded h-12 cursor-pointer hover:opacity-80 active:opacity-50 text-md font-light active:scale-98 transition hover:shadow-md "
export function Submit(props: Props) {
  const submit = "bg-blue-600 text-white "
  return (
    <button
      {...props}
      className={
        props?.className
          ? basic.concat(submit).concat(props.className)
          : basic.concat(submit)
      }
    />
  )
}

export function Simple(props: Props) {
  const simple = "bg-gray-100 "
  return (
    <button
      {...props}
      type={props?.type ?? "button"}
      className={
        props?.className
          ? basic.concat(simple).concat(props.className)
          : basic.concat(simple)
      }
    />
  )
}
