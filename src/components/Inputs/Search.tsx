import React from "react";
import { BookmarkSimple, CaretLeft, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { SearchWrapper } from "./styles";
import { HiddenOnDesktop, HiddenOnMobile } from "@/styles/globals.styles";

type Props = {
  value?: string;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export default function Search({ value, placeholder, ...props }: Props) {
  return (
    <SearchWrapper>
      <HiddenOnDesktop>
      <CaretLeft size={30} weight="bold" color="black" />
      </HiddenOnDesktop>
      <input {...props} value={value} placeholder={placeholder || "Search"} type="search" style={{ border: 'none', width: '100%', height: '100%', fontSize: '14px', padding: '0 10px',background: 'inherit'}}/>
      <HiddenOnDesktop>
      <BookmarkSimple size={30} weight="bold" color="black"/>
      </HiddenOnDesktop>
      <HiddenOnMobile>
      <MagnifyingGlass  size={30} weight="bold" color="black"/>
      </HiddenOnMobile>
    </SearchWrapper>
  );
};

