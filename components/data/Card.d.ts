import * as React from 'react';

/**
 * Surface container props.
 *
 * @startingPoint section="Layout" subtitle="Card surface with header + body" viewport="700x220"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Header title (string → styled h3, or any node). */
  title?: React.ReactNode;
  /** Header right-side actions (buttons, menu). */
  actions?: React.ReactNode;
  /**
   * - flat: 1px ring, default
   * - raised: soft shadow
   * - floating: stronger shadow (popover-like)
   * @default "flat"
   */
  elevation?: 'flat' | 'raised' | 'floating';
  /** Remove default body padding (e.g. when embedding a Table). */
  noBodyPad?: boolean;
  children?: React.ReactNode;
}

/**
 * Generic surface container with an optional header. The building block for
 * every panel in the app — object cards, calculation blocks, report cards.
 */
export function Card(props: CardProps): JSX.Element;
