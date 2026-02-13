import { Assets } from "#phaser/domain/Assets";
import { BedroomLayout } from "#phaser/domain/BedroomLayout";
import type { Room } from "#phaser/domain/Hotel";
import type { HotelGrid } from "#phaser/domain/HotelGrid";
import { Origin } from "#phaser/domain/Origin";
import { ROOM_HEIGHT, ROOM_WIDTH } from "../constants";
import { ClientSprite } from "./ClientSprite";
import { PhaserImage } from "./PhaserImage";
import { RoomSprite } from "./RoomSprite";

const PADDING = 10;

export class BedroomSprite extends RoomSprite {
	private base!: PhaserImage;
	private vignette!: PhaserImage;
	private topWall!: PhaserImage;
	private leftWall!: PhaserImage;
	private rightWall!: PhaserImage;
	private bottomPad!: PhaserImage;

	private layout = BedroomLayout.fromRoom({
		room: { id: "", type: "bedroom", position: { x: 0, y: 0 }, client: null },
		roomSize: 1,
		baseRoomWidth: ROOM_WIDTH,
		baseRoomHeight: ROOM_HEIGHT,
	});

	private clientSprite?: ClientSprite | undefined;

	constructor({
		scene,
		room,
		hotelGrid,
	}: { scene: Phaser.Scene; room: Room; hotelGrid: HotelGrid }) {
		super({ scene, room, hotelGrid });
		this.buildVisuals();
		this.setGridPosition(room.position);
		this.updateLayout({ room, roomSize: 1 });
	}

	private buildVisuals() {
		this.base = PhaserImage.create(this, {
			assetConfig: Assets.baseRoom,
		}).withOrigin(Origin.BOTTOM_LEFT);

		this.vignette = PhaserImage.create(this, {
			assetConfig: Assets.roomVignetage,
			position: { x: 0, y: -ROOM_HEIGHT },
		}).withOrigin(Origin.TOP_LEFT);

		this.topWall = PhaserImage.create(this, {
			assetConfig: Assets.topWall,
			position: { x: 0, y: -ROOM_HEIGHT },
		}).withOrigin(Origin.TOP_LEFT);

		this.leftWall = PhaserImage.create(this, {
			assetConfig: Assets.leftWall,
			position: { x: 0, y: -ROOM_HEIGHT },
		}).withOrigin(Origin.TOP_LEFT);

		this.rightWall = PhaserImage.create(this, {
			assetConfig: Assets.rightWall,
			position: { x: ROOM_WIDTH, y: -ROOM_HEIGHT },
		}).withOrigin(Origin.TOP_RIGHT);

		this.bottomPad = PhaserImage.create(this, {
			assetConfig: Assets.squareBlue,
		}).withOrigin(Origin.BOTTOM_LEFT);
	}

	private updateLayout({ room, roomSize }: { room: Room; roomSize: number }) {
		this.layout = BedroomLayout.fromRoom({
			room,
			roomSize,
			baseRoomWidth: ROOM_WIDTH,
			baseRoomHeight: ROOM_HEIGHT,
		});
		this.applyLayout();
		this.updateClient(room);
	}

	private applyLayout() {
		this.base
			.moveTo({ x: 0, y: 0 })
			.resize({ width: this.layout.roomWidth, height: this.layout.roomHeight });

		this.vignette
			.moveTo({ x: 0, y: -this.layout.roomHeight })
			.resize({ width: this.layout.roomWidth, height: this.layout.roomHeight });

		this.topWall
			.moveTo({ x: 0, y: -this.layout.roomHeight })
			.resize({ width: this.layout.roomWidth });

		this.leftWall
			.moveTo({ x: 0, y: -this.layout.roomHeight })
			.resize({ height: this.layout.roomHeight });

		this.rightWall
			.moveTo({ x: this.layout.roomWidth, y: -this.layout.roomHeight })
			.resize({ height: this.layout.roomHeight });

		this.bottomPad
			.moveTo({ x: 0, y: 0 })
			.resize({ width: this.layout.roomWidth, height: PADDING });
	}

	public updateState(room: Room) {
		this.updateLayout({ room, roomSize: 1 });
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
