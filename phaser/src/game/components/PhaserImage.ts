import type { AssetConfig } from "#phaser/domain/AssetConfig";
import type { OriginValue } from "#phaser/domain/Origin";
import type { Position } from "#phaser/domain/Position";

export type PhaserImageConfig = {
	assetConfig: AssetConfig;
	position?: Position;
};

/**
 * Fluent wrapper around Phaser.GameObjects.Image.
 */
export class PhaserImage {
	public static create(
		parent: Phaser.GameObjects.Container,
		config: PhaserImageConfig,
	): PhaserImage {
		const image = new PhaserImage(parent.scene, config);
		parent.add(image.gameObject);
		return image;
	}

	public readonly gameObject: Phaser.GameObjects.Image;

	private constructor(scene: Phaser.Scene, config: PhaserImageConfig) {
		const { assetConfig, position } = config;
		this.gameObject = new Phaser.GameObjects.Image(
			scene,
			position?.x ?? 0,
			position?.y ?? 0,
			assetConfig.atlasKey,
			assetConfig.frame,
		);
	}

	public withOrigin(origin: OriginValue): this {
		this.gameObject.setOrigin(origin.x, origin.y);
		return this;
	}

	public withDisplaySize(size: { width: number; height?: number }): this {
		this.gameObject.displayWidth = size.width;
		if (size.height !== undefined) {
			this.gameObject.displayHeight = size.height;
		}
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

	public resize(size: { width?: number; height?: number }): this {
		if (size.width !== undefined) {
			this.gameObject.displayWidth = size.width;
		}
		if (size.height !== undefined) {
			this.gameObject.displayHeight = size.height;
		}
		return this;
	}
}
