import type { Music } from "#phaser/domain/Music";
import type { MusicRepository } from "#phaser/domain/MusicRepository";

class PhaserMusic implements Music {
	public constructor(private readonly sound: Phaser.Sound.BaseSound) {}

	play(): void {
		this.sound.play();
	}

	pause(): void {
		this.sound.pause();
	}

	onComplete(callback: () => void): void {
		this.sound.on("complete", callback);
	}
}

export class PhaserMusicRepository implements MusicRepository {
	private readonly tracks = new Map<string, Music>();

	public constructor(private readonly scene: Phaser.Scene) {}

	get(key: string): Music {
		const existing = this.tracks.get(key);
		if (existing) {
			return existing;
		}

		const sound = this.scene.sound.add(key);
		const music = new PhaserMusic(sound);
		this.tracks.set(key, music);
		return music;
	}
}
