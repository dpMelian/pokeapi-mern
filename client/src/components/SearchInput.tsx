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

const Input = styled.input`
  border-right: 3px solid ${(props) => props.theme["primary--darker"]};
  font-family: "Kadwa";
  font-size: 16px;
  height: 2rem;
  line-height: 2rem;
  width: 100%;
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
      <div className="flex w-full items-center">
        <Input
          type="text"
          name="search"
          id="search"
          placeholder="Search for a pokémon..."
          onInput={handleOnInput}
        />
        <button
          className="box-content h-8 w-auto leading-8"
          onClick={() => handleOnSubmit}
          aria-label="Search"
        >
          <IconSearch />
        </button>
      </div>
    </Form>
  )
}

export default SearchInput
