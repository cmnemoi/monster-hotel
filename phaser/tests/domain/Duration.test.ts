import { describe, expect, it } from "vitest";
import { Duration } from "#phaser/domain/Duration";

describe("Duration", () => {
	it("should create a duration from milliseconds", () => {
		const duration = Duration.fromMilliseconds(1000);

		expect(duration.toMilliseconds()).toBe(1000);
	});

	it("should subtract two durations", () => {
		const duration = Duration.fromMilliseconds(5000);

		const result = duration.subtract(Duration.fromMilliseconds(2000));

		expect(result.toMilliseconds()).toBe(3000);
	});

	describe("isRemaining", () => {
		it("should have remaining time when positive", () => {
			const duration = Duration.fromMilliseconds(1);

			expect(duration.isRemaining()).toBe(true);
		});

		it("should not have remaining time when zero", () => {
			const duration = Duration.fromMilliseconds(0);

			expect(duration.isRemaining()).toBe(false);
		});

		it("should not have remaining time when negative", () => {
			const duration = Duration.fromMilliseconds(-1);

			expect(duration.isRemaining()).toBe(false);
		});
	});
});
