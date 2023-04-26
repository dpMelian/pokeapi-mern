import React, { useContext } from "react"
import styled from "styled-components"
import { IconMoon, IconSun } from "@tabler/icons-react"
import Context from "../contexts/DarkModeContext"

const IconMoonStyled = styled(IconMoon)`
  border: 2px solid ${(props) => props.theme["primary--darker"]};
  border-radius: 25%;
  padding: 0.3rem;
`

const IconSunStyled = styled(IconSun)`
  border: 2px solid ${(props) => props.theme["primary--darker"]};
  border-radius: 25%;
  padding: 0.3rem;
`

const DarkModeSlider = (): JSX.Element => {
  const { isDarkMode, setIsDarkMode } = useContext(Context)
  return (
    <>
      {isDarkMode ? (
        <IconSunStyled
          onClick={() => {
            setIsDarkMode(!isDarkMode)
          }}
        />
      ) : (
        <IconMoonStyled
          onClick={() => {
            setIsDarkMode(!isDarkMode)
          }}
        />
      )}
    </>
  )
}

export default DarkModeSlider
