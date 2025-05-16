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
import {
  Network,
  BarChart3,
  Zap,
  Shield,
  ArrowRightLeft,
  MoreHorizontal,
  Cpu,
  Server,
  Gauge,
} from "lucide-react";

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
    url: "https://mainnet.solana-api.com/rpc",
    visibility: "Public",
    status: "Online",
    latency: "45ms",
    weight: "1.0",
  },
  {
    url: "https://solana-mainnet.phantom.tech/rpc",
    visibility: "Private",
    status: "Online",
    latency: "52ms",
    weight: "0.8",
  },
  {
    url: "https://api.mainnet-beta.solana.com",
    visibility: "Public",
    status: "Online",
    latency: "63ms",
    weight: "0.7",
  },
  {
    url: "https://solana-api.projectserum.com",
    visibility: "Public",
    status: "Online",
    latency: "78ms",
    weight: "0.5",
  },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const [animatedEndpoints, setAnimatedEndpoints] = useState(endpoints);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedEndpoints((prev) =>
        prev.map((endpoint) => ({
          ...endpoint,
          latency: `${Math.floor(40 + Math.random() * 50)}ms`,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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

      <section className="relative h-[150vh] bg-[#050816] z-0 overflow-hidden flex flex-col items-center justify-center">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1 px-4 md:px-20 z-10">
            {/* First row */}
            <div className="bg-[#0a0a1f] relative rounded-lg overflow-hidden flex flex-col h-96 justify-between border border-[#1a1a3a] group">
              <div
                className="absolute bottom-0 left-1/2 w-full h-28 transform -translate-x-1/2 z-0 blur-2xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at bottom, rgba(168, 85, 247, 0.4), transparent 60%)",
                }}
              />

              {/* Content */}
              <div className="z-10 p-6 flex flex-col h-full">
                <div className="mb-4">
                  <div className="bg-purple-500/20 p-2 rounded-lg w-fit">
                    <ArrowRightLeft className="w-6 h-6 text-purple-400" />
                  </div>
                </div>

                <h2 className="text-xl font-medium text-white mb-2">
                  Intelligent Routing
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                  Auto-distributes traffic based on load, latency, and failures
                  — no config needed.
                </p>

                <div className="mt-auto flex-1 flex items-end">
                  <div className="w-full h-32 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-full">
                        {/* Animated routing visualization */}
                        <div className="flex justify-between items-center">
                          <div className="bg-[#1a1a3a] h-16 w-16 rounded-lg flex items-center justify-center">
                            <Cpu className="w-6 h-6 text-purple-400" />
                          </div>

                          <div className="flex-1 px-4 relative">
                            <div className="h-0.5 bg-gradient-to-r from-purple-500/70 to-purple-500/20 w-full absolute top-1/2 transform -translate-y-1/2 group-hover:animate-pulse"></div>
                            <div className="h-0.5 bg-gradient-to-r from-purple-500/50 to-purple-500/10 w-full absolute top-1/2 transform -translate-y-1/2 translate-y-2"></div>
                            <div className="h-0.5 bg-gradient-to-r from-purple-500/30 to-purple-500/5 w-full absolute top-1/2 transform -translate-y-1/2 -translate-y-2"></div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-[#1a1a3a] h-7 w-7 rounded-md flex items-center justify-center">
                              <Server className="w-3 h-3 text-green-400" />
                            </div>
                            <div className="bg-[#1a1a3a] h-7 w-7 rounded-md flex items-center justify-center">
                              <Server className="w-3 h-3 text-yellow-400" />
                            </div>
                            <div className="bg-[#1a1a3a] h-7 w-7 rounded-md flex items-center justify-center">
                              <Server className="w-3 h-3 text-blue-400" />
                            </div>
                            <div className="bg-[#1a1a3a] h-7 w-7 rounded-md flex items-center justify-center">
                              <Server className="w-3 h-3 text-purple-400" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0a0a1f] relative rounded-lg overflow-hidden flex flex-col h-96 justify-between border border-[#1a1a3a] group">
              {/* Purple Glow */}
              <div
                className="absolute bottom-0 left-1/2 w-full h-28 transform -translate-x-1/2 z-0 blur-2xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at bottom, rgba(168, 85, 247, 0.4), transparent 60%)",
                }}
              />

              {/* Content */}
              <div className="z-10 p-6 flex flex-col h-full">
                <div className="mb-4">
                  <div className="bg-purple-500/20 p-2 rounded-lg w-fit">
                    <Shield className="w-6 h-6 text-purple-400" />
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex-1 flex items-center justify-center">
                    <div className="relative w-full max-w-[200px] mx-auto">
                      {/* Failover visualization */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[#1a1a3a] h-16 rounded-lg flex items-center justify-center relative group-hover:opacity-30 transition-opacity duration-700">
                          <Server className="w-6 h-6 text-red-400" />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            <div className="w-8 h-0.5 bg-red-500 rotate-45"></div>
                            <div className="w-8 h-0.5 bg-red-500 -rotate-45"></div>
                          </div>
                        </div>
                        <div className="bg-[#1a1a3a] h-16 rounded-lg flex items-center justify-center">
                          <Server className="w-6 h-6 text-green-400 group-hover:animate-pulse" />
                        </div>
                        <div className="bg-[#1a1a3a] h-16 rounded-lg flex items-center justify-center">
                          <Server className="w-6 h-6 text-green-400 group-hover:animate-pulse" />
                        </div>
                        <div className="bg-[#1a1a3a] h-16 rounded-lg flex items-center justify-center">
                          <Server className="w-6 h-6 text-green-400 group-hover:animate-pulse" />
                        </div>
                      </div>

                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-full">
                        <div className="h-0.5 bg-gradient-to-b from-purple-500/70 to-purple-500/20 w-0.5 mx-auto h-8"></div>
                        <div className="h-1 w-16 bg-purple-500/70 rounded-full mx-auto group-hover:animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right mt-8">
                    <h2 className="text-xl font-medium text-white mb-2">
                      Automatic Failover
                    </h2>
                    <p className="text-sm text-gray-400">
                      If an RPC fails, traffic reroutes instantly. Zero
                      downtime.
                    </p>
                  </div>
                </div>
              </div>
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
                <div className="mb-4">
                  <div className="bg-purple-500/20 p-2 rounded-lg w-fit">
                    <Zap className="w-6 h-6 text-purple-400" />
                  </div>
                </div>

                <h2 className="text-xl font-medium text-white mb-2">
                  Lightning-Fast Responses
                </h2>
                <p className="text-sm text-gray-400">
                  Caching and optimized paths keep your app blazing fast.
                </p>
              </div>

              <div className="flex justify-center items-center z-10 flex-1 relative">
                <div className="relative">
                  <div className="flex justify-center items-center space-x-6">
                    <div className="bg-[#2b2b40] p-3 rounded-full custom-get-started-button mt-6 relative">
                      <Gauge className="w-6 h-6 text-purple-300" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                    </div>
                    <div className="bg-[#a855f7] custom-get-started-button p-4 rounded-full shadow-lg mb-32 relative">
                      <Network className="w-8 h-8 text-white" />
                      <div className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-20"></div>
                    </div>
                    <div className="bg-[#2b2b40] p-3 rounded-full custom-get-started-button mt-20 relative">
                      <Gauge className="w-6 h-6 text-purple-300" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                    </div>
                  </div>

                  {/* Speed lines */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-gradient-to-r from-purple-500/0 via-purple-500/70 to-purple-500/0 animate-pulse"></div>
                    <div className="w-full h-0.5 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 animate-pulse absolute top-1/2 transform -translate-y-1/2 translate-y-2"></div>
                    <div className="w-full h-0.5 bg-gradient-to-r from-purple-500/0 via-purple-500/30 to-purple-500/0 animate-pulse absolute top-1/2 transform -translate-y-1/2 -translate-y-2"></div>
                  </div>
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

              <div className="relative w-full h-full flex flex-col justify-center items-center">
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

                <div className="absolute w-36 h-36 spin-slow z-10">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 border border-slate-800 rounded-full shadow-md">
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

                {/* Pulse dots around the circles */}
                <div className="absolute w-36 h-36 z-5">
                  <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping"></div>
                  </div>
                </div>

                <div className="absolute w-56 h-56 z-5">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping"></div>
                  </div>
                </div>

                <div className="absolute w-72 h-72 z-5">
                  <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping"></div>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 z-20 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-purple-500/20 p-1.5 rounded-lg">
                      <BarChart3 className="w-4 h-4 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-medium">Full Visibility</h3>
                  </div>
                  <p className="text-sm text-gray-300">
                    Monitor every request and error from a real-time dashboard.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#0a0a1f] relative rounded-xl overflow-hidden h-96 flex flex-col justify-center gap-2 px-6 border border-[#1a1a3a] md:col-span-2 w-full max-w-5xl">
              {/* Purple Glow */}
              <div
                className="absolute -top-16 left-1/2 w-full h-28 transform -translate-x-1/2 z-0 blur-2xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at bottom, rgba(168, 85, 247, 0.4), transparent 70%)",
                }}
              />

              <div className="absolute top-4 right-6 z-10 text-right">
                <div className="flex items-center justify-end gap-2 mb-1">
                  <div className="bg-purple-500/20 p-1.5 rounded-lg">
                    <Network className="w-4 h-4 text-purple-400" />
                  </div>
                  <h2 className="text-lg font-medium text-white">
                    RPC Management
                  </h2>
                </div>
                <p className="text-sm text-gray-400">
                  Manage all your endpoints from a single dashboard with
                  real-time metrics.
                </p>
              </div>

              {/* Header for the table */}
              <div className="relative z-20 mt-16 mb-2 px-2">
                <div className="grid grid-cols-[1fr,auto,auto,auto,auto] gap-1 md:gap-6 text-xs text-gray-500">
                  <div>ENDPOINT</div>
                  <div className="w-20 md:w-24 text-center">STATUS</div>
                  <div className="w-16 md:w-20 text-center">LATENCY</div>
                  <div className="w-8 md:w-10 text-center">WEIGHT</div>
                  <div className="w-8 text-center"></div>
                </div>
              </div>

              {/* Endpoints List */}
              <div className="relative z-20 flex flex-col gap-2 overflow-y-auto pr-1 endpoint-list">
                {animatedEndpoints.map((endpoint, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 px-2 rounded-lg backdrop-blur-md bg-white/5 border border-white/10 shadow-lg hover:bg-white/10 transition-colors duration-200"
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
                      <div className="w-20 md:w-24 flex items-center justify-center">
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
                      <div className="w-16 md:w-20 text-white/80 text-sm text-center">
                        {endpoint.latency}
                      </div>
                      <div className="w-8 md:w-10 text-white/80 text-sm text-center">
                        {endpoint.weight}
                      </div>
                      <div className="w-8 h-8 flex items-center justify-center text-white/60">
                        <MoreHorizontal className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Add CSS for animations */}
        <style jsx>{`
          .spin-slow {
            animation: spin 20s linear infinite;
          }
          .spin-slower {
            animation: spin 30s linear infinite;
          }
          .spin-slowest {
            animation: spin 40s linear infinite;
          }
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          .endpoint-list::-webkit-scrollbar {
            width: 4px;
          }
          .endpoint-list::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
          }
          .endpoint-list::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }
          .endpoint-list::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.2);
          }
        `}</style>
      </section>

      <section className="relative bg-[#050816] z-0 overflow-hidden h-[104vh]">
        <div className="flex flex-col justify-center items-center pt-44">
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
          <Image
            src="/icon.png"
            alt="icon"
            height={80}
            width={80}
            className="mb-2"
          />
          <div className="text-4xl inter tracking-tight mb-2">
            Building a high-performance Solana app?
          </div>
          <span className="text-xl instrument-serif-regular-italic text-slate-200/80">
            Let’s help you scale with reliable, low-latency RPCs, failover, and
            full WebSocket support.
          </span>
          <form className="relative w-full max-w-sm mx-auto mt-8">
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full px-4 py-3 pr-32 rounded-full text-sm bg-[#0f0f0f] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="absolute top-1 right-1 h-[calc(100%-0.5rem)] px-10 text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 rounded-full transition-colors"
            >
              Join
            </button>
          </form>
        </div>

        {/* Centered SOLRPC Text */}
        <div className="flex justify-center items-center mt-24 z-30 ">
          <div className="inter tracking-tighter text-[16rem] font-black bg-clip-text text-transparent bg-gradient-to-b from-slate-700 to-transparent text-center">
            SOLRPC
          </div>
        </div>

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
      </section>

      <section className="relative h-[30vh] bg-[#050816] z-0 overflow-hidden"></section>
    </div>
  );
}
