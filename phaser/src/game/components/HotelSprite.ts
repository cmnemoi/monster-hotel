import type { Hotel } from "#phaser/domain/Hotel";
import type { HotelGrid } from "#phaser/domain/HotelGrid";
import { ROOM_HEIGHT, ROOM_WIDTH } from "../constants";
import { createRoomSprite } from "./createRoomSprite";
import { HotelFacadeSprite } from "./HotelFacadeSprite";
import type { RoomSprite } from "./RoomSprite";

export class HotelSprite extends Phaser.GameObjects.Container {
	private roomsById = new Map<string, RoomSprite>();
	private roomsByPosition = new Map<string, string>();
	private hotelFacadeSprite: HotelFacadeSprite;
	private readonly hotelGrid: HotelGrid;

	constructor(scene: Phaser.Scene, hotelGrid: HotelGrid) {
		super(scene, 0, 0);
		this.hotelGrid = hotelGrid;
		this.hotelFacadeSprite = new HotelFacadeSprite(scene);
		this.add(this.hotelFacadeSprite);
		scene.add.existing(this);
	}

	public applyState(state: Hotel) {
		this.roomsByPosition.clear();

		for (const room of Object.values(state.rooms)) {
			let roomSprite = this.roomsById.get(room.id);

			if (!roomSprite) {
				roomSprite = createRoomSprite(
					this.scene,
					room,
					this.hotelGrid,
					state.clientQueue,
				);
				this.roomsById.set(room.id, roomSprite);
				this.add(roomSprite);
			} else {
				roomSprite.setGridPosition(room.position);
				roomSprite.updateState(room);
			}

			this.roomsByPosition.set(
				this.hotelGrid.toPositionKey(room.position),
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
		this.hotelFacadeSprite.rebuild(occupiedCells);
		this.hotelFacadeSprite.setDepth(-1);
	}

	public getRoomAt(gridX: number, gridY: number): RoomSprite | undefined {
		const id = this.roomsByPosition.get(
			this.hotelGrid.toPositionKey({ x: gridX, y: gridY }),
		);
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

		for (const roomSprite of this.roomsById.values()) {
			const worldBounds = roomSprite.getWorldBounds();
			if (!rectangle) rectangle = Phaser.Geom.Rectangle.Clone(worldBounds);
			else Phaser.Geom.Rectangle.Union(rectangle, worldBounds, rectangle);
		}

		if (!rectangle)
			rectangle = new Phaser.Geom.Rectangle(0, 0, ROOM_WIDTH, ROOM_HEIGHT);

		return rectangle;
	}
}
