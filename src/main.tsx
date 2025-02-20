import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import AppProvider from "./AppProvider"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider />
  </StrictMode>
)
