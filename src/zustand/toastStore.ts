import { create } from "zustand"
import { v4 } from "uuid"

interface Props<T> {
  toasts: ArrayOf<T>
  toast: PropsFunc<T>
  toated: PropsFunc<T>
}

const toastStore = create<Props<Toast>>((set) => ({
  toasts: [],
  toast: (newToast) =>
    set((prev) => ({
      ...prev,
      toasts: [{ ...newToast, id: v4() }, ...prev.toasts],
    })),
  toated: (targetToast) => {
    set((prev) => ({
      ...prev,
      toasts: prev.toasts.filter((item) => item?.id !== targetToast?.id),
    }))
  },
}))

export default toastStore
