'use client';

import { motion } from 'motion/react';
import {
  Locale,
  routing,
  usePathname,
  useRouter,
} from '@/features/i18n/routing';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

type Props = {
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({ defaultValue, label }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const [active, setActive] = useState(defaultValue);
  const [isSwitching, setIsSwitching] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setActive(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const variants = {
    [routing.locales[0]]: { x: '0%' },
    [routing.locales[1]]: { x: '100%' },
  };

  function changeLocale(nextLocale: string) {
    if (isSwitching || nextLocale === defaultValue) return;

    setIsSwitching(true);
    setActive(nextLocale);

    timeoutRef.current = setTimeout(() => {
      router.replace(
        { pathname, query: params as Record<string, string> },
        { locale: nextLocale as Locale }
      );
    }, 150);
  }

  return (
    <div
      aria-label={label}
      className="relative flex bg-[#F1F5F9] p-[4px] border-[#64748B] border-[0.5px] rounded-full w-[144px] min-h-[44px]"
    >
      <motion.div
        className="top-[4px] left-[4px] absolute bg-[#FFFFFF] shadow-[0px_0px_4px_0px_#00000040] border-[#CBD5E1] border-[0.5px] rounded-full w-[calc(50%-4px)] h-[calc(100%-8px)]"
        variants={variants}
        initial={false}
        animate={active}
        transition={{
          ease: 'easeInOut',
          duration: 0.15,
        }}
      />

      {routing.locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => changeLocale(locale)}
          disabled={isSwitching}
          className={`z-[10] cursor-pointer w-1/2 rounded-full flex items-center justify-center ${
            locale === active
              ? 'text-[#1E293B] font-bold text-[14px]'
              : 'text-[#1E293B] text-[14px]'
          }`}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
