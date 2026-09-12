import { site } from "#/content/site";

/**
 * Every edition in order, newest first. Apple's spec tables are the model: hairlines,
 * generous rows, one accent for the thing that matters — here the next date.
 */
export function ScheduleList() {
	const { title, body, entries } = site.schedule;

	return (
		<section id="termine" className="bg-canvas px-5 py-20 sm:px-6 sm:py-28">
			<div className="mx-auto max-w-4xl">
				<div className="text-center">
					<h2 className="font-bold text-4xl sm:text-5xl">{title}</h2>
					<p className="mx-auto mt-3 max-w-xl text-ink-muted">{body}</p>
				</div>

				<ul className="mt-12 border-hairline border-t">
					{entries.map((entry) => (
						<li
							key={entry.title}
							className="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-hairline border-b py-6"
						>
							<p
								className={`w-full font-display font-bold text-sm tabular-nums sm:w-48 ${
									entry.upcoming ? "text-relapse" : "text-ink-muted"
								}`}
							>
								{entry.dateLabel}
							</p>
							<div className="min-w-0 flex-1">
								<h3 className="font-normal text-xl">{entry.title}</h3>
								<p className="mt-1 font-display text-ink-muted text-sm">
									{entry.venue} · {entry.note}
								</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
