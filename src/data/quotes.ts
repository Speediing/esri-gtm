export type Quote = {
  name: string;
  handle: string;
  quote: string;
  source: string;
};

export const QUOTES: Quote[] = [
  {
    name: "Naval",
    handle: "@naval",
    quote:
      "Grok Bot is just cool. 😎 Of course an agent should be persistent. Of course it should have its own computer.",
    source: "https://x.com/naval/status/2090497355649008059",
  },
  {
    name: "Austen Allred",
    handle: "@Austen",
    quote:
      "Maybe it's just because it's new and shiny but I'm obsessed with with Grok Bot. The form factor is so fun, especially when combined with text to speech. You can FLY.",
    source: "https://x.com/Austen/status/2087685264617406963",
  },
  {
    name: "Lenny Rachitsky",
    handle: "@lennysan",
    quote:
      "I got early access to Grok Bot and I'm hooked. I haven't been this excited about a new AI product in a while.",
    source: "https://x.com/lennysan/status/2087241423792087518",
  },
];
