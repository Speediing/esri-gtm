"use client";

import { useState } from "react";
import { HERO_JOBS } from "@/data/hero-jobs";

export function HeroDemo() {
  const [activeId, setActiveId] = useState(HERO_JOBS[0].id);
  const active =
    HERO_JOBS.find((job) => job.id === activeId) ?? HERO_JOBS[0];

  return (
    <section className="hero hero-demo" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">Grok Bot for Esri sales</p>
        <h1 id="hero-title">The agents that work while your reps sell.</h1>
        <p className="hero-intro">
          Set the outcome. An agent opens the tools, prepares the work, and
          brings a finished draft back for review.
        </p>

        <div
          className="hero-phone-jobs"
          role="tablist"
          aria-label="See an agent at work"
        >
          {HERO_JOBS.map((job) => (
            <button
              key={job.id}
              type="button"
              role="tab"
              aria-selected={job.id === active.id}
              className={job.id === active.id ? "is-active" : undefined}
              onClick={() => setActiveId(job.id)}
            >
              {job.label}
            </button>
          ))}
        </div>
      </div>

      <div className="hero-bot-demo">
        <div className="hero-phone" aria-live="polite">
          <div className="hero-phone-notch" aria-hidden />

          <header className="hero-phone-header">
            <span className="hero-phone-back" aria-hidden>
              ‹
            </span>
            <span
              className="hero-phone-avatar"
              style={{ backgroundColor: active.color }}
              aria-hidden
            >
              G
            </span>
            <span className="hero-phone-identity">
              <strong>{active.agent}</strong>
              <small>
                <i aria-hidden /> Working
              </small>
            </span>
            <span className="hero-phone-info" aria-hidden>
              i
            </span>
          </header>

          <div className="hero-phone-thread" key={active.id} role="tabpanel">
            <p className="hero-phone-time">Today 9:41 AM</p>
            <div className="hero-message is-user">{active.user}</div>
            {active.replies.map((reply) => (
              <div className="hero-message is-agent" key={reply}>
                {reply}
              </div>
            ))}
            <article className="hero-phone-artifact">
              <span>{active.artifact.label}</span>
              <strong>{active.artifact.title}</strong>
              <p>{active.artifact.detail}</p>
              <small>Waiting for your review</small>
            </article>
          </div>

          <div className="hero-phone-composer" aria-hidden>
            <span className="hero-phone-plus">+</span>
            <span className="hero-phone-field">Message Grok Bot</span>
            <span className="hero-phone-mic">●</span>
          </div>
          <div className="hero-phone-home" aria-hidden />
        </div>
      </div>
    </section>
  );
}
