import type { AssetConfig } from "#phaser/domain/AssetConfig";
import { Assets } from "#phaser/domain/Assets";
import { Origin, type OriginValue } from "#phaser/domain/Origin";
import type { Position } from "#phaser/domain/Position";
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
	Assets.parisWallVariant0,
	Assets.parisWallVariant1,
	Assets.parisWallVariant2,
] as const;

const PARIS_PIPE_VARIANTS = [
	Assets.parisPipeVariant0,
	Assets.parisPipeVariant1,
] as const;

const PARIS_CHIMNEY_VARIANTS = [
	Assets.parisChimneyVariant0,
	Assets.parisChimneyVariant1,
	Assets.parisChimneyVariant2,
	Assets.parisChimneyVariant3,
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
	assetConfig: AssetConfig;
	position: Position;
	origin: OriginValue;
	scale: { x: number; y: number };
	flipX: boolean;
};

export class HotelFacade {
	private constructor(public readonly elements: readonly FacadeElement[]) {}

	static fromOccupiedCells({
		occupiedCells,
		hotelSeed,
	}: {
		occupiedCells: Set<string>;
		hotelSeed: number;
	}): HotelFacade {
		const cells = HotelFacade.computeCells(occupiedCells);
		const elements: FacadeElement[] = [];

		for (const cell of cells) {
			const cellElements = HotelFacade.computeCellElements({ cell, hotelSeed });
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

	private static computeCellElements({
		cell,
		hotelSeed,
	}: {
		cell: FacadeCell;
		hotelSeed: number;
	}): FacadeElement[] {
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
				assetConfig: Assets.parisTest,
				position: { x: cellRight, y: cellBottom },
				origin: Origin.BOTTOM_RIGHT,
				scale: { x: 1, y: 1 },
				flipX: false,
			});
		}

		if (cell.hasRoomToLeft) {
			elements.push({
				assetConfig: random.pick(PARIS_WALL_VARIANTS),
				position: { x: cellLeft, y: cellBottom },
				origin: Origin.BOTTOM_RIGHT,
				scale: { x: -1, y: 1 },
				flipX: false,
			});
		}

		if (cell.hasRoomAbove) {
			elements.push({
				assetConfig: Assets.parisCeiling,
				position: { x: cellLeft + CEILING_X_OFFSET, y: cellTop },
				origin: Origin.TOP_LEFT,
				scale: { x: 1, y: 1 },
				flipX: false,
			});

			const pipeScale = random.floatRange({
				min: PIPE_SCALE_MIN,
				max: PIPE_SCALE_MAX,
			});
			elements.push({
				assetConfig: random.pick(PARIS_PIPE_VARIANTS),
				position: {
					x: random.intRange({
						min: cellLeft + PIPE_MIN_X_MARGIN,
						max: cellRight - PIPE_MAX_X_MARGIN,
					}),
					y: cellTop + CEILING_PIPE_Y_OFFSET,
				},
				origin: Origin.TOP_CENTER,
				scale: { x: pipeScale, y: pipeScale },
				flipX: false,
			});
		}

		if (cell.hasRoomBelow) {
			if (cell.hasRoomAbove) {
				elements.push({
					assetConfig: Assets.parisBalcony,
					position: { x: cellLeft + BALCONY_X_OFFSET, y: cellBottom },
					origin: Origin.BOTTOM_LEFT,
					scale: { x: 1, y: 1 },
					flipX: false,
				});
			} else {
				elements.push({
					assetConfig: Assets.parisRoof,
					position: { x: cellLeft + ROOF_X_OFFSET, y: cellBottom },
					origin: Origin.BOTTOM_LEFT,
					scale: { x: 1, y: ROOF_SCALE_Y },
					flipX: false,
				});

				const chimneyScale = random.floatRange({
					min: CHIMNEY_SCALE_MIN,
					max: CHIMNEY_SCALE_MAX,
				});
				elements.push({
					assetConfig: random.pick(PARIS_CHIMNEY_VARIANTS),
					position: {
						x: random.intRange({
							min: cellLeft + PIPE_MIN_X_MARGIN,
							max: cellRight - PIPE_MAX_X_MARGIN,
						}),
						y: cellBottom + CHIMNEY_Y_OFFSET,
					},
					origin: Origin.BOTTOM_CENTER,
					scale: { x: chimneyScale, y: chimneyScale },
					flipX: false,
				});
			}
		}

		return elements;
	}
}
