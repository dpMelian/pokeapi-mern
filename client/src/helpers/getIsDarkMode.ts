import { useContext } from "react"
import Context from "../contexts/DarkModeContext"

export const getIsDarkMode = (): boolean => {
  const { isDarkMode } = useContext(Context)

  return isDarkMode
}
