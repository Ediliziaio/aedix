import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt?: string;
  className?: string;
  speed?: number; // 0.1 = subtle, 0.5 = dramatic
  overlay?: React.ReactNode;
}

const ParallaxImage = ({ src, alt = "", className = "", speed = 0.3, overlay }: ParallaxImageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}px`, `${speed * 100}px`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-0 -inset-y-24" style={{ y }}>
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>
      {overlay}
    </div>
  );
};

export default ParallaxImage;
