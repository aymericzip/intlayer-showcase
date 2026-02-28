import { type Dictionary, t } from "intlayer";

const appContent = {
	key: "app",
	content: {
		showcase: {
			title: t({
				en: "Showcase",
				fr: "Showcase",
				es: "Showcase",
			}),
			description: t({
				en: "Discover projects built with Intlayer",
				fr: "Découvrez des projets construits avec Intlayer",
				es: "Descubre proyectos construidos con Intlayer",
			}),
			submitButton: t({
				en: "Submit Your Project",
				fr: "Proposez votre projet",
				es: "Envía tu proyecto",
			}),
			searchPlaceholder: t({
				en: "Search projects...",
				fr: "Rechercher des projets...",
				es: "Buscar proyectos...",
			}),
			filters: {
				label: t({
					en: "Filters",
					fr: "Filtres",
					es: "Filtros",
				}),
				useCase: t({
					en: "Use Case",
					fr: "Cas d'utilisation",
					es: "Caso de uso",
				}),
				openSource: t({
					en: "Open Source",
					fr: "Open Source",
					es: "Código abierto",
				}),
			},
			stats: {
				showing: t({
					en: "Showing",
					fr: "Affichage de",
					es: "Mostrando",
				}),
				of: t({
					en: "of",
					fr: "sur",
					es: "de",
				}),
				projects: t({
					en: "projects",
					fr: "projets",
					es: "proyectos",
				}),
				page: t({
					en: "Page",
					fr: "Page",
					es: "Página",
				}),
			},
			pagination: {
				perPage: t({
					en: "Per page:",
					fr: "Par page :",
					es: "Por página:",
				}),
				prev: t({
					en: "Prev",
					fr: "Précédent",
					es: "Anterior",
				}),
				next: t({
					en: "Next",
					fr: "Suivant",
					es: "Siguiente",
				}),
			},
			noProjects: t({
				en: "No projects found. Be the first to submit!",
				fr: "Aucun projet trouvé. Soyez le premier à en proposer !",
				es: "No se encontraron proyectos. ¡Sé el primero en enviar uno!",
			}),
			upvote: {
				label: t({
					en: "Upvote",
					fr: "Voter pour",
					es: "Votar a favor",
				}),
			},
			downvote: {
				label: t({
					en: "Downvote",
					fr: "Voter contre",
					es: "Votar en contra",
				}),
			},
		},
		navbar: {
			home: t({
				en: "Home",
				fr: "Accueil",
				es: "Inicio",
			}),
			blog: t({
				en: "Blog",
				fr: "Blog",
				es: "Blog",
			}),
			about: t({
				en: "About",
				fr: "À propos",
				es: "Acerca de",
			}),
			docs: t({
				en: "Docs",
				fr: "Docs",
				es: "Docs",
			}),
		},
		// For SEO metadata
		metadata: {
			title: t({
				en: "Intlayer Showcase - Discover Intlayer Projects",
				fr: "Showcase Intlayer - Découvrez les projets Intlayer",
				es: "Showcase de Intlayer - Descubre proyectos Intlayer",
			}),
			description: t({
				en: "A collection of amazing projects built with Intlayer.",
				fr: "Une collection de projets incroyables construits avec Intlayer.",
				es: "Una colección de proyectos increíbles construidos con Intlayer.",
			}),
		},
	},
} satisfies Dictionary;

export default appContent;
