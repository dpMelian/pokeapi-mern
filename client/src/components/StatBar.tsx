import React from "react";
import styled, { ThemedStyledProps } from "styled-components";

interface Props {
    value: number;
    rangeColor: string;
}

interface BarProps {
    value: number;
    rangeColor: string;
}

const Bar = styled.span<BarProps>`
    display: flex;
    border: 2px solid;
    border-radius: 5px;
    background-color: ${(props: ThemedStyledProps<BarProps, any>) => props.rangeColor};
    width: ${(props: ThemedStyledProps<BarProps, any>) => props.value}px;
    height: 20px;
`;

const StatBar = ({ value, rangeColor }: Props) => {
    return(
        <Bar value={value} rangeColor={rangeColor}/>
    )
}

export default StatBar
