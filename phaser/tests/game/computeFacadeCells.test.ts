import { describe, expect, it } from "vitest";
import { computeFacadeCells } from "#phaser/game/components/computeFacadeCells";

describe("computeFacadeCells", () => {
	it("should return no facade cells when hotel has no rooms", () => {
		const occupiedCells = new Set<string>();

		const facadeCells = computeFacadeCells(occupiedCells);

		expect(facadeCells).toEqual([]);
	});

	it("should return facade cells adjacent to a single room", () => {
		const occupiedCells = new Set(["0,1"]);

		const facadeCells = computeFacadeCells(occupiedCells);

		expect(facadeCells).toContainEqual(
			expect.objectContaining({ gridX: 1, gridY: 1 }),
		);
		expect(facadeCells).toContainEqual(
			expect.objectContaining({ gridX: -1, gridY: 1 }),
		);
		expect(facadeCells).toContainEqual(
			expect.objectContaining({ gridX: 0, gridY: 2 }),
		);
		expect(facadeCells).toContainEqual(
			expect.objectContaining({ gridX: 0, gridY: 0 }),
		);
	});

	it("should not return facade cells that are occupied by rooms", () => {
		const occupiedCells = new Set(["0,1", "1,1"]);

		const facadeCells = computeFacadeCells(occupiedCells);

		const facadePositions = facadeCells.map(
			(cell) => `${cell.gridX},${cell.gridY}`,
		);
		expect(facadePositions).not.toContain("0,1");
		expect(facadePositions).not.toContain("1,1");
	});

	it("should set hasRoomToRight when right neighbor is occupied", () => {
		const occupiedCells = new Set(["1,1"]);

		const facadeCells = computeFacadeCells(occupiedCells);

		const leftCell = facadeCells.find(
			(cell) => cell.gridX === 0 && cell.gridY === 1,
		);
		expect(leftCell).toBeDefined();
		expect(leftCell?.hasRoomToRight).toBe(true);
		expect(leftCell?.hasRoomToLeft).toBe(false);
	});

	it("should set hasRoomToLeft when left neighbor is occupied", () => {
		const occupiedCells = new Set(["0,1"]);

		const facadeCells = computeFacadeCells(occupiedCells);

		const rightCell = facadeCells.find(
			(cell) => cell.gridX === 1 && cell.gridY === 1,
		);
		expect(rightCell).toBeDefined();
		expect(rightCell?.hasRoomToLeft).toBe(true);
		expect(rightCell?.hasRoomToRight).toBe(false);
	});

	it("should set hasRoomAbove when top neighbor is occupied", () => {
		const occupiedCells = new Set(["0,2"]);

		const facadeCells = computeFacadeCells(occupiedCells);

		const belowCell = facadeCells.find(
			(cell) => cell.gridX === 0 && cell.gridY === 1,
		);
		expect(belowCell).toBeDefined();
		expect(belowCell?.hasRoomAbove).toBe(true);
	});

	it("should set hasRoomBelow when bottom neighbor is occupied", () => {
		const occupiedCells = new Set(["0,1"]);

		const facadeCells = computeFacadeCells(occupiedCells);

		const aboveCell = facadeCells.find(
			(cell) => cell.gridX === 0 && cell.gridY === 2,
		);
		expect(aboveCell).toBeDefined();
		expect(aboveCell?.hasRoomBelow).toBe(true);
	});

	it("should not duplicate facade cells shared between two rooms", () => {
		const occupiedCells = new Set(["0,1", "2,1"]);

		const facadeCells = computeFacadeCells(occupiedCells);

		const cellAt1_1 = facadeCells.filter(
			(cell) => cell.gridX === 1 && cell.gridY === 1,
		);
		expect(cellAt1_1).toHaveLength(1);
		expect(cellAt1_1[0]?.hasRoomToLeft).toBe(true);
		expect(cellAt1_1[0]?.hasRoomToRight).toBe(true);
	});
});
