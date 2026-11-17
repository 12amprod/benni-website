import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { galleryGroups } from "#/content/galleries";
import { site } from "#/content/site";

/**
 * The site's chrome, all of it: the wordmark, one line saying whose work this is, and the
 * list of galleries.
 *
 * From `lg` up it is a fixed column down the left edge and the pictures take everything
 * to its right — the layout of a photographer's portfolio rather than of a website, where
 * the navigation is a legend beside the work instead of a bar on top of it. Below `lg`
 * there is no room for a column, so it folds into a bar with the wordmark and a menu.
 */
export function SiteSidebar() {
	const [menuOpen, setMenuOpen] = useState(false);

	// The menu covers the viewport, so the page behind it must not scroll along.
	useEffect(() => {
		if (!menuOpen) return;
		const { documentElement } = document;
		documentElement.style.overflow = "hidden";
		return () => {
			documentElement.style.overflow = "";
		};
	}, [menuOpen]);

	const close = () => setMenuOpen(false);

	return (
		<header className="sticky top-0 z-40 lg:static">
			{/* Phone and tablet: the bar. */}
			<div className="flex h-header items-center justify-between bg-canvas/90 px-4 backdrop-blur-xl sm:px-6 lg:hidden">
				<Wordmark onClick={close} />
				<button
					type="button"
					aria-expanded={menuOpen}
					aria-controls="menue"
					onClick={() => setMenuOpen((open) => !open)}
					className="-mr-2 flex size-10 items-center justify-center"
				>
					<span className="sr-only">{menuOpen ? site.menu.close : site.menu.open}</span>
					<span aria-hidden="true" className="relative block size-4">
						<span
							className={`absolute left-0 block h-px w-4 bg-ink motion-safe:transition-transform motion-safe:duration-300 ${
								menuOpen ? "top-2 rotate-45" : "top-1"
							}`}
						/>
						<span
							className={`absolute left-0 block h-px w-4 bg-ink motion-safe:transition-transform motion-safe:duration-300 ${
								menuOpen ? "top-2 -rotate-45" : "top-3"
							}`}
						/>
					</span>
				</button>
			</div>

			<div
				id="menue"
				hidden={!menuOpen}
				className="fixed inset-x-0 top-header bottom-0 overflow-y-auto bg-canvas px-4 pt-6 pb-10 sm:px-6 lg:hidden"
			>
				<Navigation size="large" onNavigate={close} />
			</div>

			{/* Desktop: the column. */}
			<div className="fixed inset-y-0 left-0 hidden w-sidebar flex-col overflow-y-auto px-10 py-12 lg:flex">
				<Wordmark />
				<p className="label mt-5 text-ink-muted">
					{site.tagline.map((line) => (
						<span key={line} className="block">
							{line}
						</span>
					))}
				</p>
				<div className="mt-14">
					<Navigation size="small" />
				</div>
			</div>
		</header>
	);
}

function Wordmark({ onClick }: { onClick?: () => void }) {
	return (
		<Link
			to="/"
			onClick={onClick}
			className="font-display text-2xl tracking-brand transition-opacity duration-300 hover:opacity-70"
		>
			{site.name}
		</Link>
	);
}

type NavigationProps = {
	size: "small" | "large";
	onNavigate?: () => void;
};

/**
 * The galleries in their groups, then the way to Tim's Instagram. The active page is the
 * one item at full ink; every other item sits back until it is pointed at.
 *
 * A gallery the CMS holds nothing for is not listed. Read from the archive the build baked
 * in, so the sidebar and the pages always agree.
 */
const navGroups = site.nav
	.map((group) => group.filter((entry) => galleryGroups(entry.gallery).length > 0))
	.filter((group) => group.length > 0);

function Navigation({ size, onNavigate }: NavigationProps) {
	const item =
		size === "small"
			? "font-display text-sm leading-7"
			: "font-display text-2xl leading-tight tracking-brand";
	const gap = size === "small" ? "mt-6" : "mt-8";

	return (
		<nav aria-label="Hauptnavigation">
			{navGroups.map((group, i) => (
				<ul key={group.map((entry) => entry.to).join()} className={i > 0 ? gap : undefined}>
					{group.map((entry) => (
						<li key={entry.to} className={size === "large" ? "py-1.5" : undefined}>
							<Link
								to={entry.to}
								activeOptions={{ exact: true }}
								onClick={onNavigate}
								className={`${item} text-ink-muted transition-colors duration-300 hover:text-ink data-[status=active]:text-ink`}
							>
								{entry.label}
							</Link>
						</li>
					))}
				</ul>
			))}
			<p className={gap}>
				<a
					href={site.author.url}
					target="_blank"
					rel="noreferrer"
					onClick={onNavigate}
					className="label text-ink-muted transition-colors duration-300 hover:text-ink"
				>
					{site.author.handle} ↗
				</a>
			</p>
		</nav>
	);
}
