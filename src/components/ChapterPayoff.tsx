import type { Artifact, StoryBeat } from "@/data/types";
import { SummarySlide } from "./SummarySlide";

function OutboundPack({
  artifact,
}: {
  artifact: Extract<Artifact, { kind: "outbound" }>;
}) {
  const target = artifact.targets[0];

  return (
    <div className="leave leave-out-phone">
      <div className="out-phone" aria-label="Account research approval chat">
        <div className="out-phone-notch" aria-hidden />
        <header className="out-phone-header">
          <span className="out-phone-back" aria-hidden>
            ‹
          </span>
          <span className="out-phone-agent" aria-hidden>
            ✦
          </span>
          <p>
            <strong>Account research</strong>
            <small>{artifact.account}, drafts ready</small>
          </p>
          <span className="out-phone-desktop" aria-hidden>
            ▣
          </span>
        </header>

        <div className="out-phone-thread">
          <article className="out-email-card">
            <p className="out-email-label">Draft outreach</p>
            <p className="out-email-subject">
              Subject, {artifact.page.headline}
            </p>
            <div className="out-email-copy">
              <p>{target?.name || "Relevant business leader"}</p>
              <p>{artifact.page.body}</p>
              <p>
                {target?.why ||
                  "Connect the draft to a responsibility confirmed in the source."}
              </p>
            </div>
            <footer>
              <span>Approve</span>
              <span>Keep in review</span>
            </footer>
          </article>

          <p className="out-message is-you">Keep this draft in review.</p>
          <p className="out-message is-bot">
            Saved. Nothing will be sent without approval.
          </p>
        </div>

        <footer className="out-phone-composer">
          <span aria-hidden>+</span>
          <p>Message Account research</p>
          <span aria-hidden>◉</span>
        </footer>
      </div>
    </div>
  );
}

function RedlinePack({
  artifact,
}: {
  artifact: Extract<Artifact, { kind: "redlines" }>;
}) {
  return (
    <div className="leave leave-paper">
      <header className="leave-paper-top">
        <div>
          <p className="leave-kicker">Approved sources first</p>
          <h3>{artifact.title}</h3>
        </div>
        <p className="leave-paper-from">{artifact.from}</p>
      </header>
      <div className="leave-paper-split">
        <section className="leave-marks">
          <p className="leave-kicker">{artifact.paperTitle}</p>
          <ol>
            {artifact.marks.map((mark) => (
              <li key={mark.text} className={mark.take ? "is-take" : "is-hold"}>
                <p className="leave-mark-line">{mark.text}</p>
                <p className="leave-mark-note">
                  <b>{mark.take ? "Ready" : "Hold"}.</b> {mark.note}
                </p>
              </li>
            ))}
          </ol>
        </section>
        <section className="leave-reply">
          <p className="leave-kicker">Draft reply, not sent</p>
          <p className="leave-reply-meta">
            <span>To</span>
            {artifact.reply.to}
          </p>
          <p className="leave-reply-meta">
            <span>Subject</span>
            {artifact.reply.subject}
          </p>
          <p className="leave-reply-body">{artifact.reply.body}</p>
        </section>
      </div>
    </div>
  );
}

export function ChapterPayoff({
  beat,
  value,
}: {
  beat: StoryBeat;
  value?: string;
}) {
  const artifact = beat.artifact;

  let body = null;
  if (artifact?.kind === "slides") {
    body = <SummarySlide slides={artifact.cards} size="lg" />;
  } else if (artifact?.kind === "redlines") {
    body = <RedlinePack artifact={artifact} />;
  } else if (artifact?.kind === "outbound") {
    body = <OutboundPack artifact={artifact} />;
  }

  if (!body) return null;

  return (
    <div className="chapter-payoff">
      <p className="payoff-label">
        {beat.when ? <span>{beat.when}</span> : null}
        {beat.label}
      </p>
      {body}
      {value ? <p className="leave-value">{value}</p> : null}
    </div>
  );
}
