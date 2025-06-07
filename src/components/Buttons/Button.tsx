import { IconButtonWrapper } from "./Button.styles";

type IconButtonProps = {
  children: React.ReactNode;
  icon: React.ReactNode;
};

export default function IconButton({ children, icon }: IconButtonProps) {
  return (
    <IconButtonWrapper>
      {icon}
      {children}
    </IconButtonWrapper>
  );
}
