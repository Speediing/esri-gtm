import Image from "next/image";

export function BrandLockup({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div className={`brand-lockup brand-lockup-${size}`}>
      <Image
        src="https://www.esri.com/content/dam/esrisites/common/logos/esri-logo.jpg"
        alt="Esri"
        className="brand-esri"
        width={270}
        height={117}
        unoptimized
      />
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
