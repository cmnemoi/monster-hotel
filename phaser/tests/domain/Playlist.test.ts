import { describe, expect, it } from "vitest";
import { Playlist } from "#phaser/domain/Playlist";
import { FakeMusicRepository } from "../test-doubles/FakeMusicRepository.js";

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
