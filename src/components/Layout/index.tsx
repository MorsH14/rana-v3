"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { noLayoutRoutes } from "@/utils/routes.util";
import { LayoutWrapper } from "@/styles/globals.styles";
import Header from "./Header";
import Footer from "./Footer/footer";
import { Box } from "@mui/material";

interface UserProfile {
  name: string;
  location: string;
  profileImage: string;
  notifications: number;
  role?: string;
}

interface LayoutProps {
  children: React.ReactNode;
  user: UserProfile;
}

const Layout = ({ children, user }: LayoutProps) => {
  const pathname = usePathname();

  return noLayoutRoutes.includes(pathname) ? (
    <>{children}</>
  ) : (
    <LayoutWrapper
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header user={user} />
      <Box component="main" style={{ flexGrow: 1 }} sx={{ '@media screen and (max-width: 769px)': { paddingBottom: '60px' } }}>
        {children}
      </Box>
      <Footer />
    </LayoutWrapper>
  );
};

export default Layout;
