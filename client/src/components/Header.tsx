import React from "react"
import styled from "styled-components"

const Nav = styled.nav`
  display: "flex";
  background-color: ${props => props.theme.secondary};
`;

const Header = () => {
  return (
    <Nav>
      <h1>
        PokéAPI MERN project
      </h1>
      <h1>
        Sign Up
      </h1>
    </Nav>
  )
}

export default Header
