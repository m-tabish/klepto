import { ShowcaseCard } from "@/components/ShowcaseCard";
import SlicedWaves from "@/components/SlicedWaves";
import { TextStream } from "@/components/block/text-stream";
import { DotTxtHeroMock } from "@/components/mocks/DotTxtHeroMock";
import { FloatingIconsHeroCopied } from "@/components/mocks/FloatingIconsHeroCopied";
import { FloatingIconsHeroMock } from "@/components/mocks/FloatingIconsHeroMock";
import { StripeMock } from "@/components/mocks/StripeMock";
import { WebflowAddOnsMock } from "@/components/mocks/WebflowAddOnsMock";
import { githubRepoUrl } from "@/lib/site";
import Image from "next/image";
function GitHubIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function ChromeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728Z" />
    </svg>
  );
}

const steps = [
  {
    number: "1",
    title: "Hover",
    description: "Move your cursor over any element on any website.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59" />
      </svg>
    ),
  },
  {
    number: "2",
    title: "Click",
    description: "Click the highlighted component to capture it.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Z" />
      </svg>
    ),
  },
  {
    number: "3",
    title: "Paste",
    description: "HTML + CSS is on your clipboard.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-28">
        {/* Background Canvas */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-screen -z-10 opacity-80">
          <SlicedWaves
            color1="#FFB900"
            color2="#F78200"
            color3="#cc5500"
            position={1}
            slices={14}
            ribbons={4}
            speed={0.8}
            className="w-full h-full"
          />
        </div>

        {/* Radial gradient accents */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[16%] bottom-[12%] h-[288px] w-[544px] rounded-full bg-[rgba(255,185,0,0.06)] blur-[80px]" />
          <div className="absolute right-[16%] top-[12%] h-[256px] w-[416px] rounded-full bg-[rgba(247,130,0,0.04)] blur-[80px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 " >
          <div className="flex justify-center w-full items-center mb-2  backdrop-blur-xl rounded-full mx-auto max-w-fit p-4">
            <Image src="/logo.png" alt="logo" width={100} height={100} className="relative z-10" />
            <div className="flex justify-center w-full items-center mb-2 bg-white rounded-full mx-auto max-w-fit p-5">
              <h1 className="text-5xl font-black">Klepto</h1>
            </div>
          </div>


          <div className="flex flex-col items-center justify-center text-center w-full">
            <TextStream
              height="auto"
              fontSize="clamp(2.5rem, 6.2vw, 4.8rem)"
              fontWeight={700}
              className="w-full text-black tracking-[-1.5px]"
              items={[
                "Steal any UI.",
                <span key="paste" style={{ display: "inline-flex", alignItems: "center", gap: "0.35em", lineHeight: 1 }}>
                  Paste to
                  {/* Cursor pill */}
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25em", background: "rgba(0,0,0,0.07)", backdropFilter: "blur(8px)", borderRadius: "9999px", padding: "0.12em 0.45em 0.12em 0.3em", border: "1px solid rgba(0,0,0,0.1)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/codex-icon.png" alt="" aria-hidden="true" style={{ height: "0.72em", width: "0.72em", objectFit: "contain", display: "inline-block", flexShrink: 0, borderRadius: "0.15em" }} />
                    <span style={{ fontSize: "0.52em", fontWeight: 600, letterSpacing: "-0.01em", color: "#1a1a1a" }}>Cursor</span>
                  </span>
                  {/* Claude pill */}
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25em", background: "rgba(0,0,0,0.07)", backdropFilter: "blur(8px)", borderRadius: "9999px", padding: "0.12em 0.45em 0.12em 0.3em", border: "1px solid rgba(0,0,0,0.1)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/claude-code-icon.png" alt="" aria-hidden="true" style={{ height: "0.72em", width: "0.72em", objectFit: "contain", display: "inline-block", flexShrink: 0, borderRadius: "0.15em" }} />
                    <span style={{ fontSize: "0.52em", fontWeight: 600, letterSpacing: "-0.01em", color: "#1a1a1a" }}>Claude</span>
                  </span>
                  {/* Copilot pill */}
                  <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25em", background: "rgba(0,0,0,0.07)", backdropFilter: "blur(8px)", borderRadius: "9999px", padding: "0.12em 0.45em 0.12em 0.3em", border: "1px solid rgba(0,0,0,0.1)" }}>
                    {/* Copilot minimalist icon */}
                    <svg width="0.72em" height="0.72em" viewBox="0 0 24 24" fill="none" style={{ display: "inline-block", flexShrink: 0 }}>
                      <circle cx="12" cy="12" r="11" fill="#24292e" />
                      <circle cx="9" cy="11" r="2" fill="white" />
                      <circle cx="15" cy="11" r="2" fill="white" />
                      <path d="M8 15.5c1.1 1 2.9 1 4 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span style={{ fontSize: "0.52em", fontWeight: 600, letterSpacing: "-0.01em", color: "#1a1a1a" }}>Copilot</span>
                  </span>
                </span>,
              ]}
            />
          </div>

          <p className="mt-4 text-center text-sm md:text-base font-mono text-black">
            Hover element. Click. Paste clean HTML + CSS + GSAP Animations  into your AI coding agent.
          </p>

          {/* Dashed separators */}
          <div className="mt-6 flex flex-col items-center gap-2">
            <div className="dashed-separator w-[320px]" />
            <div className="dashed-separator w-[240px]" />
          </div>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={githubRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-12 items-center gap-2.5 border border-black/20 bg-black px-6 text-sm font-medium text-white transition-all duration-200 hover:border-black/40 hover:shadow-[0_0_24px_rgba(0,0,0,0.15)]"
            >
              <GitHubIcon className="h-4 w-4" />
              <span>[view on github]</span>
            </a>
          </div>


          {/* Video embed */}
          <div className="mt-12">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full rounded-xl"
            >
              <source
                src="https://jnmdsnzleykaatlvuaql.supabase.co/storage/v1/object/public/video/Demo_Compressed.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="border-t border-dashed border-black/20 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12">

            <h2 className="text-xl font-semibold text-black tracking-[-0.5px]">
              + How it works
            </h2>

            <p className="mt-2 text-xs text-black/70">Three steps. No setup required.</p>
          </div>
          <div className="flex justify-center">
            <Image src="/meme.jpg" alt="meme" width={400} height={400} className="rounded-xl mb-10  " /></div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="border border-dashed border-black/20 bg-black/[0.02] p-5"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center bg-black text-[10px] font-bold text-white">
                    {step.number}
                  </span>
                  <span className="text-black">{step.icon}</span>
                </div>
                <h3 className="text-sm font-semibold text-black">{step.title}</h3>
                <p className="mt-1.5 text-xs leading-5 text-black/80">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase */}
      <section className="border-t border-dashed border-black/20 py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-black tracking-[-0.5px]">
              + See what Klepto Steals
            </h2>
            <p className="mt-2 text-xs text-black/70">
              Actual Klepto outputs. Drag the slider to compare.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <ShowcaseCard
              siteName="Stripe"
              strategy="generic"
              description="CSS animations, gradient meshes, hover states"
              imagePath="/showcase/stripe.png"
              lhsContent={
                <div className="absolute inset-0 flex items-center justify-center bg-[#0b0d12] p-9">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/showcase/stripe.png"
                    alt="Stripe screenshot"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              }
            >
              <StripeMock />
            </ShowcaseCard>
            <ShowcaseCard
              siteName="Webflow"
              strategy="webflow"
              description="IX2 interactions, scroll animations, entrance effects"
              imagePath="/showcase/webflow-addons.png"
              lhsContent={
                <div className="absolute inset-0 flex items-center justify-center bg-[#0b0d12] p-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/showcase/webflow-addons.png"
                    alt="Webflow Add-ons screenshot"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              }
            >
              <WebflowAddOnsMock />
            </ShowcaseCard>
            <ShowcaseCard
              siteName=".txt"
              strategy="react"
              description="Pixel hero, terminal CLI demo, schema-contract popup"
              imagePath="/showcase/txt.png"
              lhsContent={
                <div className="absolute inset-0 flex items-center justify-center bg-[#0b0d12] p-9">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/showcase/txt.png"
                    alt=".txt screenshot"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              }
            >
              <DotTxtHeroMock />
            </ShowcaseCard>
            <ShowcaseCard
              siteName="Floating Icons Hero"
              strategy="react"
              description="Framer Motion animations, spring physics, interactive repulsion"
              imagePath="/showcase/floating-icons-hero.png"
              lhsContent={<FloatingIconsHeroMock />}
            >
              <FloatingIconsHeroCopied />
            </ShowcaseCard>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-t border-dashed border-black/20 py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(73,114,217,0.06)] blur-[80px]" />
        </div>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-xl font-semibold text-black tracking-[-0.5px]">
            Start recreating components today
          </h2>
          <p className="mt-2 text-xs text-black/70">Free and open source.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={githubRepoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center gap-2 border border-black/20 bg-black px-5 text-sm text-white transition-all duration-150 hover:bg-black/90"
            >
              <GitHubIcon className="h-4 w-4" />
              <span>[view on github]</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
