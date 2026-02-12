import {
	CLIENT_SPRITE_REGISTRY,
	type ClientSpriteConfig,
} from "#phaser/domain/ClientSpriteRegistry";
import type { ClientInQueue, Room } from "#phaser/domain/Hotel";
import type { HotelGrid } from "#phaser/domain/HotelGrid";
import { LobbyLayout } from "#phaser/domain/LobbyLayout";
import type { Position } from "#phaser/domain/Position";
import { ROOM_HEIGHT } from "../constants";
import { RoomSprite } from "./RoomSprite";

const ROOM_ATLAS_KEY = "rooms0";
const TILES_ATLAS_KEY = "tilesheet0";
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

	constructor(
		scene: Phaser.Scene,
		room: Room,
		hotelGrid: HotelGrid,
		clientQueue: ClientInQueue[] = [],
	) {
		super(scene, room, hotelGrid);
		this.clientQueue = clientQueue;
		this.layout = LobbyLayout.fromQueue(clientQueue.length);

		this.buildBackground();
		this.buildGroomCat();
		this.buildDesk();
		this.buildDecorations();
		this.buildWaitingQueue();
		this.buildQueueClients();

		this.setGridPosition(room.position);
		scene.add.existing(this);
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
		const background = this.scene.add.image(0, 0, ROOM_ATLAS_KEY, "roomLobby");
		background.setOrigin(0, 1);
		this.add(background);

		if (this.layout.tiledWallWidth > 0) {
			const tiledWall = this.scene.add.image(
				LOBBY_BACKGROUND_WIDTH,
				0,
				TILES_ATLAS_KEY,
				"lobbyWallTile",
			);
			tiledWall.setOrigin(0, 1);
			tiledWall.displayWidth = this.layout.tiledWallWidth;
			tiledWall.displayHeight = ROOM_HEIGHT;
			this.add(tiledWall);
		}

		const endPillar = this.scene.add.image(
			this.layout.totalWidth,
			-ROOM_HEIGHT,
			TILES_ATLAS_KEY,
			"lobbyEndPillar",
		);
		endPillar.setOrigin(1, 0);
		this.add(endPillar);

		const bottomPad = this.scene.add.image(0, 0, TILES_ATLAS_KEY, "squareBlue");
		bottomPad.setOrigin(0, 1);
		bottomPad.displayWidth = this.layout.totalWidth;
		bottomPad.displayHeight = PADDING;
		this.add(bottomPad);
	}

	private buildDesk() {
		const desk = this.scene.add.image(
			55,
			-PADDING,
			TILES_ATLAS_KEY,
			"lobbyDesk",
		);
		desk.setOrigin(0, 1);
		this.add(desk);
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
			const pillar = this.scene.add.image(
				position.x,
				-PADDING,
				TILES_ATLAS_KEY,
				"lobbyPillar",
			);
			pillar.setOrigin(0.5, 1);
			this.add(pillar);
		}

		for (const position of this.layout.visibleWindows) {
			const lobbyWindow = this.scene.add.image(
				position.x,
				-ROOM_HEIGHT + 15,
				TILES_ATLAS_KEY,
				"lobbyWindow",
			);
			lobbyWindow.setOrigin(0.5, 0);
			lobbyWindow.setScale(0.8);
			this.add(lobbyWindow);
		}
	}

	private buildWaitingQueue() {
		for (const slot of this.layout.queueSlots) {
			const waitingPillar = this.scene.add.image(
				slot.pillarPosition.x,
				-PADDING,
				TILES_ATLAS_KEY,
				"lobbyWaitingPillar",
			);
			waitingPillar.setOrigin(0.5, 1);
			this.add(waitingPillar);

			if (slot.hasTile) {
				const waitingTile = this.scene.add.image(
					slot.tilePosition.x,
					-55 - PADDING,
					TILES_ATLAS_KEY,
					"lobbyWaitingTile",
				);
				waitingTile.setOrigin(0, 1);
				waitingTile.displayWidth = this.layout.slotWidth;
				this.add(waitingTile);
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
			const sprite = this.createQueueClientSprite(config, slot.clientPosition);
			this.queueClientSprites.push(sprite);
			this.add(sprite);
		}
	}

	private createQueueClientSprite(
		config: ClientSpriteConfig,
		position: Position,
	): Phaser.GameObjects.Sprite {
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
		const sprite = this.scene.add.sprite(
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
