import Image from "next/image";
import { CompareTable } from "@/components/CompareTable";
import { HeroDemo } from "@/components/HeroDemo";
import { HeroTelemetry } from "@/components/HeroTelemetry";
import { JobSection } from "@/components/JobSection";
import { QuoteWall } from "@/components/QuoteWall";
import { RosterChart } from "@/components/RosterChart";
import { SiteNav } from "@/components/SiteNav";
import { JOBS } from "@/data/jobs";

export default function HomePage() {
  return (
    <main id="top">
      <div className="hero-watercolor">
        <Image
          className="hero-watercolor-image"
          src="/brand/cartography-hero.svg"
          alt=""
          width={1600}
          height={680}
          priority
        />
        <SiteNav />
      </div>

      <div className="report">
        <div className="report-hero">
          <HeroTelemetry />
          <HeroDemo />

          <section className="usecase-framing">
            <p className="eyebrow">Three sample use cases</p>
            <h2>
              Grok Bot gives each seller a fleet of agents with their own
              computers. They keep the work around each customer moving.
            </h2>
            <p>
              These examples cover a live call, a product question, and account
              research. They use illustrative sample data. Nothing is sent
              without seller approval.
            </p>
          </section>

          <RosterChart />

          <div className="metric-grid">
            {JOBS.map((job) => (
              <a
                key={job.id}
                className="metric-card"
                href={`#${job.id}`}
              >
                <div className="metric-card-top">
                  <p>Sample {String(job.number).padStart(2, "0")}</p>
                </div>
                <h2>{job.title}</h2>
                <p className="metric-trigger">Starts when {job.trigger.toLowerCase()}</p>
              </a>
            ))}
          </div>
        </div>

        <div id="jobs">
          {JOBS.map((job) => (
            <JobSection key={job.id} job={job} />
          ))}
        </div>
      </div>

      <div className="orbit-break" aria-hidden>
        <Image
          src="/brand/cartography-orbit.svg"
          alt=""
          width={1600}
          height={320}
        />
      </div>

      <div className="report">
        <CompareTable />
        <QuoteWall />
      </div>

      <footer className="site-footer">
        <strong>Mike Weinert</strong>
        <a href="mailto:mike.weinert@cursor.com">mike.weinert@cursor.com</a>
      </footer>
    </main>
  );
}
