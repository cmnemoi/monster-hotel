import { describe, expect, it } from "vitest";
import { BackgroundTransform } from "#phaser/domain/BackgroundTransform";

describe("BackgroundTransform", () => {
	it("should scale to cover viewport width", () => {
		const transform = BackgroundTransform.fitToViewport(800, 400, 1000, 500, 1);

		expect(transform.scale).toBeCloseTo(0.8);
	});

	it("should scale to cover viewport height", () => {
		const transform = BackgroundTransform.fitToViewport(400, 400, 1000, 200, 1);

		expect(transform.scale).toBeCloseTo(2);
	});

	it("should center horizontally when image is wider than viewport", () => {
		const transform = BackgroundTransform.fitToViewport(400, 250, 1000, 500, 1);

		expect(transform.scale).toBeCloseTo(0.5);
		expect(transform.position.x).toBeCloseTo((400 - 1000 * 0.5) / 2);
	});

	it("should center vertically", () => {
		const transform = BackgroundTransform.fitToViewport(400, 250, 1000, 500, 1);

		expect(transform.position.y).toBeCloseTo((250 - 500 * 0.5) / 2);
	});

	it("should account for camera zoom in viewport calculation", () => {
		const transform = BackgroundTransform.fitToViewport(800, 600, 1000, 500, 2);

		expect(transform.scale).toBeCloseTo(0.6);
	});
});
