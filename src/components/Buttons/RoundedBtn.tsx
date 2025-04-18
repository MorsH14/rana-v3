'use client';

import * as PhosphorIcons from '@phosphor-icons/react';
import { RoundedBtnWrapper } from './Button.styles';
import { ComponentType } from 'react';

interface RoundedBtnProps {
  icon: keyof typeof PhosphorIcons;
}

export default function RoundedBtn({ icon }: RoundedBtnProps) {
  const IconComponent = PhosphorIcons[icon] as ComponentType<{ size?: number; weight?: string }>;

  if (!IconComponent) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Icon "${icon}" not found in Phosphor Icons`);
    }
    return null;
  }

  return (
    <RoundedBtnWrapper>
      <IconComponent size={16} weight="bold" />
    </RoundedBtnWrapper>
  );
}
