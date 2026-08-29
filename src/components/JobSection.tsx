import Image from "next/image";
import type { CroJob, JobId } from "@/data/types";
import { Storyboard } from "./Storyboard";
import { ChapterPayoff } from "./ChapterPayoff";
import { JobMore } from "./JobMore";

const JOB_ART: Record<JobId, { watercolor: string; cartography: string }> = {
  "meeting-follow-up": {
    watercolor: "/brand/watercolor-room.png",
    cartography: "/brand/cartography-call.svg",
  },
  "product-answers": {
    watercolor: "/brand/watercolor-deal.png",
    cartography: "/brand/cartography-answers.svg",
  },
  "account-research": {
    watercolor: "/brand/watercolor-attach.png",
    cartography: "/brand/cartography-research.svg",
  },
};

export function JobSection({ job }: { job: CroJob }) {
  const lastBeat = job.storyboard[job.storyboard.length - 1];
  const payoff = lastBeat?.artifact ? lastBeat : undefined;
  const lead = payoff ? job.storyboard.slice(0, -1) : job.storyboard;

  return (
    <section id={job.id} className="narrative report-section job">
      <p className="section-number">
        {String(job.number).padStart(2, "0")}
      </p>
      <div>
        <div className="job-art" aria-hidden>
          <Image
            className="job-watercolor"
            src={JOB_ART[job.id].watercolor}
            alt=""
            width={984}
            height={542}
          />
          <Image
            className="job-cartography"
            src={JOB_ART[job.id].cartography}
            alt=""
            width={640}
            height={640}
          />
        </div>
        <div className="background-agent">
          <span className="background-agent-pulse" aria-hidden />
          <p>
            <strong>Background agent active</strong>
            <small>
              {job.trigger} → {job.backgroundAction}
            </small>
          </p>
        </div>
        <h2 className="job-title">{job.title}</h2>
        <p className="job-value">{job.outcome}</p>
        <Storyboard beats={lead} />
        {payoff ? <ChapterPayoff beat={payoff} /> : null}
        <JobMore job={job} />
      </div>
    </section>
  );
}
