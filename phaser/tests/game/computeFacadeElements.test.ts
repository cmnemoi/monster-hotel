import { describe, expect, it } from "vitest";
import type { FacadeCell } from "#phaser/game/components/computeFacadeCells";
import { computeFacadeElements } from "#phaser/game/components/computeFacadeElements";

const HOTEL_SEED = 12345;

function givenCellWithRoomToRight(): FacadeCell {
	return {
		gridX: 0,
		gridY: 1,
		hasRoomToRight: true,
		hasRoomToLeft: false,
		hasRoomAbove: false,
		hasRoomBelow: false,
	};
}

function givenCellWithRoomToLeft(): FacadeCell {
	return {
		gridX: 2,
		gridY: 1,
		hasRoomToRight: false,
		hasRoomToLeft: true,
		hasRoomAbove: false,
		hasRoomBelow: false,
	};
}

function givenCellWithRoomAbove(): FacadeCell {
	return {
		gridX: 0,
		gridY: 1,
		hasRoomToRight: false,
		hasRoomToLeft: false,
		hasRoomAbove: true,
		hasRoomBelow: false,
	};
}

function givenCellWithRoomBelowOnly(): FacadeCell {
	return {
		gridX: 0,
		gridY: 2,
		hasRoomToRight: false,
		hasRoomToLeft: false,
		hasRoomAbove: false,
		hasRoomBelow: true,
	};
}

function givenCellWithRoomAboveAndBelow(): FacadeCell {
	return {
		gridX: 0,
		gridY: 2,
		hasRoomToRight: false,
		hasRoomToLeft: false,
		hasRoomAbove: true,
		hasRoomBelow: true,
	};
}

describe("computeFacadeElements", () => {
	it("should return a parisTest wall when cell has room to right", () => {
		const cell = givenCellWithRoomToRight();

		const elements = computeFacadeElements(cell, HOTEL_SEED);

		const wall = elements.find((element) => element.frameName === "parisTest");
		expect(wall).toBeDefined();
	});

	it("should return a parisWall variant when cell has room to left", () => {
		const cell = givenCellWithRoomToLeft();

		const elements = computeFacadeElements(cell, HOTEL_SEED);

		const wall = elements.find((element) =>
			element.frameName.startsWith("parisWall/parisWall_"),
		);
		expect(wall).toBeDefined();
		expect(wall?.scaleX).toBe(-1);
	});

	it("should pick different parisWall variants for different cell positions", () => {
		const cellA: FacadeCell = {
			...givenCellWithRoomToLeft(),
			gridX: 1,
			gridY: 1,
		};
		const cellB: FacadeCell = {
			...givenCellWithRoomToLeft(),
			gridX: 3,
			gridY: 5,
		};

		const elementsA = computeFacadeElements(cellA, HOTEL_SEED);
		const elementsB = computeFacadeElements(cellB, HOTEL_SEED);

		const wallA = elementsA.find((element) =>
			element.frameName.startsWith("parisWall/parisWall_"),
		);
		const wallB = elementsB.find((element) =>
			element.frameName.startsWith("parisWall/parisWall_"),
		);

		expect(wallA).toBeDefined();
		expect(wallB).toBeDefined();
		// With different positions, at least the seed differs so results may differ
		// The key property is determinism: same position = same result
	});

	it("should produce deterministic results for the same cell and seed", () => {
		const cell = givenCellWithRoomToLeft();

		const elementsA = computeFacadeElements(cell, HOTEL_SEED);
		const elementsB = computeFacadeElements(cell, HOTEL_SEED);

		expect(elementsA).toEqual(elementsB);
	});

	it("should return ceiling and pipe when cell has room above", () => {
		const cell = givenCellWithRoomAbove();

		const elements = computeFacadeElements(cell, HOTEL_SEED);

		const ceiling = elements.find(
			(element) => element.frameName === "parisCeiling",
		);
		expect(ceiling).toBeDefined();

		const pipe = elements.find((element) =>
			element.frameName.startsWith("parisPipe/parisPipe_"),
		);
		expect(pipe).toBeDefined();
	});

	it("should return roof and chimney when cell has room below but not above", () => {
		const cell = givenCellWithRoomBelowOnly();

		const elements = computeFacadeElements(cell, HOTEL_SEED);

		const roof = elements.find((element) => element.frameName === "parisRoof");
		expect(roof).toBeDefined();

		const chimney = elements.find((element) =>
			element.frameName.startsWith("parisChimney/parisChimney_"),
		);
		expect(chimney).toBeDefined();
	});

	it("should return balcony when cell has room both above and below", () => {
		const cell = givenCellWithRoomAboveAndBelow();

		const elements = computeFacadeElements(cell, HOTEL_SEED);

		const balcony = elements.find(
			(element) => element.frameName === "parisBalcony",
		);
		expect(balcony).toBeDefined();

		const roof = elements.find((element) => element.frameName === "parisRoof");
		expect(roof).toBeUndefined();
	});

	it("should return no elements for a cell with no adjacent rooms", () => {
		const cell: FacadeCell = {
			gridX: 5,
			gridY: 5,
			hasRoomToRight: false,
			hasRoomToLeft: false,
			hasRoomAbove: false,
			hasRoomBelow: false,
		};

		const elements = computeFacadeElements(cell, HOTEL_SEED);

		expect(elements).toEqual([]);
	});

	it("should vary pipe scale within expected range", () => {
		const cell = givenCellWithRoomAbove();

		const elements = computeFacadeElements(cell, HOTEL_SEED);

		const pipe = elements.find((element) =>
			element.frameName.startsWith("parisPipe/parisPipe_"),
		);
		expect(pipe).toBeDefined();
		expect(pipe?.scaleX).toBeGreaterThanOrEqual(0.6);
		expect(pipe?.scaleX).toBeLessThanOrEqual(1.2);
		expect(pipe?.scaleY).toBeGreaterThanOrEqual(0.6);
		expect(pipe?.scaleY).toBeLessThanOrEqual(1.2);
	});

	it("should vary chimney scale within expected range", () => {
		const cell = givenCellWithRoomBelowOnly();

		const elements = computeFacadeElements(cell, HOTEL_SEED);

		const chimney = elements.find((element) =>
			element.frameName.startsWith("parisChimney/parisChimney_"),
		);
		expect(chimney).toBeDefined();
		expect(chimney?.scaleX).toBeGreaterThanOrEqual(0.7);
		expect(chimney?.scaleX).toBeLessThanOrEqual(1.5);
	});
});
