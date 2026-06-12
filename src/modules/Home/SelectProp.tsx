"use client";

import { Stack } from "@mui/material";
import Select from "@/components/Select/Select";
import { DesktopNavIcon, Hr, SortDesktopWrapper, SortMainWrapper } from "./home.styles";
import { options, amount, location } from "@/utils/constants";
import { MapPin, Money, Suitcase } from "@phosphor-icons/react/dist/ssr";
import { HiddenOnMobile } from "@/styles/globals.styles";

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
      <Stack gap={{ xs: "4px", md: "50px" }} flexDirection={"row"}>
        {/* Category Select */}
        <SortDesktopWrapper>
          <HiddenOnMobile>
            <DesktopNavIcon>
              <Suitcase size={18} weight="bold" color="#f5f5f5eb" />
            </DesktopNavIcon>
          </HiddenOnMobile>
          <Select
            options={options}
            selectedOption={selectedCategory}
            onChange={(value) => setSelectedCategory(value as string)}
            sx={{ color: "white" }}
          />
          <HiddenOnMobile>
            <Hr />
          </HiddenOnMobile>
        </SortDesktopWrapper>

        {/* Price Select */}
        <SortDesktopWrapper>
          <HiddenOnMobile>
            <DesktopNavIcon>
              <Money size={18} weight="bold" color="#f5f5f5eb" />
            </DesktopNavIcon>
          </HiddenOnMobile>
          <Select
            options={amount}
            selectedOption={selectedPrice}
            onChange={(value) => setSelectedPrice(value)}
            sx={{ color: "white" }}
          />
          <HiddenOnMobile>
            <Hr />
          </HiddenOnMobile>
        </SortDesktopWrapper>

        {/* Location Select */}
        <SortDesktopWrapper>
          <HiddenOnMobile>
            <DesktopNavIcon>
              <MapPin size={18} weight="bold" color="#f5f5f5eb" />
            </DesktopNavIcon>
          </HiddenOnMobile>
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
