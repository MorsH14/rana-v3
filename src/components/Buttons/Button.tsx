import { IconButtonWrapper, PillWrapper } from "./Button.styles";

type IconButtonProps = {
  children: React.ReactNode;
  icon: React.ReactNode;
};
type PillProps = {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
};


export default function IconButton({ children, icon }: IconButtonProps) {
  return (
    <IconButtonWrapper>
      {icon}
      {children}
    </IconButtonWrapper>
  );
}

export const Pill = ({ children, onClick, style }: PillProps) => {
  return (
    <PillWrapper onClick={onClick} style={style}>
      {children}
    </PillWrapper>
  );
};