import { Slot } from "expo-router";
import { SessionProvider } from "@/utils/ctx"

export default function RootLayout() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  )
}
