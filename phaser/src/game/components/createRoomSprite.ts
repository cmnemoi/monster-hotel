import type { ClientInQueue, Room } from "#phaser/domain/Hotel";
import type { HotelGrid } from "#phaser/domain/HotelGrid";
import { BedroomSprite } from "./BedroomSprite";
import { LobbySprite } from "./LobbySprite";
import type { RoomSprite } from "./RoomSprite";

/**
 * Factory function that creates the appropriate RoomSprite subclass based on room type.
 */
export function createRoomSprite({
	scene,
	room,
	hotelGrid,
	clientQueue = [],
}: {
	scene: Phaser.Scene;
	room: Room;
	hotelGrid: HotelGrid;
	clientQueue?: ClientInQueue[];
}): RoomSprite {
	switch (room.type) {
		case "bedroom": {
			return new BedroomSprite({ scene, room, hotelGrid });
		}
		case "lobby": {
			return new LobbySprite({ scene, room, hotelGrid, clientQueue });
		}
	}
}
