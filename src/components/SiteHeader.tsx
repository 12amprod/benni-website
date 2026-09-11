import { Link } from "@tanstack/react-router";
import { site } from "#/content/site";

export function SiteHeader() {
	return (
		<header className="border-neutral-200 border-b">
			<nav
				aria-label="Hauptnavigation"
				className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4"
			>
				<Link to="/" className="font-semibold tracking-tight">
					{site.name}
				</Link>
				<ul className="flex gap-6 text-sm">
					{site.nav.map((item) => (
						<li key={item.to}>
							<Link
								to={item.to}
								className="hover:underline"
								activeProps={{ className: "underline" }}
								activeOptions={{ exact: true }}
							>
								{item.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
