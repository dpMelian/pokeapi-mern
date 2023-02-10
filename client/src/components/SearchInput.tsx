import React, { useState } from "react"
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Input = styled.input`
    border-radius: 5px;
`;

const Button = styled.button`

`;

interface props {
    handleOnSubmit: (value: string) => React.FormEventHandler<HTMLFormElement>;
}

const SearchInput = ({ handleOnSubmit }: props) => {
    const [inputValue, setInputValue] = useState("");

    const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    return (
        <form onSubmit={e => {
            e.preventDefault();
            handleOnSubmit(inputValue)
        }}>
            <Input
                type="text"
                name="search"
                id="search"
                placeholder="Pikachu"
                onInput={handleOnInput}
            />
            <Button onClick={() => handleOnSubmit}>
                <FontAwesomeIcon icon={faSearch} />
            </Button>
        </form>
    )
}

export default SearchInput
