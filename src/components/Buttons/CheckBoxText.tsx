"use client";

import { MobileH4SM } from "@/utils/typography";
import { List, ListWrapper, StyledCheckbox } from "./Button.styles";
import { useLocalStorage } from "@/utils/hooks/useLocalStorage";

interface CheckBoxTextProps {
    label: string; // ✅ make required
}

export default function CheckBoxText({ label }: CheckBoxTextProps) {
    const [checked, setChecked] = useLocalStorage<boolean>(`checkbox-${label}`, false);

    return (
        <div>
            <ListWrapper>
                <List>
                    <StyledCheckbox
                        id={`checkbox-${label}`}
                        type="checkbox"
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                    />
                    <label htmlFor={`checkbox-${label}`}>
                        <MobileH4SM>{label}</MobileH4SM>
                    </label>
                </List>
            </ListWrapper>
        </div>
    );
}
