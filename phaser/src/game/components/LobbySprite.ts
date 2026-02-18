import {
	GRID_CELL_HEIGHT,
	GRID_CELL_WIDTH,
} from "#phaser/domain/GridConstants";
import type { ClientInQueue, Room } from "#phaser/domain/Hotel";
import type { HotelGrid } from "#phaser/domain/HotelGrid";
import { LobbyLayout } from "#phaser/domain/LobbyLayout";
import { Origin } from "#phaser/domain/Origin";
import type { WorldPosition } from "#phaser/domain/Position";
import {
	CLIENT_SPRITE_REGISTRY,
	type ClientSpriteConfig,
} from "#phaser/game/config/ClientSpriteRegistry";
import { ImageCatalog } from "#phaser/game/config/ImageCatalog";
import { SpriteCatalog } from "#phaser/game/config/SpriteCatalog";
import { PhaserImage } from "./PhaserImage";
import { PhaserSprite } from "./PhaserSprite";
import { RoomSprite } from "./RoomSprite";

const PADDING = 10;

const GROOM_CHAIR_OFFSET_Y = 55;

export class LobbySprite extends RoomSprite {
	private readonly layout: LobbyLayout;
	private readonly clientQueue: ClientInQueue[];
	private readonly queueClientSprites: Phaser.GameObjects.Sprite[] = [];

	constructor({
		scene,
		room,
		hotelGrid,
		clientQueue = [],
	}: {
		scene: Phaser.Scene;
		room: Room;
		hotelGrid: HotelGrid;
		clientQueue?: ClientInQueue[];
	}) {
		super({ scene, room, hotelGrid });
		this.clientQueue = clientQueue;
		this.layout = LobbyLayout.fromQueue(clientQueue.length);

		this.buildBackground();
		this.buildGroomCat();
		this.buildDesk();
		this.buildDecorations();
		this.buildWaitingQueue();
		this.buildQueueClients();

		this.setGridPosition(room.position);
	}

	public updateState(_room: Room): void {}

	public override update(_time: number, _delta: number): void {}

	public getWorldBounds(): Phaser.Geom.Rectangle {
		return new Phaser.Geom.Rectangle(
			this.x,
			this.y - GRID_CELL_HEIGHT,
			this.layout.totalWidth,
			GRID_CELL_HEIGHT,
		);
	}

	private buildBackground() {
		PhaserImage.create(this, {
			assetConfig: ImageCatalog.roomLobby,
		}).withOrigin(Origin.BOTTOM_LEFT);

		if (this.layout.tiledWallWidth > 0) {
			PhaserImage.create(this, {
				assetConfig: ImageCatalog.lobbyWallTile,
				position: { x: GRID_CELL_WIDTH, y: 0 },
			})
				.withOrigin(Origin.BOTTOM_LEFT)
				.withDisplaySize({
					width: this.layout.tiledWallWidth,
					height: GRID_CELL_HEIGHT,
				});
		}

		PhaserImage.create(this, {
			assetConfig: ImageCatalog.lobbyEndPillar,
			position: { x: this.layout.totalWidth, y: -GRID_CELL_HEIGHT },
		}).withOrigin(Origin.TOP_RIGHT);

		PhaserImage.create(this, { assetConfig: ImageCatalog.squareBlue })
			.withOrigin(Origin.BOTTOM_LEFT)
			.withDisplaySize({ width: this.layout.totalWidth, height: PADDING });
	}

	private buildDesk() {
		PhaserImage.create(this, {
			assetConfig: ImageCatalog.lobbyDesk,
			position: { x: 55, y: -PADDING },
		}).withOrigin(Origin.BOTTOM_LEFT);
	}

	private buildGroomCat() {
		PhaserSprite.create(this, {
			entry: SpriteCatalog.groomCat,
			position: { x: 100, y: -PADDING - GROOM_CHAIR_OFFSET_Y },
		})
			.withOrigin(Origin.BOTTOM_CENTER)
			.playIdle();
	}

	private buildDecorations() {
		for (const position of this.layout.visiblePillars) {
			PhaserImage.create(this, {
				assetConfig: ImageCatalog.lobbyPillar,
				position: { x: position.x, y: -PADDING },
			}).withOrigin(Origin.BOTTOM_CENTER);
		}

		for (const position of this.layout.visibleWindows) {
			PhaserImage.create(this, {
				assetConfig: ImageCatalog.lobbyWindow,
				position: { x: position.x, y: -GRID_CELL_HEIGHT + 15 },
			})
				.withOrigin(Origin.TOP_CENTER)
				.withScale({ x: 0.8 });
		}
	}

	private buildWaitingQueue() {
		for (const slot of this.layout.queueSlots) {
			PhaserImage.create(this, {
				assetConfig: ImageCatalog.lobbyWaitingPillar,
				position: { x: slot.pillarPosition.x, y: -PADDING },
			}).withOrigin(Origin.BOTTOM_CENTER);

			if (slot.hasTile) {
				PhaserImage.create(this, {
					assetConfig: ImageCatalog.lobbyWaitingTile,
					position: { x: slot.tilePosition.x, y: -55 - PADDING },
				})
					.withOrigin(Origin.BOTTOM_LEFT)
					.withDisplaySize({ width: this.layout.slotWidth });
			}
		}
	}

	private buildQueueClients() {
		for (let index = 0; index < this.clientQueue.length; index++) {
			const client = this.clientQueue[index];
			if (!client) continue;
			const config = CLIENT_SPRITE_REGISTRY[client.type];
			if (!config) continue;

			const slot = this.layout.queueSlots[index];
			if (!slot) continue;
			const sprite = this.createQueueClientSprite({
				config,
				position: slot.clientPosition,
			});
			this.queueClientSprites.push(sprite);
		}
	}

	private createQueueClientSprite({
		config,
		position,
	}: {
		config: ClientSpriteConfig;
		position: WorldPosition;
	}): Phaser.GameObjects.Sprite {
		return PhaserSprite.create(this, {
			entry: config.sprite,
			position: { x: position.x, y: -PADDING },
		})
			.withOrigin(Origin.BOTTOM_CENTER)
			.withScale({ x: config.scale })
			.facingLeft()
			.playIdle().gameObject;
	}
}
