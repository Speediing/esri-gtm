# Grok Bot for Esri sales

This password-protected site presents three illustrative Grok Bot workflows for Esri sellers. Each workflow includes a storyboard and an interactive agent demo. The demos use sample data and do not send messages.

## Run the site locally

```bash
cp .env.example .env.local
```

Set a local `SITE_PASSWORD` in `.env.local`. Then run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Check a change

```bash
npm run audit
npm run lint
npm run typecheck
npm run build
```

## Brand assets

The lockup loads the Esri mark from the official [Esri-hosted asset](https://www.esri.com/content/dam/esrisites/common/logos/esri-logo.jpg). The site uses the mark in its entirety. `public/brand/spacexai.svg` contains the SpaceXAI wordmark.

## Deploy

Deploy the `esri-grokbot` project to the `jasonwiker` Vercel scope. Set `SITE_PASSWORD` in Vercel. Do not add the password value to tracked files.
