import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { site } from "#/content/site";
import { renderWithRouter } from "#/test/render";
import { SiteFooter } from "./SiteFooter";

describe("SiteFooter", () => {
	it("renders the site name with the current year", async () => {
		renderWithRouter(<SiteFooter />);
		const year = String(new Date().getFullYear());
		expect(await screen.findByText(`© ${year} ${site.name}`)).toBeInTheDocument();
	});

	it("links the contact e-mail address", async () => {
		renderWithRouter(<SiteFooter />);
		expect(await screen.findByRole("link", { name: site.email })).toHaveAttribute(
			"href",
			`mailto:${site.email}`,
		);
	});
});
