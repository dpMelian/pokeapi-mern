import React, { useState } from "react"

interface ContextProps {
  isDarkMode: boolean
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

const Context = React.createContext<ContextProps>({
  isDarkMode: false,
  setIsDarkMode: () => {
    console.error("no function set")
  },
})

export const DarkModeContextProvider = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const contextValue = {
    isDarkMode,
    setIsDarkMode,
  }

  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}

export default Context
