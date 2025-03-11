import { appConfig } from "config/app";
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
	locales: [...appConfig.locales],
	defaultLocale: appConfig.defaultLocale,
});

export const { Link, redirect, usePathname, useRouter } =
	createNavigation(routing);
