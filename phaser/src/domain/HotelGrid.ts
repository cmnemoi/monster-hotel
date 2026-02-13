import type { Position } from "#phaser/domain/Position";

export class HotelGrid {
	private readonly roomWidth: number;
	private readonly roomHeight: number;

	constructor({
		roomWidth,
		roomHeight,
	}: { roomWidth: number; roomHeight: number }) {
		this.roomWidth = roomWidth;
		this.roomHeight = roomHeight;
	}

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
