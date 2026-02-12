import { BedroomLayout } from "#phaser/domain/BedroomLayout";
import type { Room } from "#phaser/domain/Hotel";
import type { HotelGrid } from "#phaser/domain/HotelGrid";
import { ROOM_HEIGHT, ROOM_WIDTH } from "../constants";
import { ClientSprite } from "./ClientSprite";
import { RoomSprite } from "./RoomSprite";

const PADDING = 10;
const ROOM_ATLAS_KEY = "rooms0";
const TILES_ATLAS_KEY = "tilesheet0";

export class BedroomSprite extends RoomSprite {
	private base!: Phaser.GameObjects.Image;
	private vignette!: Phaser.GameObjects.Image;
	private wallTop!: Phaser.GameObjects.Image;
	private wallLeft!: Phaser.GameObjects.Image;
	private wallRight!: Phaser.GameObjects.Image;
	private bottomPad!: Phaser.GameObjects.Image;

	private layout = BedroomLayout.fromRoom(
		{ id: "", type: "bedroom", position: { x: 0, y: 0 }, client: null },
		1,
		ROOM_WIDTH,
		ROOM_HEIGHT,
	);

	private clientSprite?: ClientSprite | undefined;

	constructor(scene: Phaser.Scene, room: Room, hotelGrid: HotelGrid) {
		super(scene, room, hotelGrid);
		this.buildVisuals();
		this.setGridPosition(room.position);
		this.updateLayout(room, 1);
		scene.add.existing(this);
	}

	private buildVisuals() {
		this.base = this.scene.add.image(0, 0, ROOM_ATLAS_KEY, "roomNew");
		this.base.setOrigin(0, 1);
		this.add(this.base);

		this.vignette = this.scene.add.image(
			0,
			-ROOM_HEIGHT,
			TILES_ATLAS_KEY,
			"roomVignetage",
		);
		this.vignette.setOrigin(0, 0);
		this.add(this.vignette);

		this.wallTop = this.scene.add.image(
			0,
			-ROOM_HEIGHT,
			TILES_ATLAS_KEY,
			"wallTop/wallTop_0000",
		);
		this.wallTop.setOrigin(0, 0);
		this.add(this.wallTop);

		this.wallLeft = this.scene.add.image(
			0,
			-ROOM_HEIGHT,
			TILES_ATLAS_KEY,
			"wallLeft/wallLeft_0000",
		);
		this.wallLeft.setOrigin(0, 0);
		this.add(this.wallLeft);

		this.wallRight = this.scene.add.image(
			ROOM_WIDTH,
			-ROOM_HEIGHT,
			TILES_ATLAS_KEY,
			"wallRight/wallRight_0000",
		);
		this.wallRight.setOrigin(1, 0);
		this.add(this.wallRight);

		this.bottomPad = this.scene.add.image(0, 0, TILES_ATLAS_KEY, "squareBlue");
		this.bottomPad.setOrigin(0, 1);
		this.add(this.bottomPad);
	}

	private updateLayout(room: Room, roomSize: number) {
		this.layout = BedroomLayout.fromRoom(
			room,
			roomSize,
			ROOM_WIDTH,
			ROOM_HEIGHT,
		);
		this.applyLayout();
		this.updateClient(room);
	}

	private applyLayout() {
		this.base.displayWidth = this.layout.roomWidth;
		this.base.displayHeight = this.layout.roomHeight;
		this.base.setPosition(0, 0);

		this.vignette.setPosition(0, -this.layout.roomHeight);
		this.vignette.displayWidth = this.layout.roomWidth;
		this.vignette.displayHeight = this.layout.roomHeight;

		this.wallTop.setPosition(0, -this.layout.roomHeight);
		this.wallTop.displayWidth = this.layout.roomWidth;

		this.wallLeft.setPosition(0, -this.layout.roomHeight);
		this.wallLeft.displayHeight = this.layout.roomHeight;

		this.wallRight.setPosition(this.layout.roomWidth, -this.layout.roomHeight);
		this.wallRight.displayHeight = this.layout.roomHeight;

		this.bottomPad.setPosition(0, 0);
		this.bottomPad.displayWidth = this.layout.roomWidth;
		this.bottomPad.displayHeight = PADDING;
	}

	public updateState(room: Room) {
		this.updateLayout(room, 1);
	}

	public override update(time: number, delta: number) {
		this.clientSprite?.update(time, delta);
	}

	public getWorldBounds(): Phaser.Geom.Rectangle {
		return new Phaser.Geom.Rectangle(
			this.x,
			this.y - this.layout.roomHeight,
			this.layout.roomWidth,
			this.layout.roomHeight,
		);
	}

	private updateClient(room: Room) {
		if (this.layout.containsClient && !this.clientSprite) {
			this.clientSprite = ClientSprite.create(this.scene, {
				clientType: room.client?.type,
				roomWidth: ROOM_WIDTH,
				roomPadding: PADDING,
			});

			if (this.clientSprite) {
				this.add(this.clientSprite);
			}
		}

		if (!this.layout.containsClient && this.clientSprite) {
			this.clientSprite.destroy();
			this.clientSprite = undefined;
		}
	}
}
