import { describe, expect, it } from "vitest";
import { HotelGrid } from "#phaser/domain/HotelGrid";

describe("HotelGrid", () => {
	it("should convert grid position (0,0) to world position (0,0)", () => {
		const grid = new HotelGrid({ roomWidth: 512, roomHeight: 256 });

		const worldPosition = grid.toWorldPosition({ x: 0, y: 0 });

		expect(worldPosition).toEqual({ x: 0, y: 0 });
	});

	it("should convert grid position (1,0) to world position (roomWidth, 0)", () => {
		const grid = new HotelGrid({ roomWidth: 512, roomHeight: 256 });

		const worldPosition = grid.toWorldPosition({ x: 1, y: 0 });

		expect(worldPosition).toEqual({ x: 512, y: 0 });
	});

	it("should convert grid position (0,1) to world position (0, -roomHeight)", () => {
		const grid = new HotelGrid({ roomWidth: 512, roomHeight: 256 });

		const worldPosition = grid.toWorldPosition({ x: 0, y: 1 });

		expect(worldPosition).toEqual({ x: 0, y: -256 });
	});

	it("should convert grid position (2,3) to world position", () => {
		const grid = new HotelGrid({ roomWidth: 512, roomHeight: 256 });

		const worldPosition = grid.toWorldPosition({ x: 2, y: 3 });

		expect(worldPosition).toEqual({ x: 1024, y: -768 });
	});

	it("should use injected room dimensions", () => {
		const grid = new HotelGrid({ roomWidth: 100, roomHeight: 50 });

		const worldPosition = grid.toWorldPosition({ x: 3, y: 2 });

		expect(worldPosition).toEqual({ x: 300, y: -100 });
	});

	it("should generate unique position keys", () => {
		const grid = new HotelGrid({ roomWidth: 512, roomHeight: 256 });

		const key1 = grid.toPositionKey({ x: 0, y: 0 });
		const key2 = grid.toPositionKey({ x: 1, y: 0 });
		const key3 = grid.toPositionKey({ x: 0, y: 1 });

		expect(key1).not.toBe(key2);
		expect(key1).not.toBe(key3);
		expect(key2).not.toBe(key3);
	});

	it("should generate deterministic position keys", () => {
		const grid = new HotelGrid({ roomWidth: 512, roomHeight: 256 });

		const key1 = grid.toPositionKey({ x: 2, y: 3 });
		const key2 = grid.toPositionKey({ x: 2, y: 3 });

		expect(key1).toBe(key2);
	});
});
