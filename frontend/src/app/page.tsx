"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import { VscSparkleFilled } from "react-icons/vsc";
import { MdArrowOutward } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ImDatabase } from "react-icons/im";
import { GrNodes } from "react-icons/gr";
import { SiSpeedypage } from "react-icons/si";

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

const endpoints = [
  {
    url: "https://api.mainnet-beta.solana.com",
    status: "Online",
    visibility: "Public",
    latency: "132ms",
    weight: 1,
  },
  {
    url: "https://solana-api.projectserum.com",
    status: "Online",
    visibility: "Public",
    latency: "145ms",
    weight: 1,
  },
  {
    url: "https://rpc.ankr.com/solana",
    status: "Offline",
    visibility: "Public",
    latency: "210ms",
    weight: 0.5,
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

  const [stars, setStars] = useState<
    { id: number; left: number; delay: number; size: number }[]
  >([]);

  // Generate random stars
  useEffect(() => {
    const generatedStars = Array.from({ length: 50 }, () => ({
      id: Math.random(),
      left: Math.random() * 100,
      delay: Math.random() * 5,
      size: Math.random() * 3 + 1,
    }));
    setStars(generatedStars);
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

      <section className="relative h-[207vh] bg-[#050816] z-0 overflow-hidden flex flex-col items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 py-24 h-full flex flex-col">
          {/* Random Stars Animation */}
          <div className="absolute inset-0 pointer-events-none">
            {stars.map((star) => (
              <div
                key={star.id}
                className="absolute bg-white rounded-full opacity-70 animate-float"
                style={{
                  left: `${star.left}%`,
                  bottom: "-20px",
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  animationDelay: `${star.delay}s`,
                }}
              />
            ))}
          </div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1 px-20 z-10">
            {/* First row */}
            <div className="bg-[#0a0a1f] rounded-lg overflow-hidden flex flex-col h-96 justify-between border border-[#1a1a3a]">
              {/* Card 1 - Empty */}
            </div>

            <div className="bg-[#0a0a1f] relative rounded-lg overflow-hidden flex flex-col h-96 justify-between border border-[#1a1a3a]">
              {/* Card 2 - Empty */}
              {/* Purple Glow */}
              <div
                className="absolute bottom-0 left-1/2 w-full h-28 transform -translate-x-1/2 z-0 blur-2xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at bottom, rgba(168, 85, 247, 0.4), transparent 60%)",
                }}
              />
            </div>

            <div className="bg-[#0a0a1f] relative rounded-lg overflow-hidden flex flex-col justify-between border border-[#1a1a3a] h-96 p-6 text-white">
              {/* Purple Glow */}
              <div
                className="absolute -top-20 left-1/2 w-full h-28 transform -translate-x-1/2 z-0 blur-2xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at bottom, rgba(168, 85, 247, 0.4), transparent 60%)",
                }}
              />

              {/* Content */}
              <div className="z-10">
                <h2 className="text-lg font-semibold">Title</h2>
                <p className="text-sm text-gray-400">description</p>
              </div>

              {/* Icons */}
              <div className="flex justify-center items-center space-x-6 z-10">
                <div className="bg-[#2b2b40] p-3 rounded-full custom-get-started-button mt-6">
                  <Image
                    src="/icon.png"
                    alt="Icon 1"
                    className="w-8 h-8"
                    width={20}
                    height={20}
                  />
                </div>
                <div className="bg-[#a855f7] custom-get-started-button p-4.5 rounded-full shadow-lg mb-32">
                  <Image
                    src="/icon.png"
                    alt="Main Icon"
                    className="w-12 h-12"
                    width={40}
                    height={40}
                  />
                </div>
                <div className="bg-[#2b2b40] p-3 rounded-full custom-get-started-button mt-20">
                  <Image
                    src="/icon.png"
                    alt="Icon 2"
                    className="w-8 h-8"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
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
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 border border-slate-800 rounded-full shadow-md shadow-">
                  <div className="w-7 h-7 bg-[#1a1a3a] rounded-full flex items-center justify-center text-white text-sm shadow-md">
                    <ImDatabase />
                  </div>
                </div>
              </div>

              <div className="absolute w-56 h-56 spin-slower z-10">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 border border-slate-800 rounded-full">
                  <div className="w-7 h-7 bg-[#1a1a3a] rounded-full flex items-center justify-center text-white text-sm shadow-md">
                    <GrNodes />
                  </div>
                </div>
              </div>

              <div className="absolute w-72 h-72 spin-slowest z-10">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 border border-slate-800 rounded-full">
                  <div className="w-7 h-7 bg-[#1a1a3a] rounded-full flex items-center justify-center text-white text-sm shadow-md">
                    <SiSpeedypage />
                  </div>
                </div>
              </div>

              {/* 📝 Content Layer on Bottom Left */}
              <div className="absolute bottom-4 left-4 z-20 text-white">
                <h3 className="text-lg font-semibold">Something</h3>
                <p className="text-sm text-gray-300">description</p>
              </div>
            </div>

            <div className="bg-[#0a0a1f] relative rounded-xl overflow-hidden h-96 flex flex-col justify-center gap-2 px-6 border border-[#1a1a3a] md:col-span-2 w-full max-w-5xl ">
              <style>
                {`
                @keyframes float {
              0% {
                transform: translateY(0px);
                opacity: 0.5;
              }
              50% {
                opacity: 0.8;
              }
              100% {
                transform: translateY(-30vh);
                opacity: 0;
              }
            }
            .animate-float {
              animation: float 15s linear infinite;
            }
             `}
              </style>

              {/* Radial glow on top */}
              <div
                className="absolute -top-16 left-1/2 w-full h-28 transform -translate-x-1/2 z-0 blur-2xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at bottom, rgba(168, 85, 247, 0.4), transparent 70%)",
                }}
              />

              {/* Sparkles */}
              <div className="absolute inset-0  z-10 pointer-events-none overflow-hidden">
                {[...Array(30)].map((_, i) => {
                  const left = Math.random() * 100;
                  const delay = Math.random() * 3;
                  const duration = 5 + Math.random() * 5;
                  const size = 1 + Math.random() * 1;

                  return (
                    <div
                      key={i}
                      className="absolute rounded-full opacity-70"
                      style={{
                        left: `${left}%`,
                        bottom: 0,
                        width: `${size}px`,
                        height: `${size}px`,
                        animation: `float ${duration}s ease-in infinite`,
                        animationDelay: `${delay}s`,
                        background: "radial-gradient(circle, #ffffff, #a855f7)",
                        boxShadow: "0 0 1px #c084fc",
                      }}
                    />
                  );
                })}
              </div>

              {/* Endpoint list */}
              <div className="relative z-20 flex flex-col gap-2">
                {endpoints.map((endpoint, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 px-2 rounded-lg backdrop-blur-md bg-white/5 border border-white/10 shadow-lg"
                  >
                    <div className="flex-1 truncate text-white/80 font-mono text-sm">
                      {endpoint.url}
                    </div>
                    <div className="flex items-center gap-1 md:gap-6">
                      <div className="flex items-center justify-center px-2 py-0.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 custom-get-started-button">
                        <span className="text-white/80 text-xs ">
                          {endpoint.visibility}
                        </span>
                      </div>
                      <div className="w-20 md:w-24 flex items-center">
                        <div
                          className={`h-2 w-2 rounded-full mr-2 ${
                            endpoint.status === "Online"
                              ? "bg-emerald-400"
                              : "bg-gray-400"
                          }`}
                        ></div>
                        <span
                          className={`text-sm ${
                            endpoint.status === "Online"
                              ? "text-emerald-400"
                              : "text-gray-400"
                          }`}
                        >
                          {endpoint.status === "Online" ? "Online" : ""}
                        </span>
                      </div>
                      <div className="w-16 md:w-20 text-white/80 text-sm">
                        {endpoint.latency}
                      </div>
                      <div className="w-8 md:w-10 text-white/80 text-sm">
                        {endpoint.weight}
                      </div>
                      <div className="w-8 h-8 flex items-center justify-center text-white/60">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="1" />
                          <circle cx="19" cy="12" r="1" />
                          <circle cx="5" cy="12" r="1" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Centered SOLRPC Text */}
          <div className="flex justify-center items-center mt-64 z-30">
            <div className="inter tracking-tighter text-[16rem] font-black bg-clip-text text-transparent bg-gradient-to-b from-slate-700 to-transparent text-center">
              SOLRPC
            </div>
          </div>

          <style jsx>{`
            @keyframes float {
              0% {
                transform: translateY(0px);
                opacity: 0.5;
              }
              50% {
                opacity: 0.8;
              }
              100% {
                transform: translateY(-30vh);
                opacity: 0;
              }
            }
            .animate-float {
              animation: float 12s linear infinite;
            }
          `}</style>
        </div>
      </section>

      <section className="relative h-[40vh] bg-[#050816] z-0 overflow-hidden"></section>
    </div>
  );
}
