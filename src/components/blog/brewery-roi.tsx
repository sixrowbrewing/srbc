"use client";

import { useEffect, useRef, useState } from "react";

export function BreweryRoi({ initialSales = 25000 }: { initialSales?: number }) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(520);

  useEffect(() => {
    function resize(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow) return;
      const data = event.data;
      if (data?.type === "brewery-roi-height" && Number.isFinite(data.height) && data.height > 0) {
        setHeight(Math.ceil(data.height) + 2);
      }
    }
    window.addEventListener("message", resize);
    return () => window.removeEventListener("message", resize);
  }, []);

  return (
    <iframe ref={frame} title="Interactive brewery ROI calculator"
      src={`/tools/brewery-roi.html?sales=${initialSales}`}
      className="mt-8 w-full rounded-xl border" style={{ height }}
      onLoad={() => {
        const main = frame.current?.contentDocument?.querySelector("main");
        if (main) setHeight(main.offsetHeight + 2);
      }}
    />
  );
}
