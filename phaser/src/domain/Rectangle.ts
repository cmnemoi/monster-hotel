import type { WorldPosition } from "#phaser/domain/Position";

export class Rectangle {
	readonly position: WorldPosition;
	readonly width: number;
	readonly height: number;

	private constructor({
		position,
		width,
		height,
	}: {
		position: WorldPosition;
		width: number;
		height: number;
	}) {
		this.position = position;
		this.width = width;
		this.height = height;
	}

	static create({
		position,
		width,
		height,
	}: {
		position: WorldPosition;
		width: number;
		height: number;
	}): Rectangle {
		return new Rectangle({ position, width, height });
	}

	get center(): WorldPosition {
		return {
			x: this.position.x + this.width / 2,
			y: this.position.y + this.height / 2,
		};
	}

	union(other: Rectangle): Rectangle {
		const minX = Math.min(this.position.x, other.position.x);
		const minY = Math.min(this.position.y, other.position.y);
		const maxX = Math.max(
			this.position.x + this.width,
			other.position.x + other.width,
		);
		const maxY = Math.max(
			this.position.y + this.height,
			other.position.y + other.height,
		);
		return new Rectangle({
			position: { x: minX, y: minY },
			width: maxX - minX,
			height: maxY - minY,
		});
	}

	expand(padding: number): Rectangle {
		return new Rectangle({
			position: { x: this.position.x - padding, y: this.position.y - padding },
			width: this.width + padding * 2,
			height: this.height + padding * 2,
		});
	}
}
