import { ClientBehavior } from "#phaser/domain/ClientBehavior";
import {
	CLIENT_SPRITE_REGISTRY,
	type ClientSpriteConfig,
} from "#phaser/domain/ClientSpriteRegistry";
import { Duration } from "#phaser/domain/Duration";
import type { ClientType } from "#phaser/domain/Hotel";
import { SeededRandom } from "#phaser/domain/SeededRandom";
import { ClientAnimation } from "./client/ClientAnimation";

const MOVEMENT_BOUNDS_MIN_RATIO = 0.3;
const MOVEMENT_BOUNDS_MAX_RATIO = 0.7;

export type ClientSpriteParams = {
	clientType: ClientType;
	roomWidth: number;
	roomPadding: number;
};

export class ClientSprite extends Phaser.GameObjects.Container {
	private readonly animation: ClientAnimation;
	private readonly behavior: ClientBehavior;

	static create(scene: Phaser.Scene, params: ClientSpriteParams): ClientSprite {
		const config = ClientSprite.getConfigFromType(params.clientType);
		const animationNamespace = `client.${params.clientType}`;
		const behavior = new ClientBehavior({
			minX: params.roomWidth * MOVEMENT_BOUNDS_MIN_RATIO,
			maxX: params.roomWidth * MOVEMENT_BOUNDS_MAX_RATIO,
			random: new SeededRandom(Date.now()),
		});

		return new ClientSprite({
			scene,
			x: params.roomWidth / 2,
			y: -params.roomPadding,
			animation: new ClientAnimation({ scene, config, animationNamespace }),
			behavior,
		});
	}

	constructor({
		scene,
		x,
		y,
		animation,
		behavior,
	}: {
		scene: Phaser.Scene;
		x: number;
		y: number;
		animation: ClientAnimation;
		behavior: ClientBehavior;
	}) {
		super(scene, x, y);
		this.animation = animation;
		this.behavior = behavior;
		this.animation.onCycleComplete(() => {
			this.behavior.notifyAnimationCycleComplete();
		});
		this.add(animation.getPhaserSprite());
		scene.add.existing(this);
	}

	override update(_time: number, delta: number): void {
		this.behavior.update(Duration.fromMilliseconds(delta));
		const state = this.behavior.state();

		this.x = state.x;
		this.animation.update(state);
	}

	private static getConfigFromType(clientType: ClientType): ClientSpriteConfig {
		const config = CLIENT_SPRITE_REGISTRY[clientType];
		if (!config) throw new Error(`Unknown client type: ${clientType}`);
		return config;
	}
}
