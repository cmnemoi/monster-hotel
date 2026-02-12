import { ROOM_HEIGHT, ROOM_WIDTH } from "../constants";
import type { FacadeCell } from "./computeFacadeCells";
import { SeededRandom } from "./SeededRandom";

const ROOF_X_OFFSET = -197;
const BALCONY_X_OFFSET = -270;
const CEILING_X_OFFSET = -247;
const CEILING_PIPE_Y_OFFSET = 30;
const ROOF_SCALE_Y = 0.65;
const CHIMNEY_Y_OFFSET = -120;
const SEED_Y_MULTIPLIER = 1000;

const PIPE_MIN_X_MARGIN = 100;
const PIPE_MAX_X_MARGIN = 200;
const PIPE_SCALE_MIN = 0.6;
const PIPE_SCALE_MAX = 1.2;
const CHIMNEY_SCALE_MIN = 0.7;
const CHIMNEY_SCALE_MAX = 1.5;

const PARIS_WALL_VARIANTS = [
	"parisWall/parisWall_0000",
	"parisWall/parisWall_0001",
	"parisWall/parisWall_0002",
] as const;

const PARIS_PIPE_VARIANTS = [
	"parisPipe/parisPipe_0000",
	"parisPipe/parisPipe_0001",
] as const;

const PARIS_CHIMNEY_VARIANTS = [
	"parisChimney/parisChimney_0000",
	"parisChimney/parisChimney_0001",
	"parisChimney/parisChimney_0002",
	"parisChimney/parisChimney_0003",
] as const;

/**
 * Describes a single sprite element to render on the facade.
 */
export type FacadeElement = {
	frameName: string;
	worldX: number;
	worldY: number;
	originX: number;
	originY: number;
	scaleX: number;
	scaleY: number;
	flipX: boolean;
};

/**
 * Compute the list of facade sprite elements for a given cell,
 * using a deterministic seed based on the hotel seed and cell position.
 */
export function computeFacadeElements(
	cell: FacadeCell,
	hotelSeed: number,
): FacadeElement[] {
	const cellSeed = hotelSeed + cell.gridX + cell.gridY * SEED_Y_MULTIPLIER;
	const random = new SeededRandom(cellSeed);

	const worldX = cell.gridX * ROOM_WIDTH;
	const worldY = -cell.gridY * ROOM_HEIGHT;
	const cellLeft = worldX;
	const cellRight = worldX + ROOM_WIDTH;
	const cellTop = worldY - ROOM_HEIGHT;
	const cellBottom = worldY;

	const elements: FacadeElement[] = [];

	addRightSideWall(cell, elements, cellRight, cellBottom);
	addLeftSideWall(cell, elements, random, cellLeft, cellBottom);
	addCeilingElements(cell, elements, random, cellLeft, cellRight, cellTop);
	addRoofOrBalconyElements(
		cell,
		elements,
		random,
		cellLeft,
		cellRight,
		cellBottom,
	);

	return elements;
}

function addRightSideWall(
	cell: FacadeCell,
	elements: FacadeElement[],
	cellRight: number,
	cellBottom: number,
): void {
	if (!cell.hasRoomToRight) return;

	elements.push({
		frameName: "parisTest",
		worldX: cellRight,
		worldY: cellBottom,
		originX: 1,
		originY: 1,
		scaleX: 1,
		scaleY: 1,
		flipX: false,
	});
}

function addLeftSideWall(
	cell: FacadeCell,
	elements: FacadeElement[],
	random: SeededRandom,
	cellLeft: number,
	cellBottom: number,
): void {
	if (!cell.hasRoomToLeft) return;

	elements.push({
		frameName: random.pick(PARIS_WALL_VARIANTS),
		worldX: cellLeft,
		worldY: cellBottom,
		originX: 1,
		originY: 1,
		scaleX: -1,
		scaleY: 1,
		flipX: false,
	});
}

function addCeilingElements(
	cell: FacadeCell,
	elements: FacadeElement[],
	random: SeededRandom,
	cellLeft: number,
	cellRight: number,
	cellTop: number,
): void {
	if (!cell.hasRoomAbove) return;

	elements.push({
		frameName: "parisCeiling",
		worldX: cellLeft + CEILING_X_OFFSET,
		worldY: cellTop,
		originX: 0,
		originY: 0,
		scaleX: 1,
		scaleY: 1,
		flipX: false,
	});

	const pipeScale = random.floatRange(PIPE_SCALE_MIN, PIPE_SCALE_MAX);
	elements.push({
		frameName: random.pick(PARIS_PIPE_VARIANTS),
		worldX: random.intRange(
			cellLeft + PIPE_MIN_X_MARGIN,
			cellRight - PIPE_MAX_X_MARGIN,
		),
		worldY: cellTop + CEILING_PIPE_Y_OFFSET,
		originX: 0.5,
		originY: 0,
		scaleX: pipeScale,
		scaleY: pipeScale,
		flipX: false,
	});
}

function addRoofOrBalconyElements(
	cell: FacadeCell,
	elements: FacadeElement[],
	random: SeededRandom,
	cellLeft: number,
	cellRight: number,
	cellBottom: number,
): void {
	if (!cell.hasRoomBelow) return;

	if (cell.hasRoomAbove) {
		addBalcony(elements, cellLeft, cellBottom);
	} else {
		addRoofWithChimney(elements, random, cellLeft, cellRight, cellBottom);
	}
}

function addBalcony(
	elements: FacadeElement[],
	cellLeft: number,
	cellBottom: number,
): void {
	elements.push({
		frameName: "parisBalcony",
		worldX: cellLeft + BALCONY_X_OFFSET,
		worldY: cellBottom,
		originX: 0,
		originY: 1,
		scaleX: 1,
		scaleY: 1,
		flipX: false,
	});
}

function addRoofWithChimney(
	elements: FacadeElement[],
	random: SeededRandom,
	cellLeft: number,
	cellRight: number,
	cellBottom: number,
): void {
	elements.push({
		frameName: "parisRoof",
		worldX: cellLeft + ROOF_X_OFFSET,
		worldY: cellBottom,
		originX: 0,
		originY: 1,
		scaleX: 1,
		scaleY: ROOF_SCALE_Y,
		flipX: false,
	});

	const chimneyScale = random.floatRange(CHIMNEY_SCALE_MIN, CHIMNEY_SCALE_MAX);
	elements.push({
		frameName: random.pick(PARIS_CHIMNEY_VARIANTS),
		worldX: random.intRange(
			cellLeft + PIPE_MIN_X_MARGIN,
			cellRight - PIPE_MAX_X_MARGIN,
		),
		worldY: cellBottom + CHIMNEY_Y_OFFSET,
		originX: 0.5,
		originY: 1,
		scaleX: chimneyScale,
		scaleY: chimneyScale,
		flipX: false,
	});
}
