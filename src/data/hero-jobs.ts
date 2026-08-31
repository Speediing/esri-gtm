export type HeroJob = {
  id: string;
  label: string;
  agent: string;
  color: string;
  user: string;
  replies: string[];
  artifact: {
    label: string;
    title: string;
    detail: string;
  };
};

export const HERO_JOBS: HeroJob[] = [
  {
    id: "follow-up",
    label: "Call follow-up",
    agent: "Follow-up agent",
    color: "#3b7f8f",
    user: "Turn the approved Acme call notes into a short follow-up.",
    replies: [
      "I grouped the topics, open questions, and next steps.",
      "I left anything unconfirmed out. The draft is ready for you.",
    ],
    artifact: {
      label: "Draft ready",
      title: "Customer follow-up",
      detail: "Summary, open questions, owners, and next steps",
    },
  },
  {
    id: "product-answer",
    label: "Product answer",
    agent: "Product agent",
    color: "#597a63",
    user: "Find approved ArcGIS material for this GIS question.",
    replies: [
      "I checked the ArcGIS documentation and release notes.",
      "One detail still needs an internal owner. I marked it in the draft.",
    ],
    artifact: {
      label: "Answer packet",
      title: "Sourced product reply",
      detail: "Approved links, draft answer, and one open item",
    },
  },
  {
    id: "account-brief",
    label: "Account brief",
    agent: "Research agent",
    color: "#6f7e4f",
    user: "Build an Acme brief from public sources for my review.",
    replies: [
      "I separated public facts from the working sales hypothesis.",
      "Every fact links back to its source.",
    ],
    artifact: {
      label: "Brief ready",
      title: "Source-linked account brief",
      detail: "Public context, role hypothesis, and discovery questions",
    },
  },
  {
    id: "meeting-prep",
    label: "Meeting prep",
    agent: "Prep agent",
    color: "#8a6f49",
    user: "Prep me for tomorrow's Acme meeting.",
    replies: [
      "I reviewed the notes, open questions, and agreed actions.",
      "The brief starts with what needs a decision in the room.",
    ],
    artifact: {
      label: "Prep complete",
      title: "Meeting brief",
      detail: "Agenda, account context, questions, and open decisions",
    },
  },
  {
    id: "proposal-review",
    label: "Proposal review",
    agent: "Proposal agent",
    color: "#7e5f70",
    user: "Check this Acme proposal before I send it.",
    replies: [
      "I checked the draft against the approved account notes.",
      "I flagged two claims that need confirmation and kept it in review.",
    ],
    artifact: {
      label: "Review ready",
      title: "Proposal check",
      detail: "Confirmed points, open claims, and suggested edits",
    },
  },
  {
    id: "executive-brief",
    label: "Executive brief",
    agent: "Briefing agent",
    color: "#566f8b",
    user: "Give my leader the short version of Acme.",
    replies: [
      "I pulled the latest notes and dated next actions.",
      "The brief fits on one page and keeps assumptions labeled.",
    ],
    artifact: {
      label: "Brief ready",
      title: "Executive account brief",
      detail: "Current state, open decisions, risks, and next actions",
    },
  },
  {
    id: "renewal-prep",
    label: "Renewal prep",
    agent: "Renewal agent",
    color: "#587a75",
    user: "Organize the Acme history for renewal prep.",
    replies: [
      "I brought the approved history, open questions, and owners together.",
      "I marked every missing date for the seller to confirm.",
    ],
    artifact: {
      label: "Review ready",
      title: "Renewal context",
      detail: "Account history, open items, owners, and missing dates",
    },
  },
  {
    id: "pipeline-review",
    label: "Pipeline review",
    agent: "Pipeline agent",
    color: "#79694b",
    user: "Show me which opportunities need attention.",
    replies: [
      "I found records with old notes, no owner, or no dated next action.",
      "I put customer replies and unowned work first.",
    ],
    artifact: {
      label: "List ready",
      title: "Pipeline review",
      detail: "Customer replies, stale notes, missing owners, and next actions",
    },
  },
];
