import { site } from "#/content/site";

/**
 * Every edition in order, newest first, as a ruled table: the number, the date in mono
 * figures, the title in display type, the place.
 *
 * The one row that has not happened yet is the single place on the site where the brand
 * green is spent. Everything else — every index, handle, date and label — is ink. An
 * accent used six times is a colour scheme; used once it is a signal, and the visitor's
 * eye goes straight to the only date that is still ahead of them.
 */
export function EditionTable() {
	return (
		<ul className="border-hairline border-t">
			{site.editions.entries.map((entry, i) => (
				<li
					key={entry.title}
					className="reveal flex flex-wrap items-baseline gap-x-5 gap-y-2 border-hairline border-b py-6 sm:gap-x-8"
				>
					<span className="label w-6 shrink-0 text-ink/35">{String(i + 1).padStart(2, "0")}</span>
					<span
						className={`label flex-1 sm:w-44 sm:flex-none ${
							entry.upcoming ? "text-relapse" : "text-ink-muted"
						}`}
					>
						{entry.dateLabel}
					</span>
					<h3 className="w-full min-w-0 font-normal text-entry tracking-brand sm:w-auto sm:flex-1">
						{entry.title}
					</h3>
					<p className="label w-full text-ink-muted sm:w-auto sm:text-right">
						{entry.venue} · {entry.note}
					</p>
				</li>
			))}
		</ul>
	);
}
