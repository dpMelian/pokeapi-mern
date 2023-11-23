import { useContext } from "react"

import { IconMoon, IconSun } from "@tabler/icons-react"
import Context from "../contexts/DarkModeContext"

const DarkModeSlider = (): JSX.Element => {
  const { isDarkMode, setIsDarkMode } = useContext(Context)
  return (
    <>
      {isDarkMode ? (
        <IconSun
          className="h-10 w-10 rounded-[25%] border-2 border-solid border-primary--darker p-2"
          onClick={() => {
            setIsDarkMode(!isDarkMode)
          }}
        />
      ) : (
        <IconMoon
          className="h-10 w-10 rounded-[25%] border-2 border-solid border-black p-2"
          onClick={() => {
            setIsDarkMode(!isDarkMode)
          }}
        />
      )}
    </>
  )
}

export default DarkModeSlider
