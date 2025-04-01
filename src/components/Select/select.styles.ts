import { Select } from "@mui/material";
import { styled } from "@mui/system";

export const StyledSelect = styled(Select)(({ theme }) => ({
  height: "30px",
  fontSize: "14px",
  minWidth: "170px",
  "& .MuiSelect-icon": {
    color: "inherit",
    marginLeft: "30px",
  },
  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },

  // Media Queries for Responsive Design
  [theme.breakpoints.down("lg")]: {
    minWidth: "150px",
  },
  [theme.breakpoints.down("md")]: {
    minWidth: "130px",
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: "110px",
  },
}));
