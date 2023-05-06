import React, { useState } from "react"
import styled from "styled-components"
import { IconSearch } from "@tabler/icons-react"

const Form = styled.form`
  border: 3px solid ${(props) => props.theme["primary--darker"]};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`

const InputGroup = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
`

const Input = styled.input`
  border-right: 3px solid ${(props) => props.theme["primary--darker"]};
  font-family: "Kadwa";
  font-size: 16px;
  height: 2rem;
  line-height: 2rem;
  width: 100%;
`

const Button = styled.button`
  height: 2rem;
  line-height: 2rem;
  box-sizing: content-box;
  width: auto;
`

interface Props {
  handleOnSubmit: (searchInputValue: string) => void
}

const SearchInput = ({ handleOnSubmit }: Props): JSX.Element => {
  const [inputValue, setInputValue] = useState("")

  const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value)
  }

  return (
    <Form
      onSubmit={(e) => {
        if (inputValue === "") return
        e.preventDefault()
        handleOnSubmit(inputValue)
      }}
    >
      <InputGroup>
        <Input
          type="text"
          name="search"
          id="search"
          placeholder="Search for a pokémon..."
          onInput={handleOnInput}
        />
        <Button onClick={() => handleOnSubmit} aria-label="Search">
          <IconSearch />
        </Button>
      </InputGroup>
    </Form>
  )
}

export default SearchInput
