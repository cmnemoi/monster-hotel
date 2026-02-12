import type { Music } from "#phaser/domain/Music";
import type { MusicRepository } from "#phaser/domain/MusicRepository";
import { FakeMusic } from "./FakeMusic.js";

export class FakeMusicRepository implements MusicRepository {
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
