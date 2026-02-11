import type { Room } from "#phaser/models";
import type { Position } from "../types";
import { HotelSprite } from "./HotelSprite";

/**
 * Abstract base class for all room visual representations.
 *
 * Subclasses must implement the visual rendering and state update logic.
 */
export abstract class RoomSprite extends Phaser.GameObjects.Container {
	public readonly id: string;
	public gridPosition: Position;

	constructor(scene: Phaser.Scene, room: Room) {
		super(scene, 0, 0);
		this.id = room.id;
		this.gridPosition = { ...room.position };
	}

	public setGridPosition(position: Position) {
		this.gridPosition = { ...position };
		const world = HotelSprite.gridToWorld(position.x, position.y);
		this.x = world.x;
		this.y = world.y;
	}

	public abstract updateState(room: Room): void;

	public abstract override update(time: number, delta: number): void;

	public abstract getWorldBounds(): Phaser.Geom.Rectangle;
}
