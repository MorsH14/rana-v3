"use client";
import { ChildrenProps } from "@/utils/global.types.utils";
import Layout from "../Layout";
import { Suspense, useState } from "react";
import { Spinner } from "../loaders";
import { initialUserData } from "@/db";

export default function AppWrapper({ children }: ChildrenProps) {
  const [user] = useState(initialUserData);
  return (
    <Suspense fallback={<Spinner />}>
      <Layout user={user}>
        {children}
      </Layout>
    </Suspense>
  );
}
