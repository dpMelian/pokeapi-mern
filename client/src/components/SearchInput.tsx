import React, { useState } from "react"
import styled from "styled-components"
import { IconSearch } from "@tabler/icons-react"

const Form = styled.form`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  width: 50%;
`

const InputGroup = styled.div`
  align-items: center;
  display: flex;
  width: 100%;
`

const Input = styled.input`
  border-radius: 5px 0 0 5px;
  border-right: none;
  height: 2rem;
  line-height: 2rem;
  width: 100%;
`

const Button = styled.button`
  border-radius: 0 5px 5px 0;
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
          placeholder="Pikachu"
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
