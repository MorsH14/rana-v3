import { Button } from "@mui/material";
import { styled } from "@mui/system";

const StyledButton = styled(Button)(({ theme }) => ({
  background: "black",
  color: "white",
  fontWeight: "bold",
  padding: "10px 20px",
  borderRadius: 20,
  cursor: "pointer",
  fontSize: "12px", 

  [theme.breakpoints.down("sm")]: {
    fontSize: "10px",
    padding: "5px 10px",
  },
}));

type CardBtnProps = {
  label: string;
  onClick?: () => void;
};

export default function CardBtn({ label, onClick }: CardBtnProps) {
  return <StyledButton onClick={onClick}>{label}</StyledButton>;
}
