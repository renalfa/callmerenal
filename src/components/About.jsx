import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";
import { BentoTilt } from "./BentoTilt";
import CardTech from "./CardTech";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="relative w-screen min-h-screen">
      <div className="relative flex flex-col items-center gap-5 mb-8 mt-36">
        <p className="font-general text-sm uppercase md:text-[10px]">
          Welcome to My Website
        </p>

        <div className="w-[400px] h-[400px] bg-yellow-300 rounded-full blur-[100px] absolute top-0 left-24"></div>
        <div className="w-[400px] h-[400px] bg-[#5542ff] rounded-full blur-[100px] absolute -top-12 right-24"></div>

        <AnimatedTitle
          title="Bl<b>e</b>nding creativity and technology to deliver impactful s<b>o</b>lutions."
          containerClass="mt-5 text-black! text-center"
        />

        <p className="font-general text-sm uppercase md:text-[10px]">with</p>

        <div className="grid grid-cols-1 gap-5 px-10">
          <BentoTilt className="relative w-full overflow-hidden mb-7">
            <CardTech
              src="/react.svg"
              title="Re<b>a</b>ct JS"
              value={89}
              className="text-transparent bg-clip-text bg-linear-to-b from-blue-400 via-blue-300/75 to-white special-font hero-heading "
            />
          </BentoTilt>
          <BentoTilt className="relative w-full overflow-hidden mb-7">
            <CardTech
              src="/next.svg"
              title="N<b>e</b>xt JS"
              value={86}
              className="text-transparent bg-clip-text bg-linear-to-b from-[#110422] via-[#1e0d40] to-[#2f185f] special-font hero-heading "
            />
          </BentoTilt>
        </div>
      </div>
    </div>
  );
};

export default About;
