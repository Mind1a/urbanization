import { useLocale, useTranslations } from 'next-intl';
import LocaleSwitcherSelect from '../LocaleSwitcherSelect';

export default function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations("header");

  return (
    <div className="flex items-center">
      <LocaleSwitcherSelect defaultValue={locale} label={t("switchLanguage")} />
    </div>
  );
}
