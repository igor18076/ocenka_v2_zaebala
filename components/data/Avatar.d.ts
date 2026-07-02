import * as React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Full name — used for initials fallback and tooltip. */
  name?: string;
  /** Image URL; falls back to initials when omitted. */
  src?: string;
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
}

/**
 * User avatar. Renders the image when `src` is supplied, otherwise the
 * initials of `name` on a soft blue chip. Used in the topbar and «Ответственный».
 */
export function Avatar(props: AvatarProps): JSX.Element;
