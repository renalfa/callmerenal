import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

const TOTAL_VIDEOS = 3;

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const nextVideoRef = useRef(null);

  const upcomingIndex = (currentIndex % TOTAL_VIDEOS) + 1;

  const handleVideoLoaded = () => {
    setLoadedVideos((prevLoaded) => prevLoaded + 1);
  };

  const handleMiniVideoClick = () => {
    setHasClicked(true);

    setCurrentIndex(upcomingIndex);
  };

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  useEffect(() => {
    if (loadedVideos === TOTAL_VIDEOS - 1) {
      setIsLoading(false);
    }
  }, [loadedVideos]);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });

        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            nextVideoRef.current.play();
          },
        });

        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="relative w-screen overflow-x-hidden h-dvh">
      {isLoading && (
        <div className="flex-center absolute z-100 h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 w-screen overflow-hidden rounded-lg h-dvh bg-blue-75"
      >
        <div>
          <div className="absolute z-50 overflow-hidden rounded-lg cursor-pointer mask-clip-path absolute-center size-64">
            <div
              className="transition-all duration-500 ease-in origin-center scale-50 opacity-0 hover:opacity-100 hover:scale-100"
              onClick={handleMiniVideoClick}
            >
              <video
                ref={nextVideoRef}
                src={getVideoSrc(upcomingIndex)}
                loop
                autoPlay
                muted
                id="current-video"
                className="object-cover object-center origin-center scale-150 size-64 "
                onLoadedData={handleVideoLoaded}
              />
            </div>
          </div>

          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            autoPlay
            id="next-video"
            onLoadedData={handleVideoLoaded}
            className="absolute z-20 invisible object-cover object-center absolute-center size-64"
          />

          <video
            ref={nextVideoRef}
            src={getVideoSrc(
              currentIndex === TOTAL_VIDEOS - 1 ? 1 : currentIndex
            )}
            loop
            autoPlay
            muted
            onLoadedData={handleVideoLoaded}
            className="absolute top-0 left-0 object-cover object-center size-full"
          />
        </div>
        <h1 className="absolute z-40 bottom-5 right-5 text-blue-75 special-font hero-heading">
          R<b>e</b>yn<b>a</b>ld
        </h1>

        <div className="absolute top-0 left-0 z-40 size-full">
          <div className="px-5 mt-24 sm:px-10">
            <h1 className="text-blue-100 special-font hero-heading md:text-[10rem]!">
              Fr<b>o</b>nt<b>e</b>nd D<b>e</b>v
            </h1>
            <p className="max-w-xl mb-5 text-blue-100 font-robert-regular">
              Hey! 👋 I'm a Frontend Developer specializing in React, Next.js,
              and mobile apps.
              <br /> Check out my projects below!
            </p>
            <Button
              id="change-video"
              title="change video"
              containerClass="bg-yellow-300 flex-center gap-1"
              leftIcon={<TiLocationArrow />}
              onClick={handleMiniVideoClick}
            />
          </div>
        </div>
      </div>

      <h1 className="absolute text-black bottom-5 right-5 special-font hero-heading">
        R<b>e</b>yn<b>a</b>ld
      </h1>
    </div>
  );
};

export default Hero;
