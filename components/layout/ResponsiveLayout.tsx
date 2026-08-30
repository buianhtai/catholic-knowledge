import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type PrimitiveProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

function classes(base: string, className?: string) {
  return className ? `${base} ${className}` : base;
}

export function ResponsivePage<T extends ElementType = 'div'>({
  as,
  className,
  ...props
}: PrimitiveProps<T>) {
  const Component = as ?? 'div';
  return <Component className={classes('ck-page', className)} {...props} />;
}

export function ResponsiveContainer<T extends ElementType = 'div'>({
  as,
  className,
  ...props
}: PrimitiveProps<T>) {
  const Component = as ?? 'div';
  return <Component className={classes('ck-container', className)} {...props} />;
}

export function ResponsiveContent<T extends ElementType = 'div'>({
  as,
  className,
  ...props
}: PrimitiveProps<T>) {
  const Component = as ?? 'div';
  return <Component className={classes('ck-content', className)} {...props} />;
}

export function ResponsiveStack<T extends ElementType = 'div'>({
  as,
  className,
  ...props
}: PrimitiveProps<T>) {
  const Component = as ?? 'div';
  return <Component className={classes('ck-stack', className)} {...props} />;
}

export function ResponsiveGrid<T extends ElementType = 'div'>({
  as,
  className,
  ...props
}: PrimitiveProps<T>) {
  const Component = as ?? 'div';
  return <Component className={classes('ck-grid', className)} {...props} />;
}

export function ResponsiveSplit<T extends ElementType = 'div'>({
  as,
  className,
  ...props
}: PrimitiveProps<T>) {
  const Component = as ?? 'div';
  return <Component className={classes('ck-split', className)} {...props} />;
}

export function ResponsiveToolbar<T extends ElementType = 'div'>({
  as,
  className,
  ...props
}: PrimitiveProps<T>) {
  const Component = as ?? 'div';
  return <Component className={classes('ck-toolbar', className)} {...props} />;
}
