import { site } from "#/content/site";

/** The closing call to action: the two ways to reach RELAPSE, nothing else. */
export function ContactPanel() {
	const { eyebrow, title, body } = site.contact;

	return (
		<section id="kontakt" className="bg-surface px-5 py-20 sm:px-6 sm:py-28">
			<div className="reveal mx-auto max-w-2xl text-center">
				<p className="font-display font-bold text-relapse text-sm tracking-wide">{eyebrow}</p>
				<h2 className="mt-3 font-bold text-4xl sm:text-5xl">{title}</h2>
				<p className="mt-4 text-ink-muted">{body}</p>

				<div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
					<a
						href={site.instagram.url}
						target="_blank"
						rel="noreferrer"
						className="w-full rounded-full bg-relapse px-6 py-3 font-display font-bold text-canvas transition-opacity hover:opacity-85 sm:w-auto"
					>
						{site.instagram.handle}
					</a>
					<a
						href={`mailto:${site.email}`}
						className="w-full rounded-full border border-hairline px-6 py-3 font-display font-bold transition-colors hover:border-ink sm:w-auto"
					>
						{site.email}
					</a>
				</div>
			</div>
		</section>
	);
}
