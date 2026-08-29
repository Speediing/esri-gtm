import { FLEET, type FleetBot } from "@/data/fleet";

function initials(bot: FleetBot) {
  const parts = bot.name.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0] || ""}${parts[parts.length - 1][0] || ""}`.toUpperCase();
}

function isLight(hex: string) {
  if (!hex.startsWith("#") || hex.length < 7) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 180;
}

function Box({ bot }: { bot: FleetBot }) {
  return (
    <a className="org-box" href={`#${bot.jobId}`}>
      <span
        className="org-avatar"
        style={{
          background: bot.color,
          color: isLight(bot.color) ? "#111" : "#fff",
        }}
        aria-hidden
      >
        {initials(bot)}
      </span>
      <span className="org-name">{bot.name}</span>
      <span className="org-blurb">{bot.blurb}</span>
    </a>
  );
}

export function RosterChart() {
  return (
    <section id="roster" className="roster">
      <h2>A fleet of agents, each with a computer</h2>
      <p className="section-lede">
        A call starts, a customer question arrives, or an account enters the
        list. The right agent prepares the work. Drafts stay in review until the
        seller approves them.
      </p>

      <div className="org">
        <ul className="org-kids">
          {FLEET.map((agent) => (
            <li key={agent.id} className="org-kid">
              <Box bot={agent} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
