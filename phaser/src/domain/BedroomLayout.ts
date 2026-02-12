import type { Room } from "#phaser/domain/Hotel";

export class BedroomLayout {
	private constructor(
		public readonly roomWidth: number,
		public readonly roomHeight: number,
		public readonly containsClient: boolean,
	) {}

	static fromRoom(
		room: Room,
		roomSize: number,
		baseRoomWidth: number,
		baseRoomHeight: number,
	): BedroomLayout {
		return new BedroomLayout(
			baseRoomWidth * roomSize,
			baseRoomHeight,
			room.client !== null,
		);
	}
}
