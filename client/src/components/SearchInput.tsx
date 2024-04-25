import React, { useState } from "react"
import { Dices, Search } from "lucide-react"

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
      className="mx-16 my-0 mt-4 flex max-w-lg justify-center rounded-full border-2 border-solid border-black dark:border-primary"
      onSubmit={(e) => {
        if (inputValue === "") return
        e.preventDefault()
        handleOnSubmit(inputValue)
      }}
    >
      <div className="flex w-full items-center">
        <input
          className="h-8 w-full rounded-l-full border-r-2 border-solid border-black px-4 font-sans text-base dark:border-none"
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          onInput={handleOnInput}
        />
        <button
          className="box-content h-8 w-auto border-r-2 border-solid border-black px-2 leading-8 dark:border-white"
          onClick={() => handleOnSubmit}
          aria-label="Search"
          title="Search Pokémon"
        >
          <Search />
        </button>
        <button
          className="box-content h-8 w-auto px-2 leading-8"
          onClick={() =>
            setSearchValue(Math.floor(Math.random() * (1010 - 1) + 1))
          }
          aria-label="Random"
          title="Search random Pokémon"
        >
          <Dices />
        </button>
      </div>
    </form>
  )
}

export default SearchInput
