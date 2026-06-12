"use client";

import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { MapPin, Money, Suitcase } from "@phosphor-icons/react/dist/ssr";
import { FilterPillsBar, FilterPill } from "./home.styles";
import { options, amount, location } from "@/utils/constants";

interface SelectPropProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedPrice: string | number;
  setSelectedPrice: (value: string | number) => void;
  selectedLocation: string;
  setSelectedLocation: (value: string) => void;
}

const getLabel = (
  opts: { value: string | number; label: string }[],
  val: string | number
) => opts.find((o) => o.value === val)?.label ?? "";

export default function SelectProp({
  selectedCategory,
  setSelectedCategory,
  selectedPrice,
  setSelectedPrice,
  selectedLocation,
  setSelectedLocation,
}: SelectPropProps) {
  const categoryActive = selectedCategory !== "all";
  const priceActive = selectedPrice !== "price";
  const locationActive = selectedLocation !== "state";

  return (
    <FilterPillsBar>
      {/* Category */}
      <FilterPill active={categoryActive}>
        <Suitcase size={14} weight="bold" />
        <span>{getLabel(options, selectedCategory)}</span>
        <CaretDown size={11} weight="bold" style={{ opacity: 0.7 }} />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </FilterPill>

      {/* Price */}
      <FilterPill active={priceActive}>
        <Money size={14} weight="bold" />
        <span>{getLabel(amount, selectedPrice)}</span>
        <CaretDown size={11} weight="bold" style={{ opacity: 0.7 }} />
        <select
          value={selectedPrice}
          onChange={(e) => {
            const val = e.target.value;
            setSelectedPrice(val === "price" ? "price" : Number(val));
          }}
        >
          {amount.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </FilterPill>

      {/* Location */}
      <FilterPill active={locationActive}>
        <MapPin size={14} weight="bold" />
        <span>{getLabel(location, selectedLocation)}</span>
        <CaretDown size={11} weight="bold" style={{ opacity: 0.7 }} />
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          {location.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </FilterPill>
    </FilterPillsBar>
  );
}
