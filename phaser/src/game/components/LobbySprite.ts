import type { ClientInQueue, Room } from "#phaser/models";
import { ROOM_HEIGHT } from "../constants";
import {
	CLIENT_SPRITE_REGISTRY,
	type ClientSpriteConfig,
} from "./client/ClientSpriteRegistry";
import { RoomSprite } from "./RoomSprite";

const ROOM_ATLAS_KEY = "rooms0";
const TILES_ATLAS_KEY = "tilesheet0";
const GROOM_ATLAS_KEY = "monsters2.hd";

const PADDING = 10;
const LOBBY_BACKGROUND_WIDTH = 512;

const QUEUE_START_X = 400;
const SLOT_WIDTH = 150;
const END_PILLAR_WIDTH = 300;

const WAITING_PILLAR_WIDTH = 42;

const GROOM_IDLE_FRAME_COUNT = 30;
const GROOM_IDLE_FRAME_RATE = 15;
const GROOM_CHAIR_OFFSET_Y = 55;

/**
 * Visual representation of the hotel lobby with reception desk, groom, and client queue.
 */
export class LobbySprite extends RoomSprite {
	private lobbyWidthInPixels: number;
	private readonly clientQueue: ClientInQueue[];
	private readonly queueClientSprites: Phaser.GameObjects.Sprite[] = [];

	constructor(
		scene: Phaser.Scene,
		room: Room,
		clientQueue: ClientInQueue[] = [],
	) {
		super(scene, room);
		this.clientQueue = clientQueue;
		this.lobbyWidthInPixels = this.computeLobbyWidth();

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
			this.lobbyWidthInPixels,
			ROOM_HEIGHT,
		);
	}

	private computeLobbyWidth(): number {
		const queueWidth = this.clientQueue.length * SLOT_WIDTH;
		return QUEUE_START_X + queueWidth + END_PILLAR_WIDTH;
	}

	private buildBackground() {
		const background = this.scene.add.image(0, 0, ROOM_ATLAS_KEY, "roomLobby");
		background.setOrigin(0, 1);
		this.add(background);

		const tiledWallWidth =
			this.lobbyWidthInPixels - LOBBY_BACKGROUND_WIDTH - END_PILLAR_WIDTH;
		if (tiledWallWidth > 0) {
			const tiledWall = this.scene.add.image(
				LOBBY_BACKGROUND_WIDTH,
				0,
				TILES_ATLAS_KEY,
				"lobbyWallTile",
			);
			tiledWall.setOrigin(0, 1);
			tiledWall.displayWidth = tiledWallWidth;
			tiledWall.displayHeight = ROOM_HEIGHT;
			this.add(tiledWall);
		}

		const endPillar = this.scene.add.image(
			this.lobbyWidthInPixels,
			-ROOM_HEIGHT,
			TILES_ATLAS_KEY,
			"lobbyEndPillar",
		);
		endPillar.setOrigin(1, 0);
		this.add(endPillar);

		const bottomPad = this.scene.add.image(0, 0, TILES_ATLAS_KEY, "squareBlue");
		bottomPad.setOrigin(0, 1);
		bottomPad.displayWidth = this.lobbyWidthInPixels;
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
		const pillarPositions = [500, 900];
		for (const positionX of pillarPositions) {
			if (positionX >= this.lobbyWidthInPixels - END_PILLAR_WIDTH) {
				continue;
			}
			const pillar = this.scene.add.image(
				positionX,
				-PADDING,
				TILES_ATLAS_KEY,
				"lobbyPillar",
			);
			pillar.setOrigin(0.5, 1);
			this.add(pillar);
		}

		const windowPositions = [700, 1100];
		for (const positionX of windowPositions) {
			if (positionX >= this.lobbyWidthInPixels - END_PILLAR_WIDTH) {
				continue;
			}
			const lobbyWindow = this.scene.add.image(
				positionX,
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
		const queueLength = this.clientQueue.length;
		for (let index = 0; index <= queueLength; index++) {
			const pillarX = QUEUE_START_X + (index - 0.5) * SLOT_WIDTH;
			const waitingPillar = this.scene.add.image(
				pillarX,
				-PADDING,
				TILES_ATLAS_KEY,
				"lobbyWaitingPillar",
			);
			waitingPillar.setOrigin(0, 1);
			this.add(waitingPillar);

			if (index < queueLength) {
				const tileX = QUEUE_START_X + (index - 0.35) * SLOT_WIDTH;
				const waitingTile = this.scene.add.image(
					tileX,
					-55 - PADDING,
					TILES_ATLAS_KEY,
					"lobbyWaitingTile",
				);
				waitingTile.setOrigin(0, 1);
				waitingTile.displayWidth = SLOT_WIDTH;
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

			const clientX =
				QUEUE_START_X + index * SLOT_WIDTH + (WAITING_PILLAR_WIDTH * 4) / 5;
			const sprite = this.createQueueClientSprite(config, clientX);
			this.queueClientSprites.push(sprite);
			this.add(sprite);
		}
	}

	private createQueueClientSprite(
		config: ClientSpriteConfig,
		positionX: number,
	): Phaser.GameObjects.Sprite {
		const animKey = `lobby.queue.${positionX}.idle`;
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
			positionX,
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
