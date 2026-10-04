import { PanelLink, type PanelLinkTarget } from "#/components/PanelLink";
import type { SectionId } from "#/content/site";
import { metaAttrs, sectionMeta } from "#/lib/section-meta";

type ShowcasePanelProps = {
	id: SectionId;
	eyebrow?: string;
	title: string;
	/** Set small and flush right under the title, the way "white pony" sits under "deftones". */
	edition?: string;
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
 * One full-bleed photograph, a scrim dark enough to read against, and the type set along
 * the bottom-left edge of the frame the way a caption sits on a contact sheet — never
 * centred, so the photograph keeps its own subject.
 */
export function ShowcasePanel({
	id,
	eyebrow,
	title,
	edition,
	subtitle,
	body,
	links,
	image,
	imageAlt,
	lead = false,
}: ShowcasePanelProps) {
	const meta = sectionMeta(id);

	return (
		<section
			id={lead ? undefined : id}
			{...metaAttrs(id)}
			className={`relative isolate flex overflow-clip border-hairline border-t ${
				lead ? "min-h-svh items-end pt-header pb-28" : "items-center py-36 sm:py-48"
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
				className="plate -z-10 absolute inset-0 size-full scroll-zoom object-cover"
			/>
			{/* Night photos are dark but not evenly dark — the scrim is what makes the type
			    legible. Heavier than it was: in black and white the highlights in these
			    frames are the brightest thing on the page, and type has to sit on top of
			    the picture rather than fight it. */}
			<div className="-z-10 absolute inset-0 bg-gradient-to-b from-canvas/80 via-canvas/55 to-canvas" />

			<div className="mx-auto w-full max-w-6xl px-5 sm:px-6">
				<div
					className={
						lead
							? "hero-enter hero-exit"
							: "reveal mask-reveal max-w-2xl border-hairline border-t pt-5"
					}
				>
					{/* The lead panel is the wordmark and nothing else above it — its number is
					    already in the metadata line, and the entrance below counts children. */}
					{lead ? null : (
						<p className="flex items-baseline gap-x-4">
							<span className="label text-ink/35">{meta.number}</span>
							<span className="label text-ink-muted">{eyebrow ?? meta.type}</span>
						</p>
					)}

					{/* `w-fit` shrinks the block to the word, so `edition` can sit flush with its right edge. */}
					<div className={`w-fit ${lead ? "" : "mt-8"}`}>
						{lead ? (
							// The inner span is what slides; the wrapper clips it, so the wordmark
							// wipes up from behind its own edge instead of merely fading in.
							<h1 className="font-normal text-brand tracking-brand">
								<span className="mask-line">
									<span>{title}</span>
								</span>
							</h1>
						) : (
							<h2 className="font-normal text-section tracking-brand">
								<span className="mask-line">
									<span>{title}</span>
								</span>
							</h2>
						)}
						{edition ? (
							<p className="hero-edition -mt-1 text-right font-display text-lg sm:text-xl">
								{edition}
							</p>
						) : null}
					</div>

					<p className="mt-7 max-w-md text-base leading-relaxed sm:text-lg">{subtitle}</p>
					{body ? (
						<p className="mt-3 max-w-md text-ink-muted text-sm leading-relaxed">{body}</p>
					) : null}
					{links?.length ? (
						<div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
							{links.map((link) => (
								<PanelLink key={link.label} {...link} />
							))}
						</div>
					) : null}
				</div>
			</div>
		</section>
	);
}
