import * as React from 'react';

/**
 * Primary action button props.
 *
 * @startingPoint section="Core" subtitle="Buttons — primary, accent, secondary, ghost" viewport="700x150"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style.
   * - primary: deep-blue main action
   * - accent: emerald — confirm value / generate report
   * - secondary: bordered neutral
   * - ghost: borderless, low emphasis
   * - danger: destructive
   * - link: inline text action
   * @default "primary"
   */
  variant?: 'primary' | 'accent' | 'secondary' | 'ghost' | 'danger' | 'link';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Icon node rendered before the label (e.g. a Lucide <Plus/>). */
  iconLeft?: React.ReactNode;
  /** Icon node rendered after the label. */
  iconRight?: React.ReactNode;
  /** Stretch to full width of the container. */
  block?: boolean;
  children?: React.ReactNode;
}

/**
 * Primary action button for Ocenka PRO. Use `primary` for the main action on a
 * view, `accent` for value-confirming actions (формирование отчета), `secondary`
 * for neutral actions and `ghost` for low-emphasis toolbar actions.
 */
export function Button(props: ButtonProps): JSX.Element;
