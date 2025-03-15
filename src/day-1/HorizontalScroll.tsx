import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

type DisplayPictureProps = {
  src: string;
  alt: string;
  position: string;
};

const displayPictureProps: DisplayPictureProps[] = [
  {
    src: "https://picsum.photos/200/300?random=21",
    alt: "Random images from picsum",
    position: " -top-90",
  },
  {
    src: "https://picsum.photos/200/300?random=22",
    alt: "Random images from picsum",
    position: "-top-55 right-10",
  },
  {
    src: "https://picsum.photos/200/300?random=25",
    alt: "Random images from picsum",
    position: "-bottom-55 right-10",
  },
  {
    src: "https://picsum.photos/200/300?random=24",
    alt: "Random images from picsum",
    position: "-bottom-90",
  },

  {
    src: "https://picsum.photos/200/300?random=26",
    alt: "Random images from picsum",
    position: "-bottom-55 left-10",
  },
  {
    src: "https://picsum.photos/200/300?random=23",
    alt: "Random images from picsum",
    position: "-top-55 left-10",
  },
];

const HorizontalScroll: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionTwoRef = useRef<HTMLDivElement>(null);
  const emojiOneRef = useRef<HTMLSpanElement>(null);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const imageColumnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const displayPicturesRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionOneTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (
        !containerRef.current ||
        !wrapperRef.current ||
        !sectionTwoRef.current ||
        !sectionOneTextRef.current ||
        !textRefs.current ||
        !imageColumnRefs.current ||
        !displayPicturesRefs.current ||
        !emojiOneRef.current
      )
        return;

      const scrollWidth = containerRef.current.scrollWidth - window.innerWidth;

      const sectionOneTextSplitText = new SplitType(sectionOneTextRef.current, {
        types: "chars",
      });

      if (
        !sectionOneTextSplitText.chars ||
        sectionOneTextSplitText.chars.length === 0
      )
        return;

      gsap.to(containerRef.current, {
        x: -scrollWidth + "px",
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: `+=${scrollWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      textRefs.current.forEach((span) => {
        if (!span) return;
        gsap.fromTo(
          span,
          { xPercent: 0 },
          {
            xPercent: -100,
            duration: 8,
            ease: "linear",
            repeat: -1,
            stagger: 1,
          }
        );
      });

      const splitSectionOneTextTimeline = gsap.timeline();

      splitSectionOneTextTimeline
        .fromTo(
          sectionOneTextSplitText.chars,
          { y: -100, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.5,
            stagger: 0.07,
            ease: "power3.out",
          }
        )
        .fromTo(
          sectionOneTextSplitText.chars,
          { x: -20 },
          { x: 0, duration: 0.2, stagger: 0.07, ease: "power3.out" }
        )
        .to(sectionOneTextSplitText.chars, {
          duration: 0.1,
          marginRight: 5,
          stagger: 0.02,
        });

      const emojiChar = sectionOneTextSplitText?.chars?.find((char) =>
        char.textContent?.includes("🧑🏾‍🍳")
      );

      const emojiCharTimeline = gsap.timeline({
        repeat: 1,
        ease: "power1.inOut",
        delay: 4.9,
        defaults: { duration: 1.5 },
      });

      if (emojiChar) {
        emojiCharTimeline
          .fromTo(
            emojiChar,
            { y: 0, autoAlpha: 1 },
            {
              y: 40,
              autoAlpha: 0,
              delay: 0.8,
            }
          )
          .fromTo(
            emojiChar,
            {
              y: -40,
              autoAlpha: 0,
            },
            {
              y: 0,
              autoAlpha: 1,
            }
          );
      }

      gsap.set(displayPicturesRefs.current, { autoAlpha: 0 });

      gsap.fromTo(
        displayPicturesRefs.current.filter(Boolean),
        { autoAlpha: 0, y: -40, rotate: -13 },
        {
          y: 0,
          rotate: 0,
          autoAlpha: 1,
          duration: 0.9,
          delay: 3.4,
          stagger: 0.3,
          ease: "power3.out",
        }
      );

      imageColumnRefs.current.forEach((column, index) => {
        if (!column) return;
        gsap.to(column, {
          y: index % 2 === 0 ? "-40%" : "40%",
          duration: 35,
          ease: "linear",
          repeat: -1,
          delay: 6.5,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const handleHoverOnDisplayPicture = (dp: HTMLDivElement | null) => {
    if (!dp) return;
    const hoverAnimation = gsap.to(dp, {
      scale: 1.1,
      rotate: -10,
      duration: 0.3,
      ease: "power2.out",
    });
    dp.addEventListener(
      "mouseleave",
      () => {
        hoverAnimation.reverse();
      },
      { once: true }
    );
  };

  return (
    <>
      <div ref={wrapperRef} className="w-full h-screen overflow-hidden">
        <main ref={containerRef} className="flex w-[200vw] h-screen">
          <section className="w-screen h-screen bg-white flex-shrink-0 flex items-center justify-center text-5xl font-extrabold">
            <div className="relative w-[65%] flex flex-col place-items-center justify-center gap-10">
              {displayPictureProps.map((displayPictureProp, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    displayPicturesRefs.current[i] = el;
                  }}
                  style={{ opacity: 0 }}
                  onMouseEnter={() =>
                    handleHoverOnDisplayPicture(displayPicturesRefs.current[i])
                  }
                  className={`display-picture absolute shadow-gray-500 rounded-lg shadow-md ${displayPictureProp.position}`}
                >
                  <img
                    className="w-40 h-40 object-cover rounded-lg"
                    src={displayPictureProp.src}
                    alt={displayPictureProp.alt}
                  />
                </div>
              ))}
              <div ref={sectionOneTextRef} className="text-center">
                ADEMOLA COOKED IT{" "}
                <span style={{ opacity: 1 }} ref={emojiOneRef}>
                  🧑🏾‍🍳
                </span>
                !!!
              </div>
            </div>
            <div className="w-[35%] bg-black px-3">
              <div className="image-gallery flex gap-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    ref={(el) => {
                      imageColumnRefs.current[i] = el;
                    }}
                    className="image-column space-y-3 flex flex-col relative overflow-hidden"
                  >
                    {[...Array(2)].flatMap(() =>
                      [...Array(9)].map((_, k) => (
                        <div
                          key={k}
                          className="image-item h-[300px] w-[200px] text-white"
                        >
                          <img
                            className="w-full h-full object-cover"
                            src={`https://picsum.photos/200/300?random=${
                              i === 0 ? k + 1 : i === 1 ? k + 2 : k * 3
                            }`}
                            alt="Random images from picsum"
                          />
                        </div>
                      ))
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            ref={sectionTwoRef}
            className="section-two w-screen h-screen bg-white flex-shrink-0 flex items-center justify-center text-3xl"
          >
            <div className="w-full overflow-hidden bg-black text-white text-3xl">
              <div className="flex whitespace-nowrap">
                {[...Array(6)].map((_, i) => (
                  <span
                    key={i}
                    ref={(el) => {
                      textRefs.current[i] = el;
                    }}
                    className="inline-block px-3 py-2"
                  >
                    🚀 ADEMOLA • ANIMATIONS • GSAP • REACT 🔥
                  </span>
                ))}
              </div>
            </div>
          </section>
          <section className="w-screen h-screen bg-blue-500 flex-shrink-0 flex items-center justify-center text-white text-3xl">
            Section 3
          </section>
        </main>
      </div>
      <section className="relative w-screen h-screen -mt-[20vh] bg-red-500 text-white text-3xl">
        Section 4
      </section>
    </>
  );
};

export default HorizontalScroll;
