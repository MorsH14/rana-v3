import { ChildrenProps } from "@/utils/global.types.utils";
import Layout from "../Layout";
import { Suspense } from "react";
import { Spinner } from "../loaders";


export default function AppWrapper({ children }: ChildrenProps) {
  return (
        <Suspense fallback={<Spinner />}>
        <Layout>{children}</Layout>
        </Suspense>
  )
}
