import React, { useState } from "react"
import { IconSearch } from "@tabler/icons-react"

interface Props {
  handleOnSubmit: (searchInputValue: string) => void
}

const SearchInput = ({ handleOnSubmit }: Props): JSX.Element => {
  const [inputValue, setInputValue] = useState("")

  const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value)
  }

  return (
    <form
      className="mx-auto my-0 flex justify-center rounded-md border-2 border-solid border-black dark:border-primary"
      onSubmit={(e) => {
        if (inputValue === "") return
        e.preventDefault()
        handleOnSubmit(inputValue)
      }}
    >
      <div className="flex w-full items-center">
        <input
          className="leading- h-8 w-full border-r-2 border-solid border-black font-sans text-base dark:border-primary"
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
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
    </form>
  )
}

export default SearchInput
