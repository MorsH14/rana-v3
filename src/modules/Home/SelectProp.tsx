"use client";

import { Stack } from "@mui/material";
import Select from "@/components/Select/Select";
import { DesktopNavIcon, Hr, SortDesktopWrapper, SortMainWrapper } from "./home.styles";
import { options, amount, location } from "@/utils/constants";
import { MapPin, Money, Suitcase } from "@phosphor-icons/react/dist/ssr";

interface SelectPropProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedPrice: string | number;
  setSelectedPrice: (value: string | number) => void;
  selectedLocation: string;
  setSelectedLocation: (value: string) => void;
}

export default function SelectProp({
  selectedCategory,
  setSelectedCategory,
  selectedPrice,
  setSelectedPrice,
  selectedLocation,
  setSelectedLocation,
}: SelectPropProps) {
  return (
    <SortMainWrapper>
      <Stack gap={"50px"} flexDirection={"row"}>
        {/* Category Select */}
        <SortDesktopWrapper>
          <DesktopNavIcon>
            <Suitcase size={18} weight="bold" color="#f5f5f5eb" />
          </DesktopNavIcon>
          <Select
            options={options}
            selectedOption={selectedCategory}
            onChange={(value) => setSelectedCategory(value as string)}
            sx={{ color: "white" }}
          />
          <Hr />
        </SortDesktopWrapper>

        {/* Price Select */}
        <SortDesktopWrapper>
          <DesktopNavIcon>
            <Money size={18} weight="bold" color="#f5f5f5eb" />
          </DesktopNavIcon>
          <Select
            options={amount}
            selectedOption={selectedPrice}
            onChange={(value) => setSelectedPrice(value)}
            sx={{ color: "white" }}
          />
          <Hr />
        </SortDesktopWrapper>

        {/* Location Select */}
        <SortDesktopWrapper>
          <DesktopNavIcon>
            <MapPin size={18} weight="bold" color="#f5f5f5eb" />
          </DesktopNavIcon>
          <Select
            options={location}
            selectedOption={selectedLocation}
            onChange={(value) => setSelectedLocation(value as string)}
            sx={{ color: "white" }}
          />
        </SortDesktopWrapper>
      </Stack>
    </SortMainWrapper>
  );
}
