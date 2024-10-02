import { useTranslations } from "next-intl"
import { Link } from "@/navigation";
import LocaleSwitcher from "@/components/localeSwitcher";

export default function Home() {
  const t = useTranslations("Home");
  return (
    <div className="min-h-screen flex flex-col gap-6 items-center justify-center">
        <h1 className="text-2xl">{t('title')}</h1>
        <Link href="/">{t('link')}</Link>
        <LocaleSwitcher />
    </div>
  )
}