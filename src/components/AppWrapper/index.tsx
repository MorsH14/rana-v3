import { ChildrenProps } from "@/utils/global.types.utils";
import Layout from "../Layout";


export default function AppWrapper({ children }: ChildrenProps) {
  return (
    <div>
        <Layout>{children}</Layout>
        
    </div>
  )
}
