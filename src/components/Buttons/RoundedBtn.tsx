import * as PhosphorIcons from '@phosphor-icons/react/dist/ssr';
import { RoundedBtnWrapper } from './Button.styles';

interface RoundedBtnProps {
    icon: string; 
}

export default function RoundedBtn({ icon }: RoundedBtnProps) {
    const IconComponent = (PhosphorIcons as any)[icon]; 

    if (!IconComponent) {
        console.warn(`Icon "${icon}" not found in Phosphor Icons`);
        return null;
    }

    return (
        <RoundedBtnWrapper>
            <IconComponent size={16} weight="bold" />
        </RoundedBtnWrapper>
    );
}
