import type { Metadata } from "next";
import RhythmHouseSite from "./rhythm-house-site";
import "./rhythm-house.css";

export const metadata: Metadata = {
  title: "Rhythm House — Dance Classes in Dehradun",
  description: "Beginner-friendly dance, fitness and kids’ classes near Rajpur Road, with simple timings and free trial booking.",
  openGraph: {
    title: "Rhythm House — Dance Classes in Dehradun",
    description: "Find your class, check weekly timings and book a free trial at Rhythm House.",
    images: [{ url: "/rhythm-house/hero.png", alt: "Rhythm House group dance class" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rhythm House — Dance Classes in Dehradun",
    description: "Find your class, check weekly timings and book a free trial at Rhythm House.",
    images: ["/rhythm-house/hero.png"],
  },
};

export default function RhythmHousePage() {
  return <RhythmHouseSite />;
}
