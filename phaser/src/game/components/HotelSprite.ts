import type { Hotel } from "#phaser/models";
import { ROOM_HEIGHT, ROOM_WIDTH } from "../constants";
import type { Position } from "../types";
import { createRoomSprite } from "./createRoomSprite";
import { FacadeSprite } from "./FacadeSprite";
import type { RoomSprite } from "./RoomSprite";

export class HotelSprite extends Phaser.GameObjects.Container {
	private roomsById = new Map<string, RoomSprite>();
	private roomsByPosition = new Map<string, string>();
	private facadeSprite: FacadeSprite;

	constructor(scene: Phaser.Scene) {
		super(scene, 0, 0);
		this.facadeSprite = new FacadeSprite(scene);
		this.add(this.facadeSprite);
		scene.add.existing(this);
	}

	static positionKey(x: number, y: number) {
		return `${x},${y}`;
	}

	static gridToWorld(gridX: number, gridY: number): Position {
		return {
			x: gridX * ROOM_WIDTH,
			y: -gridY * ROOM_HEIGHT,
		};
	}

	public applyState(state: Hotel) {
		this.roomsByPosition.clear();

		for (const room of Object.values(state.rooms)) {
			let roomSprite = this.roomsById.get(room.id);

			if (!roomSprite) {
				roomSprite = createRoomSprite(this.scene, room, state.clientQueue);
				this.roomsById.set(room.id, roomSprite);
				this.add(roomSprite);
			} else {
				roomSprite.setGridPosition(room.position);
				roomSprite.updateState(room);
			}

			this.roomsByPosition.set(
				HotelSprite.positionKey(room.position.x, room.position.y),
				room.id,
			);
		}

		const alive = new Set(Object.keys(state.rooms));
		for (const [id, roomSprite] of this.roomsById) {
			if (!alive.has(id)) {
				roomSprite.destroy();
				this.roomsById.delete(id);
			}
		}

		this.rebuildFacade();
	}

	private rebuildFacade(): void {
		const occupiedCells = new Set(this.roomsByPosition.keys());
		this.facadeSprite.rebuild(occupiedCells);
		this.facadeSprite.setDepth(-1);
	}

	public getRoomAt(gridX: number, gridY: number): RoomSprite | undefined {
		const id = this.roomsByPosition.get(HotelSprite.positionKey(gridX, gridY));
		if (!id) return undefined;
		return this.roomsById.get(id);
	}

	public override update(time: number, delta: number) {
		for (const view of this.roomsById.values()) {
			view.update(time, delta);
		}
	}

	public computeWorldBounds(): Phaser.Geom.Rectangle {
		let rectangle: Phaser.Geom.Rectangle | null = null;

		for (const view of this.roomsById.values()) {
			const bounds = view.getWorldBounds();
			if (!rectangle) rectangle = Phaser.Geom.Rectangle.Clone(bounds);
			else Phaser.Geom.Rectangle.Union(rectangle, bounds, rectangle);
		}

		if (!rectangle)
			rectangle = new Phaser.Geom.Rectangle(0, 0, ROOM_WIDTH, ROOM_HEIGHT);

		return rectangle;
	}
}
