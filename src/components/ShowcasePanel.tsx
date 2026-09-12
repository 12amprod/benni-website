import { PanelLink, type PanelLinkTarget } from "#/components/PanelLink";

type ShowcasePanelProps = {
	id?: string;
	eyebrow?: string;
	title: string;
	subtitle: string;
	body?: string;
	links?: readonly PanelLinkTarget[];
	image: string;
	imageAlt: string;
	/**
	 * The first panel on the page: fills the viewport and carries the `<h1>`. Its image is
	 * the largest thing above the fold, so it loads eagerly while every other one waits.
	 */
	lead?: boolean;
};

/**
 * Apple's product hero: one full-bleed photograph, a scrim dark enough to read against,
 * and centred type — eyebrow, headline, one line of promise, then the links.
 */
export function ShowcasePanel({
	id,
	eyebrow,
	title,
	subtitle,
	body,
	links,
	image,
	imageAlt,
	lead = false,
}: ShowcasePanelProps) {
	return (
		<section
			id={id}
			className={`relative isolate flex items-center justify-center overflow-hidden ${
				lead ? "min-h-svh py-24" : "py-28 sm:py-40"
			}`}
		>
			<img
				src={image}
				alt={imageAlt}
				width={1280}
				height={855}
				loading={lead ? "eager" : "lazy"}
				decoding="async"
				fetchPriority={lead ? "high" : "auto"}
				className="-z-10 absolute inset-0 size-full object-cover"
			/>
			{/* Night photos are dark but not evenly dark — the scrim is what makes the type legible. */}
			<div className="-z-10 absolute inset-0 bg-gradient-to-b from-canvas/80 via-canvas/45 to-canvas" />

			<div className="mx-auto max-w-3xl px-5 text-center sm:px-6">
				{eyebrow ? (
					<p className="font-display font-bold text-relapse text-sm tracking-wide">{eyebrow}</p>
				) : null}
				{lead ? (
					<h1 className="mt-3 font-bold text-6xl sm:text-8xl">{title}</h1>
				) : (
					<h2 className="mt-3 font-bold text-4xl sm:text-6xl">{title}</h2>
				)}
				<p className="mt-4 text-xl tracking-tight sm:text-2xl">{subtitle}</p>
				{body ? <p className="mt-3 text-base text-ink-muted">{body}</p> : null}
				{links?.length ? (
					<div className="mt-7 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
						{links.map((link) => (
							<PanelLink key={link.label} {...link} />
						))}
					</div>
				) : null}
			</div>
		</section>
	);
}
