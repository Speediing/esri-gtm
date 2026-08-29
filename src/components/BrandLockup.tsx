"use client";

import Image from "next/image";
import { useState } from "react";

export function BrandLockup({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const [markFailed, setMarkFailed] = useState(false);

  return (
    <div className={`brand-lockup brand-lockup-${size}`}>
      {markFailed ? (
        <span className="brand-esri-fallback" aria-label="Esri">
          esri
        </span>
      ) : (
        <Image
          src="https://www.esri.com/content/dam/esrisites/common/logos/esri-logo.jpg"
          alt="Esri"
          className="brand-esri"
          width={270}
          height={117}
          onError={() => setMarkFailed(true)}
        />
      )}
      <span className="brand-times" aria-hidden>
        ×
      </span>
      <Image
        src="/brand/spacexai.svg"
        alt="SpaceXAI"
        className="brand-sxai"
        width={1294}
        height={158}
      />
    </div>
  );
}
