'use client';

import { ReactNode, useTransition, ChangeEvent } from 'react';
import { useRouter, usePathname } from '@/navigation';
import { useParams } from 'next/navigation';

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(
        // @ts-ignore
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <div className='max-w-32'>
      <label htmlFor='locale' className='block text-sm font-medium leading-6'>
        {label}
      </label>
      <select
        id='locale'
        defaultValue={defaultValue}
        className={`mt-2 block w-full rounded-md bg-background border-0 py-1.5 pl-3 
            pr-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 
            sm:text-sm sm:leading-6`}
        onChange={onSelectChange}
        disabled={isPending}
      >
        {children}
      </select>
    </div>
  );
}
