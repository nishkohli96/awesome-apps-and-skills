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
      className="border-border bg-surface flex flex-wrap items-center gap-x-12 gap-y-8 rounded-[16px] border p-[clamp(28px,4vw,48px)]"
    >
      <div className="flex flex-[1_1_360px] flex-col gap-2.5">
        <h2
          id="nl"
          className="m-0 font-serif text-[clamp(32px,4vw,44px)] leading-[1.05] font-normal tracking-[-0.01em]"
        >
          The week’s finds, in one short email.
        </h2>
        <p className="text-ink-2 m-0 text-[15px] leading-[1.55]">
          New tools, what they replace, and nothing else.
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        className="flex flex-[1_1_360px] flex-col gap-2.5"
      >
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
            className="border-border-strong bg-bg text-ink h-12 flex-[1_1_220px] rounded-[8px] border px-3.5 text-[16px] leading-none"
          />
          <button
            type="submit"
            className="bg-btn text-btn-text h-12 rounded-[8px] border-0 px-5 text-[15px] leading-none font-semibold max-[760px]:h-10 max-[760px]:px-4 max-[760px]:text-[14px]"
          >
            Subscribe
          </button>
        </div>
        <p role="status" className="text-ink-3 m-0 text-[13px]">
          {submitted
            ? 'The newsletter is not live yet, so nothing was saved. Check back soon.'
            : 'Your email is used only to send the digest. Unsubscribe in one click.'}
        </p>
      </form>
    </section>
  );
}
