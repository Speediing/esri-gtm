import type { SlideCard } from "@/data/types";

export function SummarySlide({
  slides,
  size = "lg",
}: {
  slides: SlideCard[];
  size?: "sm" | "lg";
}) {
  const customerNotes = slides.filter((slide) => slide.voice === "customer");
  const sellerDrafts = slides.filter((slide) => slide.voice !== "customer");

  return (
    <div className={`leave leave-heard size-${size}`}>
      <article className="heard-slide">
        <header className="heard-bar">
          <span>Illustrative sample</span>
          <span>Draft, not sent</span>
        </header>
        <div className="heard-main">
          <h3>Discovery summary</h3>
          <ol>
            {customerNotes.map((slide) => (
              <li key={slide.n}>
                <p className="heard-tag">{slide.kicker}</p>
                <strong>{slide.title}</strong>
                <p className="heard-copy">{slide.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="heard-map">
          <p>Draft follow-up</p>
          <ul>
            {sellerDrafts.map((slide) => (
              <li key={slide.n}>
                <strong>{slide.title}</strong>
                <span>{slide.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
}
