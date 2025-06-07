import * as React from 'react';
import Avatar from '@mui/material/Avatar';

type AvatarProps = {
  size?: number;
  imageUrl: any;
  name: string;
};

export default function MainAvatar({ size, imageUrl, name }: AvatarProps) {
  return (
    <Avatar
      alt={name}
      src={imageUrl}
      sx={{ width: size, height: size }}
    />
  );
}
