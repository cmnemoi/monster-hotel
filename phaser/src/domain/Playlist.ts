import type { Music } from "#phaser/domain/Music";
import type { MusicRepository } from "#phaser/domain/MusicRepository";

export class Playlist {
	private tracks: Music[] = [];
	private repository: MusicRepository;
	private currentIndex = 0;

	constructor(repository: MusicRepository) {
		this.repository = repository;
	}

	build(trackKeys: string[]): void {
		this.tracks = trackKeys.map((key) => this.repository.get(key));
		this.tracks.forEach((track, index) => {
			track.onComplete(() => {
				this.playNext(index);
			});
		});
	}

	play(): void {
		const firstTrack = this.tracks[0];
		if (!firstTrack) {
			return;
		}
		this.currentIndex = 0;
		firstTrack.play();
	}

	pause(): void {
		const currentTrack = this.tracks[this.currentIndex];
		if (!currentTrack) {
			return;
		}
		currentTrack.pause();
	}

	private playNext(currentIndex: number): void {
		if (this.tracks.length === 0) {
			return;
		}
		const nextIndex = (currentIndex + 1) % this.tracks.length;
		this.currentIndex = nextIndex;
		const nextTrack = this.tracks[nextIndex];
		if (!nextTrack) {
			return;
		}
		nextTrack.play();
	}
}
