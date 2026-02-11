import type { Room } from "#phaser/models";
import { ROOM_HEIGHT, ROOM_WIDTH } from "../constants";
import { ClientSprite } from "./ClientSprite";
import { RoomSprite } from "./RoomSprite";

const PADDING = 10;
const ROOM_ATLAS_KEY = "rooms0";
const TILES_ATLAS_KEY = "tilesheet0";

/**
 * Visual representation of a bedroom (standard hotel room).
 */
export class BedroomSprite extends RoomSprite {
	private base!: Phaser.GameObjects.Image;
	private vignette!: Phaser.GameObjects.Image;
	private wallTop!: Phaser.GameObjects.Image;
	private wallLeft!: Phaser.GameObjects.Image;
	private wallRight!: Phaser.GameObjects.Image;
	private bottomPad!: Phaser.GameObjects.Image;

	private roomWidthInPixels: number = ROOM_WIDTH;
	private roomHeightInPixels: number = ROOM_HEIGHT;

	private clientView?: ClientSprite | undefined;

	constructor(scene: Phaser.Scene, room: Room) {
		super(scene, room);
		this.buildVisuals();
		this.setGridPosition(room.position);
		this.setRoomSize(1);
		this.updateState(room);
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

	private setRoomSize(roomSize: number) {
		this.roomWidthInPixels = ROOM_WIDTH * roomSize;
		this.roomHeightInPixels = ROOM_HEIGHT;
		this.applyLayout();
	}

	private applyLayout() {
		this.base.displayWidth = this.roomWidthInPixels;
		this.base.displayHeight = this.roomHeightInPixels;
		this.base.setPosition(0, 0);

		this.vignette.setPosition(0, -this.roomHeightInPixels);
		this.vignette.displayWidth = this.roomWidthInPixels;
		this.vignette.displayHeight = this.roomHeightInPixels;

		this.wallTop.setPosition(0, -this.roomHeightInPixels);
		this.wallTop.displayWidth = this.roomWidthInPixels;

		this.wallLeft.setPosition(0, -this.roomHeightInPixels);
		this.wallLeft.displayHeight = this.roomHeightInPixels;

		this.wallRight.setPosition(
			this.roomWidthInPixels,
			-this.roomHeightInPixels,
		);
		this.wallRight.displayHeight = this.roomHeightInPixels;

		this.bottomPad.setPosition(0, 0);
		this.bottomPad.displayWidth = this.roomWidthInPixels;
		this.bottomPad.displayHeight = PADDING;
	}

	public updateState(room: Room) {
		if (room.client && !this.clientView) {
			this.clientView = ClientSprite.create(this.scene, {
				clientType: room.client.type,
				roomWidth: ROOM_WIDTH,
				roomPadding: PADDING,
			});

			if (this.clientView) {
				this.add(this.clientView);
			}
		}

		if (!room.client && this.clientView) {
			this.clientView.destroy();
			this.clientView = undefined;
		}
	}

	public override update(time: number, delta: number) {
		this.clientView?.update(time, delta);
	}

	public getWorldBounds(): Phaser.Geom.Rectangle {
		return new Phaser.Geom.Rectangle(
			this.x,
			this.y - this.roomHeightInPixels,
			this.roomWidthInPixels,
			this.roomHeightInPixels,
		);
	}
}
