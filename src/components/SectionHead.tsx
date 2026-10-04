import type { SectionId } from "#/content/site";
import { sectionMeta } from "#/lib/section-meta";

type SectionHeadProps = {
	id: SectionId;
	title: string;
	body?: string;
};

/**
 * The head of every section: a hairline, the section's own number and kind set in mono
 * against it, then the heading arriving out of its own clipping box.
 *
 * Left-aligned rather than centred, and the same three elements every time. Repetition is
 * the point — once the eye has learned where the number sits, the page reads as a set of
 * numbered plates instead of a stack of unrelated blocks.
 *
 * The heading is set in the regular weight at the brand tracking, not bold: it is a label
 * on a plate, and the wordmark is the only type on the site that gets to shout.
 */
export function SectionHead({ id, title, body }: SectionHeadProps) {
	const meta = sectionMeta(id);

	return (
		<header className="border-hairline border-t pt-5">
			<p className="reveal flex items-baseline gap-x-4">
				<span className="label text-ink/35">{meta.number}</span>
				<span className="label text-ink-muted">{meta.type}</span>
			</p>

			<h2 className="reveal mask-reveal mt-8 font-normal text-section tracking-brand">
				<span className="mask-line">
					<span>{title}</span>
				</span>
			</h2>

			{body ? (
				<p className="reveal mt-5 max-w-sm text-ink-muted text-sm leading-relaxed">{body}</p>
			) : null}
		</header>
	);
}
