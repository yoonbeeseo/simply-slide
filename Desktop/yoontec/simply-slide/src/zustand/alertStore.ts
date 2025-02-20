import { create } from "zustand"

interface Props {
  state: boolean
  message?: string | null
  title?: string | null
  alertButtons?: AlertButton[]
  alert: AlertFunc
  turnOffAlert: Func
}

const alertStore = create<Props>((set) => ({
  state: false,
  alert: (message, alertButtons, title) => {
    console.log({ message, alertButtons, title })
    set((prev) => ({ ...prev, state: true, message, title, alertButtons }))
  },
  turnOffAlert: () =>
    set((prev) => ({
      state: false,
      alert: prev.alert,
      turnOffAlert: prev.turnOffAlert,
    })),
}))

export default alertStore
