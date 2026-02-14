import { cn } from '@/lib/utils';
import type { Dispatch, SetStateAction } from 'react';

type FormLabelProps = {
  name: string;
  id: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  value: string;
  disabled: boolean;
  onChange: Dispatch<SetStateAction<string>>;
  error?: string;
};

export const FormLabel: React.FC<FormLabelProps> = ({
  name,
  id,
  type,
  placeholder,
  value,
  disabled,
  onChange,
  error,
}) => {
  return (
    <label htmlFor={id} className='flex w-full flex-col gap-0.5'>
      <span className='text-sm-bold tracking-[-0.02em] text-white'>{name}</span>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.currentTarget.value)}
        className={cn(
          'placeholder:text-md-regular text-md-semibold text-neutral-25 w-full gap-2 rounded-xl border border-neutral-950 bg-neutral-950 px-4 py-2 tracking-[-0.02em] placeholder:text-neutral-600',
          error && 'border-accent-red'
        )}
      />

      {error && (
        <span className='text-sm-medium md:text-sm-medium text-accent-red tracking-[-0.03em]'>
          {error}
        </span>
      )}
    </label>
  );
};
