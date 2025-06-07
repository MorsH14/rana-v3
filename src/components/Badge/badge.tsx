import { Badge as UserBadge } from "@mui/material";
import Image from "next/image";

interface BadgeProps {
  badgeContent?: number | string; // Badge can accept a number or string
  imageSrc: string; // Pass image source as a prop
}

export default function Badge({ badgeContent = "", imageSrc }: BadgeProps) {
  return (
    <UserBadge
      color="secondary"
      
      badgeContent={badgeContent}
      sx={{
        "& .MuiBadge-badge": {
          fontSize: "8px",
          height: "12px",
          minWidth: "12px",
          padding: "4px",
          transform: "translate(20%, -25%)",
          background: "#4cabeb",
        },
      }}
    >
      <Image src={imageSrc} alt="user image" width={35} height={35} style={{ borderRadius: "50%", border: '.5px solid gray' }} />
    </UserBadge>
  );
}
