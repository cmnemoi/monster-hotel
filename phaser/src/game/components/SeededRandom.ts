/**
 * Deterministic pseudo-random number generator using the mulberry32 algorithm.
 * Produces repeatable sequences from a given seed, used for facade decoration
 * so that the same hotel layout always renders with the same random variations.
 */
export class SeededRandom {
	private state: number;

	constructor(seed: number) {
		this.state = seed;
	}

	/**
	 * Reinitialize the PRNG with a new seed.
	 */
	public initSeed(seed: number): void {
		this.state = seed;
	}

	/**
	 * Return the next pseudo-random float in [0, 1).
	 */
	public next(): number {
		this.state |= 0;
		this.state = (this.state + 0x6d2b79f5) | 0;
		let temporary = Math.imul(this.state ^ (this.state >>> 15), 1 | this.state);
		temporary =
			(temporary + Math.imul(temporary ^ (temporary >>> 7), 61 | temporary)) ^
			temporary;
		return ((temporary ^ (temporary >>> 14)) >>> 0) / 4294967296;
	}

	/**
	 * Return a random integer in [min, max] inclusive.
	 */
	public intRange(min: number, max: number): number {
		return Math.floor(this.next() * (max - min + 1)) + min;
	}

	/**
	 * Return a random float in [min, max).
	 */
	public floatRange(min: number, max: number): number {
		return this.next() * (max - min) + min;
	}

	/**
	 * Pick a random element from the given array.
	 */
	public pick<T>(items: readonly T[]): T {
		const index = this.intRange(0, items.length - 1);
		return items[index] as T;
	}
}
