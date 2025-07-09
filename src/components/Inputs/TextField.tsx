import { WebBody2MSolidGray400 } from "@/utils/typography";
import Input from '@mui/joy/Input';
import { NameInputWrapper } from "./styles";
import { Box } from "@mui/material";


interface NameInputProps {
    label: React.ReactNode;
    placeholder: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}



export default function NameInput({ label, placeholder }: NameInputProps) {
    return (
        <NameInputWrapper>
            <Box mb={'12px'}>
                <WebBody2MSolidGray400>{label}</WebBody2MSolidGray400>
            </Box>
            <Input
                placeholder={placeholder}
                variant="outlined"
                color="neutral"
                sx={{
                    width: '100%',
                    borderRadius: '8px',
                    backgroundColor: '#f5f5f5',
                    fontSize: '14px',
                    padding: '10px',
                }}
            />
        </NameInputWrapper>
    )
}