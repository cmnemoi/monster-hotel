import { describe, expect, it } from "vitest";
import { CameraView } from "#phaser/domain/CameraView";
import { Rectangle } from "#phaser/domain/Rectangle";

describe("CameraView", () => {
	it("should compute zoom to fit wide world in narrow viewport", () => {
		const worldBounds = Rectangle.create({ x: 0, y: 0 }, 2000, 500);
		const view = CameraView.fitToWorldBounds(800, 600, worldBounds, 0);

		expect(view.zoom).toBeCloseTo(0.4);
	});

	it("should compute zoom to fit tall world in short viewport", () => {
		const worldBounds = Rectangle.create({ x: 0, y: 0 }, 500, 2000);
		const view = CameraView.fitToWorldBounds(800, 600, worldBounds, 0);

		expect(view.zoom).toBeCloseTo(0.3);
	});

	it("should center on world bounds center", () => {
		const worldBounds = Rectangle.create({ x: 100, y: 200 }, 400, 300);
		const view = CameraView.fitToWorldBounds(800, 600, worldBounds, 0);

		expect(view.center.x).toBeCloseTo(300);
		expect(view.center.y).toBeCloseTo(350);
	});

	it("should account for padding in zoom calculation", () => {
		const worldBounds = Rectangle.create({ x: 0, y: 0 }, 1000, 500);
		const view = CameraView.fitToWorldBounds(800, 600, worldBounds, 100);

		expect(view.zoom).toBeCloseTo(800 / 1200);
	});

	it("should center on padded bounds center", () => {
		const worldBounds = Rectangle.create({ x: 0, y: 0 }, 1000, 500);
		const view = CameraView.fitToWorldBounds(800, 600, worldBounds, 100);

		expect(view.center.x).toBeCloseTo(500);
		expect(view.center.y).toBeCloseTo(250);
	});
});
