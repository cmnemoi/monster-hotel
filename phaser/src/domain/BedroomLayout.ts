import {
	GRID_CELL_HEIGHT,
	GRID_CELL_WIDTH,
} from "#phaser/domain/GridConstants";
import type { Room } from "#phaser/domain/Hotel";

export class BedroomLayout {
	readonly width: number;
	readonly height: number;
	readonly containsClient: boolean;

	private constructor({
		width,
		height,
		containsClient,
	}: {
		width: number;
		height: number;
		containsClient: boolean;
	}) {
		this.width = width;
		this.height = height;
		this.containsClient = containsClient;
	}

	static fromRoom({
		room,
		gridSpan,
	}: {
		room: Room;
		gridSpan: number;
	}): BedroomLayout {
		return new BedroomLayout({
			width: GRID_CELL_WIDTH * gridSpan,
			height: GRID_CELL_HEIGHT,
			containsClient: room.client !== null,
		});
	}
}
