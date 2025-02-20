import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react"
import { initialSlide, slideContext, useAuth } from "../hooks"
import { dbService, FBCollection } from "../lib"
import { getCreatedAt, getUUID } from "../utils"
import toastStore from "../zustand/toastStore"

export default function SlideProvider({ children }: PropsWithChildren) {
  const [isPending, startTransition] = useTransition()
  const [slides, setSlides] = useState(initialSlide.slides)

  const { user } = useAuth()

  const ref = useMemo(
    () =>
      dbService
        .collection(FBCollection.USERS)
        .doc(user?.uid)
        .collection(FBCollection.SLIDES),
    [user]
  )

  const { toast } = toastStore()
  const slideHandler = useCallback(
    (action: CRUD, slide: SimplySlide, onSuccess?: PropsFunc<SimplySlide>) => {
      startTransition(async () => {
        try {
          const newSlide = {
            ...slide,
            uid: getUUID(),
            createdAt: getCreatedAt(),
          } as SimplySlide
          if (action === "CREATE") {
            await ref.add(newSlide)
          } else if (action === "DELETE") {
            await ref.doc(slide.uid).delete()
          } else if (action === "UPDATE") {
            await ref.doc(slide.uid).update(slide)
          }
          toast({
            type: "Success",
            message: `Successfully ${
              action === "CREATE"
                ? "Created"
                : action === "DELETE"
                ? "Deleted"
                : "Updated"
            } a Simple Slide!`,
            onPress: () =>
              onSuccess && onSuccess(action === "CREATE" ? newSlide : slide),
          })
        } catch (error: any) {
          toast({ type: "Error", message: error.message })
        }
      })
    },
    [ref, toast]
  )

  useEffect(() => {
    startTransition(async () => {
      if (!user) {
        return setSlides([])
      }
      const snap = await ref.get()
      const data = snap.docs.map((doc) => ({ ...(doc.data() as SimplySlide) }))

      setSlides(data)
    })
  }, [user, ref])
  return (
    <slideContext.Provider value={{ isPending, slides, slideHandler }}>
      {children}
    </slideContext.Provider>
  )
}
