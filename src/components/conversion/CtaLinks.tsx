"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent, ReactNode } from "react";
import { trackFunnelStep } from "@/lib/analytics";
import { site, telUrl, whatsappUrl } from "@/data/site";

type TrackProps = {
  ctaId: string;
  onTrack?: () => void;
};

function handleTrack(
  event: MouseEvent,
  ctaId: string,
  onTrack?: () => void,
) {
  onTrack?.();
}

type WhatsAppCtaProps = TrackProps & {
  message?: string;
  children: ReactNode;
  className?: string;
  funnelStep?: { index: number; name: string };
};

export function WhatsAppCta({
  ctaId,
  message,
  children,
  className,
  onTrack,
  funnelStep,
}: WhatsAppCtaProps) {
  return (
    <a
      href={whatsappUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      data-cta-id={ctaId}
      data-cta-tracked={funnelStep ? "funnel" : undefined}
      onClick={(e) => {
        if (funnelStep) {
          trackFunnelStep(funnelStep.index, funnelStep.name, { channel: "whatsapp" });
        }
        handleTrack(e, ctaId, onTrack);
      }}
    >
      {children}
    </a>
  );
}

type InstagramCtaProps = TrackProps & {
  children: ReactNode;
  className?: string;
  funnelStep?: { index: number; name: string };
  intent?: string;
};

export function InstagramCta({
  ctaId,
  children,
  className,
  onTrack,
  funnelStep,
  intent,
}: InstagramCtaProps) {
  return (
    <a
      href={site.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      data-cta-id={ctaId}
      data-cta-tracked={funnelStep ? "funnel" : undefined}
      onClick={(e) => {
        if (funnelStep) {
          trackFunnelStep(funnelStep.index, funnelStep.name, {
            channel: "instagram",
            intent,
          });
        }
        handleTrack(e, ctaId, onTrack);
      }}
    >
      {children}
    </a>
  );
}

type TelCtaProps = TrackProps & {
  children: ReactNode;
  className?: string;
};

export function TelCta({ ctaId, children, className, onTrack }: TelCtaProps) {
  return (
    <a
      href={telUrl()}
      className={className}
      data-cta-id={ctaId}
      onClick={(e) => handleTrack(e, ctaId, onTrack)}
    >
      {children}
    </a>
  );
}

type TrackedLinkProps = TrackProps &
  Omit<ComponentProps<typeof Link>, "onClick"> & {
    children: ReactNode;
  };

export function TrackedLink({
  ctaId,
  children,
  onTrack,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      data-cta-id={ctaId}
      onClick={(e) => handleTrack(e, ctaId, onTrack)}
    />
  );
}
