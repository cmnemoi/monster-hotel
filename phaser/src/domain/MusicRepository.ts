import type { Music } from "#phaser/domain/Music";

export interface MusicRepository {
	get(key: string): Music;
}
