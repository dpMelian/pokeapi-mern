import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import useGetLoggedTrainerName from "../hooks/useGetLoggedTrainerName"
import useLogout from "../hooks/useLogout"
import DarkModeToggle from "./DarkModeToggle"

const Nav = styled.nav`
  display: "flex";
  background-color: ${(props) => props.theme.primary};
  border-bottom: 2px solid ${(props) => props.theme["primary--darker"]};
`

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
  padding: 1rem 0;
`

const H1 = styled.h1`
  margin: 0px;
`

const LogOutH1 = styled.h1`
  cursor: pointer;
  margin: 0px;
`

const LinkNoStyle = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme["primary--darker"]};
`

const RightBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`

const Header = (): JSX.Element => {
  const { data } = useGetLoggedTrainerName()
  const logout = useLogout()
  const token = localStorage.getItem("token")

  const [showHelloMessage, setShowHelloMessage] = useState(false)

  useEffect(() => {
    setShowHelloMessage(data != null)
  }, [data])

  return (
    <Nav>
      <Container>
        <LinkNoStyle to="/">
          <H1>PokéAPI MERN project</H1>
        </LinkNoStyle>
        {showHelloMessage && data != null && (
          <>
            <H1>{`Hello ${JSON.stringify(data)}!`}</H1>
          </>
        )}
        <DarkModeToggle />
        <RightBox>
          {token != null ? (
            <LogOutH1
              onClick={() => {
                logout.mutate(localStorage.getItem("token"), {
                  onSuccess: async () => {
                    localStorage.removeItem("token")
                    setShowHelloMessage(false)
                  },
                })
              }}
            >
              Log Out
            </LogOutH1>
          ) : (
            <LinkNoStyle to="/login">
              <H1>Log In</H1>
            </LinkNoStyle>
          )}
          <LinkNoStyle to="/sign-up">
            <H1>Sign Up</H1>
          </LinkNoStyle>
        </RightBox>
      </Container>
    </Nav>
  )
}

export default Header
