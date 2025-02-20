import { useCallback } from "react"
import alertStore from "../zustand/alertStore"

export default function useToast() {
  const { alert } = alertStore()
  const toast = (
    message?: string | null,
    alertButtons?: AlertButton[],
    title?: string | null
  ) => useCallback(() => alert(message, alertButtons, title), [alert])

  return toast
}
