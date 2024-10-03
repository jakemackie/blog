import { useTranslations } from 'next-intl';
import LocaleSwitcher from '@/components/localeSwitcher';

export default function Home() {
  const t = useTranslations('Home');
  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
      <div className='max-w-lg space-y-8'>
        <h1 className='text-2xl'>{t('title')}</h1>
        <p>{t('description')}</p>
        <LocaleSwitcher />
      </div>
    </div>
  );
}
