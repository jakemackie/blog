import { useTranslations } from "next-intl"

export default function Home() {
  const t = useTranslations("Home");
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl">{t('title')}</h1>
    </div>
  )
}