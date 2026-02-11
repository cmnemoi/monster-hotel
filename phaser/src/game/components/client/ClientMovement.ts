import type { ClientSpriteParams } from "../ClientSprite";

type ClientState = "idle" | "walk";

type MovementBounds = {
	minX: number;
	maxX: number;
};

export type MovementUpdate = {
	containerX: number;
	spriteX: number;
	spriteY: number;
	state: ClientState;
	flipX: boolean;
};

export class ClientMovement {
	private readonly scene: Phaser.Scene;
	private bounds: MovementBounds;

	private readonly walkSpeed = 1.5;
	private direction: 1 | -1;
	private isWaiting = false;
	private readonly clientId = Math.random() * 100;

	private containerX = 0;
	private state: ClientState = "idle";

	constructor(scene: Phaser.Scene, params: ClientSpriteParams) {
		this.direction = Phaser.Math.Between(0, 1) === 0 ? 1 : -1;
		this.scene = scene;
		this.bounds = {
			minX: params.roomWidth * 0.3,
			maxX: params.roomWidth * 0.7,
		};
		this.containerX = (this.bounds.minX + this.bounds.maxX) / 2;
		this.startWaiting();
	}

	update(delta: number, movementY: number): MovementUpdate {
		let spriteX = 0;
		let spriteY = movementY;

		if (this.isWaiting && this.state === "idle") {
			spriteX = Math.sin(delta * 0.07 + this.clientId * 0.2) * 9;
			spriteY = movementY + Math.cos(delta * 0.1 + this.clientId * 0.3) * 10;
		}

		if (!this.isWaiting) {
			this.containerX += this.walkSpeed * this.direction;

			const reachedBoundary =
				(this.direction === 1 && this.containerX >= this.bounds.maxX) ||
				(this.direction === -1 && this.containerX <= this.bounds.minX);

			if (reachedBoundary) {
				this.containerX = Phaser.Math.Clamp(
					this.containerX,
					this.bounds.minX,
					this.bounds.maxX,
				);
				this.startWaiting();
			}
		}

		return {
			containerX: this.containerX,
			spriteX,
			spriteY,
			state: this.state,
			flipX: this.direction < 0,
		};
	}

	setBounds(bounds: MovementBounds): void {
		this.bounds = bounds;
	}

	private startWaiting() {
		this.isWaiting = true;
		this.state = "idle";
		const waitDuration = Phaser.Math.FloatBetween(2_000, 5_000);
		this.scene.time.delayedCall(waitDuration, () => {
			this.isWaiting = false;
			this.direction = this.direction === 1 ? -1 : 1;
			this.state = "walk";
		});
	}
}
