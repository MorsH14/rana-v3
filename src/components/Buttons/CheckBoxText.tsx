"use client";

import { MobileH4SM } from "@/utils/typography";
import { List, StyledCheckbox } from "./Button.styles";

interface CheckBoxTextProps {
    label: string;
    checked: boolean;
    onChange: (label: string) => void;
}

export default function CheckBoxText({ label, checked, onChange }: CheckBoxTextProps) {
    return (
        <List>
            <StyledCheckbox
                id={`checkbox-${label}`}
                type="checkbox"
                checked={checked}
                onChange={() => onChange(label)}
            />
            <label htmlFor={`checkbox-${label}`}>
                <MobileH4SM>{label}</MobileH4SM>
            </label>
        </List>
    );
}
