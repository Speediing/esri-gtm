import Image from "next/image";
import type { CroJob, JobId } from "@/data/types";
import { Storyboard } from "./Storyboard";
import { ChapterPayoff } from "./ChapterPayoff";
import { JobMore } from "./JobMore";

const JOB_ART: Record<JobId, string> = {
  "meeting-follow-up": "/brand/watercolor-room.png",
  "product-answers": "/brand/watercolor-deal.png",
  "account-research": "/brand/watercolor-attach.png",
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
            src={JOB_ART[job.id]}
            alt=""
            width={984}
            height={542}
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
