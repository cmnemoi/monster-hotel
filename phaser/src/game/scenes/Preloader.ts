import { Scene } from "phaser";
import { getAtlases, getImages } from "#phaser/game/assetManifest";

export class Preloader extends Scene {
	constructor() {
		super("Preloader");
	}

	init() {}

	preload() {
		for (const { key, pngUrl, xmlUrl } of getAtlases()) {
			this.load.atlasXML(key, pngUrl, xmlUrl);
		}

		for (const { key, pngUrl } of getImages()) {
			this.load.image(key, pngUrl);
		}

		this.load.audio("intro_music", "assets/music/music_intro.ogg");
		this.load.audio("music_1", "assets/music/music_radio1.ogg");
		this.load.audio("music_2", "assets/music/music_radio2.ogg");
		this.load.audio("music_3", "assets/music/music_radio3.ogg");
	}

	create() {
		this.scene.start("HotelScene");
	}
}
