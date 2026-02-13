import { describe, expect, it } from "vitest";
import { ClientBehavior } from "#phaser/domain/ClientBehavior";
import { Duration } from "#phaser/domain/Duration";
import { FixedRandomGenerator } from "../test-doubles/FixedRandomGenerator.js";

const MIN_X = 150;
const MAX_X = 350;

describe("ClientBehavior", () => {
	it("should start in idle phase", () => {
		const behavior = givenClientBehavior();

		expect(behavior.state().animationPhase).toBe("idle");
	});

	it("should signal animation phase changed on initial state", () => {
		const behavior = givenClientBehavior();

		expect(behavior.state().hasAnimationPhaseChanged).toBe(true);
	});

	it("should start at center of bounds", () => {
		const behavior = givenClientBehavior();

		const expectedCenter = (MIN_X + MAX_X) / 2;
		expect(behavior.state().x).toBe(expectedCenter);
	});

	it("should stay idle after a short update", () => {
		const behavior = givenClientBehavior();

		behavior.update(Duration.ONE_FRAME);

		expect(behavior.state().animationPhase).toBe("idle");
	});

	it("should not move in x while idle", () => {
		const behavior = givenClientBehavior();
		const initialX = behavior.state().x;

		behavior.update(Duration.fromMilliseconds(500));

		expect(behavior.state().x).toBe(initialX);
	});

	it("should switch to walk after idle time expires", () => {
		const behavior = givenBehaviorWithIdleExpired();

		expect(behavior.state().animationPhase).toBe("walk");
	});

	it("should move in x while walking", () => {
		const behavior = givenBehaviorWithIdleExpired();
		const initialX = behavior.state().x;

		behavior.update(Duration.ONE_FRAME);

		expect(behavior.state().x).not.toBe(initialX);
	});

	it("should stop exactly at bound and return to idle", () => {
		const behavior = givenBehaviorWithIdleExpired();

		behavior.update(Duration.fromMilliseconds(1500));

		expect(behavior.state().x).toBe(MAX_X);
		// walk→idle is deferred until animation cycle completes
		expect(behavior.state().animationPhase).toBe("walk");
	});

	it("should keep same direction when entering idle at bound", () => {
		const behavior = givenBehaviorWithIdleExpired();
		const directionBefore = behavior.state().isFacingLeft;

		behavior.update(Duration.fromMilliseconds(1_500));
		behavior.notifyAnimationCycleComplete();

		expect(behavior.state().isFacingLeft).toBe(directionBefore);
	});

	it("should reverse direction when resuming walk after idle at bound", () => {
		const behavior = givenBehaviorWithIdleExpired();
		const facingLeftBefore = behavior.state().isFacingLeft;

		behavior.update(Duration.fromMilliseconds(1_500));
		behavior.notifyAnimationCycleComplete();
		behavior.update(Duration.fromMilliseconds(3_000));

		expect(behavior.state().animationPhase).toBe("walk");
		expect(behavior.state().isFacingLeft).not.toBe(facingLeftBefore);
	});

	it("should report hasAnimationPhaseChanged on first walk transition", () => {
		// expire idle
		const random = new FixedRandomGenerator();
		random.setNextFloatRangeResult(2000);
		const behavior = new ClientBehavior(MIN_X, MAX_X, random);
		behavior.update(Duration.fromMilliseconds(2_001));

		expect(behavior.state().hasAnimationPhaseChanged).toBe(true);
	});

	it("should not report hasAnimationPhaseChanged when phase is stable", () => {
		const behavior = givenBehaviorWithIdleExpired();

		// walk phase is already set, another update shouldn't change phase
		behavior.update(Duration.ONE_FRAME);

		expect(behavior.state().hasAnimationPhaseChanged).toBe(false);
	});

	it("should defer walk-to-idle transition until notifyAnimationCycleComplete", () => {
		const behavior = givenBehaviorWithIdleExpired();

		// Walk to bound
		behavior.update(Duration.fromMilliseconds(1_500));

		// Should still report "walk" until animation cycle completes
		expect(behavior.state().animationPhase).toBe("walk");
	});

	it("should apply pending idle after notifyAnimationCycleComplete", () => {
		const behavior = givenBehaviorWithIdleExpired();

		// Walk to bound (triggers pending idle)
		behavior.update(Duration.fromMilliseconds(1_500));
		behavior.notifyAnimationCycleComplete();

		const state = behavior.state();
		expect(state.animationPhase).toBe("idle");
		expect(state.hasAnimationPhaseChanged).toBe(true);
	});

	it("should report isFacingLeft when direction is left", () => {
		const behavior = givenBehaviorWithIdleExpired();

		// Walk to right bound, idle, then walk left
		behavior.update(Duration.fromMilliseconds(1_500));
		behavior.notifyAnimationCycleComplete();
		behavior.update(Duration.fromMilliseconds(3_000));

		expect(behavior.state().isFacingLeft).toBe(true);
	});

	it("should not report isFacingLeft when direction is right", () => {
		const behavior = givenBehaviorWithIdleExpired();

		expect(behavior.state().isFacingLeft).toBe(false);
	});
});

function givenBehaviorWithIdleExpired(): ClientBehavior {
	const random = new FixedRandomGenerator();
	random.setNextFloatRangeResult(2000);
	const behavior = new ClientBehavior(MIN_X, MAX_X, random);
	behavior.update(Duration.fromMilliseconds(2_001));
	// Clear the hasAnimationPhaseChanged flag by reading state
	behavior.state();
	return behavior;
}

function givenClientBehavior(): ClientBehavior {
	const random = new FixedRandomGenerator();
	random.setNextFloatRangeResult(5_000);
	return new ClientBehavior(MIN_X, MAX_X, random);
}
