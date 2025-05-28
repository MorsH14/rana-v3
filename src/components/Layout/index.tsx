"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { noLayoutRoutes } from "@/utils/routes.util";
import { LayoutWrapper } from "@/styles/globals.styles";
import Header from "./Header";
import { ChildrenProps } from "@/utils/global.types.utils";
import Footer from "./Footer/footer";
import { Box } from "@mui/material";

const Layout = ({ children }: ChildrenProps) => {
  const pathname = usePathname();

  return noLayoutRoutes.includes(pathname) ? (
    children
  ) : (
    <LayoutWrapper style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header/>
      <Box component="main" style={{ flexGrow: 1 }}>
        {children}
      </Box>
        <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
