export type JobId =
  | "meeting-follow-up"
  | "product-answers"
  | "account-research";

export type ParticipantRole = "you" | "bot";

export type Participant = {
  id: string;
  name: string;
  role: ParticipantRole;
  persona?: string;
  color?: string;
};

export type MessageKind =
  | "text"
  | "draft"
  | "routine"
  | "handoff"
  | "system";

export type SlideVoice = "customer" | "seller";

export type SlideCard = {
  n: number;
  title: string;
  body: string;
  kicker?: string;
  voice?: SlideVoice;
};

export type StoryScene =
  | "call"
  | "demo"
  | "voice"
  | "notes"
  | "deck"
  | "map"
  | "inspect"
  | "launch"
  | "drill"
  | "send";

export type StoryVisual =
  | {
      kind: "live-call";
      title: string;
      people: { initials: string; name: string }[];
    }
  | {
      kind: "live-notes";
      label: string;
      summary: string;
      signals: string[];
    }
  | {
      kind: "deck-update";
      eyebrow: string;
      headline: string;
      product: string;
      status: string;
    }
  | {
      kind: "product-request";
      sender: string;
      subject: string;
      request: string;
    }
  | {
      kind: "answers-found";
      sources: { name: string; answer: string }[];
      status: string;
    }
  | {
      kind: "reply-ready";
      to: string;
      subject: string;
      status: string;
    }
  | {
      kind: "account-research";
      account: string;
      sources: string[];
      signal: string;
    }
  | {
      kind: "three-why";
      items: { label: string; answer: string }[];
    }
  | {
      kind: "outreach-ready";
      person: string;
      channels: string[];
      status: string;
    };

export type StoryBeat = {
  label: string;
  scene: StoryScene;
  when?: string;
  artifact?: Artifact;
  visual?: StoryVisual;
};

export type Artifact =
  | {
      kind: "slides";
      title: string;
      cards: SlideCard[];
    }
  | {
      kind: "one-pager";
      title: string;
      eyebrow?: string;
      sections: { heading: string; body: string }[];
    }
  | {
      kind: "packet";
      title: string;
      fields: { label: string; value: string }[];
    }
  | {
      kind: "redlines";
      title: string;
      paperTitle: string;
      from: string;
      marks: { text: string; note: string; take: boolean }[];
      reply: { to: string; subject: string; body: string };
    }
  | {
      kind: "outbound";
      title: string;
      account: string;
      hypothesis: { k: string; body: string }[];
      evidence: { source: string; finding: string }[];
      targets: { name: string; role: string; why: string }[];
      page: { headline: string; body: string };
    }
  | {
      kind: "linkedin";
      title: string;
      to: string;
      role?: string;
      body: string;
    }
  | {
      kind: "gmail";
      title: string;
      to: string;
      subject: string;
      body: string;
    };

export type DemoMessage = {
  id: string;
  from: string;
  kind: MessageKind;
  body?: string;
  draftLabel?: string;
  artifact?: Artifact;
  delayMs?: number;
};

export type DemoThread = {
  title: string;
  subtitle: string;
  participants: Participant[];
  messages: DemoMessage[];
};

export type CroJob = {
  id: JobId;
  number: number;
  title: string;
  trigger: string;
  backgroundAction: string;
  problem: string;
  botJob: string;
  storyboard: StoryBeat[];
  unlock: string;
  outcome: string;
  demo: DemoThread;
};
