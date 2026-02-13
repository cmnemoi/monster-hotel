import { Duration } from "#phaser/domain/Duration";
import type { RandomGenerator } from "#phaser/domain/RandomGenerator";

const IDLE_MIN_MILLISECONDS = 2_000;
const IDLE_MAX_MILLISECONDS = 5_000;
const WALK_SPEED_PER_MILLISECOND = 0.125;

export type ClientState = {
	readonly x: number;
	readonly animationPhase: "idle" | "walk";
	readonly isFacingLeft: boolean;
	readonly hasAnimationPhaseChanged: boolean;
};

export class ClientBehavior {
	private x: number;
	private movementPhase: "idle" | "walk" = "idle";
	private animationPhase: "idle" | "walk" = "idle";
	private direction: "left" | "right" = "right";
	private idleTimeRemaining: Duration;
	private shouldReverseOnWalk = false;
	private pendingIdle = false;
	private animationPhaseChanged = true;

	constructor(
		private readonly minX: number,
		private readonly maxX: number,
		private readonly random: RandomGenerator,
	) {
		this.x = (minX + maxX) / 2;
		this.idleTimeRemaining = this.randomIdleDuration();
	}

	update(elapsed: Duration): void {
		if (this.movementPhase === "idle") {
			this.updateIdle(elapsed);
		} else {
			this.updateWalk(elapsed);
		}
	}

	notifyAnimationCycleComplete(): void {
		if (this.pendingIdle) {
			this.pendingIdle = false;
			this.setAnimationPhase("idle");
		}
	}

	state(): ClientState {
		const changed = this.animationPhaseChanged;
		this.animationPhaseChanged = false;
		return {
			x: this.x,
			animationPhase: this.animationPhase,
			isFacingLeft: this.direction === "left",
			hasAnimationPhaseChanged: changed,
		};
	}

	private updateIdle(elapsed: Duration): void {
		this.idleTimeRemaining = this.idleTimeRemaining.subtract(elapsed);
		if (this.idleTimeRemaining.isRemaining()) {
			return;
		}

		this.movementPhase = "walk";
		this.setAnimationPhase("walk");
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
		this.movementPhase = "idle";
		this.pendingIdle = true;
		this.shouldReverseOnWalk = true;
		this.idleTimeRemaining = this.randomIdleDuration();
	}

	private setAnimationPhase(phase: "idle" | "walk"): void {
		if (this.animationPhase !== phase) {
			this.animationPhase = phase;
			this.animationPhaseChanged = true;
		}
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
