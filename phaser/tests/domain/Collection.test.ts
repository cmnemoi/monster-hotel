import { describe, expect, it } from "vitest";
import { Collection } from "#phaser/domain/Collection";

describe("Collection", () => {
	describe("first", () => {
		it("should return the first element", () => {
			const collection = Collection.fromArray([10, 20, 30]);

			expect(collection.first()).toBe(10);
		});

		it("should return undefined when empty", () => {
			const collection = Collection.fromArray<number>([]);

			expect(collection.first()).toBeUndefined();
		});
	});

	describe("get", () => {
		it("should return the element at given 0-indexed position", () => {
			const collection = Collection.fromArray(["a", "b", "c"]);

			expect(collection.get(0)).toBe("a");
			expect(collection.get(1)).toBe("b");
			expect(collection.get(2)).toBe("c");
		});

		it("should return undefined when index is out of bounds", () => {
			const collection = Collection.fromArray([1, 2]);

			expect(collection.get(-1)).toBeUndefined();
			expect(collection.get(2)).toBeUndefined();
		});

		it("should return undefined when collection is empty", () => {
			const collection = Collection.fromArray<number>([]);

			expect(collection.get(0)).toBeUndefined();
		});
	});

	describe("firstOrThrow", () => {
		it("should return the first element", () => {
			const collection = Collection.fromArray([10, 20, 30]);

			expect(collection.firstOrThrow()).toBe(10);
		});

		it("should throw when collection is empty", () => {
			const collection = Collection.fromArray([]);

			expect(() => collection.firstOrThrow()).toThrow("Collection is empty");
		});
	});

	describe("getOrThrow", () => {
		it("should return the element at given 0-indexed position", () => {
			const collection = Collection.fromArray(["a", "b", "c"]);

			expect(collection.getOrThrow(1)).toBe("b");
		});

		it("should throw when index is out of bounds", () => {
			const collection = Collection.fromArray([1, 2]);

			expect(() => collection.getOrThrow(-1)).toThrow(
				"No element at position -1",
			);
			expect(() => collection.getOrThrow(2)).toThrow(
				"No element at position 2",
			);
		});

		it("should throw when collection is empty", () => {
			const collection = Collection.fromArray<number>([]);

			expect(() => collection.getOrThrow(0)).toThrow(
				"No element at position 0",
			);
		});
	});

	describe("iterable", () => {
		it("should support for...of iteration", () => {
			const collection = Collection.fromArray([1, 2, 3]);
			const result: number[] = [];

			for (const element of collection) {
				result.push(element);
			}

			expect(result).toEqual([1, 2, 3]);
		});

		it("should support spread operator", () => {
			const collection = Collection.fromArray([1, 2, 3]);

			expect([...collection]).toEqual([1, 2, 3]);
		});

		it("should produce no values when empty", () => {
			const collection = Collection.fromArray<number>([]);

			expect([...collection]).toEqual([]);
		});
	});

	describe("map", () => {
		it("should transform each element", () => {
			const collection = Collection.fromArray([1, 2, 3]);

			const result = collection.map((element) => element * 2);

			expect([...result]).toEqual([2, 4, 6]);
		});

		it("should return an empty collection when empty", () => {
			const collection = Collection.fromArray<number>([]);

			const result = collection.map((element) => element * 2);

			expect(result.isEmpty()).toBe(true);
		});
	});

	describe("filter", () => {
		it("should keep elements matching the predicate", () => {
			const collection = Collection.fromArray([1, 2, 3, 4]);

			const result = collection.filter((element) => element % 2 === 0);

			expect([...result]).toEqual([2, 4]);
		});

		it("should return an empty collection when none match", () => {
			const collection = Collection.fromArray([1, 3, 5]);

			const result = collection.filter((element) => element % 2 === 0);

			expect(result.isEmpty()).toBe(true);
		});
	});

	describe("reduce", () => {
		it("should accumulate elements into a single value", () => {
			const collection = Collection.fromArray([1, 2, 3]);

			const result = collection.reduce(
				(accumulator, element) => accumulator + element,
				0,
			);

			expect(result).toBe(6);
		});

		it("should return initial value when empty", () => {
			const collection = Collection.fromArray<number>([]);

			const result = collection.reduce(
				(accumulator, element) => accumulator + element,
				42,
			);

			expect(result).toBe(42);
		});
	});

	describe("forEach", () => {
		it("should execute callback for each element", () => {
			const collection = Collection.fromArray([1, 2, 3]);
			const result: number[] = [];

			collection.forEach((element) => result.push(element));

			expect(result).toEqual([1, 2, 3]);
		});

		it("should pass the index to the callback", () => {
			const collection = Collection.fromArray(["a", "b", "c"]);
			const indices: number[] = [];

			collection.forEach((_element, index) => indices.push(index));

			expect(indices).toEqual([0, 1, 2]);
		});

		it("should not execute callback when empty", () => {
			const collection = Collection.fromArray<number>([]);
			const result: number[] = [];

			collection.forEach((element) => result.push(element));

			expect(result).toEqual([]);
		});
	});

	describe("length", () => {
		it("should return the number of elements", () => {
			const collection = Collection.fromArray([1, 2, 3]);

			expect(collection.length).toBe(3);
		});

		it("should return zero when empty", () => {
			const collection = Collection.fromArray([]);

			expect(collection.length).toBe(0);
		});
	});

	describe("isEmpty", () => {
		it("should return true when collection has no elements", () => {
			const collection = Collection.fromArray([]);

			expect(collection.isEmpty()).toBe(true);
		});

		it("should return false when collection has elements", () => {
			const collection = Collection.fromArray([1]);

			expect(collection.isEmpty()).toBe(false);
		});
	});
});
