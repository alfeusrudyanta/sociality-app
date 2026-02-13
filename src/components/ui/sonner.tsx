import { InfoIcon, Loader2Icon, TriangleAlertIcon, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      toastOptions={{
        className:
          'mt-21.5! md:mt-28! md:mr-24! text-sm-semibold! rounded-md! tracking-[-0.02em]! text-white! md:max-w-72.75! md:w-full! w-[calc(100%-40px)] h-10! flex! flex-row-reverse! item-center! justify-between! px-3! gap-2! border-none!',
      }}
      icons={{
        success: <X className='size-4' />,
        info: <InfoIcon className='size-4' />,
        warning: <TriangleAlertIcon className='size-4' />,
        error: <X className='size-4' />,
        loading: <Loader2Icon className='size-4 animate-spin' />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
