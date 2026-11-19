import { type TouchEvent, useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { flushSync } from "react-dom";
import type { ArchivePhoto, ArchiveWork } from "#/content/archive";
import { site } from "#/content/site";
import { settleFrame, transition } from "#/lib/motion";
import { frameOf, preloadWhole, wholeSizes } from "./Frame";

export type LightboxEntry = { photo: ArchivePhoto; work: ArchiveWork };

type LightboxProps = {
	entries: readonly LightboxEntry[];
	/** Which entry is shown, or `null` while closed. */
	index: number | null;
	onIndexChange: (index: number | null) => void;
};

const pad = (n: number) => String(n).padStart(2, "0");

/** How far a finger travels before a touch counts as a swipe, in CSS pixels. */
const SWIPE = 48;

/**
 * The box the picture is drawn in, known before it has loaded: as wide as the stage allows
 * unless the stage's height runs out first. Without it the picture would be 0×0 until it
 * arrived, and the frame growing out of the grid would grow into nothing. Frames from the
 * local archive carry no size and fall back to the browser's own sizing.
 */
function shapeOf(photo: ArchivePhoto) {
	if (!photo.width || !photo.height) return undefined;
	const ratio = photo.width / photo.height;
	return {
		aspectRatio: `${photo.width} / ${photo.height}`,
		width: `min(100cqw, ${(ratio * 100).toFixed(3)}cqh)`,
	};
}

/**
 * The enlarged view: one photograph, whole and uncropped, as large as the screen allows,
 * with the work it belongs to named underneath and a way back to the original post.
 *
 * A native `<dialog>` opened with `showModal()`, which brings focus trapping, the inert
 * page behind it and Escape-to-close with it — none of it rebuilt here. The arrow keys, the
 * two halves of the picture and a swipe step through every enlargeable frame on the page,
 * wrapping at either end; a swipe down closes it.
 *
 * The photograph grows out of its frame in the grid and shrinks back into it on the way
 * out — the zoom of the iPhone's Photos app — as a view transition named `photo` (see
 * `src/styles.css`). Stepping crossfades from one picture to the next in the same way.
 */
export function Lightbox({ entries, index, onIndexChange }: LightboxProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const touchStart = useRef<{ x: number; y: number } | null>(null);
	const entry = index === null ? undefined : entries[index];

	// A layout effect, so the dialog is open — or shut — by the time a view transition
	// captures the page after the update. A passive effect would run a frame too late.
	//
	// Focus goes to the dialog itself, not to its first button: Safari rings a button that
	// is focused on opening even after a tap, which would put a green frame round „Schließen“
	// every time a photograph opens. A screen reader still announces the dialog by its label,
	// and Tab reaches the close button from there.
	useLayoutEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;
		if (entry && !dialog.open) {
			dialog.showModal();
			dialog.focus();
		}
		if (!entry && dialog.open) dialog.close();
	}, [entry]);

	const show = useCallback(
		(next: number) => transition("step", () => flushSync(() => onIndexChange(next))),
		[onIndexChange],
	);

	/*
	 * Back into the grid. The frame showing this photograph is brought on screen behind the
	 * dialog first — the arrows may have walked far from where the visitor came in — and the
	 * photograph then shrinks into it.
	 */
	const close = useCallback(() => {
		const frame = entry && frameOf(entry.photo);
		if (frame) {
			frame.scrollIntoView({ block: "nearest" });
			settleFrame(frame);
		}
		transition("photo", () => {
			flushSync(() => onIndexChange(null));
			frame?.style.setProperty("view-transition-name", "photo");
		}).then(() => frame?.style.removeProperty("view-transition-name"));
	}, [entry, onIndexChange]);

	useEffect(() => {
		if (index === null) return;
		const onKey = (event: KeyboardEvent) => {
			if (event.key === "ArrowLeft") show((index - 1 + entries.length) % entries.length);
			if (event.key === "ArrowRight") show((index + 1) % entries.length);
		};
		document.addEventListener("keydown", onKey);

		// The neighbours are fetched now, so stepping to one shows it at once.
		for (const by of [-1, 1]) {
			const next = entries[(index + by + entries.length) % entries.length];
			if (next) preloadWhole(next.photo);
		}

		return () => document.removeEventListener("keydown", onKey);
	}, [index, entries, show]);

	const step = (by: number) => {
		if (index !== null) show((index + by + entries.length) % entries.length);
	};

	const onTouchStart = (event: TouchEvent) => {
		const touch = event.touches[0];
		touchStart.current =
			event.touches.length === 1 && touch ? { x: touch.clientX, y: touch.clientY } : null;
	};
	const onTouchEnd = (event: TouchEvent) => {
		const start = touchStart.current;
		const touch = event.changedTouches[0];
		touchStart.current = null;
		// A pinch-zoomed screen is being looked at closely, not swiped through.
		if (!start || !touch || (window.visualViewport?.scale ?? 1) > 1) return;
		const dx = touch.clientX - start.x;
		const dy = touch.clientY - start.y;
		if (Math.abs(dx) > SWIPE && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
		else if (dy > SWIPE * 2 && dy > Math.abs(dx)) close();
	};

	const shape = entry && shapeOf(entry.photo);

	return (
		<dialog
			ref={dialogRef}
			// Escape shrinks the photograph back into the grid, like the close button, rather
			// than letting the dialog vanish.
			onCancel={(event) => {
				event.preventDefault();
				close();
			}}
			onClose={() => onIndexChange(null)}
			aria-label={entry?.work.title}
			tabIndex={-1}
			className="m-0 size-full max-h-none max-w-none overscroll-none border-0 bg-canvas p-0 text-ink outline-none transition-opacity duration-300 ease-ui backdrop:bg-canvas starting:opacity-0 motion-reduce:transition-none"
		>
			{entry && index !== null ? (
				<div className="flex h-full flex-col">
					<div className="flex items-center justify-between px-4 py-1.5 sm:px-6">
						<p className="label text-ink-muted">
							{pad(index + 1)} / {pad(entries.length)}
						</p>
						<button
							type="button"
							onClick={close}
							className="label -mr-3 inline-flex min-h-11 items-center px-3 text-ink-muted transition-colors duration-300 hover:text-ink"
						>
							{site.lightbox.close} ✕
						</button>
					</div>

					<div
						onTouchStart={onTouchStart}
						onTouchEnd={onTouchEnd}
						className="relative flex min-h-0 flex-1 items-center justify-center px-4 @container-size sm:px-16"
					>
						<img
							key={entry.photo.full}
							src={entry.photo.full}
							srcSet={entry.photo.fullSrcSet}
							sizes={entry.photo.fullSrcSet ? wholeSizes(entry.photo) : undefined}
							alt={entry.photo.alt}
							width={entry.photo.width}
							height={entry.photo.height}
							style={{ viewTransitionName: "photo", ...shape }}
							className={shape ? undefined : "max-h-full max-w-full object-contain"}
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

					<div className="label flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-1.5 sm:px-6">
						<span className="text-ink">{entry.work.title}</span>
						<span className="text-ink-muted">{entry.work.meta}</span>
						<span className="text-ink-muted">{entry.work.date}</span>
						<a
							href={entry.work.url}
							target="_blank"
							rel="noreferrer"
							className="ml-auto inline-flex min-h-11 items-center text-ink-muted transition-colors duration-300 hover:text-ink"
						>
							{site.lightbox.source} ↗
						</a>
					</div>
				</div>
			) : null}
		</dialog>
	);
}
