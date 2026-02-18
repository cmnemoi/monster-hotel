import { BedroomLayout } from "#phaser/domain/BedroomLayout";
import {
	GRID_CELL_HEIGHT,
	GRID_CELL_WIDTH,
} from "#phaser/domain/GridConstants";
import type { Room } from "#phaser/domain/Hotel";
import type { HotelGrid } from "#phaser/domain/HotelGrid";
import { Origin } from "#phaser/domain/Origin";
import { ImageCatalog } from "#phaser/game/config/ImageCatalog";
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
		gridSpan: 1,
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
		this.updateLayout({ room, gridSpan: 1 });
	}

	private buildVisuals() {
		this.base = PhaserImage.create(this, {
			assetConfig: ImageCatalog.baseRoom,
		}).withOrigin(Origin.BOTTOM_LEFT);

		this.vignette = PhaserImage.create(this, {
			assetConfig: ImageCatalog.roomVignetage,
			position: { x: 0, y: -GRID_CELL_HEIGHT },
		}).withOrigin(Origin.TOP_LEFT);

		this.topWall = PhaserImage.create(this, {
			assetConfig: ImageCatalog.topWall,
			position: { x: 0, y: -GRID_CELL_HEIGHT },
		}).withOrigin(Origin.TOP_LEFT);

		this.leftWall = PhaserImage.create(this, {
			assetConfig: ImageCatalog.leftWall,
			position: { x: 0, y: -GRID_CELL_HEIGHT },
		}).withOrigin(Origin.TOP_LEFT);

		this.rightWall = PhaserImage.create(this, {
			assetConfig: ImageCatalog.rightWall,
			position: { x: GRID_CELL_WIDTH, y: -GRID_CELL_HEIGHT },
		}).withOrigin(Origin.TOP_RIGHT);

		this.bottomPad = PhaserImage.create(this, {
			assetConfig: ImageCatalog.squareBlue,
		}).withOrigin(Origin.BOTTOM_LEFT);
	}

	private updateLayout({ room, gridSpan }: { room: Room; gridSpan: number }) {
		this.layout = BedroomLayout.fromRoom({
			room,
			gridSpan,
		});
		this.applyLayout();
		this.updateClient(room);
	}

	private applyLayout() {
		this.base
			.moveTo({ x: 0, y: 0 })
			.resize({ width: this.layout.width, height: this.layout.height });

		this.vignette
			.moveTo({ x: 0, y: -this.layout.height })
			.resize({ width: this.layout.width, height: this.layout.height });

		this.topWall
			.moveTo({ x: 0, y: -this.layout.height })
			.resize({ width: this.layout.width });

		this.leftWall
			.moveTo({ x: 0, y: -this.layout.height })
			.resize({ height: this.layout.height });

		this.rightWall
			.moveTo({ x: this.layout.width, y: -this.layout.height })
			.resize({ height: this.layout.height });

		this.bottomPad
			.moveTo({ x: 0, y: 0 })
			.resize({ width: this.layout.width, height: PADDING });
	}

	public updateState(room: Room) {
		this.updateLayout({ room, gridSpan: 1 });
	}

	public override update(time: number, delta: number) {
		this.clientSprite?.update(time, delta);
	}

	public getWorldBounds(): Phaser.Geom.Rectangle {
		return new Phaser.Geom.Rectangle(
			this.x,
			this.y - this.layout.height,
			this.layout.width,
			this.layout.height,
		);
	}

	private updateClient(room: Room) {
		if (this.layout.containsClient && room.client && !this.clientSprite) {
			this.clientSprite = ClientSprite.create(this.scene, {
				clientType: room.client.type,
				containerWidth: GRID_CELL_WIDTH,
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
