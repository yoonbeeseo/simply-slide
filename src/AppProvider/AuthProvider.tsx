import {
  PropsWithChildren,
  useState,
  useEffect,
  useTransition,
  useCallback,
} from "react"
import { authContext, initialAuth } from "../hooks"
import { auth, dbService, FBCollection } from "../lib"

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState(initialAuth.user)
  const [initialized, setInitialized] = useState(false)
  const [isPending, startTransition] = useTransition()

  const updateUser = (target: keyof User, value: any) =>
    setUser((prev) => prev && { ...prev, [target]: value })

  const fetchUser = useCallback((payload: User | string) => {
    if (typeof payload !== "string") {
      return setUser(payload)
    }

    startTransition(async () => {
      const snap = await dbService
        .collection(FBCollection.USERS)
        .doc(payload)
        .get()
      const data = snap.data() as User
      setUser(data)
    })
  }, [])

  useEffect(() => {
    const subscribeUser = auth().onAuthStateChanged((fbUser) => {
      if (fbUser) {
        fetchUser(fbUser.uid)
      } else {
        setUser(null)
      }
      setTimeout(() => {
        setInitialized(true)
      }, 2000)
    })
    subscribeUser
    return () => {
      subscribeUser
    }
  }, [])

  return (
    <authContext.Provider
      value={{ user, initialized, updateUser, isPending, fetchUser }}
    >
      {children}
    </authContext.Provider>
  )
}
