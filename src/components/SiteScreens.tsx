import type { Artifact, DemoMessage } from "@/data/types";
import type { ComputerBeat } from "@/data/screens";
import { SummarySlide } from "./SummarySlide";

function asSlides(artifact?: Artifact) {
  return artifact?.kind === "slides" ? artifact : null;
}

function asGmail(artifact?: Artifact) {
  return artifact?.kind === "gmail" ? artifact : null;
}

function asLinkedIn(artifact?: Artifact) {
  return artifact?.kind === "linkedin" ? artifact : null;
}

function asOnePager(artifact?: Artifact) {
  return artifact?.kind === "one-pager" ? artifact : null;
}

function asPacket(artifact?: Artifact) {
  return artifact?.kind === "packet" ? artifact : null;
}

function asRedlines(artifact?: Artifact) {
  return artifact?.kind === "redlines" ? artifact : null;
}

function asOutbound(artifact?: Artifact) {
  return artifact?.kind === "outbound" ? artifact : null;
}

export function SiteScreen({
  beat,
  message,
  account,
  sent,
}: {
  beat: ComputerBeat;
  message?: DemoMessage;
  account: string;
  sent: boolean;
}) {
  const artifact = message?.artifact;

  switch (beat.site) {
    case "granola":
      return <GranolaScreen account={account} />;
    case "figma":
      return <FigmaScreen account={account} artifact={asSlides(artifact)} />;
    case "gmail":
      return (
        <GmailScreen
          account={account}
          artifact={asGmail(artifact)}
          sent={sent}
        />
      );
    case "linkedin":
      return (
        <LinkedInScreen
          account={account}
          artifact={asLinkedIn(artifact)}
          sent={sent}
        />
      );
    case "research":
      return <ResearchScreen account={account} />;
    case "page":
      return <PageScreen account={account} artifact={asOutbound(artifact)} />;
    case "gdoc":
      return (
        <DocumentScreen
          account={account}
          onePager={asOnePager(artifact)}
          packet={asPacket(artifact)}
          redlines={asRedlines(artifact)}
        />
      );
  }
}

function GranolaScreen({ account }: { account: string }) {
  return (
    <div className="site site-granola">
      <header>
        <strong>Granola</strong>
        <span>Live notes</span>
      </header>
      <p className="site-time">{account} call in progress</p>
      <ul>
        <li>
          <span>Topic</span> Customer priorities captured from approved notes.
        </li>
        <li>
          <span>Context</span> Current workflows grouped for seller review.
        </li>
        <li>
          <span>Review</span> Unconfirmed details kept out of the draft.
        </li>
        <li>
          <span>Next</span> Relevant Esri material ready to attach.
        </li>
      </ul>
    </div>
  );
}

function FigmaScreen({
  account,
  artifact,
}: {
  account: string;
  artifact: ReturnType<typeof asSlides>;
}) {
  return (
    <div className="site site-figma">
      <header>
        <span className="figma-logo">F</span>
        <strong>{artifact?.title || `${account} discovery summary`}</strong>
        <em>Draft</em>
      </header>
      <div className="figma-board">
        {artifact ? (
          <SummarySlide slides={artifact.cards} size="sm" />
        ) : (
          <div className="figma-doc">
            <p>
              <b>Priorities</b>
              Organize the topics captured in the approved notes.
            </p>
            <p>
              <b>Product material</b>
              Attach only approved Esri references.
            </p>
            <p>
              <b>Review</b>
              Hold unconfirmed details for the seller.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function GmailScreen({
  account,
  artifact,
  sent,
}: {
  account: string;
  artifact: ReturnType<typeof asGmail>;
  sent: boolean;
}) {
  return (
    <div className="site site-gmail">
      <header>
        <strong>Gmail</strong>
        <em>{sent ? "Sent" : "Draft, not sent"}</em>
      </header>
      <p>
        <span>To</span>
        {artifact?.to || `${account} customer team`}
      </p>
      <p>
        <span>Subject</span>
        {artifact?.subject || `${account} materials`}
      </p>
      <div>
        {artifact?.body ||
          "The draft stays here until the seller reviews and approves it."}
      </div>
    </div>
  );
}

function DocumentScreen({
  account,
  onePager,
  packet,
  redlines,
}: {
  account: string;
  onePager: ReturnType<typeof asOnePager>;
  packet: ReturnType<typeof asPacket>;
  redlines: ReturnType<typeof asRedlines>;
}) {
  return (
    <div className="site site-gdoc">
      <header>
        <strong>Docs</strong>
        <span>
          {onePager?.title ||
            packet?.title ||
            redlines?.title ||
            `${account} working brief`}
        </span>
      </header>
      <article>
        {onePager
          ? onePager.sections.map((section) => (
              <p key={section.heading}>
                <b>{section.heading}.</b> {section.body}
              </p>
            ))
          : null}
        {packet
          ? packet.fields.map((field) => (
              <p key={field.label}>
                <b>{field.label}.</b> {field.value}
              </p>
            ))
          : null}
        {redlines
          ? redlines.marks.map((mark) => (
              <p key={mark.text}>
                <b>{mark.text}</b> {mark.note}
              </p>
            ))
          : null}
        {!onePager && !packet && !redlines ? (
          <>
            <p>
              <b>Approved product references.</b> Relevant documentation is
              linked beside each draft answer.
            </p>
            <p>
              <b>Open review.</b> Unconfirmed details stay with the internal
              owner.
            </p>
          </>
        ) : null}
      </article>
    </div>
  );
}

function ResearchScreen({ account }: { account: string }) {
  return (
    <div className="site site-research">
      <header>
        <strong>{account}</strong>
        <span>Public sources</span>
      </header>
      <p className="site-time">Illustrative research workspace</p>
      <ul>
        <li>
          <span>Company pages</span> Review published priorities and
          initiatives.
        </li>
        <li>
          <span>Open roles</span> Check which capabilities the company is
          investing in.
        </li>
        <li>
          <span>Press releases</span> Confirm recent changes before drafting
          outreach.
        </li>
        <li>
          <span>Review</span> Separate sourced facts from questions for the
          seller.
        </li>
      </ul>
    </div>
  );
}

function LinkedInScreen({
  account,
  artifact,
  sent,
}: {
  account: string;
  artifact: ReturnType<typeof asLinkedIn>;
  sent: boolean;
}) {
  return (
    <div className="site site-linkedin">
      <header>
        <strong>LinkedIn</strong>
        <em>{sent ? "Sent" : "Draft, not sent"}</em>
      </header>
      <p>
        <span>To</span>
        {artifact?.to || `${account} business leader`}
        {artifact?.role ? `, ${artifact.role}` : ""}
      </p>
      <div>
        {artifact?.body ||
          "Role-based outreach stays in review until the seller approves it."}
      </div>
    </div>
  );
}

function PageScreen({
  account,
  artifact,
}: {
  account: string;
  artifact: ReturnType<typeof asOutbound>;
}) {
  return (
    <div className="site site-page">
      <header>
        <strong>Account page</strong>
        <em>Draft, not live</em>
      </header>
      <h4>{artifact?.page.headline || `A source-linked note for ${account}`}</h4>
      <p>
        {artifact?.page.body ||
          "Summarize the public signal, the possible Esri fit, and the question the seller should validate."}
      </p>
      {artifact?.evidence.map((item) => (
        <p key={item.source}>
          <b>{item.source}.</b> {item.finding}
        </p>
      ))}
    </div>
  );
}
