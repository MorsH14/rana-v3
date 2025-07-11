import { WebBody2MSolidGray400 } from "@/utils/typography";
import Input from '@mui/joy/Input';
import { Box, Stack } from "@mui/material";


interface SelectFieldProps {
    label: React.ReactNode;
    placeholder: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}



export default function SelectField({ label, placeholder }: SelectFieldProps) {
    return (
        <Stack mb={'20px'} gap={'20px'}>
            <Box>
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
        </Stack>
    )
}