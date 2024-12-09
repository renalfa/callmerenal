import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const CardTech = ({ src, title, value, className }) => {
  const cardRef = useRef(null);
  const indicatorRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: -240 },
        {
          opacity: 1,
          x: 0,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        indicatorRef.current,
        { width: "0%" },
        {
          width: `${value}%`,
          duration: 1.5,
          ease: "power3.out",
          scrub: true,
          scrollTrigger: {
            trigger: indicatorRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    },
    { dependencies: [value] }
  );

  return (
    <div ref={cardRef} className="relative size-full">
      <img
        src={src}
        className="absolute top-0 right-0 size-12 md:size-24 animate-spin-slow"
      />
      <div className="p-4">
        {title.split("<br />").map((line, index) => (
          <div
            key={index}
            className="flex-wrap max-w-full gap-2 px-10 flex-center md:gap-3"
          >
            {line.split(" ").map((word, idx) => (
              <h1
                key={idx}
                dangerouslySetInnerHTML={{ __html: word }}
                className={clsx(className)}
              ></h1>
            ))}
          </div>
        ))}
        <div className="w-full h-2 bg-gray-500 rounded-full">
          <div
            ref={indicatorRef}
            style={{ width: `${value}%` }}
            className="h-full bg-yellow-300 rounded-full"
          ></div>
        </div>
        <p className="font-general text-sm uppercase md:text-[10px]">
          indicator skill : {value}%
        </p>
      </div>
    </div>
  );
};

export default CardTech;
