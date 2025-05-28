import { Box } from "@mui/material";  
import { Icon as SvgIcon } from "@phosphor-icons/react";
import { MobileB1MGray700 } from "@/utils/typography";
import { COLORS } from "@/utils/colors.util";
import { FlexCenter } from "@/styles/globals.styles";
import { CreateItemWrapper } from "./style";



interface NoListItemCardProp {
  Icon: SvgIcon;
  label: string;
  // action: string;
}

export default function NoListItemCard({Icon, label}:NoListItemCardProp) {
  return (
    <CreateItemWrapper>
      <FlexCenter>
      <Box>
          <Icon weight="bold" size={56} color={COLORS.gray100} />
        </Box>
        <MobileB1MGray700>{label}</MobileB1MGray700>
      </FlexCenter>
    </CreateItemWrapper>
  )
}
