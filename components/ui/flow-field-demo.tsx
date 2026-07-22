import React from "react";
import NeuralBackground from "@/components/ui/flow-field-background";

export default function NeuralHeroDemo() {
  return (
    <div className="relative w-full h-screen">
      <NeuralBackground 
        color="#818cf8"
        trailOpacity={0.1}
        speed={0.8}
      />
    </div>
  );
}
