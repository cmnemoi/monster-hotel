import type { ClientType } from "#phaser/models";
import { ClientAnimation } from "./client/ClientAnimation";
import { ClientMovement } from "./client/ClientMovement";
import {
	CLIENT_SPRITE_REGISTRY,
	type ClientSpriteConfig,
} from "./client/ClientSpriteRegistry";

export type ClientSpriteParams = {
	clientType: ClientType;
	roomWidth: number;
	roomPadding: number;
};

export class ClientSprite extends Phaser.GameObjects.Container {
	private readonly animation: ClientAnimation;
	private readonly movement: ClientMovement;

	static create(scene: Phaser.Scene, params: ClientSpriteParams): ClientSprite {
		const config = ClientSprite.getConfigFromType(params.clientType);
		const animationNamespace = `client.${params.clientType}`;

		return new ClientSprite(
			scene,
			params.roomWidth / 2,
			-params.roomPadding,
			new ClientAnimation(scene, config, animationNamespace),
			new ClientMovement(scene, params),
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
		const update = this.movement.update(delta, this.animation.getY());

		this.x = update.containerX;
		this.animation.update(update);
	}

	private static getConfigFromType(clientType: ClientType): ClientSpriteConfig {
		const config = CLIENT_SPRITE_REGISTRY[clientType];
		if (!config) throw new Error(`Unknown client type: ${clientType}`);
		return config;
	}
}
