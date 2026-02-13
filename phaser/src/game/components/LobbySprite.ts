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
import { ROOM_HEIGHT } from "../constants";
import { PhaserImage } from "./PhaserImage";
import { RoomSprite } from "./RoomSprite";

const GROOM_ATLAS_KEY = "monsters2.hd";

const PADDING = 10;
const LOBBY_BACKGROUND_WIDTH = 512;

const GROOM_IDLE_FRAME_COUNT = 30;
const GROOM_IDLE_FRAME_RATE = 15;
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
		new PhaserImage(this, { assetConfig: Assets.roomLobby }).withOrigin(
			Origin.BOTTOM_LEFT,
		);

		if (this.layout.tiledWallWidth > 0) {
			new PhaserImage(this, {
				assetConfig: Assets.lobbyWallTile,
				position: { x: LOBBY_BACKGROUND_WIDTH, y: 0 },
			})
				.withOrigin(Origin.BOTTOM_LEFT)
				.withDisplaySize({
					width: this.layout.tiledWallWidth,
					height: ROOM_HEIGHT,
				});
		}

		new PhaserImage(this, {
			assetConfig: Assets.lobbyEndPillar,
			position: { x: this.layout.totalWidth, y: -ROOM_HEIGHT },
		}).withOrigin(Origin.TOP_RIGHT);

		new PhaserImage(this, { assetConfig: Assets.squareBlue })
			.withOrigin(Origin.BOTTOM_LEFT)
			.withDisplaySize({ width: this.layout.totalWidth, height: PADDING });
	}

	private buildDesk() {
		new PhaserImage(this, {
			assetConfig: Assets.lobbyDesk,
			position: { x: 55, y: -PADDING },
		}).withOrigin(Origin.BOTTOM_LEFT);
	}

	private buildGroomCat() {
		const groomAnimKey = "lobby.groomCatIdle";
		if (!this.scene.anims.exists(groomAnimKey)) {
			this.scene.anims.create({
				key: groomAnimKey,
				frames: this.scene.anims.generateFrameNames(GROOM_ATLAS_KEY, {
					prefix: "groomCatIdle/groomCatIdle_",
					start: 0,
					end: GROOM_IDLE_FRAME_COUNT - 1,
					zeroPad: 4,
				}),
				frameRate: GROOM_IDLE_FRAME_RATE,
				repeat: -1,
			});
		}

		const groom = this.scene.add.sprite(
			100,
			-PADDING - GROOM_CHAIR_OFFSET_Y,
			GROOM_ATLAS_KEY,
			"groomCatIdle/groomCatIdle_0000",
		);
		groom.setOrigin(0.5, 1);
		groom.play(groomAnimKey);
		this.add(groom);
	}

	private buildDecorations() {
		for (const position of this.layout.visiblePillars) {
			new PhaserImage(this, {
				assetConfig: Assets.lobbyPillar,
				position: { x: position.x, y: -PADDING },
			}).withOrigin(Origin.BOTTOM_CENTER);
		}

		for (const position of this.layout.visibleWindows) {
			new PhaserImage(this, {
				assetConfig: Assets.lobbyWindow,
				position: { x: position.x, y: -ROOM_HEIGHT + 15 },
			})
				.withOrigin(Origin.TOP_CENTER)
				.withScale({ x: 0.8 });
		}
	}

	private buildWaitingQueue() {
		for (const slot of this.layout.queueSlots) {
			new PhaserImage(this, {
				assetConfig: Assets.lobbyWaitingPillar,
				position: { x: slot.pillarPosition.x, y: -PADDING },
			}).withOrigin(Origin.BOTTOM_CENTER);

			if (slot.hasTile) {
				new PhaserImage(this, {
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
			this.add(sprite);
		}
	}

	private createQueueClientSprite({
		config,
		position,
	}: {
		config: ClientSpriteConfig;
		position: Position;
	}): Phaser.GameObjects.Sprite {
		const animKey = `lobby.queue.${position.x}.idle`;
		if (!this.scene.anims.exists(animKey)) {
			this.scene.anims.create({
				key: animKey,
				frames: this.scene.anims.generateFrameNames(config.atlasKey, {
					prefix: config.idlePrefix,
					start: 0,
					end: config.idleFrameCount,
					zeroPad: 4,
				}),
				frameRate: config.idleFrameRate,
				repeat: -1,
			});
		}

		const firstFrame = `${config.idlePrefix}0000`;
		const sprite = new Phaser.GameObjects.Sprite(
			this.scene,
			position.x,
			-PADDING,
			config.atlasKey,
			firstFrame,
		);
		sprite.setOrigin(0.5, 1);
		sprite.setScale(config.scale);
		sprite.setFlipX(true);
		sprite.play(animKey);
		return sprite;
	}
}
