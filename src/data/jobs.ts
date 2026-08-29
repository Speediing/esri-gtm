import type { Artifact, CroJob, SlideCard } from "./types";

export const DISCOVERY_SLIDES: SlideCard[] = [
  {
    n: 1,
    kicker: "Sample call note",
    voice: "customer",
    title: "Operational priorities",
    body: "Organize the priorities already captured in the live notes.",
  },
  {
    n: 2,
    kicker: "Sample call note",
    voice: "customer",
    title: "Current workflow",
    body: "Show the tools and review steps the customer described.",
  },
  {
    n: 3,
    kicker: "Draft for review",
    voice: "seller",
    title: "Relevant ArcGIS path",
    body: "Match approved ArcGIS material to the needs raised on the call.",
  },
  {
    n: 4,
    kicker: "Draft for review",
    voice: "seller",
    title: "Next conversation",
    body: "Prepare a focused follow-up with the right customer roles.",
  },
];

export const PRODUCT_ANSWER: Extract<Artifact, { kind: "redlines" }> = {
  kind: "redlines",
  title: "ArcGIS answer brief",
  paperTitle: "Questions to resolve",
  from: "Customer team",
  marks: [
    {
      text: "What ArcGIS guidance applies to this use case?",
      note: "Match the request to approved ArcGIS documentation and include the source.",
      take: true,
    },
    {
      text: "Which deployment details need confirmation?",
      note: "List the open details and route them to the right internal owner.",
      take: true,
    },
    {
      text: "What should the customer review next?",
      note: "Prepare a focused set of references for the seller to approve.",
      take: true,
    },
    {
      text: "Is every answer ready to send?",
      note: "Keep unresolved points in review until an internal owner confirms them.",
      take: false,
    },
  ],
  reply: {
    to: "Customer team",
    subject: "Product references for your review",
    body: "Thanks for the questions. I gathered the relevant ArcGIS references and marked the points that still need internal review. The seller will confirm the final guidance before this draft is sent.",
  },
};

export const ACCOUNT_RESEARCH: Extract<Artifact, { kind: "outbound" }> = {
  kind: "outbound",
  title: "Acme account research",
  account: "Acme",
  hypothesis: [
    {
      k: "Why this account",
      body: "Review public company material and keep every useful note linked to its source.",
    },
    {
      k: "Why now",
      body: "A new public update can trigger research. The seller decides whether it matters.",
    },
    {
      k: "Why this role",
      body: "Find the role responsible for the topic in the source before drafting outreach.",
    },
  ],
  evidence: [
    {
      source: "Company pages",
      finding: "Review current priorities and published initiatives.",
    },
    {
      source: "Open roles",
      finding: "Check which capabilities the company is investing in.",
    },
    {
      source: "Press releases",
      finding: "Confirm recent changes before writing outreach.",
    },
  ],
  targets: [
    {
      name: "Relevant business leader",
      role: "Role confirmed from public sources",
      why: "Connect the draft to the responsibility named in the source.",
    },
  ],
  page: {
    headline: "A source-linked note for Acme",
    body: "Summarize the public signal, the possible location intelligence fit, and the question the seller should validate before outreach.",
  },
};

export const JOBS: CroJob[] = [
  {
    id: "meeting-follow-up",
    number: 1,
    title: "Update decks in real time",
    trigger: "a customer call starts",
    backgroundAction: "Organizing live notes and updating draft materials",
    problem:
      "Live discovery is useful only if the details make it into the next step. Rewriting notes, slides, and follow-up after the call slows the seller down.",
    botJob:
      "Grok Bot follows the approved call notes, organizes the customer topics, and prepares tailored drafts while the seller stays in the conversation.",
    storyboard: [
      {
        when: "Call in progress",
        label: "The customer call starts. The notes agent begins organizing the discussion.",
        scene: "call",
        visual: {
          kind: "live-call",
          title: "Sample discovery call",
          people: [
            { initials: "ES", name: "Esri seller" },
            { initials: "CT", name: "Customer team" },
          ],
        },
      },
      {
        when: "Topics detected",
        label: "The agent turns the live notes into a clear outline.",
        scene: "demo",
        visual: {
          kind: "live-notes",
          label: "Draft outline",
          summary:
            "The agent organizes customer priorities, current workflows, and review requirements.",
          signals: ["Priorities", "Workflow", "Review path"],
        },
      },
      {
        when: "Drafting",
        label: "The open deck and follow-up materials are updated for seller review.",
        scene: "notes",
        visual: {
          kind: "deck-update",
          eyebrow: "Sample data",
          headline: "Customer priorities, organized",
          product: "Relevant ArcGIS mapping material",
          status: "Draft saved",
        },
      },
      {
        when: "Ready for review",
        label: "The seller receives a tailored summary before leaving the workflow.",
        scene: "deck",
        artifact: {
          kind: "slides",
          title: "Discovery summary",
          cards: DISCOVERY_SLIDES,
        },
      },
    ],
    unlock:
      "The call can produce a reviewable deck, summary, and follow-up without a separate handoff.",
    outcome:
      "One live conversation becomes tailored draft material while the context is still fresh.",
    demo: {
      title: "Call follow-up",
      subtitle: "Illustrative sample data",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "notes",
          name: "Notes agent",
          role: "bot",
          persona: "Organizes approved live notes into a usable customer brief",
          color: "#2A7F9E",
        },
        {
          id: "slides",
          name: "Slides agent",
          role: "bot",
          persona: "Prepares reviewable sales material from the approved brief",
          color: "#5B7C65",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "notes",
          kind: "routine",
          body: "Acme call detected. I am following the approved notes and organizing customer priorities, current workflows, and open review items.",
        },
        {
          id: "m2",
          from: "notes",
          kind: "text",
          body: "The outline is ready. I kept each point tied to the sample notes and left unconfirmed details out.",
        },
        {
          id: "m3",
          from: "slides",
          kind: "draft",
          draftLabel: "Discovery summary",
          artifact: {
            kind: "slides",
            title: "Acme discovery summary",
            cards: DISCOVERY_SLIDES,
          },
        },
        {
          id: "m4",
          from: "notes",
          kind: "draft",
          draftLabel: "Customer brief",
          artifact: {
            kind: "one-pager",
            title: "Acme brief",
            eyebrow: "Illustrative sample",
            sections: [
              {
                heading: "Priorities",
                body: "Summarize the priorities captured in the approved call notes.",
              },
              {
                heading: "Relevant material",
                body: "Attach approved ArcGIS references that match the topics raised.",
              },
              {
                heading: "Open review",
                body: "List details that still need seller or internal confirmation.",
              },
            ],
          },
        },
        {
          id: "m5",
          from: "notes",
          kind: "draft",
          draftLabel: "Follow-up email",
          artifact: {
            kind: "gmail",
            title: "Follow-up draft",
            to: "Customer team",
            subject: "Materials from our conversation",
            body: "Thanks for the conversation. I organized the topics we covered and attached the relevant ArcGIS material for your review. The seller will confirm the open items before sending.",
          },
        },
        {
          id: "m6",
          from: "notes",
          kind: "system",
          body: "Nothing sent. Every draft waits for seller approval.",
        },
      ],
    },
  },
  {
    id: "product-answers",
    number: 2,
    title: "Find product and internal answers fast",
    trigger: "a customer question arrives",
    backgroundAction: "Checking product guidance and internal context",
    problem:
      "A product question can bounce between several internal teams. The seller waits for context, and the customer waits for a clear answer.",
    botJob:
      "Grok Bot gathers approved ArcGIS documentation, internal GIS guidance, and account context. It prepares a sourced draft and keeps unresolved points in review.",
    storyboard: [
      {
        when: "New request",
        label: "A product question arrives. The answer agent starts with approved sources.",
        scene: "notes",
        visual: {
          kind: "product-request",
          sender: "Customer team",
          subject: "ArcGIS fit and deployment questions",
          request: "Review requested",
        },
      },
      {
        when: "Sources checked",
        label: "Relevant references and open review items are gathered in one place.",
        scene: "inspect",
        visual: {
          kind: "answers-found",
          sources: [
            { name: "ArcGIS product docs", answer: "Relevant references found" },
            { name: "Internal guidance", answer: "Approved context found" },
            { name: "Account notes", answer: "Request context found" },
          ],
          status: "Ready for review",
        },
      },
      {
        when: "Draft ready",
        label: "The seller gets a sourced reply with unresolved points held back.",
        scene: "send",
        visual: {
          kind: "reply-ready",
          to: "Customer team",
          subject: "Product references",
          status: "Seller approval required",
        },
      },
      {
        when: "Review packet",
        label: "Questions, sources, and the draft answer stay together.",
        scene: "deck",
        artifact: PRODUCT_ANSWER,
      },
    ],
    unlock:
      "Product questions can move from intake to a reviewable draft without losing the source trail.",
    outcome:
      "The seller reviews one sourced answer packet instead of reconstructing the question across tools.",
    demo: {
      title: "Product answers",
      subtitle: "Illustrative sample data",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "answers",
          name: "Answers agent",
          role: "bot",
          persona: "Builds product answer drafts from approved sources",
          color: "#3E7F73",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "answers",
          kind: "routine",
          body: "An Acme product question arrived. I am checking approved ArcGIS documentation, internal GIS guidance, and the account notes.",
        },
        {
          id: "m2",
          from: "answers",
          kind: "text",
          body: "I found the relevant references. Unconfirmed details are marked for internal review instead of being added to the reply.",
        },
        {
          id: "m3",
          from: "answers",
          kind: "draft",
          draftLabel: "Answer packet",
          artifact: PRODUCT_ANSWER,
        },
        {
          id: "m4",
          from: "answers",
          kind: "draft",
          draftLabel: "Email reply",
          artifact: {
            kind: "gmail",
            title: "Product answer draft",
            to: PRODUCT_ANSWER.reply.to,
            subject: PRODUCT_ANSWER.reply.subject,
            body: PRODUCT_ANSWER.reply.body,
          },
        },
        {
          id: "m5",
          from: "answers",
          kind: "system",
          body: "Nothing sent. The seller reviews the sources and open items first.",
        },
      ],
    },
  },
  {
    id: "account-research",
    number: 3,
    title: "Pipeline generation is now easier than ever.",
    trigger: "an account enters the target list",
    backgroundAction: "Researching public sources and preparing draft outreach",
    problem:
      "Account research is easy to skip when the seller has to open every source and assemble the context by hand. Generic outreach is the usual result.",
    botJob:
      "Grok Bot checks public sources, links each useful note, and prepares a research brief. It drafts outreach only after a relevant role and possible location intelligence fit are identified.",
    storyboard: [
      {
        when: "Target list update",
        label: "Acme enters the list. The research agent checks public sources.",
        scene: "inspect",
        visual: {
          kind: "account-research",
          account: "Acme",
          sources: ["Company pages", "Open roles", "Press releases"],
          signal: "Public source found",
        },
      },
      {
        when: "Research brief",
        label: "The agent organizes what to validate before outreach is drafted.",
        scene: "notes",
        visual: {
          kind: "three-why",
          items: [
            { label: "Why this account", answer: "Source-linked priority" },
            { label: "Why now", answer: "Current public update" },
            { label: "Why this role", answer: "Responsibility tied to source" },
          ],
        },
      },
      {
        when: "Draft review",
        label: "The seller receives role-based outreach with the sources attached.",
        scene: "map",
        visual: {
          kind: "outreach-ready",
          person: "Relevant business leader",
          channels: ["LinkedIn", "Email", "Account page"],
          status: "Drafts waiting",
        },
      },
      {
        when: "Ready for approval",
        label: "The research, reasoning, and drafts stay together for review.",
        scene: "send",
        artifact: ACCOUNT_RESEARCH,
      },
    ],
    unlock:
      "Public research becomes a source-linked brief and tailored drafts without sending anything automatically.",
    outcome:
      "The seller starts with reviewed context and a relevant draft instead of a blank page.",
    demo: {
      title: "Account research",
      subtitle: "Illustrative sample data",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "research",
          name: "Research agent",
          role: "bot",
          persona: "Turns public sources into a reviewable account brief",
          color: "#6B7F4E",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "research",
          kind: "routine",
          body: "Acme entered the target list. I am checking public company pages, open roles, and press releases. Every note will keep its source.",
        },
        {
          id: "m2",
          from: "research",
          kind: "text",
          body: "The research plan is ready. It separates sourced facts from questions the seller still needs to validate.",
        },
        {
          id: "m3",
          from: "research",
          kind: "draft",
          draftLabel: "Account brief",
          artifact: {
            kind: "packet",
            title: "Acme research plan",
            fields: ACCOUNT_RESEARCH.hypothesis.map((item) => ({
              label: item.k,
              value: item.body,
            })),
          },
        },
        {
          id: "m4",
          from: "research",
          kind: "draft",
          draftLabel: "Source checklist",
          artifact: {
            kind: "packet",
            title: "Public sources to review",
            fields: ACCOUNT_RESEARCH.evidence.map((item) => ({
              label: item.source,
              value: item.finding,
            })),
          },
        },
        {
          id: "m5",
          from: "research",
          kind: "draft",
          draftLabel: "LinkedIn message",
          artifact: {
            kind: "linkedin",
            title: "Role-based outreach draft",
            to: "Relevant business leader",
            role: "Role confirmed from public sources",
            body: "I prepared a short, source-linked note for review. It connects a published priority to a possible location intelligence conversation without assuming product fit.",
          },
        },
        {
          id: "m6",
          from: "research",
          kind: "draft",
          draftLabel: "Account page",
          artifact: ACCOUNT_RESEARCH,
        },
        {
          id: "m7",
          from: "research",
          kind: "system",
          body: "Nothing sent. Research and outreach stay in review until the seller approves them.",
        },
      ],
    },
  },
];

export function getJob(id: string): CroJob | undefined {
  return JOBS.find((job) => job.id === id);
}
