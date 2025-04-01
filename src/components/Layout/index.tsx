"use client";
import React from "react";


import { usePathname } from "next/navigation";
import { noLayoutRoutes } from "@/utils/routes.util";
import { LayoutWrapper } from "@/styles/globals.styles";
import Header from "./Header";
import { ChildrenProps } from "@/utils/global.types.utils";

const Layout = ({ children }: ChildrenProps) => {
  const pathname = usePathname();

  return noLayoutRoutes.includes(pathname) ? (
    children
  ) : (
    <LayoutWrapper>
          <Header />
          {children}
    </LayoutWrapper>
  );
};

export default Layout;
