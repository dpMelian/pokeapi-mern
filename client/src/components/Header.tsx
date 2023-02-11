import React from "react"
import styled from "styled-components"

const Nav = styled.nav`
  display: "flex";
  background-color: ${props => props.theme.secondary};
`;

const H1 = styled.h1`
  margin: 0px;
`;

const Header = () => {
  return (
    <Nav>
      <H1>
        PokéAPI MERN project
      </H1>
      <H1>
        Sign Up
      </H1>
    </Nav>
  )
}

export default Header
