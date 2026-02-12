import { Duration } from "#phaser/domain/Duration";
import type { RandomGenerator } from "#phaser/domain/RandomGenerator";

const IDLE_MIN_MILLISECONDS = 2_000;
const IDLE_MAX_MILLISECONDS = 5_000;
const WALK_SPEED_PER_MILLISECOND = 0.125;

/**
 * Snapshot of a client's movement for rendering.
 */
export type MovementState = {
	x: number;
	animation: "idle" | "walk";
	direction: "left" | "right";
};

/**
 * Pure domain object modeling a character walking back and forth
 * within horizontal bounds, alternating between idle and walk phases.
 */
export class ClientMovement {
	private x: number;
	private animation: "idle" | "walk" = "idle";
	private direction: "left" | "right" = "right";
	private idleTimeRemaining: Duration;
	private shouldReverseOnWalk = false;

	constructor(
		private readonly minX: number,
		private readonly maxX: number,
		private readonly random: RandomGenerator,
	) {
		this.x = (minX + maxX) / 2;
		this.idleTimeRemaining = this.randomIdleDuration();
	}

	/**
	 * Advance the movement state by the given elapsed time.
	 */
	update(elapsed: Duration): void {
		if (this.animation === "idle") {
			this.updateIdle(elapsed);
		} else {
			this.updateWalk(elapsed);
		}
	}

	/**
	 * Return the current movement state for rendering.
	 */
	state(): MovementState {
		return {
			x: this.x,
			animation: this.animation,
			direction: this.direction,
		};
	}

	private updateIdle(elapsed: Duration): void {
		this.idleTimeRemaining = this.idleTimeRemaining.subtract(elapsed);
		if (this.idleTimeRemaining.isRemaining()) {
			return;
		}

		this.animation = "walk";
		if (this.shouldReverseOnWalk) {
			this.reverseDirection();
			this.shouldReverseOnWalk = false;
		}
	}

	private updateWalk(timeElapsed: Duration): void {
		const distanceToBound = this.distanceToBound();
		const maxDisplacement =
			WALK_SPEED_PER_MILLISECOND * timeElapsed.toMilliseconds();
		const displacement = Math.min(maxDisplacement, distanceToBound);

		this.x += this.direction === "right" ? displacement : -displacement;

		if (displacement >= distanceToBound) {
			this.startIdle();
		}
	}

	private distanceToBound(): number {
		return this.direction === "right" ? this.maxX - this.x : this.x - this.minX;
	}

	private startIdle(): void {
		this.animation = "idle";
		this.shouldReverseOnWalk = true;
		this.idleTimeRemaining = this.randomIdleDuration();
	}

	private reverseDirection(): void {
		this.direction = this.direction === "right" ? "left" : "right";
	}

	private randomIdleDuration(): Duration {
		return Duration.fromMilliseconds(
			this.random.floatRange(IDLE_MIN_MILLISECONDS, IDLE_MAX_MILLISECONDS),
		);
	}
}
