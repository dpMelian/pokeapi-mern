import React from "react";
import { STAT_ICONS } from "../constants/statIcons";

interface Props {
    name: string;
    icon: string;
}

const StatIcon = ({ name, icon }: Props) => (
    <>
        {React.createElement(STAT_ICONS[icon], null)}
        {<span>{name.toUpperCase()}</span>}
    </>
)

export default StatIcon;
