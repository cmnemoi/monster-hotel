import { describe, expect, it } from "vitest";
import { SeededRandom } from "#phaser/domain/SeededRandom";

describe("SeededRandom", () => {
	it("should produce deterministic values for the same seed", () => {
		const randomA = new SeededRandom(42);
		const randomB = new SeededRandom(42);

		const valuesA = [randomA.next(), randomA.next(), randomA.next()];
		const valuesB = [randomB.next(), randomB.next(), randomB.next()];

		expect(valuesA).toEqual(valuesB);
	});

	it("should produce different values for different seeds", () => {
		const randomA = new SeededRandom(42);
		const randomB = new SeededRandom(99);

		expect(randomA.next()).not.toEqual(randomB.next());
	});

	it("should return values between 0 inclusive and 1 exclusive", () => {
		const random = new SeededRandom(123);

		for (let index = 0; index < 100; index++) {
			const value = random.next();
			expect(value).toBeGreaterThanOrEqual(0);
			expect(value).toBeLessThan(1);
		}
	});

	it("should return an integer in the given range inclusive", () => {
		const random = new SeededRandom(42);

		for (let index = 0; index < 100; index++) {
			const value = random.intRange({ min: 3, max: 7 });
			expect(value).toBeGreaterThanOrEqual(3);
			expect(value).toBeLessThanOrEqual(7);
			expect(Number.isInteger(value)).toBe(true);
		}
	});

	it("should return a float in the given range", () => {
		const random = new SeededRandom(42);

		for (let index = 0; index < 100; index++) {
			const value = random.floatRange({ min: 0.6, max: 1.2 });
			expect(value).toBeGreaterThanOrEqual(0.6);
			expect(value).toBeLessThan(1.2);
		}
	});

	it("should pick a random element from an array", () => {
		const random = new SeededRandom(42);
		const items = ["a", "b", "c", "d"];

		const picked = random.pick(items);

		expect(items).toContain(picked);
	});

	it("should pick deterministically from an array for the same seed", () => {
		const randomA = new SeededRandom(42);
		const randomB = new SeededRandom(42);
		const items = ["a", "b", "c", "d"];

		expect(randomA.pick(items)).toEqual(randomB.pick(items));
	});

	it("should reinitialize with a new seed", () => {
		const random = new SeededRandom(42);
		const firstValue = random.next();

		random.initSeed(42);
		const secondValue = random.next();

		expect(firstValue).toEqual(secondValue);
	});
});
