import React from "react";

import HomeHero from "@/features/home/components/Hero";
import HowItWork from "@/features/home/components/HowItWork";
import LaunchApp from "@/features/home/components/LaunchApp";

export default function Home() {
  return (
    <div>
      <HomeHero />
      <HowItWork />
      <LaunchApp />
    </div>
  );
}
