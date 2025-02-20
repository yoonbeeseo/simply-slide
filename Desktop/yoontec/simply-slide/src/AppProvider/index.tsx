import { Suspense } from "react"
import AppRouter from "./AppRouter"
import AuthProvider from "./AuthProvider"
import DefaultProvider from "./DefaultProvider"
import SlideProvider from "./SlideProvider"

export default function AppProvider() {
  return (
    <Suspense fallback={<h1 className="text-4xl">Hello this is loading...</h1>}>
      <DefaultProvider>
        <AuthProvider>
          <SlideProvider>
            <AppRouter />
          </SlideProvider>
        </AuthProvider>
      </DefaultProvider>
    </Suspense>
  )
}
