import type { GridPosition, WorldPosition } from "#phaser/domain/Position";

export class HotelGrid {
	private readonly cellWidth: number;
	private readonly cellHeight: number;

	constructor({
		cellWidth,
		cellHeight,
	}: { cellWidth: number; cellHeight: number }) {
		this.cellWidth = cellWidth;
		this.cellHeight = cellHeight;
	}

	toWorldPosition(gridPosition: GridPosition): WorldPosition {
		return {
			x: gridPosition.x * this.cellWidth,
			y: -(gridPosition.y * this.cellHeight) || 0,
		};
	}

	toPositionKey(gridPosition: GridPosition): `${number},${number}` {
		return `${gridPosition.x},${gridPosition.y}`;
	}
}
