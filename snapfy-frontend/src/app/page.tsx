import React from "react";

import HomeHero from "@/features/home/components/Hero";
import HomeHowItWork from "@/features/home/components/HowItWork";
import LaunchApp from "@/features/home/components/LaunchApp";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between gap-12">
      <HomeHero />
      <HomeHowItWork />
      <LaunchApp />
    </div>
  );
}
