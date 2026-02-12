import type { Music } from "#phaser/domain/Music";

export class FakeMusic implements Music {
	public playCount = 0;
	public pauseCount = 0;
	private readonly completeCallbacks: Array<() => void> = [];

	play(): void {
		this.playCount += 1;
	}

	pause(): void {
		this.pauseCount += 1;
	}

	onComplete(callback: () => void): void {
		this.completeCallbacks.push(callback);
	}

	triggerComplete(): void {
		for (const callback of this.completeCallbacks) {
			callback();
		}
	}
}
