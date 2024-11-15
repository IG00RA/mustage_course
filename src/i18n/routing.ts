import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['ua', 'ru'],
  defaultLocale: 'ua',
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
