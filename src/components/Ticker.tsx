import { site } from "#/content/site";

/**
 * A strip that keeps moving on its own, between the vol.4 panel and the tiles.
 * Everything else on the page waits for a scroll; this is the one element that
 * says the page is alive before the visitor has done anything.
 *
 * The words are duplicated once and the track travels exactly -50%, so the loop
 * closes on itself with no visible seam. It stops on hover and on keyboard
 * focus, and does not run at all under reduced motion.
 */
export function Ticker() {
	const words = site.ticker;

	return (
		<div className="ticker overflow-clip border-hairline border-y bg-surface py-3">
			<div className="ticker-track" aria-hidden="true">
				{[0, 1].map((copy) => (
					<div key={copy} className="flex shrink-0">
						{words.map((word) => (
							<span
								key={`${copy}-${word}`}
								className="flex shrink-0 items-center gap-6 whitespace-nowrap px-6 font-display text-ink-muted text-sm"
							>
								{word}
								<span className="text-relapse">●</span>
							</span>
						))}
					</div>
				))}
			</div>
			{/* The loop above is decorative repetition; this is the readable copy. */}
			<p className="sr-only">{words.join(" · ")}</p>
		</div>
	);
}
