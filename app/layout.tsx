import type { Metadata } from "next";
import "./globals.css";
import "./demo-modern.css";
import "./button-system.css";
export const metadata:Metadata={
  metadataBase:new URL("https://vansh-studio.easyvansh.chatgpt.site"),
  title:"Vansh Studio — Websites for Local Businesses",
  description:"Fast, modern websites for restaurants, cafés, salons and local businesses in Dehradun.",
  openGraph:{title:"Vansh Studio — Websites for Local Businesses",description:"Websites that make local businesses impossible to ignore.",images:[{url:"/og.png",width:1200,height:630,alt:"Vansh Studio"}]},
  twitter:{card:"summary_large_image",title:"Vansh Studio — Websites for Local Businesses",description:"Websites that make local businesses impossible to ignore.",images:["/og.png"]},
  icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"}
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
