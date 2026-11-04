'use client';

import { useState, type FormEvent } from 'react';

export function Newsletter() {
  const [submitted, setSubmitted] = useState(false);

  // No provider is connected yet, so nothing is sent or stored.
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      aria-labelledby="nl"
      className="flex flex-wrap items-center gap-x-12 gap-y-8 rounded-[16px] border border-border bg-surface p-[clamp(28px,4vw,48px)]"
    >
      <div className="flex flex-[1_1_360px] flex-col gap-2.5">
        <h2
          id="nl"
          className="m-0 font-serif text-[clamp(32px,4vw,44px)] leading-[1.05] font-normal tracking-[-0.01em]"
        >
          The week’s finds, in one short email.
        </h2>
        <p className="m-0 text-[15px] leading-[1.55] text-ink-2">
          New tools, what they replace, and nothing else.
        </p>
      </div>
      <form onSubmit={onSubmit} className="flex flex-[1_1_360px] flex-col gap-2.5">
        <div className="flex flex-wrap gap-3">
          <label htmlFor="nl-email" className="sr-only">
            Email address
          </label>
          <input
            id="nl-email"
            aria-label="Email address"
            type="email"
            required
            placeholder="you@domain.com"
            className="h-12 flex-[1_1_220px] rounded-[8px] border border-border-strong bg-bg px-3.5 text-[16px] leading-none text-ink"
          />
          <button
            type="submit"
            className="h-12 rounded-[8px] border-0 bg-btn px-5 text-[15px] max-[760px]:h-10 max-[760px]:px-4 max-[760px]:text-[14px] leading-none font-semibold text-btn-text"
          >
            Subscribe
          </button>
        </div>
        <p
          role="status"
          className="m-0 text-[13px] text-ink-3"
        >
          {submitted
            ? 'The newsletter is not live yet, so nothing was saved. Check back soon.'
            : 'Your email is used only to send the digest. Unsubscribe in one click.'}
        </p>
      </form>
    </section>
  );
}
