"use client";

import React from "react";

interface TrackedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  eventName?: string;
  eventParams?: Record<string, any>;
}

export default function TrackedLink({
  eventName,
  eventParams,
  children,
  onClick,
  ...props
}: TrackedLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Standard gtag event tracking
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function" && eventName) {
      (window as any).gtag("event", eventName, eventParams);
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <a onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
