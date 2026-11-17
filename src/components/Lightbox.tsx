import { useEffect, useRef } from "react";
import type { ArchivePhoto, ArchiveWork } from "#/content/archive";
import { site } from "#/content/site";

export type LightboxEntry = { photo: ArchivePhoto; work: ArchiveWork };

type LightboxProps = {
	entries: readonly LightboxEntry[];
	/** Which entry is shown, or `null` while closed. */
	index: number | null;
	onIndexChange: (index: number | null) => void;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The enlarged view: one photograph, whole and uncropped, as large as the screen allows,
 * with the work it belongs to named underneath and a way back to the original post.
 *
 * A native `<dialog>` opened with `showModal()`, which brings focus trapping, the inert
 * page behind it and Escape-to-close with it — none of it rebuilt here. The arrow keys and
 * the two halves of the picture step through every enlargeable frame on the page, wrapping
 * at either end.
 */
export function Lightbox({ entries, index, onIndexChange }: LightboxProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const entry = index === null ? undefined : entries[index];

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (entry && !dialog.open) dialog.showModal();
		if (!entry && dialog.open) dialog.close();
	}, [entry]);

	useEffect(() => {
		if (index === null) return;
		const step = (by: number) => onIndexChange((index + by + entries.length) % entries.length);
		const onKey = (event: KeyboardEvent) => {
			if (event.key === "ArrowLeft") step(-1);
			if (event.key === "ArrowRight") step(1);
		};
		document.addEventListener("keydown", onKey);

		// The neighbours are fetched now, so stepping to one shows it at once.
		for (const by of [-1, 1]) {
			const next = entries[(index + by + entries.length) % entries.length];
			if (next) new Image().src = next.photo.full;
		}

		return () => document.removeEventListener("keydown", onKey);
	}, [index, entries, onIndexChange]);

	const step = (by: number) => {
		if (index !== null) onIndexChange((index + by + entries.length) % entries.length);
	};

	return (
		<dialog
			ref={dialogRef}
			onClose={() => onIndexChange(null)}
			aria-label={entry?.work.title}
			className="m-0 size-full max-h-none max-w-none border-0 bg-canvas p-0 text-ink transition-opacity duration-300 ease-ui backdrop:bg-canvas starting:opacity-0 motion-reduce:transition-none"
		>
			{entry && index !== null ? (
				<div className="flex h-full flex-col">
					<div className="flex items-center justify-between px-4 py-3 sm:px-6">
						<p className="label text-ink-muted">
							{pad(index + 1)} / {pad(entries.length)}
						</p>
						<button
							type="button"
							// biome-ignore lint/a11y/noAutofocus: a modal moves focus into itself; the close button is the safe place to land.
							autoFocus
							onClick={() => onIndexChange(null)}
							className="label -mr-2 p-2 text-ink-muted transition-colors duration-300 hover:text-ink"
						>
							{site.lightbox.close} ✕
						</button>
					</div>

					<div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16">
						<img
							key={entry.photo.full}
							src={entry.photo.full}
							alt={entry.photo.alt}
							className="max-h-full max-w-full object-contain"
						/>
						{entries.length > 1 ? (
							<>
								<button
									type="button"
									onClick={() => step(-1)}
									className="group absolute inset-y-0 left-0 flex w-1/3 cursor-w-resize items-center justify-start px-4 sm:px-6"
								>
									<span className="sr-only">{site.lightbox.previous}</span>
									<span
										aria-hidden="true"
										className="label text-ink-muted transition-colors duration-300 group-hover:text-ink"
									>
										←
									</span>
								</button>
								<button
									type="button"
									onClick={() => step(1)}
									className="group absolute inset-y-0 right-0 flex w-1/3 cursor-e-resize items-center justify-end px-4 sm:px-6"
								>
									<span className="sr-only">{site.lightbox.next}</span>
									<span
										aria-hidden="true"
										className="label text-ink-muted transition-colors duration-300 group-hover:text-ink"
									>
										→
									</span>
								</button>
							</>
						) : null}
					</div>

					<div className="label flex flex-wrap items-baseline gap-x-4 gap-y-1 px-4 py-4 sm:px-6">
						<span className="text-ink">{entry.work.title}</span>
						<span className="text-ink-muted">{entry.work.meta}</span>
						<span className="text-ink-muted">{entry.work.date}</span>
						<a
							href={entry.work.url}
							target="_blank"
							rel="noreferrer"
							className="ml-auto text-ink-muted transition-colors duration-300 hover:text-ink"
						>
							{site.lightbox.source} ↗
						</a>
					</div>
				</div>
			) : null}
		</dialog>
	);
}
