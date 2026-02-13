import type { Music } from "#phaser/domain/Music";
import type { MusicRepository } from "#phaser/domain/MusicRepository";
import { Collection } from "./Collection";

export class Playlist {
	private tracks: Collection<Music> = Collection.fromArray([]);
	private repository: MusicRepository;
	private currentIndex = 0;

	constructor(repository: MusicRepository) {
		this.repository = repository;
	}

	build(trackKeys: string[]): void {
		this.tracks = Collection.fromArray(
			trackKeys.map((key) => this.repository.get(key)),
		);
		this.tracks.forEach((track, index) => {
			track.onComplete(() => {
				this.playNext(index);
			});
		});
	}

	play(): void {
		const firstTrack = this.tracks.firstOrThrow();
		this.currentIndex = 0;
		firstTrack.play();
	}

	pause(): void {
		const currentTrack = this.tracks.getOrThrow(this.currentIndex);
		currentTrack.pause();
	}

	private playNext(currentIndex: number): void {
		this.currentIndex = (currentIndex + 1) % this.tracks.length;
		const nextTrack = this.tracks.getOrThrow(this.currentIndex);
		nextTrack.play();
	}
}
