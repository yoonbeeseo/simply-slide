type Func<T = void> = () => T
type PropsFunc<P = any, T = any> = (props: P) => T

type StringOf<T = string> = T
type ObjectOf<T = any> = T
type ArrayOf<T = any> = T[]

interface AsyncResult {
  success?: boolean
  message?: string
}
type AsyncFunc<P = any, T = AsyncResult> = Promise<>

interface ItemProps<T = any> {
  item: T
  index: number
}

type CRUD = "CREATE" | "READ" | "UPDATE" | "DELETE"

interface FormProps<T = any> {
  payload?: T
  onCancel?: Func
}
