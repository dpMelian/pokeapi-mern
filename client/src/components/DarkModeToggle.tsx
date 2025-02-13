import { IconMoon, IconSun } from "@tabler/icons-react"
import { useContext } from "react"

import { Button } from "./ui/button"
import Context from "../contexts/DarkModeContext"

const DarkModeSlider = (): JSX.Element => {
  const { isDarkMode, setIsDarkMode } = useContext(Context)
  return (
    <Button
      className="h-10 w-10"
      onClick={() => {
        setIsDarkMode(!isDarkMode)
      }}
    >
      {isDarkMode ? <IconSun /> : <IconMoon />}
    </Button>
  )
}

export default DarkModeSlider
