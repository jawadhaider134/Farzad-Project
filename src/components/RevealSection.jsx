import { useEffect, useRef, useState } from "react";

export default function RevealSection({
  children,
  className = "",
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.25,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={`
        transition-all duration-1000 ease-out
        ${
          visible
            ? "opacity-100 blur-0 scale-100 translate-y-0"
            : "opacity-30 blur-[8px] scale-95 translate-y-16"
        }
        ${className}
      `}
    >
      {children}
    </section>
  );
}