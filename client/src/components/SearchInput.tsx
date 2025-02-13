import { Dices, Search } from "lucide-react"
import React, { useState } from "react"

import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface Props {
  handleOnSubmit: (searchInputValue: string) => void
  setSearchValue: React.Dispatch<React.SetStateAction<string | number>>
}

const SearchInput = ({
  handleOnSubmit,
  setSearchValue,
}: Props): JSX.Element => {
  const [inputValue, setInputValue] = useState("")

  const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value)
  }

  return (
    <form
      className="mx-16 my-0 mt-4 flex max-w-lg justify-center"
      onSubmit={(e) => {
        if (inputValue === "") return
        e.preventDefault()
        handleOnSubmit(inputValue)
      }}
    >
      <div className="flex w-full items-center gap-2">
        <Input
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          onInput={handleOnInput}
        />
        <Button
          onClick={() => handleOnSubmit}
          aria-label="Search"
          title="Search Pokémon"
        >
          <Search />
        </Button>
        <Button
          onClick={() =>
            setSearchValue(Math.floor(Math.random() * (1010 - 1) + 1))
          }
          aria-label="Random"
          title="Search random Pokémon"
        >
          <Dices />
        </Button>
      </div>
    </form>
  )
}

export default SearchInput
