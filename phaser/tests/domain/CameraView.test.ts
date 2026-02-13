import { describe, expect, it } from "vitest";
import { CameraView } from "#phaser/domain/CameraView";
import { Rectangle } from "#phaser/domain/Rectangle";

describe("CameraView", () => {
	it("should compute zoom to fit wide world in narrow viewport", () => {
		const worldBounds = Rectangle.create({
			position: { x: 0, y: 0 },
			width: 2000,
			height: 500,
		});
		const view = CameraView.fitToWorldBounds({
			viewportWidth: 800,
			viewportHeight: 600,
			worldBounds,
			padding: 0,
		});

		expect(view.zoom).toBe(0.4);
	});

	it("should compute zoom to fit tall world in short viewport", () => {
		const worldBounds = Rectangle.create({
			position: { x: 0, y: 0 },
			width: 500,
			height: 2000,
		});
		const view = CameraView.fitToWorldBounds({
			viewportWidth: 800,
			viewportHeight: 600,
			worldBounds,
			padding: 0,
		});

		expect(view.zoom).toBe(0.3);
	});

	it("should center on world bounds center", () => {
		const worldBounds = Rectangle.create({
			position: { x: 100, y: 200 },
			width: 400,
			height: 300,
		});
		const view = CameraView.fitToWorldBounds({
			viewportWidth: 800,
			viewportHeight: 600,
			worldBounds,
			padding: 0,
		});

		expect(view.center.x).toBe(300);
		expect(view.center.y).toBe(350);
	});

	it("should account for padding in zoom calculation", () => {
		const worldBounds = Rectangle.create({
			position: { x: 0, y: 0 },
			width: 1000,
			height: 500,
		});
		const view = CameraView.fitToWorldBounds({
			viewportWidth: 800,
			viewportHeight: 600,
			worldBounds,
			padding: 100,
		});

		expect(view.zoom).toBe(800 / 1200);
	});

	it("should center on padded bounds center", () => {
		const worldBounds = Rectangle.create({
			position: { x: 0, y: 0 },
			width: 1000,
			height: 500,
		});
		const view = CameraView.fitToWorldBounds({
			viewportWidth: 800,
			viewportHeight: 600,
			worldBounds,
			padding: 100,
		});

		expect(view.center.x).toBe(500);
		expect(view.center.y).toBe(250);
	});
});
