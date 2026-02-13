/**
 * Port for generating pseudo-random numbers.
 * Implementations can be seeded for determinism or fixed for testing.
 */
export interface RandomGenerator {
	/**
	 * Return the next pseudo-random float in [0, 1).
	 */
	next(): number;

	/**
	 * Return a random integer in [min, max] inclusive.
	 */
	intRange({ min, max }: { min: number; max: number }): number;

	/**
	 * Return a random float in [min, max).
	 */
	floatRange({ min, max }: { min: number; max: number }): number;

	/**
	 * Pick a random element from the given array.
	 */
	pick<T>(items: readonly T[]): T;
}
