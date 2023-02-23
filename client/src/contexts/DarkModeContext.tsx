import React, { useState } from "react"

const Context = React.createContext({
  isDarkMode: false,
  setIsDarkMode: () => {},
})

export function DarkModeContextProvider({ children }: { children: any }) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const contextValue = {
    isDarkMode,
    setIsDarkMode,
  }

  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}

export default Context
