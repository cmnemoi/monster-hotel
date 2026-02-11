import type { ClientInQueue, Room } from "#phaser/models";
import { BedroomSprite } from "./BedroomSprite";
import { LobbySprite } from "./LobbySprite";
import type { RoomSprite } from "./RoomSprite";

/**
 * Factory function that creates the appropriate RoomSprite subclass based on room type.
 */
export function createRoomSprite(
	scene: Phaser.Scene,
	room: Room,
	clientQueue: ClientInQueue[] = [],
): RoomSprite {
	switch (room.type) {
		case "bedroom":
			return new BedroomSprite(scene, room);
		case "lobby":
			return new LobbySprite(scene, room, clientQueue);
	}
}
