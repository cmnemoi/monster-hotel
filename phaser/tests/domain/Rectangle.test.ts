import { describe, expect, it } from "vitest";
import { Rectangle } from "#phaser/domain/Rectangle";

describe("Rectangle", () => {
	it("should create a rectangle with position, width and height", () => {
		const rectangle = Rectangle.create({ x: 10, y: 20 }, 100, 50);

		expect(rectangle.position).toEqual({ x: 10, y: 20 });
		expect(rectangle.width).toBe(100);
		expect(rectangle.height).toBe(50);
	});

	it("should compute center position", () => {
		const rectangle = Rectangle.create({ x: 0, y: 0 }, 200, 100);

		expect(rectangle.center).toEqual({ x: 100, y: 50 });
	});

	it("should compute center for offset rectangle", () => {
		const rectangle = Rectangle.create({ x: 10, y: 20 }, 100, 50);

		expect(rectangle.center).toEqual({ x: 60, y: 45 });
	});

	it("should compute union of two rectangles", () => {
		const a = Rectangle.create({ x: 0, y: 0 }, 100, 50);
		const b = Rectangle.create({ x: 50, y: 25 }, 100, 50);

		const union = a.union(b);

		expect(union.position).toEqual({ x: 0, y: 0 });
		expect(union.width).toBe(150);
		expect(union.height).toBe(75);
	});

	it("should compute union when other rectangle is fully contained", () => {
		const a = Rectangle.create({ x: 0, y: 0 }, 200, 100);
		const b = Rectangle.create({ x: 50, y: 25 }, 50, 25);

		const union = a.union(b);

		expect(union.position).toEqual({ x: 0, y: 0 });
		expect(union.width).toBe(200);
		expect(union.height).toBe(100);
	});

	it("should compute union with negative positions", () => {
		const a = Rectangle.create({ x: -100, y: -50 }, 100, 50);
		const b = Rectangle.create({ x: 0, y: 0 }, 100, 50);

		const union = a.union(b);

		expect(union.position).toEqual({ x: -100, y: -50 });
		expect(union.width).toBe(200);
		expect(union.height).toBe(100);
	});

	it("should expand by padding on all sides", () => {
		const rectangle = Rectangle.create({ x: 100, y: 100 }, 200, 100);

		const expanded = rectangle.expand(50);

		expect(expanded.position).toEqual({ x: 50, y: 50 });
		expect(expanded.width).toBe(300);
		expect(expanded.height).toBe(200);
	});

	it("should expand by zero and return same dimensions", () => {
		const rectangle = Rectangle.create({ x: 10, y: 20 }, 100, 50);

		const expanded = rectangle.expand(0);

		expect(expanded.position).toEqual({ x: 10, y: 20 });
		expect(expanded.width).toBe(100);
		expect(expanded.height).toBe(50);
	});
});
