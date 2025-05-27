"use client"

import { MagnifyingGlass } from "@phosphor-icons/react";
import { useState } from "react";
import { Stack } from "@mui/material";
import Select from "@/components/Select/Select";
import { DesktopNavIcon, Hr, SortDesktopWrapper, SortMainWrapper } from "./home.styles";
import { options, amount, location, states } from "@/utils/constants";
import { MapPin, Money } from "@phosphor-icons/react/dist/ssr";


export default function SelectProp() {
  const [selectedCategory, setSelectedCategory] = useState<string>("designer");
  const [selectedPrice, setSelectedPrice] = useState<string | number>("price"); 
  const [selectedLocation, setSelectedLocation] = useState<string>("lagos");
  const [selectedState, setSelectedState] = useState<string>("lagos");

  return (
    <SortMainWrapper>
    <Stack gap={"50px"} flexDirection={"row"}>
      {/* Category Select */}
      <SortDesktopWrapper>
        <DesktopNavIcon>
          <MagnifyingGlass size={18} weight="bold" color="#f5f5f5eb" />
        </DesktopNavIcon>
        <Select
          options={options}
          selectedOption={selectedCategory}
          onChange={(value) => setSelectedCategory(value as string)} // Ensure type is string
          sx={{ color: "white" }}
        />
        <Hr/>
      </SortDesktopWrapper>
      {/* Price Select in ₦ */}
      <SortDesktopWrapper>
        <DesktopNavIcon>
          <Money size={18} weight="bold" color="#f5f5f5eb" />
        </DesktopNavIcon>
        <Select
          options={amount}
          selectedOption={selectedPrice}
          onChange={(value) => setSelectedPrice(value)} // Allows both string and number
          sx={{ color: "white" }}
        />
        <Hr/>
      </SortDesktopWrapper>
      {/* Location Select */}
      <SortDesktopWrapper>
        <DesktopNavIcon>
          <MapPin size={18} weight="bold" color="#f5f5f5eb" />
        </DesktopNavIcon>
        <Select
          options={location}
          selectedOption={selectedLocation}
          onChange={(value) => setSelectedLocation(value as string)} // Ensure type is string
          sx={{ color: "white" }}
        />
        <Hr/>
      </SortDesktopWrapper>
      
      <SortDesktopWrapper>
        <DesktopNavIcon>
          <MagnifyingGlass size={18} weight="bold" color="#f5f5f5eb" />
        </DesktopNavIcon>
        <Select
          options={states}
          selectedOption={selectedState}
          onChange={(value) => setSelectedState(value as string)} // Ensure type is string
          sx={{ color: "white" }}
        />
      </SortDesktopWrapper>
    </Stack>
    </SortMainWrapper>
  );
}
