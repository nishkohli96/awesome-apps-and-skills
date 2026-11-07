'use client';

import type { ReactNode } from 'react';
import { track } from '@/lib/analytics';
import { AnalyticsEvent, type ProfileLocation } from '@/types';

interface ProfileLinkProps {
  href: string;
  /** Which page area the link sits in, sent with the Profile Click event. */
  location: ProfileLocation;
  /** Whose profile it is, sent with the event (`curator`, or a GitHub handle). */
  profile: string;
  className?: string;
  children: ReactNode;
}

/** External link to a person's profile that counts clicks. Usable from server components. */
export function ProfileLink({
  href,
  location,
  profile,
  className,
  children,
}: ProfileLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track(AnalyticsEvent.ProfileClick, { location, profile })}
    >
      {children}
    </a>
  );
}
