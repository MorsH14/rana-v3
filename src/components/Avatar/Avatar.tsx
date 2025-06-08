import Avatar from '@mui/material/Avatar';

type AvatarProps = {
  size?: number;
  imageUrl: string;
  name: string;
};

export default function MainAvatar({ size = 40, imageUrl, name }: AvatarProps) {
  return (
    <Avatar
      alt={name}
      src={imageUrl}
      sx={{ width: size, height: size }}
    />
  );
}
