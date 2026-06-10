"use client";
import { Star, StarHalf } from "@phosphor-icons/react/dist/ssr";
import { COLORS } from "@/utils/colors.util";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: number;
}

export default function StarRating({ rating, reviewCount, size = 12 }: StarRatingProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1px" }}>
      {Array.from({ length: 5 }, (_, i) => {
        const num = i + 1;
        if (rating >= num)
          return <Star key={i} size={size} weight="fill" color={COLORS.yellow100} />;
        if (rating >= num - 0.5)
          return <StarHalf key={i} size={size} weight="fill" color={COLORS.yellow100} />;
        return <Star key={i} size={size} color={COLORS.gray300} />;
      })}
      {reviewCount !== undefined && (
        <span style={{ fontSize: size - 1, color: COLORS.SolidGray400, marginLeft: "3px" }}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
