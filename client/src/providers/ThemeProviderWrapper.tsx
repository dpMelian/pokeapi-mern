import React, { useContext } from "react"
import { ThemeProvider } from "styled-components"
import Context from "../contexts/DarkModeContext"
import { DARK_MODE_THEME, THEME } from "../constants/theme"

const ThemeProviderWrapper = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const { isDarkMode } = useContext(Context)

  return (
    <ThemeProvider theme={isDarkMode ? DARK_MODE_THEME : THEME}>
      {children}
    </ThemeProvider>
  )
}

export default ThemeProviderWrapper
