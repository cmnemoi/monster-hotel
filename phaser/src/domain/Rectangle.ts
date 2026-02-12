import type { Position } from "#phaser/domain/Position";

export class Rectangle {
	private constructor(
		public readonly position: Position,
		public readonly width: number,
		public readonly height: number,
	) {}

	static create(position: Position, width: number, height: number): Rectangle {
		return new Rectangle(position, width, height);
	}

	get center(): Position {
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
		return new Rectangle({ x: minX, y: minY }, maxX - minX, maxY - minY);
	}

	expand(padding: number): Rectangle {
		return new Rectangle(
			{ x: this.position.x - padding, y: this.position.y - padding },
			this.width + padding * 2,
			this.height + padding * 2,
		);
	}
}
