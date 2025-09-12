"use client";

import Link, { LinkProps } from "next/link";
import { forwardRef, ReactNode } from "react";

interface NextLinkProps extends LinkProps {
  children: ReactNode;
}

const NextLink = forwardRef<HTMLAnchorElement, NextLinkProps>(({ children, ...props }, ref) => (
  <Link {...props} ref={ref}>
    {children}
  </Link>
));

NextLink.displayName = "NextLink";

export default NextLink;
