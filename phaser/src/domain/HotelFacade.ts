import { SeededRandom } from "#phaser/domain/SeededRandom";

const ROOM_WIDTH = 512;
const ROOM_HEIGHT = 256;

const NEIGHBOR_OFFSETS = [
	{ dx: 1, dy: 0 },
	{ dx: -1, dy: 0 },
	{ dx: 0, dy: 1 },
	{ dx: 0, dy: -1 },
];

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

type FacadeCell = {
	gridX: number;
	gridY: number;
	hasRoomToRight: boolean;
	hasRoomToLeft: boolean;
	hasRoomAbove: boolean;
	hasRoomBelow: boolean;
};

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

export class HotelFacade {
	private constructor(public readonly elements: readonly FacadeElement[]) {}

	static fromOccupiedCells(
		occupiedCells: Set<string>,
		hotelSeed: number,
	): HotelFacade {
		const cells = HotelFacade.computeCells(occupiedCells);
		const elements: FacadeElement[] = [];

		for (const cell of cells) {
			const cellElements = HotelFacade.computeCellElements(cell, hotelSeed);
			elements.push(...cellElements);
		}

		return new HotelFacade(elements);
	}

	private static computeCells(occupiedCells: Set<string>): FacadeCell[] {
		const facadeCellMap = new Map<string, FacadeCell>();

		for (const cellKey of occupiedCells) {
			const parts = cellKey.split(",");
			const gridX = Number(parts[0]);
			const gridY = Number(parts[1]);

			for (const { dx, dy } of NEIGHBOR_OFFSETS) {
				const neighborX = gridX + dx;
				const neighborY = gridY + dy;
				const neighborKey = `${neighborX},${neighborY}`;

				if (occupiedCells.has(neighborKey)) continue;

				if (!facadeCellMap.has(neighborKey)) {
					facadeCellMap.set(neighborKey, {
						gridX: neighborX,
						gridY: neighborY,
						hasRoomToRight: false,
						hasRoomToLeft: false,
						hasRoomAbove: false,
						hasRoomBelow: false,
					});
				}

				const cell = facadeCellMap.get(neighborKey);
				if (!cell) continue;

				if (dx === -1) cell.hasRoomToRight = true;
				if (dx === 1) cell.hasRoomToLeft = true;
				if (dy === -1) cell.hasRoomAbove = true;
				if (dy === 1) cell.hasRoomBelow = true;
			}
		}

		return Array.from(facadeCellMap.values());
	}

	private static computeCellElements(
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

		if (cell.hasRoomToRight) {
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

		if (cell.hasRoomToLeft) {
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

		if (cell.hasRoomAbove) {
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

		if (cell.hasRoomBelow) {
			if (cell.hasRoomAbove) {
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
			} else {
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

				const chimneyScale = random.floatRange(
					CHIMNEY_SCALE_MIN,
					CHIMNEY_SCALE_MAX,
				);
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
		}

		return elements;
	}
}
