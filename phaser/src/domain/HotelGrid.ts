import type { Position } from "#phaser/domain/Position";

export class HotelGrid {
	constructor(
		private readonly roomWidth: number,
		private readonly roomHeight: number,
	) {}

	toWorldPosition(gridPosition: Position): Position {
		return {
			x: gridPosition.x * this.roomWidth,
			y: -(gridPosition.y * this.roomHeight) || 0,
		};
	}

	toPositionKey(gridPosition: Position): `${number},${number}` {
		return `${gridPosition.x},${gridPosition.y}`;
	}
}
