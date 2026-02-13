/**
 * Generic collection providing safe element access.
 */
export class Collection<T> {
	private constructor(private readonly elements: T[]) {}

	/**
	 * Create a Collection from an array.
	 */
	static fromArray<T>(elements: T[]): Collection<T> {
		return new Collection([...elements]);
	}

	/**
	 * Return the first element, or throw if the collection is empty.
	 */
	firstOrThrow(): T {
		const element = this.first();
		if (element === undefined) {
			throw new Error("Collection is empty");
		}
		return element;
	}

	/**
	 * Return the element at the given 1-indexed position, or throw if not found.
	 */
	getOrThrow(position: number): T {
		const element = this.get(position);
		if (element === undefined) {
			throw new Error(`No element at position ${position}`);
		}
		return element;
	}

	/**
	 * Return a new Collection with each element transformed by the callback.
	 */
	map<U>(callback: (element: T) => U): Collection<U> {
		return new Collection(this.elements.map(callback));
	}

	/**
	 * Return a new Collection with only elements matching the predicate.
	 */
	filter(predicate: (element: T) => boolean): Collection<T> {
		return new Collection(this.elements.filter(predicate));
	}

	/**
	 * Execute a callback for each element.
	 */
	forEach(callback: (element: T, index: number) => void): void {
		this.elements.forEach(callback);
	}

	/**
	 * Reduce the collection to a single value.
	 */
	reduce<U>(callback: (accumulator: U, element: T) => U, initial: U): U {
		return this.elements.reduce(callback, initial);
	}

	/**
	 * Return the number of elements in the collection.
	 */
	get length(): number {
		return this.elements.length;
	}

	/**
	 * Return true if the collection has no elements.
	 */
	isEmpty(): boolean {
		return this.length === 0;
	}

	[Symbol.iterator](): Iterator<T> {
		return this.elements[Symbol.iterator]();
	}

	/**
	 * Return the element at the given 0-indexed position, or undefined if out of bounds.
	 */
	private get(index: number): T | undefined {
		if (index < 0 || index >= this.elements.length) {
			return undefined;
		}
		return this.elements[index];
	}

	/**
	 * Return the first element, or undefined if the collection is empty.
	 */
	private first(): T | undefined {
		return this.elements[0];
	}
}
