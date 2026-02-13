import { describe, expect, it } from "vitest";
import { HotelFacade } from "#phaser/domain/HotelFacade";

const HOTEL_SEED = 12345;

describe("Facade", () => {
	it("should return no elements when hotel has no rooms", () => {
		const facade = HotelFacade.fromOccupiedCells({
			occupiedCells: new Set<string>(),
			hotelSeed: HOTEL_SEED,
		});

		expect(facade.elements).toEqual([]);
	});

	it("should return elements for cells adjacent to a single room", () => {
		const facade = HotelFacade.fromOccupiedCells({
			occupiedCells: new Set(["0,1"]),
			hotelSeed: HOTEL_SEED,
		});

		expect(facade.elements.length).toBeGreaterThan(0);
	});

	it("should produce deterministic results for the same grid and seed", () => {
		const occupiedCells = new Set(["0,1", "1,1"]);

		const facadeA = HotelFacade.fromOccupiedCells({
			occupiedCells,
			hotelSeed: HOTEL_SEED,
		});
		const facadeB = HotelFacade.fromOccupiedCells({
			occupiedCells,
			hotelSeed: HOTEL_SEED,
		});

		expect(facadeA.elements).toEqual(facadeB.elements);
	});

	it("should return a parisTest wall for cell to the left of a room", () => {
		const facade = HotelFacade.fromOccupiedCells({
			occupiedCells: new Set(["1,1"]),
			hotelSeed: HOTEL_SEED,
		});

		const wall = facade.elements.find(
			(element) => element.frameName === "parisTest",
		);
		expect(wall).toBeDefined();
	});

	it("should return a parisWall variant for cell to the right of a room", () => {
		const facade = HotelFacade.fromOccupiedCells({
			occupiedCells: new Set(["0,1"]),
			hotelSeed: HOTEL_SEED,
		});

		const wall = facade.elements.find((element) =>
			element.frameName.startsWith("parisWall/parisWall_"),
		);
		expect(wall).toBeDefined();
		expect(wall?.scaleX).toBe(-1);
	});

	it("should return ceiling and pipe for cell below a room", () => {
		const facade = HotelFacade.fromOccupiedCells({
			occupiedCells: new Set(["0,2"]),
			hotelSeed: HOTEL_SEED,
		});

		const ceiling = facade.elements.find((e) => e.frameName === "parisCeiling");
		expect(ceiling).toBeDefined();

		const pipe = facade.elements.find((e) =>
			e.frameName.startsWith("parisPipe/parisPipe_"),
		);
		expect(pipe).toBeDefined();
	});

	it("should return roof and chimney for cell above a room with no room above", () => {
		const facade = HotelFacade.fromOccupiedCells({
			occupiedCells: new Set(["0,1"]),
			hotelSeed: HOTEL_SEED,
		});

		const roof = facade.elements.find((e) => e.frameName === "parisRoof");
		expect(roof).toBeDefined();

		const chimney = facade.elements.find((e) =>
			e.frameName.startsWith("parisChimney/parisChimney_"),
		);
		expect(chimney).toBeDefined();
	});

	it("should return balcony for cell between two vertically adjacent rooms", () => {
		const facade = HotelFacade.fromOccupiedCells({
			occupiedCells: new Set(["0,1", "0,3"]),
			hotelSeed: HOTEL_SEED,
		});

		const balcony = facade.elements.find((e) => e.frameName === "parisBalcony");
		expect(balcony).toBeDefined();
	});

	it("should vary pipe scale within expected range", () => {
		const facade = HotelFacade.fromOccupiedCells({
			occupiedCells: new Set(["0,2"]),
			hotelSeed: HOTEL_SEED,
		});

		const pipe = facade.elements.find((e) =>
			e.frameName.startsWith("parisPipe/parisPipe_"),
		);
		expect(pipe).toBeDefined();
		expect(pipe?.scaleX).toBeGreaterThanOrEqual(0.6);
		expect(pipe?.scaleX).toBeLessThanOrEqual(1.2);
	});

	it("should vary chimney scale within expected range", () => {
		const facade = HotelFacade.fromOccupiedCells({
			occupiedCells: new Set(["0,1"]),
			hotelSeed: HOTEL_SEED,
		});

		const chimney = facade.elements.find((e) =>
			e.frameName.startsWith("parisChimney/parisChimney_"),
		);
		expect(chimney).toBeDefined();
		expect(chimney?.scaleX).toBeGreaterThanOrEqual(0.7);
		expect(chimney?.scaleX).toBeLessThanOrEqual(1.5);
	});
});
