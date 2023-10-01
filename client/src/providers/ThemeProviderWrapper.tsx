import React, { useContext, useEffect } from "react"
import { ThemeProvider } from "styled-components"
import Context from "../contexts/DarkModeContext"
import { DARK_MODE_THEME, THEME } from "../constants/theme"

const ThemeProviderWrapper = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const { isDarkMode } = useContext(Context)

  useEffect(() => {
    isDarkMode
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark")
  }, [isDarkMode])

  return (
    <ThemeProvider theme={isDarkMode ? DARK_MODE_THEME : THEME}>
      {children}
    </ThemeProvider>
  )
}

export default ThemeProviderWrapper
