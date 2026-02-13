import type { Hotel } from "#phaser/domain/Hotel";
import { HotelGrid } from "#phaser/domain/HotelGrid";
import { Playlist } from "#phaser/domain/Playlist";
import { PhaserMusicRepository } from "#phaser/game/repositories/PhaserMusicRepository";
import { BackgroundSprite } from "../components/BackgroundSprite";
import { HotelSprite } from "../components/HotelSprite";
import { ROOM_HEIGHT, ROOM_WIDTH } from "../constants";
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
		this.playlist.build(["intro_music", "music_1", "music_2", "music_3"]);

		this.cameraController = new CameraController(this);
		this.backgroundSprite = new BackgroundSprite(this);
		this.hotelSprite = new HotelSprite(
			this,
			new HotelGrid(ROOM_WIDTH, ROOM_HEIGHT),
		);

		this.add.existing(this.backgroundSprite);
		this.add.existing(this.hotelSprite);
	}

	create() {
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
