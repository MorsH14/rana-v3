"use client";
import { ChildrenProps } from "@/utils/global.types.utils";
import Layout from "../Layout";
import { Suspense } from "react";
import { Spinner } from "../loaders";
import { initialUserData } from "@/db";
import { useLocalStorage } from "@/utils/hooks/useLocalStorage";

export default function AppWrapper({ children }: ChildrenProps) {
  const [user] = useLocalStorage("rana-user-profile", initialUserData);
  return (
    <Suspense fallback={<Spinner />}>
      <Layout user={user}>
        {children}
      </Layout>
    </Suspense>
  );
}
