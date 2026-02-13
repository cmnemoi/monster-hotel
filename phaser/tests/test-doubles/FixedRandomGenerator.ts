import type { RandomGenerator } from "#phaser/domain/RandomGenerator";

export class FixedRandomGenerator implements RandomGenerator {
	private floatRangeResults: number[] = [];
	private floatRangeIndex = 0;
	private intRangeResults: number[] = [];
	private intRangeIndex = 0;

	setNextFloatRangeResult(...results: number[]): void {
		this.floatRangeResults = results;
		this.floatRangeIndex = 0;
	}

	next(): number {
		return 0;
	}

	intRange(_min: number, _max: number): number {
		const value = this.intRangeResults[this.intRangeIndex] ?? 0;
		this.intRangeIndex =
			(this.intRangeIndex + 1) % Math.max(this.intRangeResults.length, 1);
		return value;
	}

	floatRange(_min: number, _max: number): number {
		const value = this.floatRangeResults[this.floatRangeIndex] ?? 0;
		this.floatRangeIndex =
			(this.floatRangeIndex + 1) % Math.max(this.floatRangeResults.length, 1);
		return value;
	}

	pick<T>(items: readonly T[]): T {
		const index = this.intRange(0, items.length - 1);
		return items[index] as T;
	}
}
