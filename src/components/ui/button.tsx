import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-md-bold disabled:pointer-events-none shrink-0 transition-all outline-none cursor-pointer transition-all',
  {
    variants: {
      variant: {
        default:
          'bg-primary-300 hover:bg-primary-300/90 text-neutral-25 tracking-[-0.02em]',
        transparant:
          'text-neutral-25 tracking-[0.01em] border border-neutral-900 hover:text-neutral-400',
        gray: 'bg-neutral-900 hover:bg-neutral-900/90 border-neutral-900 border gap-1.5 rounded-lg text-sm-medium text-neutral-25 tracking-[-0.03em]',
      },
      size: {
        default: 'h-11 md:h-12 w-full',
        button: 'h-10 w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot='button'
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
