import type { Room } from "#phaser/domain/Hotel";

export class BedroomLayout {
	readonly roomWidth: number;
	readonly roomHeight: number;
	readonly containsClient: boolean;

	private constructor({
		roomWidth,
		roomHeight,
		containsClient,
	}: {
		roomWidth: number;
		roomHeight: number;
		containsClient: boolean;
	}) {
		this.roomWidth = roomWidth;
		this.roomHeight = roomHeight;
		this.containsClient = containsClient;
	}

	static fromRoom({
		room,
		roomSize,
		baseRoomWidth,
		baseRoomHeight,
	}: {
		room: Room;
		roomSize: number;
		baseRoomWidth: number;
		baseRoomHeight: number;
	}): BedroomLayout {
		return new BedroomLayout({
			roomWidth: baseRoomWidth * roomSize,
			roomHeight: baseRoomHeight,
			containsClient: room.client !== null,
		});
	}
}
