import type { Metadata } from "next";
import NoirDemo from "./noir-demo";
import "./noir.css";

export const metadata: Metadata = {
  title: "Salon Noir — Premium Salon in Dehradun",
  description:
    "A fictional premium salon experience featuring services, artists, colour inspiration and smart appointment booking.",
  openGraph: {
    title: "Salon Noir — Your next look starts here",
    description:
      "Explore a premium fictional salon experience designed by Vansh Studio.",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Salon Noir — Your next look starts here",
    description:
      "Explore a premium fictional salon experience designed by Vansh Studio.",
    images: [],
  },
};

export default function Noir() {
  return <NoirDemo />;
}
