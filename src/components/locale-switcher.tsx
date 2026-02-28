import { useLocation } from "@tanstack/react-router";
import {
	getLocaleName,
	getPathWithoutLocale,
	getPrefix,
	Locales,
} from "intlayer";
import type { FC } from "react";
import { useLocale } from "react-intlayer";

import { LocalizedLink, type To } from "./localized-link";

export const LocaleSwitcher: FC = () => {
	const { pathname } = useLocation();
	const { availableLocales, locale, setLocale } = useLocale();

	const pathWithoutLocale = getPathWithoutLocale(pathname);

	return (
		<ol className="flex list-none flex-wrap gap-2 p-0">
			{availableLocales.map((localeEl) => (
				<li key={localeEl}>
					<LocalizedLink
						aria-current={localeEl === locale ? "page" : undefined}
						onClick={() => setLocale(localeEl)}
						params={{ locale: getPrefix(localeEl).localePrefix }}
						to={pathWithoutLocale as To}
						className={`rounded-full border px-3 py-1 text-xs font-semibold no-underline transition hover:-translate-y-0.5 ${
							localeEl === locale
								? "border-[rgba(50,143,151,0.6)] bg-[rgba(79,184,178,0.24)] text-[var(--lagoon-deep)]"
								: "border-[rgba(23,58,64,0.2)] bg-white/40 text-[var(--sea-ink-soft)] hover:border-[rgba(23,58,64,0.35)] hover:text-[var(--sea-ink)]"
						}`}
					>
						<span className="sr-only">
							{/* Language in current Locale */}
							{getLocaleName(localeEl, locale)}
						</span>
						<span dir="ltr" lang={Locales.ENGLISH} aria-hidden>
							{/* Language shorthand — e.g. EN */}
							{getLocaleName(localeEl, Locales.ENGLISH)}
						</span>
					</LocalizedLink>
				</li>
			))}
		</ol>
	);
};

export default LocaleSwitcher;
