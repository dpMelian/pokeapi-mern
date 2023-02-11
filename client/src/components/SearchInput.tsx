import React, { useState } from "react"
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const InputGroup = styled.div`
    display: flex;
    align-items: center;
`;

const Input = styled.input`
    border-radius: 5px 0 0 5px;
    border-right: none;
    height: 2rem;
    line-height: 2rem;
`;

const Button = styled.button`
    border-radius: 0 5px 5px 0;
    height: 2rem;
    line-height: 2rem;
    box-sizing: content-box;
`;

interface Props {
    handleOnSubmit: (value: string) => React.FormEventHandler<HTMLFormElement>;
}

const SearchInput = ({ handleOnSubmit }: Props) => {
    const [inputValue, setInputValue] = useState("");

    const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    return (
        <form onSubmit={e => {
            if (inputValue === "") return;
            e.preventDefault();
            handleOnSubmit(inputValue)
        }}>
            <InputGroup>
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
            </InputGroup>
        </form>
    )
}

export default SearchInput
