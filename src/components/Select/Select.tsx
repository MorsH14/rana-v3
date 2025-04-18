import { MenuItem, FormControl, Select, SelectChangeEvent, SxProps } from "@mui/material";

type SortSelectProps = {
  options: { value: string | number; label: string }[];
  selectedOption: string | number;
  onChange: (value: string | number) => void;
  sx?: SxProps;
};

const SortSelect: React.FC<SortSelectProps> = ({ options, selectedOption, onChange, sx }) => {
  const handleChange = (event: SelectChangeEvent<string | number>) => {
    onChange(event.target.value);
  };

  return (
    <FormControl>
      <Select value={selectedOption} onChange={handleChange} sx={sx}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SortSelect;
