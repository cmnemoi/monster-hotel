import { Assets } from "#phaser/domain/Assets";
import {
	CLIENT_SPRITE_REGISTRY,
	type ClientSpriteConfig,
} from "#phaser/domain/ClientSpriteRegistry";
import type { ClientInQueue, Room } from "#phaser/domain/Hotel";
import type { HotelGrid } from "#phaser/domain/HotelGrid";
import { LobbyLayout } from "#phaser/domain/LobbyLayout";
import { Origin } from "#phaser/domain/Origin";
import type { Position } from "#phaser/domain/Position";
import { SpriteAnimations } from "#phaser/domain/SpriteAnimations";
import { SpriteAssets } from "#phaser/domain/SpriteAssets";
import { ROOM_HEIGHT } from "../constants";
import { PhaserImage } from "./PhaserImage";
import { PhaserSprite } from "./PhaserSprite";
import { RoomSprite } from "./RoomSprite";

const PADDING = 10;
const LOBBY_BACKGROUND_WIDTH = 512;

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
			this.y - ROOM_HEIGHT,
			this.layout.totalWidth,
			ROOM_HEIGHT,
		);
	}

	private buildBackground() {
		PhaserImage.create(this, { assetConfig: Assets.roomLobby }).withOrigin(
			Origin.BOTTOM_LEFT,
		);

		if (this.layout.tiledWallWidth > 0) {
			PhaserImage.create(this, {
				assetConfig: Assets.lobbyWallTile,
				position: { x: LOBBY_BACKGROUND_WIDTH, y: 0 },
			})
				.withOrigin(Origin.BOTTOM_LEFT)
				.withDisplaySize({
					width: this.layout.tiledWallWidth,
					height: ROOM_HEIGHT,
				});
		}

		PhaserImage.create(this, {
			assetConfig: Assets.lobbyEndPillar,
			position: { x: this.layout.totalWidth, y: -ROOM_HEIGHT },
		}).withOrigin(Origin.TOP_RIGHT);

		PhaserImage.create(this, { assetConfig: Assets.squareBlue })
			.withOrigin(Origin.BOTTOM_LEFT)
			.withDisplaySize({ width: this.layout.totalWidth, height: PADDING });
	}

	private buildDesk() {
		PhaserImage.create(this, {
			assetConfig: Assets.lobbyDesk,
			position: { x: 55, y: -PADDING },
		}).withOrigin(Origin.BOTTOM_LEFT);
	}

	private buildGroomCat() {
		PhaserSprite.create(this, {
			assetConfig: SpriteAssets.groomCat.idle,
			position: { x: 100, y: -PADDING - GROOM_CHAIR_OFFSET_Y },
		})
			.withOrigin(Origin.BOTTOM_CENTER)
			.withAnimations(SpriteAnimations.groomCat)
			.playIdle();
	}

	private buildDecorations() {
		for (const position of this.layout.visiblePillars) {
			PhaserImage.create(this, {
				assetConfig: Assets.lobbyPillar,
				position: { x: position.x, y: -PADDING },
			}).withOrigin(Origin.BOTTOM_CENTER);
		}

		for (const position of this.layout.visibleWindows) {
			PhaserImage.create(this, {
				assetConfig: Assets.lobbyWindow,
				position: { x: position.x, y: -ROOM_HEIGHT + 15 },
			})
				.withOrigin(Origin.TOP_CENTER)
				.withScale({ x: 0.8 });
		}
	}

	private buildWaitingQueue() {
		for (const slot of this.layout.queueSlots) {
			PhaserImage.create(this, {
				assetConfig: Assets.lobbyWaitingPillar,
				position: { x: slot.pillarPosition.x, y: -PADDING },
			}).withOrigin(Origin.BOTTOM_CENTER);

			if (slot.hasTile) {
				PhaserImage.create(this, {
					assetConfig: Assets.lobbyWaitingTile,
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
		position: Position;
	}): Phaser.GameObjects.Sprite {
		return PhaserSprite.create(this, {
			assetConfig: config.assetConfig,
			position: { x: position.x, y: -PADDING },
		})
			.withOrigin(Origin.BOTTOM_CENTER)
			.withScale({ x: config.scale })
			.withAnimations(config.animations)
			.facingLeft()
			.playIdle().gameObject;
	}
}
