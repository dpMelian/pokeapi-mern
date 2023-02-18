import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const Nav = styled.nav`
  display: "flex";
  background-color: ${(props) => props.theme.secondary};
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

const Header = (): JSX.Element => (
  <Nav>
    <Container>
      <Link to="/">
        <H1>PokéAPI MERN project</H1>
      </Link>
      <Link to="/sign-up">
        <H1>Sign Up</H1>
      </Link>
    </Container>
  </Nav>
)

export default Header
