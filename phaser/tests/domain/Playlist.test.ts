import { describe, expect, it } from "vitest";
import type { Music } from "#phaser/domain/Music";
import type { MusicRepository } from "#phaser/domain/MusicRepository";
import { Playlist } from "#phaser/domain/Playlist";

class FakeMusic implements Music {
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

class FakeMusicRepository implements MusicRepository {
	private readonly tracks = new Map<string, FakeMusic>();

	constructor(keys: string[]) {
		for (const key of keys) {
			this.tracks.set(key, new FakeMusic());
		}
	}

	get(key: string): Music {
		return this.getTrack(key);
	}

	getTrack(key: string): FakeMusic {
		const track = this.tracks.get(key);
		if (!track) {
			throw new Error(`Missing track: ${key}`);
		}
		return track;
	}
}

describe("Playlist", () => {
	it("plays the first track on play", () => {
		const keys = ["intro", "music_1", "music_2"];
		const repository = new FakeMusicRepository(keys);
		const playlist = new Playlist(repository);
		playlist.build(keys);

		playlist.play();

		expect(repository.getTrack("intro").playCount).toBe(1);
		expect(repository.getTrack("music_1").playCount).toBe(0);
		expect(repository.getTrack("music_2").playCount).toBe(0);
	});

	it("advances to the next track when one completes", () => {
		const keys = ["intro", "music_1", "music_2"];
		const repository = new FakeMusicRepository(keys);
		const playlist = new Playlist(repository);
		playlist.build(keys);

		playlist.play();
		repository.getTrack("intro").triggerComplete();

		expect(repository.getTrack("music_1").playCount).toBe(1);
	});

	it("loops back to the first track after the last completes", () => {
		const keys = ["intro", "music_1", "music_2"];
		const repository = new FakeMusicRepository(keys);
		const playlist = new Playlist(repository);
		playlist.build(keys);

		playlist.play();
		repository.getTrack("intro").triggerComplete();
		repository.getTrack("music_1").triggerComplete();
		repository.getTrack("music_2").triggerComplete();

		expect(repository.getTrack("intro").playCount).toBe(2);
	});

	it("pauses the current track", () => {
		const keys = ["intro", "music_1", "music_2"];
		const repository = new FakeMusicRepository(keys);
		const playlist = new Playlist(repository);
		playlist.build(keys);

		playlist.play();
		repository.getTrack("intro").triggerComplete();
		playlist.pause();

		expect(repository.getTrack("intro").pauseCount).toBe(0);
		expect(repository.getTrack("music_1").pauseCount).toBe(1);
	});
});
