import React from "react";

import Link from "next/link";

interface OpenExternalLinkProps {
  link?: string;
  children: React.ReactNode;
  className?: string;
}

const OpenExternalLink = ({
  children,
  link,
  className,
}: OpenExternalLinkProps) => {
  return (
    <Link
      href={link || ""}
      passHref
      target="_blank"
      rel="noreferrer"
      className={className}
    >
      {children}
    </Link>
  );
};

export default OpenExternalLink;
