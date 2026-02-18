import type { AssetConfig } from "#phaser/domain/AssetConfig";
import type { OriginValue } from "#phaser/domain/Origin";
import type { Position } from "#phaser/domain/Position";
import { SeededRandom } from "#phaser/domain/SeededRandom";
import { ImageCatalog } from "#phaser/game/config/ImageCatalog";

const ROOM_WIDTH = 512;
const ROOM_HEIGHT = 256;

const NEIGHBOR_OFFSETS = [
	{ dx: 1, dy: 0 },
	{ dx: -1, dy: 0 },
	{ dx: 0, dy: 1 },
	{ dx: 0, dy: -1 },
];

const SEED_Y_MULTIPLIER = 1000;

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
				assetConfig: ImageCatalog.parisTest,
				position: { x: cellRight, y: cellBottom },
				origin: ImageCatalog.parisTest.origin,
				scale: { x: 1, y: 1 },
				flipX: false,
			});
		}

		if (cell.hasRoomToLeft) {
			const wall = random.pick([
				ImageCatalog.parisWallVariant0,
				ImageCatalog.parisWallVariant1,
				ImageCatalog.parisWallVariant2,
			]);
			elements.push({
				assetConfig: wall,
				position: { x: cellLeft, y: cellBottom },
				origin: wall.origin,
				scale: wall.scale,
				flipX: false,
			});
		}

		if (cell.hasRoomAbove) {
			elements.push({
				assetConfig: ImageCatalog.parisCeiling,
				position: {
					x: cellLeft + ImageCatalog.parisCeiling.offset.x,
					y: cellTop,
				},
				origin: ImageCatalog.parisCeiling.origin,
				scale: { x: 1, y: 1 },
				flipX: false,
			});

			const pipe = random.pick([
				ImageCatalog.parisPipeVariant0,
				ImageCatalog.parisPipeVariant1,
			]);
			const pipeScale = random.floatRange({ min: 0.6, max: 1.2 });
			elements.push({
				assetConfig: pipe,
				position: {
					x: random.intRange({
						min: cellLeft + 100,
						max: cellRight - 200,
					}),
					y: cellTop + 30,
				},
				origin: pipe.origin,
				scale: { x: pipeScale, y: pipeScale },
				flipX: false,
			});
		}

		if (cell.hasRoomBelow) {
			if (cell.hasRoomAbove) {
				elements.push({
					assetConfig: ImageCatalog.parisBalcony,
					position: {
						x: cellLeft + ImageCatalog.parisBalcony.offset.x,
						y: cellBottom,
					},
					origin: ImageCatalog.parisBalcony.origin,
					scale: { x: 1, y: 1 },
					flipX: false,
				});
			} else {
				elements.push({
					assetConfig: ImageCatalog.parisRoof,
					position: {
						x: cellLeft + ImageCatalog.parisRoof.offset.x,
						y: cellBottom,
					},
					origin: ImageCatalog.parisRoof.origin,
					scale: ImageCatalog.parisRoof.scale,
					flipX: false,
				});

				const chimney = random.pick([
					ImageCatalog.parisChimneyVariant0,
					ImageCatalog.parisChimneyVariant1,
					ImageCatalog.parisChimneyVariant2,
					ImageCatalog.parisChimneyVariant3,
				]);
				const chimneyScale = random.floatRange({ min: 0.7, max: 1.5 });
				elements.push({
					assetConfig: chimney,
					position: {
						x: random.intRange({
							min: cellLeft + 100,
							max: cellRight - 200,
						}),
						y: cellBottom - chimney.offset.y,
					},
					origin: chimney.origin,
					scale: { x: chimneyScale, y: chimneyScale },
					flipX: false,
				});
			}
		}

		return elements;
	}
}
