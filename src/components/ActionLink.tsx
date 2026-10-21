import type { AnchorHTMLAttributes, ReactNode } from 'react';

type ActionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: 'primary' | 'quiet';
};

export function ActionLink({ children, className = '', variant = 'primary', ...props }: ActionLinkProps) {
  return (
    <a className={`action-link action-link--${variant} ${className}`.trim()} {...props}>
      {children}
    </a>
  );
}