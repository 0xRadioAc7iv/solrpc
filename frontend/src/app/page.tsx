"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import { VscSparkleFilled } from "react-icons/vsc";
import { MdArrowOutward } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/navigation";

const features = [
  {
    title: "High Availability DApps",
    description:
      "Avoid downtime by automatically routing RPC requests through the fastest and healthiest providers. Ideal for trading platforms, wallets, and DeFi protocols.",
  },
  {
    title: "Latency Optimization",
    description:
      "Route requests through the lowest-latency RPC nodes based on real-time benchmarking — critical for games, high-frequency trading, and real-time apps.",
  },
  {
    title: "Failover Protection",
    description:
      "If one RPC endpoint goes down, SolRPC seamlessly switches to another — ensuring your app stays online 24/7 without manual intervention.",
  },
  {
    title: "Simplified Infrastructure",
    description:
      "Instead of managing multiple RPC providers and endpoints manually, developers just plug into SolRPC and get smart aggregation out of the box.",
  },
  {
    title: "Multi-region Access",
    description:
      "Projects with global users benefit from geographically distributed routing, ensuring the closest and fastest RPC for each request.",
  },
  {
    title: "Custom Load Balancing",
    description:
      "Tailor how traffic is distributed across providers — by performance, cost, or custom rules — to match your project’s goals.",
  },
  {
    title: "Unified Analytics",
    description:
      "Gain insights into request volume, latency, and provider health from one dashboard — perfect for monitoring and debugging.",
  },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const handleClick = () => {
    router.push("/dash/dashboard");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="text-white relative z-0">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-[100]">
        <Navbar />
      </div>

      {/* Hero Section */}
      <section className="relative h-[140vh] bg-[#050816] overflow-hidden z-0">
        <div className="absolute inset-0 z-10">
          <AnimatedBackground />
        </div>

        <div className="absolute inset-0 z-[99] flex flex-col items-center pt-44 px-8 text-white">
          <div className="custom-get-started-button py-2 px-6 rounded-full flex items-center gap-2">
            <VscSparkleFilled />
            <span>Efficient. Reliable. Scalable</span>
          </div>
          <h1 className="text-5xl text-center py-6 text-slate-200 tracking-tight">
            <span className="inter font-medium">
              Supercharge Your{" "}
              <span className="instrument-serif-regular-italic text-purple-300 tracking-tighter">
                Solana
              </span>{" "}
              Apps with SolRPC
            </span>
          </h1>
          <p className="text-lg max-w-2xl text-center py-1 text-slate-400">
            An intelligent RPC layer that optimizes speed, reliability, and cost
            — giving you full control over how your apps talk to the Solana
            blockchain.
          </p>

          <div className="flex items-center justify-center mt-10 gap-1">
            <button
              className="py-3 px-12 custom-get-started-button rounded-3xl"
              onClick={handleClick}
            >
              Get started
            </button>
            <button className="custom-get-started-button py-3.5 px-3.5 rounded-full">
              <MdArrowOutward />
            </button>
          </div>

          <Image
            src="/dashboard.png"
            alt="hero"
            width={300}
            height={300}
            className="object-cover w-[1200px] h-full mt-24 rounded-lg"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="relative h-[94vh] bg-[#050816] z-0 overflow-hidden">
        <div className="px-40 py-16">
          <h2 className="text-4xl tracking-tight font-sans">
            <span className="inter">Powering Every Use Case Across the</span>{" "}
            <br />
            <span className="instrument-serif-regular-italic">
              Solana Ecosystem
            </span>
          </h2>
        </div>

        <div className="flex items-center justify-center gap-2 px-40">
          {/* Left Sidebar */}
          <div className="w-1/3 flex flex-col gap-4 ">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`relative cursor-pointer py-2 px-5 text-md transition-all duration-200 ${
                  selectedIndex === index
                    ? "text-white font-semibold bg-gradient-to-r from-purple-500/20 to-transparent"
                    : "text-gray-500"
                }`}
                onClick={() => setSelectedIndex(index)}
              >
                {selectedIndex === index && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-purple-800 rounded-r" />
                )}
                {feature.title}
              </div>
            ))}
          </div>

          <div className="w-2/3 h-[378px] px-8 py-8 flex flex-col bg-gradient-to-t from-purple-900/20 to-transparent text-white/80 rounded-sm shadow-xl relative overflow-hidden border border-slate-400/10">
            {/* Background SVGs */}
            <Image
              src="ellipse4.svg"
              alt="ellipse background"
              height={300}
              width={300}
              className="absolute -left-20 -top-25 opacity-20 z-0 pointer-events-none"
            />
            <Image
              src="ellipse4.svg"
              alt="ellipse background"
              height={330}
              width={330}
              className="absolute -right-15 -bottom-10 opacity-20 z-0 pointer-events-none"
            />

            {/* Sparkles */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="sparkle absolute w-0.5 h-0.5 bg-white/40 rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                />
              ))}
            </div>

            <div className="relative z-20">
              <h2 className="text-3xl font-semibold mb-6">
                {features[selectedIndex].title}
              </h2>
              <p className="max-w-lg text-white/60">
                {features[selectedIndex].description}
              </p>
            </div>

            {/* Add styles at the bottom of the file (JSX compatible) */}
            <style jsx>{`
              @keyframes float {
                0% {
                  transform: translateY(0);
                  opacity: 0.4;
                }
                50% {
                  transform: translateY(-30px);
                  transform: translateX(-10px);
                  opacity: 1;
                }
                100% {
                  transform: translateY(0);
                  opacity: 0.4;
                }
              }
              .sparkle {
                animation: float 4s ease-in-out infinite;
              }
            `}</style>
          </div>
        </div>
      </section>

      <section className="h-[100vh] bg-[#050816] overflow-hidden  flex items-center justify-center relative">
        {/* Ripple circles - z-0 to stay behind */}
        <div className="absolute z-0 mb-24">
          <div className="ripple-circle animate-ripple1" />
          <div className="ripple-circle animate-ripple2" />
        </div>

        {/* Content - z-10 to appear on top */}
        <div className="relative z-10 flex flex-col items-center">
          <Image
            src="/middle.svg"
            alt="svg"
            height={400}
            width={400}
            className="mb-8"
          />
          <div className="flex flex-col items-center gap-4">
            <span className="text-4xl font-normal inter tracking-tight text-slate-100/90">
              Rethink How You Talk to{" "}
              <span className="instrument-serif-regular-italic">Solana </span>
            </span>
            <span className="inter text-lg text-slate-100/80">
              SolRPC sits between your app and your RPCs — balancing, caching,
              retrying, and giving you full control.
            </span>
          </div>
        </div>
      </section>

      <section className="relative h-[150vh] bg-[#050816] z-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-24 h-full flex flex-col">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-normal text-white mb-3 inter">
              Core Capabilities That Power{" "}
              <span className="instrument-serif-regular-italic">SolRPC</span>
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg">
              A breakdown of the features that make your RPC layer faster,
              smarter, and more resilient.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1 px-20">
            {/* First row */}
            <div className="bg-[#0a0a1f] rounded-lg overflow-hidden flex flex-col h-96 justify-between border border-[#1a1a3a]">
              {/* Card 1 - Empty */}
            </div>

            <div className="bg-[#0a0a1f] rounded-lg overflow-hidden flex flex-col h-96 justify-between border border-[#1a1a3a]">
              {/* Card 2 - Empty */}
            </div>

            <div className="bg-[#0a0a1f] rounded-lg overflow-hidden flex flex-col h-96 justify-between border border-[#1a1a3a]">
              {/* Card 3 - Empty */}
            </div>

            {/* Second row */}
            <div className="bg-[#0a0a1f] rounded-lg overflow-hidden h-96 flex justify-center items-center border border-[#1a1a3a] relative md:col-span-1">
              {/* 🔮 Bottom Purple Glow - Z-0 */}
              <div
                className="absolute bottom-0 left-1/2 w-full h-28 transform -translate-x-1/2 z-0 blur-2xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at bottom, rgba(168, 85, 247, 0.4), transparent 60%)",
                }}
              />

              <Image
                src="/round-logo.png"
                alt="logo"
                height={90}
                width={90}
                className="z-10"
              />

              <div className="absolute w-36 h-36 rounded-full border border-[#1a1a3a]/80 opacity-90 z-10" />
              <div className="absolute w-56 h-56 rounded-full border border-[#1a1a3a]/70 opacity-90 z-10" />
              <div className="absolute w-72 h-72 rounded-full border border-[#1a1a3a]/80 opacity-90 z-10" />

              {/* 🧿 Icons on Rings */}
              <div className="absolute w-36 h-36 spin-slow z-10">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-[#1a1a3a] rounded-full flex items-center justify-center text-white text-sm shadow-md">
                    🚴‍♂️
                  </div>
                </div>
              </div>

              <div className="absolute w-56 h-56 spin-slower z-10">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-[#1a1a3a] rounded-full flex items-center justify-center text-white text-sm shadow-md">
                    🧘‍♂️
                  </div>
                </div>
              </div>

              <div className="absolute w-72 h-72 spin-slowest z-10">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-[#1a1a3a] rounded-full flex items-center justify-center text-white text-sm shadow-md">
                    🏃‍♀️
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0a0a1f] rounded-xl overflow-hidden h-96 flex flex-col justify-between border border-[#1a1a3a] md:col-span-2">
              {/* Card 5 - Empty */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
