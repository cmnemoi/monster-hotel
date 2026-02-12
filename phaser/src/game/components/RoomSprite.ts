import type { Room } from "#phaser/domain/Hotel";
import type { HotelGrid } from "#phaser/domain/HotelGrid";
import type { Position } from "#phaser/domain/Position";

/**
 * Abstract base class for all room visual representations.
 *
 * Subclasses must implement the visual rendering and state update logic.
 */
export abstract class RoomSprite extends Phaser.GameObjects.Container {
	public readonly id: string;
	public gridPosition: Position;
	protected readonly hotelGrid: HotelGrid;

	constructor(scene: Phaser.Scene, room: Room, hotelGrid: HotelGrid) {
		super(scene, 0, 0);
		this.id = room.id;
		this.gridPosition = { ...room.position };
		this.hotelGrid = hotelGrid;
	}

	public setGridPosition(position: Position) {
		this.gridPosition = { ...position };
		const world = this.hotelGrid.toWorldPosition(position);
		this.x = world.x;
		this.y = world.y;
	}

	public abstract updateState(room: Room): void;

	public abstract override update(time: number, delta: number): void;

	public abstract getWorldBounds(): Phaser.Geom.Rectangle;
}
