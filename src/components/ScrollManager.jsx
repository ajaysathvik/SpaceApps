import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import gsap from "gsap";

export const ScrollManager = ({ section, setSection }) => {
  const data = useScroll();
  const lastScroll = useRef(0);
  const isAnimating = useRef(false);

  data.fill.classList.add("top-0");
  data.fill.classList.add("absolute");

  useEffect(() => {
    gsap.to(data, {
      duration: 1,
      scrollTop: section * data.el.clientHeight,
      onStart: () => {
        isAnimating.current = true;
      },
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  }, [section, data]);

  useFrame(() => {
    if (isAnimating.current) {
      lastScroll.current = data.scroll.current;
      return;
    }

    const curSection = Math.floor(data.scroll.current * data.pages);
    if (data.scroll.current > lastScroll.current && curSection === 0) {
      setSection(1);
    }
    if (data.scroll.current < lastScroll.current && data.scroll.current < 1 / (data.pages - 1)) {
      setSection(0);
    }
    lastScroll.current = data.scroll.current;
  });
};
