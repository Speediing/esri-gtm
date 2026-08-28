import type { JobId } from "./types";

export type SiteKind =
  | "granola"
  | "figma"
  | "gdoc"
  | "gmail"
  | "linkedin"
  | "research"
  | "page";

export type ChromeTab = {
  id: string;
  host: string;
  label: string;
};

export type ComputerBeat = {
  pill: string;
  host: string;
  path?: string;
  title: string;
  site: SiteKind;
  tabs: ChromeTab[];
};

const granola = { id: "granola", host: "granola.app", label: "Granola" };
const figma = { id: "figma", host: "figma.com", label: "Figma" };
const gmail = { id: "gmail", host: "mail.google.com", label: "Gmail" };
const docs = { id: "docs", host: "docs.google.com", label: "Docs" };
const linkedin = {
  id: "linkedin",
  host: "www.linkedin.com",
  label: "LinkedIn",
};
const publicWeb = {
  id: "public",
  host: "example.com",
  label: "Public sources",
};

export const SCREENS: Record<JobId, Record<string, ComputerBeat>> = {
  "meeting-follow-up": {
    m1: {
      pill: "Opening approved call notes",
      host: "granola.app",
      path: "/notes/sample-account",
      title: "Sample account notes",
      site: "granola",
      tabs: [granola, figma, gmail],
    },
    m2: {
      pill: "Organizing the call outline",
      host: "granola.app",
      path: "/notes/sample-account",
      title: "Sample account notes",
      site: "granola",
      tabs: [granola, figma, gmail],
    },
    m3: {
      pill: "Drafting the discovery summary",
      host: "figma.com",
      path: "/file/sample-discovery",
      title: "Sample account discovery summary",
      site: "figma",
      tabs: [granola, figma, gmail],
    },
    m4: {
      pill: "Preparing the customer brief",
      host: "docs.google.com",
      path: "/document/sample-brief",
      title: "Sample account brief",
      site: "gdoc",
      tabs: [granola, docs, gmail],
    },
    m5: {
      pill: "Drafting the follow-up",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [granola, docs, gmail],
    },
    m6: {
      pill: "Drafts parked for approval",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [granola, docs, gmail],
    },
  },
  "product-answers": {
    m1: {
      pill: "Opening the customer request",
      host: "mail.google.com",
      path: "/mail/u/0/#inbox",
      title: "Inbox",
      site: "gmail",
      tabs: [gmail, docs],
    },
    m2: {
      pill: "Checking approved sources",
      host: "docs.google.com",
      path: "/document/product-references",
      title: "Product references",
      site: "gdoc",
      tabs: [gmail, docs],
    },
    m3: {
      pill: "Preparing the answer packet",
      host: "docs.google.com",
      path: "/document/answer-packet",
      title: "Product answer packet",
      site: "gdoc",
      tabs: [gmail, docs],
    },
    m4: {
      pill: "Drafting the reply",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [gmail, docs],
    },
    m5: {
      pill: "Reply parked for approval",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [gmail, docs],
    },
  },
  "account-research": {
    m1: {
      pill: "Checking public sources",
      host: "example.com",
      path: "/sample-account",
      title: "Sample account public sources",
      site: "research",
      tabs: [publicWeb, docs, linkedin, gmail],
    },
    m2: {
      pill: "Separating facts from questions",
      host: "example.com",
      path: "/sample-account",
      title: "Sample account public sources",
      site: "research",
      tabs: [publicWeb, docs, linkedin, gmail],
    },
    m3: {
      pill: "Drafting the account brief",
      host: "docs.google.com",
      path: "/document/sample-account-brief",
      title: "Sample account research plan",
      site: "gdoc",
      tabs: [publicWeb, docs, linkedin, gmail],
    },
    m4: {
      pill: "Building the source checklist",
      host: "docs.google.com",
      path: "/document/sample-account-sources",
      title: "Public sources to review",
      site: "gdoc",
      tabs: [publicWeb, docs, linkedin, gmail],
    },
    m5: {
      pill: "Drafting role-based outreach",
      host: "www.linkedin.com",
      path: "/messaging/compose",
      title: "Message",
      site: "linkedin",
      tabs: [publicWeb, docs, linkedin, gmail],
    },
    m6: {
      pill: "Preparing the account page",
      host: "docs.google.com",
      path: "/document/sample-account-page",
      title: "Sample account page",
      site: "page",
      tabs: [publicWeb, docs, linkedin, gmail],
    },
    m7: {
      pill: "Drafts parked for approval",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [publicWeb, docs, linkedin, gmail],
    },
  },
};

export function beatFor(
  jobId: JobId,
  messageId: string | undefined,
): ComputerBeat | undefined {
  if (!messageId) return undefined;
  return SCREENS[jobId]?.[messageId];
}
