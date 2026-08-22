import type { Metadata } from "next";
import MysaSite from "./mysa-site";
import {DemoScrollIsland} from "../components/demo-ui";

const hero = "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=2400&q=90";

export const metadata: Metadata = {
  title: "Mysa Café — Slow Mornings in Dehradun",
  description: "A fictional premium neighbourhood café experience on Rajpur Road, Dehradun, featuring specialty coffee, seasonal food and table reservations.",
  openGraph: {
    title: "Mysa Café — Slow Mornings in Dehradun",
    description: "Specialty coffee, seasonal plates and things worth slowing down for.",
    images: [{ url: hero, alt: "Mysa Café interior" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mysa Café — Slow Mornings in Dehradun",
    description: "Specialty coffee, seasonal plates and things worth slowing down for.",
    images: [hero],
  },
};

export default function Mysa() {
  return <><DemoScrollIsland label="MYSA" links={[{name:"Menu",href:"#menu"},{name:"Coffee",href:"#coffee"},{name:"Visit",href:"#visit"}]}/><MysaSite /></>;
}
