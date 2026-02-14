import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Tabs as TabsPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

function Tabs({
  className,
  orientation = 'horizontal',
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot='tabs'
      data-orientation={orientation}
      orientation={orientation}
      className={cn(
        'group/tabs flex items-center gap-4 data-[orientation=horizontal]:flex-col md:gap-6',
        className
      )}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  'rounded-2xl group/tabs-list text-neutral-25 inline-flex w-fit items-center justify-center',
  {
    variants: {
      variant: {
        default: 'bg-muted',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function TabsList({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot='tabs-list'
      data-variant={variant}
      className={cn(
        tabsListVariants({ variant }),
        'flex h-10 items-center rounded-2xl bg-neutral-900',
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot='tabs-trigger'
      className={cn(
        'h-10 rounded-2xl px-10 py-1 whitespace-nowrap transition-all',
        'text-sm-regular md:text-md-regular md:data-[state=active]:text-md-semibold data-[state=active]:text-sm-semibold data-[state=active]:bg-white data-[state=active]:text-neutral-950',
        'cursor-pointer',
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot='tabs-content'
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants };
