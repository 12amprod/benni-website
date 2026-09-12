import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { site } from "#/content/site";

/**
 * Apple's global nav, rebuilt: a 48px bar that stays at the top, translucent with a
 * saturated blur so the photos behind it stay visible, 12px links with no underline, and
 * a full-height menu instead of the link row below `md`.
 */
export function SiteHeader() {
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

	return (
		<header className="sticky top-0 z-50">
			<div className="border-hairline/80 border-b bg-canvas/70 backdrop-blur-2xl backdrop-saturate-150">
				<nav
					aria-label="Hauptnavigation"
					className="mx-auto flex h-header max-w-6xl items-center gap-6 px-5 sm:px-6"
				>
					<Link
						to="/"
						onClick={() => setMenuOpen(false)}
						className="font-display text-base tracking-brand transition-opacity hover:opacity-70"
					>
						{site.name}
					</Link>

					<ul className="mx-auto hidden items-center gap-7 md:flex">
						{site.nav.map((item) => (
							<li key={item.hash}>
								<Link
									to={item.to}
									hash={item.hash}
									className="font-display text-ink/80 text-xs transition-colors hover:text-ink"
								>
									{item.label}
								</Link>
							</li>
						))}
					</ul>

					<a
						href={site.instagram.url}
						target="_blank"
						rel="noreferrer"
						className="hidden font-display text-ink/80 text-xs transition-colors hover:text-ink md:block"
					>
						Instagram
					</a>

					<button
						type="button"
						aria-expanded={menuOpen}
						aria-controls="hauptmenue"
						onClick={() => setMenuOpen((open) => !open)}
						className="ml-auto flex size-8 items-center justify-center md:hidden"
					>
						<span className="sr-only">{menuOpen ? "Menü schließen" : "Menü öffnen"}</span>
						<span aria-hidden="true" className="relative block size-4">
							<span
								className={`absolute left-0 block h-px w-4 bg-ink motion-safe:transition-all motion-safe:duration-300 ${
									menuOpen ? "top-2 rotate-45" : "top-1"
								}`}
							/>
							<span
								className={`absolute left-0 block h-px w-4 bg-ink motion-safe:transition-all motion-safe:duration-300 ${
									menuOpen ? "top-2 -rotate-45" : "top-2.5"
								}`}
							/>
						</span>
					</button>
				</nav>
			</div>

			<div
				id="hauptmenue"
				hidden={!menuOpen}
				className="fixed inset-x-0 top-header bottom-0 z-40 overflow-y-auto bg-canvas/95 backdrop-blur-2xl md:hidden"
			>
				<ul className="mx-auto max-w-6xl px-5 pt-2 pb-10">
					{site.nav.map((item) => (
						<li key={item.hash} className="border-hairline border-b">
							<Link
								to={item.to}
								hash={item.hash}
								onClick={() => setMenuOpen(false)}
								className="block py-4 font-display text-xl"
							>
								{item.label}
							</Link>
						</li>
					))}
					<li className="border-hairline border-b">
						<a
							href={site.instagram.url}
							target="_blank"
							rel="noreferrer"
							onClick={() => setMenuOpen(false)}
							className="block py-4 font-display text-xl"
						>
							Instagram
						</a>
					</li>
				</ul>
			</div>
		</header>
	);
}
