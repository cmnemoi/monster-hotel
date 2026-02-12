import { ClientMovement } from "#phaser/domain/ClientMovement";
import { Duration } from "#phaser/domain/Duration";
import type { ClientType } from "#phaser/models";
import { ClientAnimation } from "./client/ClientAnimation";
import {
	CLIENT_SPRITE_REGISTRY,
	type ClientSpriteConfig,
} from "./client/ClientSpriteRegistry";
import { SeededRandom } from "./SeededRandom";

const MOVEMENT_BOUNDS_MIN_RATIO = 0.3;
const MOVEMENT_BOUNDS_MAX_RATIO = 0.7;

export type ClientSpriteParams = {
	clientType: ClientType;
	roomWidth: number;
	roomPadding: number;
};

/**
 * Phaser container rendering a client sprite,
 * delegating movement logic to a pure domain ClientMovement.
 */
export class ClientSprite extends Phaser.GameObjects.Container {
	private readonly animation: ClientAnimation;
	private readonly movement: ClientMovement;

	static create(scene: Phaser.Scene, params: ClientSpriteParams): ClientSprite {
		const config = ClientSprite.getConfigFromType(params.clientType);
		const animationNamespace = `client.${params.clientType}`;
		const movement = new ClientMovement(
			params.roomWidth * MOVEMENT_BOUNDS_MIN_RATIO,
			params.roomWidth * MOVEMENT_BOUNDS_MAX_RATIO,
			new SeededRandom(Date.now()),
		);

		return new ClientSprite(
			scene,
			params.roomWidth / 2,
			-params.roomPadding,
			new ClientAnimation(scene, config, animationNamespace),
			movement,
		);
	}

	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		animation: ClientAnimation,
		movement: ClientMovement,
	) {
		super(scene, x, y);
		this.animation = animation;
		this.movement = movement;
		this.add(animation.getPhaserSprite());
		scene.add.existing(this);
	}

	override update(_time: number, delta: number): void {
		this.movement.update(Duration.fromMilliseconds(delta));
		const movementState = this.movement.state();

		this.x = movementState.x;
		this.animation.update(movementState);
	}

	private static getConfigFromType(clientType: ClientType): ClientSpriteConfig {
		const config = CLIENT_SPRITE_REGISTRY[clientType];
		if (!config) throw new Error(`Unknown client type: ${clientType}`);
		return config;
	}
}
