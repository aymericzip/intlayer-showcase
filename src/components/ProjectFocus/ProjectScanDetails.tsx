import { Container } from "@intlayer/design-system";
import type { FC } from "react";
import { useIntlayer } from "react-intlayer";
import type { Project } from "@/server/projectActions/types";
import { AnalyzerPageResults } from "../Scanner/Analyzer/Results/AnalyzerPageResults";
import { RobotsSection } from "../Scanner/Analyzer/Results/RobotsSection";
import { SitemapSection } from "../Scanner/Analyzer/Results/SitemapSection";
import type { MergedData } from "../Scanner/Analyzer/Results/types";

interface ProjectScanDetailsProps {
	project: Project;
}

export const ProjectScanDetails: FC<ProjectScanDetailsProps> = ({
	project,
}) => {
	const content = useIntlayer("project-scan-details");
	const scan = project.scanDetails;

	// Map project scanDetails to MergedData expected by Scanner components
	const url = project.websiteUrl;
	const mergedData: MergedData = {
		[`url_htmlLang\\${url}`]: {
			status: scan?.langTag ? "success" : "error",
			data: { successDetails: scan?.langTag || null },
		},
		[`url_htmlDir\\${url}`]: {
			status: "success",
			data: { successDetails: scan?.htmlDir || "ltr" },
		},
		[`url_hreflang\\${url}`]: {
			status: scan?.hreflangs?.length ? "success" : "error",
			data: { successDetails: scan?.hreflangs || [] },
		},
		[`url_hasXDefault\\${url}`]: {
			status: scan?.hasXDefault ? "success" : "error",
		},
		[`url_hasCanonical\\${url}`]: {
			status: scan?.hasCanonical ? "success" : "error",
		},
		[`url_hasLocalizedLinks\\${url}`]: {
			status: scan?.hasLocalizedLinks ? "success" : "error",
		},
		robots_robotsPresent: {
			status: scan?.robotsTxt?.accessible ? "success" : "error",
		},
		robots_noLocalizedUrlsForgotten: {
			status: scan?.robotsTxt?.disallowWithoutLocaleAlternates
				? "success"
				: "error",
		},
		sitemap_sitemapPresent: {
			status: scan?.sitemapXml?.urlsDiscoveredCount ? "success" : "error",
		},
		sitemap_noLocalizedUrlsForgotten: {
			status: scan?.sitemapXml?.alternatesPresent ? "success" : "error",
		},
		sitemap_hasXDefault: {
			status: scan?.sitemapXml?.xDefaultPresent ? "success" : "error",
		},
	};

	return (
		<div className="space-y-6">
			<div className="flex flex-col gap-1">
				<h2 className="text-xl font-bold text-text">{content.seoHeader}</h2>
				<p className="text-neutral text-sm">{content.seoDescription}</p>
			</div>
			<Container
				className="shadow-lg"
				roundedSize="3xl"
				padding="lg"
				transparency="lg"
			>
				<AnalyzerPageResults data={mergedData} url={url} />

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 border-t border-dashed border-neutral/20 pt-8">
					<div>
						<RobotsSection data={mergedData} />
					</div>
					<div>
						<SitemapSection data={mergedData} />
					</div>
				</div>
			</Container>
		</div>
	);
};
