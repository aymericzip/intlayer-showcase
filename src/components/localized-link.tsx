import { Link, type LinkComponentProps } from "@tanstack/react-router";
import { getPrefix } from "intlayer";
import type { FC } from "react";
import { useLocale } from "react-intlayer";

export const LOCALE_ROUTE = "{-$locale}" as const;

// Type helpers for removing the locale param from route paths
export type RemoveLocaleParam<T> = T extends string
	? RemoveLocaleFromString<T>
	: T;

export type To = RemoveLocaleParam<LinkComponentProps["to"]>;

type CollapseDoubleSlashes<S extends string> =
	S extends `${infer H}//${infer T}` ? CollapseDoubleSlashes<`${H}/${T}`> : S;

type RemoveAll<
	S extends string,
	Sub extends string,
> = S extends `${infer H}${Sub}${infer T}` ? RemoveAll<`${H}${T}`, Sub> : S;

type RemoveLocaleFromString<S extends string> = CollapseDoubleSlashes<
	RemoveAll<S, typeof LOCALE_ROUTE>
>;

type LocalizedLinkProps = {
	to?: To;
} & Omit<LinkComponentProps, "to">;

/**
 * A locale-aware Link component.
 * Automatically injects the current locale prefix into the URL.
 */
export const LocalizedLink: FC<LocalizedLinkProps> = (props) => {
	const { locale } = useLocale();
	const { localePrefix } = getPrefix(locale);

	return (
		<Link
			{...props}
			params={{
				locale: localePrefix,
				...(typeof props?.params === "object" ? props?.params : {}),
			}}
			to={`/${LOCALE_ROUTE}${props.to}` as LinkComponentProps["to"]}
		/>
	);
};
