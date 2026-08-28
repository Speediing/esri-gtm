import type { JobId } from "./types";

export type FleetBot = {
  id: string;
  name: string;
  blurb: string;
  color: string;
  jobId?: JobId;
  mark?: string;
  seat?: boolean;
};

export const FLEET: FleetBot[] = [
  {
    id: "rep",
    name: "Every Esri seller",
    blurb: "The seller stays in control. Agents prepare the surrounding work for review.",
    color: "#E8E8ED",
    mark: "AE",
    seat: true,
  },
  {
    id: "follow-up",
    name: "Call follow-up agent",
    blurb: "Organizes approved notes and prepares tailored follow-up drafts.",
    jobId: "meeting-follow-up",
    color: "#2A7F9E",
  },
  {
    id: "answers",
    name: "Product answers agent",
    blurb: "Finds approved sources and holds open questions for internal review.",
    jobId: "product-answers",
    color: "#3E7F73",
  },
  {
    id: "research",
    name: "Account research agent",
    blurb: "Checks public sources and prepares role-based outreach drafts.",
    jobId: "account-research",
    color: "#6B7F4E",
  },
];
