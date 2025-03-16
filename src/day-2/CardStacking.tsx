import React, { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../day-2/style.css";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    title: "Wildlife in Action: A Glimpse into Nature’s Daily Drama",
    description:
      "Witness the fascinating lives of animals in their natural habitats, from playful cubs to stealthy predators.",
    video:
      "https://videos.pexels.com/video-files/19809896/19809896-sd_360_640_30fps.mp4",
  },
  {
    title: "The Changing Seasons: Nature’s Everlasting Cycle",
    description:
      "Experience the beauty of nature's transitions, from blooming spring flowers to snowy winter landscapes.",
    video:
      "https://videos.pexels.com/video-files/28097103/12297190_640_360_50fps.mp4",
  },
  {
    title: "The Changing Seasons: Nature’s Everlasting Cycle",
    description:
      "Experience the beauty of nature's transitions, from blooming spring flowers to snowy winter landscapes.",
    video:
      "https://videos.pexels.com/video-files/20721670/20721670-sd_640_360_25fps.mp4",
  },
];

const horizontalSections = [
  {
    title: "Wildlife in Action: A Glimpse into Nature’s Daily Drama",
    description:
      "Explore the untouched beauty of forests, mountains, and rivers as we uncover the hidden secrets of nature's most breathtaking landscapes.",
    video:
      "https://videos.pexels.com/video-files/8301955/8301955-sd_960_506_25fps.mp4",
  },
  {
    title: "Nature’s Symphony: The Sounds That Heal the Soul",
    description:
      "Immerse yourself in the soothing sounds of chirping birds, rustling leaves, and flowing streams – nature's music for peace and tranquility.",
    video:
      "https://videos.pexels.com/video-files/29405905/12664210_360_640_60fps.mp4",
  },
  {
    title: "The Changing Seasons: Nature’s Everlasting Cycle",
    description:
      "Experience the beauty of nature's transitions, from blooming spring flowers to snowy winter landscapes.",
    video:
      "https://videos.pexels.com/video-files/30227324/12959801_640_360_30fps.mp4",
  },
];

const CardStacking: React.FC = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    sectionRefs.current.forEach((section) => {
      if (!section) return;

      const items = section.querySelectorAll(".item");
      const direction = section.classList.contains("horizontal-section")
        ? "horizontal"
        : "vertical";

      items.forEach((item, index) => {
        if (index !== 0) {
          gsap.set(
            item,
            direction === "horizontal" ? { xPercent: 100 } : { yPercent: 100 }
          );
        }
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          start: "top top",
          end: () => `+=${items.length * 100}%`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });

      items.forEach((item, index) => {
        timeline.to(item, {
          scale: 0.7,
          borderRadius: "20px",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
        });

        if (items[index + 1]) {
          timeline.to(
            items[index + 1],
            direction === "horizontal" ? { xPercent: 0 } : { yPercent: 0 },
            "<"
          );
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="main">
      <SectionTitle title="But Vertical Scroll Is Also Cool!" />

      <ScrollSection
        ref={(el: HTMLDivElement | null) => {
          sectionRefs.current[0] = el;
        }}
        direction="vertical"
        items={sections}
      />

      <SectionTitle title="Horizontal Scroll Is Cool!" />

      <ScrollSection
        ref={(el: HTMLDivElement | null) => {
          sectionRefs.current[1] = el;
        }}
        direction="horizontal"
        items={horizontalSections}
      />

      <SectionTitle title="Soo Cool!!" />
    </main>
  );
};

const ScrollSection = forwardRef<
  HTMLDivElement,
  {
    direction: "vertical" | "horizontal";
    items: { title: string; description: string; video: string }[];
  }
>(({ direction, items }, ref) => (
  <div ref={ref} className={`scroll-section ${direction}-section section`}>
    <div className="wrapper">
      <div role="list" className="list">
        {items.map((item, index) => (
          <div key={index} role="listitem" className="item">
            <div className="item_content">
              <h2 className="item_number">{index + 1}</h2>
              <h2>{item.title}</h2>
              <p className="item_p">{item.description}</p>
            </div>
            <video
              src={item.video}
              autoPlay
              muted
              loop
              className="item_media"
            ></video>
          </div>
        ))}
      </div>
    </div>
  </div>
));

const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
  <div className="section">
    <div className="container-medium">
      <div className="padding-vertical">
        <div className="max-width-large">
          <h1 className="heading">{title}</h1>
        </div>
      </div>
    </div>
  </div>
);

export default CardStacking;
