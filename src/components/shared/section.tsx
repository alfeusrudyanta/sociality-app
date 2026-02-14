import { cn } from '@/lib/utils';

type SectionProps = {
  className?: string;
  children: React.ReactNode;
};

export const Section: React.FC<SectionProps> = ({ className, children }) => {
  return (
    <section
      className={cn(
        'flex flex-col justify-center px-4 py-20 md:py-30',
        className
      )}
    >
      {children}
    </section>
  );
};
