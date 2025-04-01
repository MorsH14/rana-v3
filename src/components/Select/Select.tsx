import { MenuItem, FormControl, SxProps } from "@mui/material";
import { StyledSelect } from "./select.styles";

type SortSelectProps = {
  options: { value: string | number; label: string }[];
  selectedOption: string | number;
  onChange: (value: string | number) => void;
  sx?: SxProps;
};

const SortSelect: React.FC<SortSelectProps> = ({ options, selectedOption, onChange, sx }) => {
  return (
    <FormControl>
      <StyledSelect value={selectedOption} onChange={(e) => onChange(e.target.value)} sx={sx}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
};

export default SortSelect;
