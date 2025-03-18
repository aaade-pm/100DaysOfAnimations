import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cardData = [
  { color: "bg-red-500", rotate: 39 },
  { color: "bg-green-500", rotate: 26 },
  { color: "bg-yellow-500", rotate: 13 },
  { color: "bg-indigo-500", rotate: 0 },
];

const CardStackingTwo: React.FC = () => {
  const cardRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const cardWrapperRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!cardWrapperRef.current || !cardRefs.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cardWrapperRef.current,

        start: "-20% 11%",
        end: "bottom top",
        scrub: 1,
        pin: ".change-status",
        invalidateOnRefresh: true,
        markers: true,
      },
    });

    cardRefs.current
      .slice()
      .reverse()
      .forEach((card, index) => {
        if (!card) return;

        tl.to(card, {
          autoAlpha: 0,
          yPercent: -(index + 1) * 300,
          rotation:
            cardData[index].rotate === 0 ? 0 : -cardData[index].rotate + 13,
          ease: "power3.inOut",
          duration: 10.5,
          stagger: 0.3,
        });
      });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <main className="relative h-[300vh] w-full">
      <section className="change-status w-full h-[110vh] flex">
        <section className="w-1/2 flex flex-col text-start justify-center space-y-7 p-12">
          <h1 className="text-4xl font-bold">Card Stacking</h1>
          <p className="text-lg font-medium">
            This is a card stacking effect. Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Ipsam nostrum eos aliquid nemo error
            aut exercitationem vitae et. Maxime sequi dignissimos nesciunt, nisi
            dolorum quaerat molestiae corporis sunt. Obcaecati, nobis.
            Consectetur asperiores, debitis recusandae magni veniam ducimus
            dicta officiis beatae at error quibusdam. Voluptate provident dolor
            culpa iure error maiores! Obcaecati id placeat beatae sint, eum illo
            eveniet? Laudantium, voluptate! In laboriosam corporis voluptate
            numquam illum sunt. Ad aspernatur pariatur iste cumque cupiditate
            accusantium officia tempora ex, nobis eum dolorum facere? Doloribus
            consequatur nihil at iure a necessitatibus reprehenderit ea. Illum
            quidem laudantium fugit similique cum velit, adipisci voluptate
            debitis deserunt voluptas dicta nulla quae dolorem sint! Consectetur
            repellat facere totam molestias ipsam corporis quas placeat ex
            nostrum ea. Enim? Nihil natus nesciunt commodi placeat veritatis
          </p>
        </section>
        <section className="w-1/2 flex justify-center items-end">
          <section
            ref={cardWrapperRef}
            className="w-[70%] h-[70%] flex justify-center items-start"
          >
            {cardData.map((card, index) => (
              <div
                key={index}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                className={`fixed -rotate-${card.rotate} ${card.color} h-85 w-85 rounded-2xl shadow-lg`}
              >
                <div className="p-6 space-y-3 text-white">
                  <p className="text-2xl font-bold">Card Stacking</p>
                  <p className="text-lg font-semibold">
                    This is a card stacking effect.
                  </p>
                </div>
              </div>
            ))}
          </section>
        </section>
      </section>

      <div className="h-[200vh] w-full">
        <div className="h-[100vh] w-full"></div>
        <div className="h-[100vh] w-full"></div>
      </div>
    </main>
  );
};

export default CardStackingTwo;
