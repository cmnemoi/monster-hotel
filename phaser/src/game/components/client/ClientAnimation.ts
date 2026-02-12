import type { MovementUpdate } from "./ClientMovement";
import type { ClientSpriteConfig } from "./ClientSpriteRegistry";

type ClientState = "idle" | "walk" | "sleep";

export class ClientAnimation {
	private readonly sprite: Phaser.GameObjects.Sprite;
	private readonly config: ClientSpriteConfig;
	private readonly idleAnimKey: string;
	private readonly walkAnimKey: string;
	private currentState: ClientState | null = null;

	constructor(
		scene: Phaser.Scene,
		config: ClientSpriteConfig,
		animationNamespace: string,
	) {
		this.config = config;
		this.idleAnimKey = `${animationNamespace}.idle`;
		this.walkAnimKey = `${animationNamespace}.walk`;

		this.createAnimations(scene);

		const firstIdleFrame = this.findFirstIdleFrame(scene);
		this.sprite = new Phaser.GameObjects.Sprite(
			scene,
			0,
			0,
			config.atlasKey,
			firstIdleFrame,
		);
		this.sprite.setOrigin(0.5, 1);
		this.sprite.setScale(config.scale);
	}

	update(update: MovementUpdate): void {
		this.sprite.setPosition(update.spriteX, update.spriteY);
		this.play(update.state);
		this.sprite.setFlipX(update.flipX);
	}

	getPhaserSprite(): Phaser.GameObjects.Sprite {
		return this.sprite;
	}

	private createAnimations(scene: Phaser.Scene) {
		const animsToCreate = [
			{
				key: this.idleAnimKey,
				prefix: this.config.idlePrefix,
				end: this.config.idleFrameCount,
				frameRate: this.config.idleFrameRate,
			},
			{
				key: this.walkAnimKey,
				prefix: this.config.walkPrefix,
				end: this.config.walkFrameCount,
				frameRate: this.config.walkFrameRate,
			},
		];

		for (const animation of animsToCreate) {
			if (scene.anims.exists(animation.key)) continue;
			scene.anims.create({
				key: animation.key,
				frames: scene.anims.generateFrameNames(this.config.atlasKey, {
					prefix: animation.prefix,
					start: 0,
					end: animation.end,
					zeroPad: 4,
				}),
				frameRate: animation.frameRate,
				repeat: -1,
			});
		}
	}

	private findFirstIdleFrame(scene: Phaser.Scene): string | undefined {
		return scene.textures
			.get(this.config.atlasKey)
			.getFrameNames()
			.find((name) => name.startsWith(this.config.idlePrefix));
	}

	private play(state: ClientState): void {
		if (this.currentState === state) return;
		this.currentState = state;

		const animKey = state === "walk" ? this.walkAnimKey : this.idleAnimKey;
		this.sprite.play(animKey, true);
	}
}
