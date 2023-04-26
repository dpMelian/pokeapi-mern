import React, { useContext } from "react"
import { ThemeProvider } from "styled-components"
import Context from "../contexts/DarkModeContext"

const ThemeProviderWrapper = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const { isDarkMode } = useContext(Context)

  let theme = {
    primary: "#FE6D7A",
    secondary: "#F1F0CC",
    "primary--darker": "#3F0D12",
    "secondary--darker": "#75624E",
    "secondary--lighter": "#F8F7E5",
  }

  if (isDarkMode) {
    theme = {
      primary: "#3F0D12",
      secondary: "#404040",
      "primary--darker": "#f0f0f0",
      "secondary--darker": "#000000",
      "secondary--lighter": "#404040",
    }
  }

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default ThemeProviderWrapper
