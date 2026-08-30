import type { HTMLAttributes, ReactNode } from 'react';

type LayoutProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

function classes(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export function ResponsivePage({ className, ...props }: LayoutProps) {
  return <div className={classes('ck-page', className)} {...props} />;
}

export function ResponsiveContainer({ className, ...props }: LayoutProps) {
  return <div className={classes('ck-container', className)} {...props} />;
}

export function ResponsiveContent({ className, ...props }: LayoutProps) {
  return <div className={classes('ck-content', className)} {...props} />;
}

export function ResponsiveStack({ className, ...props }: LayoutProps) {
  return <div className={classes('ck-stack', className)} {...props} />;
}

export function ResponsiveGrid({ className, ...props }: LayoutProps) {
  return <div className={classes('ck-grid', className)} {...props} />;
}

export function ResponsiveSplit({ className, ...props }: LayoutProps) {
  return <div className={classes('ck-split', className)} {...props} />;
}

export function ResponsiveToolbar({ className, ...props }: LayoutProps) {
  return <div className={classes('ck-toolbar', className)} {...props} />;
}
