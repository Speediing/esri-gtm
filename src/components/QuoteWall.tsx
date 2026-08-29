import { QUOTES } from "@/data/quotes";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function QuoteWall() {
  return (
    <section id="testimonials" className="quotes">
      <p className="eyebrow">What people say about Grok Bot</p>
      <h2>Agents that keep working after you close the laptop.</h2>
      <div className="quote-thread">
        {QUOTES.map((quote) => (
          <article className="quote-row" key={quote.source}>
            <div className="quote-who">
              <span className="quote-avatar quote-avatar-initials" aria-hidden>
                {initials(quote.name)}
              </span>
              <div>
                <p className="quote-name">{quote.name}</p>
                <p className="quote-handle">{quote.handle}</p>
              </div>
            </div>
            <blockquote className="quote-bubble">{quote.quote}</blockquote>
            <a
              className="quote-source"
              href={quote.source}
              target="_blank"
              rel="noreferrer"
            >
              View source
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
