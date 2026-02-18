import type { OriginValue } from "#phaser/domain/Origin";
import type { Position } from "#phaser/domain/Position";
import type {
	SpriteAnimationDefinition,
	SpriteAnimationState,
	SpriteCatalogEntry,
} from "#phaser/game/config/SpriteCatalog";

export type PhaserSpriteConfig = {
	entry: SpriteCatalogEntry;
	position?: Position;
};

export class PhaserSprite {
	public static create(
		parent: Phaser.GameObjects.Container,
		config: PhaserSpriteConfig,
	): PhaserSprite {
		const sprite = new PhaserSprite(parent.scene, config);
		parent.add(sprite.gameObject);
		return sprite;
	}

	public readonly gameObject: Phaser.GameObjects.Sprite;

	private readonly scene: Phaser.Scene;
	private readonly atlasKey: string;
	private readonly animationConfig: {
		namespace: string;
		definitionsByKey: Record<string, SpriteAnimationDefinition>;
	};

	private constructor(
		scene: Phaser.Scene,
		{ entry, position }: PhaserSpriteConfig,
	) {
		this.scene = scene;
		this.atlasKey = entry.assets.idle.atlasKey;
		this.gameObject = new Phaser.GameObjects.Sprite(
			scene,
			position?.x ?? 0,
			position?.y ?? 0,
			entry.assets.idle.atlasKey,
			entry.assets.idle.frame,
		);
		this.animationConfig = this.registerAnimations(entry);
	}

	public withOrigin(origin: OriginValue): this {
		this.gameObject.setOrigin(origin.x, origin.y);
		return this;
	}

	public withScale(scale: { x: number; y?: number }): this {
		this.gameObject.setScale(scale.x, scale.y ?? scale.x);
		return this;
	}

	public withFacing(isFacingLeft: boolean): this {
		this.gameObject.setFlipX(isFacingLeft);
		return this;
	}

	public facingLeft(): this {
		this.gameObject.setFlipX(true);
		return this;
	}

	public withDepth(depth: number): this {
		this.gameObject.setDepth(depth);
		return this;
	}

	public moveTo(position: Position): this {
		this.gameObject.setPosition(position.x, position.y);
		return this;
	}

	public playIdle(ignoreIfPlaying = true): this {
		return this.playState("idle", ignoreIfPlaying);
	}

	public playWalk(ignoreIfPlaying = true): this {
		return this.playState("walk", ignoreIfPlaying);
	}

	public playSleep(ignoreIfPlaying = true): this {
		return this.playState("sleep", ignoreIfPlaying);
	}

	public on(
		event: string,
		handler: (...args: unknown[]) => void,
		context?: unknown,
	): this {
		this.gameObject.on(event, handler, context);
		return this;
	}

	private registerAnimations(entry: SpriteCatalogEntry): {
		namespace: string;
		definitionsByKey: Record<string, SpriteAnimationDefinition>;
	} {
		const definitionsByKey: Record<string, SpriteAnimationDefinition> = {};

		for (const [state, definition] of Object.entries(entry.animations)) {
			if (!definition) continue;
			definitionsByKey[`${entry.namespace}.${state}`] = definition;
		}

		for (const [animationKey, definition] of Object.entries(definitionsByKey)) {
			if (this.scene.anims.exists(animationKey)) continue;
			this.scene.anims.create({
				key: animationKey,
				frames: this.scene.anims.generateFrameNames(this.atlasKey, {
					prefix: definition.framesPrefix,
					start: definition.firstFrameIndex ?? 0,
					end: definition.lastFrameIndex,
					zeroPad: definition.zeroPad ?? 4,
				}),
				frameRate: definition.frameRate ?? 15,
				repeat: definition.loop === false ? 0 : -1,
			});
		}

		return { namespace: entry.namespace, definitionsByKey };
	}

	private playState(
		state: SpriteAnimationState,
		ignoreIfPlaying: boolean,
	): this {
		const animationKey = `${this.animationConfig.namespace}.${state}`;
		if (!Object.hasOwn(this.animationConfig.definitionsByKey, animationKey)) {
			throw new Error(
				`Animation state "${state}" is not available for namespace "${this.animationConfig.namespace}".`,
			);
		}
		this.gameObject.play(animationKey, ignoreIfPlaying);
		return this;
	}
}
