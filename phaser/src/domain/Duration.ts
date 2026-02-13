/**
 * Value Object representing a duration of time.
 */
export class Duration {
	private constructor(private readonly milliseconds: number) {}

	static ONE_FRAME = Duration.fromFrames({ frames: 1 });

	/**
	 * Create a Duration from a number of milliseconds.
	 */
	static fromMilliseconds(milliseconds: number): Duration {
		return new Duration(milliseconds);
	}

	/**
	 * Return a new Duration with the other duration subtracted.
	 */
	subtract(other: Duration): Duration {
		return new Duration(this.milliseconds - other.milliseconds);
	}

	/**
	 * Return true if there is remaining time (duration is positive).
	 */
	isRemaining(): boolean {
		return this.milliseconds > 0;
	}

	/**
	 * Return the duration in milliseconds.
	 */
	toMilliseconds(): number {
		return this.milliseconds;
	}

	private static fromFrames({
		frames,
		fps = 60,
	}: {
		frames: number;
		fps?: number;
	}): Duration {
		return new Duration((frames * 1_000) / fps);
	}
}
