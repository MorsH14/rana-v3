"use client";

import { useLocalStorage } from "@/utils/hooks/useLocalStorage";
import { initialUserData } from "@/db";
import HomeClient from "./HomeClient";
import HomeWorker from "./HomeWorker";

export default function Homepage() {
  const [user] = useLocalStorage("rana-user-profile", initialUserData);
  return user.accountType === "client" ? <HomeClient /> : <HomeWorker />;
}
