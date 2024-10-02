'use client';

import { ReactNode, useTransition, ChangeEvent } from 'react';
import { useRouter, usePathname } from '@/navigation';
import { useParams } from 'next/navigation';

type Props = {
    children: ReactNode,
    defaultValue: string,
    label: string,
}

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
        <label className='flex flex-col'>
            <span>{label}</span>
            <select
                className={`inline-flex bg-black text-white rounded-lg border p-2 ${isPending ? 'opacity-30' : ''}`}
                defaultValue={defaultValue}
                disabled={isPending}
                onChange={onSelectChange}
            >
                {children}
            </select>
        </label>
    )
}
