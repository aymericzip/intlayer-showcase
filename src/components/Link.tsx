import { Link as UILink } from "@intlayer/design-system";
import { Link as TanStackLink } from "@tanstack/react-router";
import type { AnchorHTMLAttributes, FC, ReactNode } from "react";
import { useLocale } from "react-intlayer";

type LinkProps = {
	href: string;
	label?: string;
	children: ReactNode;
	isExternalLink?: boolean;
	color?: string;
	variant?: string;
	roundedSize?: string;
	isActive?: boolean;
	replace?: boolean;
	onClick?: () => void;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link: FC<LinkProps> = ({
	href,
	label,
	children,
	isExternalLink,
	isActive,
	replace,
	onClick,
	...props
}) => {
	const { locale } = useLocale();

	const isExternalLinkUrl = href.startsWith("http") ||
		href.startsWith("mailto") ||
		href.startsWith("tel");

	const isExternal = isExternalLink ?? isExternalLinkUrl;

	if (isExternalLinkUrl) {
		return (
			<UILink
				href={href}
				aria-label={label}
				target="_blank"
				rel="noopener noreferrer"
				isExternalLink={isExternal}
				onClick={onClick}
				{...(props as any)}
			>
				{children}
			</UILink>
		);
	}

	// For internal links, we prefix with the locale
	const localizedHref = `/${locale}${href === "/" ? "" : href}`;

	return (
		<TanStackLink
			to={localizedHref}
			aria-label={label}
			isActive={isActive}
			replace={replace}
			onClick={onClick}
			{...(props as any)}
		>
			{children}
		</TanStackLink>
	);
};
