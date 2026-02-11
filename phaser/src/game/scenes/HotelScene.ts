import { Playlist } from "#phaser/domain/Playlist";
import { PhaserMusicRepository } from "#phaser/game/repositories/PhaserMusicRepository";
import type { Hotel } from "#phaser/models";
import { BackgroundSprite } from "../components/BackgroundSprite";
import { HotelSprite } from "../components/HotelSprite";
import { CameraController } from "../controller/CameraController";

export class HotelScene extends Phaser.Scene {
	private hotel!: Hotel;
	private playlist!: Playlist;
	private backgroundSprite!: BackgroundSprite;
	private hotelSprite!: HotelSprite;
	private cameraController!: CameraController;

	constructor() {
		super("HotelScene");
	}

	init() {
		this.hotel = this.game.registry.get("hotel");
		this.playlist = new Playlist(new PhaserMusicRepository(this));
		this.hotelSprite = new HotelSprite(this);
		this.cameraController = new CameraController(this);
		this.playlist.build(["intro_music", "music_1", "music_2", "music_3"]);
	}

	create() {
		this.backgroundSprite = new BackgroundSprite(this);
		this.playlist.play();

		this.hotelSprite.applyState(this.hotel);
		this.refreshCamera();
		this.backgroundSprite.resize();

		this.scale.on("resize", () => {
			this.refreshCamera();
			this.backgroundSprite.resize();
		});

		this.sound.pauseOnBlur = false;
	}

	override update(time: number, delta: number) {
		this.hotelSprite.update(time, delta);
	}

	private refreshCamera() {
		const rectangle = this.hotelSprite.computeWorldBounds();
		this.cameraController.fitAndCenter(rectangle);
	}
}
