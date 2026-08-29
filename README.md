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

`public/brand/esri-wordmark.jpg` is the official Esri mark, stored locally and used in its entirety. `public/brand/spacexai.svg` contains the SpaceXAI wordmark. `public/brand/esri-falcon-cartography.jpg` is the Esri and Falcon hero illustration.
