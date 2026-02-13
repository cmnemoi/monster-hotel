import type { AssetConfig } from "#phaser/domain/AssetConfig";
import type { OriginValue } from "#phaser/domain/Origin";
import type { Position } from "#phaser/domain/Position";

/**
 * Fluent wrapper around Phaser.GameObjects.Image.
 */
export class PhaserImage {
	public readonly gameObject: Phaser.GameObjects.Image;

	constructor(
		parent: Phaser.GameObjects.Container,
		config: {
			assetConfig: AssetConfig;
			position?: Position;
		},
	) {
		const { assetConfig, position } = config;
		this.gameObject = new Phaser.GameObjects.Image(
			parent.scene,
			position?.x ?? 0,
			position?.y ?? 0,
			assetConfig.atlasKey,
			assetConfig.frame,
		);
		parent.add(this.gameObject);
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

	public withFacing(facing: boolean): this {
		this.gameObject.setFlipX(facing);
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
