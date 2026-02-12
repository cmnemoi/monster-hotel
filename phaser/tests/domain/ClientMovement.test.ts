import { describe, expect, it } from "vitest";
import { ClientMovement } from "#phaser/domain/ClientMovement";
import { Duration } from "#phaser/domain/Duration";
import { FixedRandomGenerator } from "../test-doubles/FixedRandomGenerator.js";

const MIN_X = 150;
const MAX_X = 350;

describe("ClientMovement", () => {
	it("should start in idle phase", () => {
		const movement = givenClientMovement();

		expect(movement.state().animation).toBe("idle");
	});

	it("should start at center of bounds", () => {
		const movement = givenClientMovement();

		const expectedCenter = (MIN_X + MAX_X) / 2;
		expect(movement.state().x).toBe(expectedCenter);
	});

	it("should stay idle after a short update", () => {
		const movement = givenClientMovement();

		movement.update(Duration.ONE_FRAME);

		expect(movement.state().animation).toBe("idle");
	});

	it("should not move in x while idle", () => {
		const movement = givenClientMovement();
		const initialX = movement.state().x;

		movement.update(Duration.fromMilliseconds(500));

		expect(movement.state().x).toBe(initialX);
	});

	it("should switch to walk after idle time expires", () => {
		const movement = givenMovementWithIdleExpired();

		expect(movement.state().animation).toBe("walk");
	});

	it("should move in x while walking", () => {
		const movement = givenMovementWithIdleExpired();
		const initialX = movement.state().x;

		movement.update(Duration.ONE_FRAME);

		expect(movement.state().x).not.toBe(initialX);
	});

	it("should stop exactly at bound and return to idle", () => {
		const movement = givenMovementWithIdleExpired();

		// Walk long enough to reach maxX (100px at 0.125px/ms = 800ms)
		movement.update(Duration.fromMilliseconds(1500));

		expect(movement.state().x).toBe(MAX_X);
		expect(movement.state().animation).toBe("idle");
	});

	it("should keep same direction when entering idle at bound", () => {
		const movement = givenMovementWithIdleExpired();
		const directionBeforeWalk = movement.state().direction;

		movement.update(Duration.fromMilliseconds(1_500));

		expect(movement.state().animation).toBe("idle");
		expect(movement.state().direction).toBe(directionBeforeWalk);
	});

	it("should reverse direction when resuming walk after idle at bound", () => {
		const movement = givenMovementWithIdleExpired();
		const directionBeforeWalk = movement.state().direction;

		// Walk to bound
		movement.update(Duration.fromMilliseconds(1_500));
		// Wait out idle (min 2000ms)
		movement.update(Duration.fromMilliseconds(3_000));

		expect(movement.state().animation).toBe("walk");
		expect(movement.state().direction).not.toBe(directionBeforeWalk);
	});
});

function givenMovementWithIdleExpired(): ClientMovement {
	const random = new FixedRandomGenerator();
	random.setNextFloatRangeResult(2000);
	const movement = new ClientMovement(MIN_X, MAX_X, random);
	movement.update(Duration.fromMilliseconds(2_001));
	return movement;
}

function givenClientMovement(): ClientMovement {
	const random = new FixedRandomGenerator();
	random.setNextFloatRangeResult(5_000);
	return new ClientMovement(MIN_X, MAX_X, random);
}
