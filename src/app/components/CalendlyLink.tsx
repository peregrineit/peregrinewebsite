'use client';
import { usePathname } from 'next/navigation';
import { calendlyUrl } from '@/lib/attribution';

export const CALENDLY = 'https://calendly.com/mukesh-peregrine-it/30min';

/**
 * A Calendly link that carries the page and the CTA location as UTM parameters, so a
 * booked call can be tied to where it came from. Rendered with the parameters already in
 * the HTML. (Calendly links written as plain <a> elsewhere get the same parameters at
 * click time from components/Tracking.tsx.)
 */
export default function CalendlyLink({ location, className, children }: { location: string; className?: string; children: React.ReactNode }) {
  const pathname = usePathname() || '/';
  return (
    <a href={calendlyUrl(CALENDLY, pathname, location)} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}
