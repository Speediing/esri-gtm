import type { Artifact } from "@/data/types";
import { SummarySlide } from "./SummarySlide";

export function ArtifactCard({ artifact }: { artifact: Artifact }) {
  switch (artifact.kind) {
    case "slides":
      return <SummarySlide slides={artifact.cards} size="sm" />;
    case "one-pager":
      return (
        <div className="art art-doc">
          <p className="art-kicker">{artifact.eyebrow || "One-pager"}</p>
          <h3 className="art-title">{artifact.title}</h3>
          {artifact.sections.map((section) => (
            <div key={section.heading} className="art-block">
              <p className="art-label">{section.heading}</p>
              <p>{section.body}</p>
            </div>
          ))}
        </div>
      );
    case "packet":
      return (
        <div className="art art-doc">
          <p className="art-kicker">Review packet</p>
          <h3 className="art-title">{artifact.title}</h3>
          {artifact.fields.map((field) => (
            <div key={field.label} className="art-block">
              <p className="art-label">{field.label}</p>
              <p>{field.value}</p>
            </div>
          ))}
        </div>
      );
    case "gmail":
      return (
        <div className="art art-gmail">
          <p className="art-kicker">Gmail draft</p>
          <p className="mail-row">
            <span>To</span>
            {artifact.to}
          </p>
          <p className="mail-row">
            <span>Subject</span>
            {artifact.subject}
          </p>
          <p className="mail-body">{artifact.body}</p>
        </div>
      );
    case "redlines":
      return (
        <div className="art art-doc">
          <p className="art-kicker">{artifact.title}</p>
          <ul>
            {artifact.marks.map((mark) => (
              <li key={mark.text}>
                <p className="art-label">{mark.take ? "Ready" : "Hold"}</p>
                <p>{mark.note}</p>
              </li>
            ))}
          </ul>
          <p className="art-caption">{artifact.reply.subject}</p>
        </div>
      );
    case "linkedin":
      return (
        <div className="art art-gmail">
          <p className="art-kicker">LinkedIn draft</p>
          <p className="mail-row">
            <span>To</span>
            {artifact.to}
            {artifact.role ? `, ${artifact.role}` : ""}
          </p>
          <p className="mail-body">{artifact.body}</p>
        </div>
      );
    case "outbound":
      return (
        <div className="art art-doc">
          <p className="art-kicker">{artifact.title}</p>
          {artifact.hypothesis.map((item) => (
            <div key={item.k} className="art-block">
              <p className="art-label">{item.k}</p>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      );
  }
}
