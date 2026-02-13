import type { ClientState } from "#phaser/domain/ClientBehavior";
import type { ClientSpriteConfig } from "#phaser/domain/ClientSpriteRegistry";
import { Origin } from "#phaser/domain/Origin";
import { PhaserSprite } from "#phaser/game/components/PhaserSprite";

export class ClientAnimation {
	private readonly sprite: PhaserSprite;
	private readonly config: ClientSpriteConfig;
	private onCycleCompleteCallback: (() => void) | null = null;

	constructor({
		parent,
		config,
	}: {
		parent: Phaser.GameObjects.Container;
		config: ClientSpriteConfig;
	}) {
		this.config = config;
		this.sprite = PhaserSprite.create(parent, {
			assetConfig: config.assetConfig,
		})
			.withOrigin(Origin.BOTTOM_CENTER)
			.withScale({ x: config.scale })
			.withAnimations(config.animations)
			.on("animationrepeat", this.handleAnimationRepeat, this);
	}

	onCycleComplete(callback: () => void): void {
		this.onCycleCompleteCallback = callback;
	}

	update(clientState: ClientState): void {
		if (clientState.hasAnimationPhaseChanged) {
			this.play(clientState.animationPhase);
		}
		this.sprite.withFacing(clientState.isFacingLeft);
	}

	private handleAnimationRepeat(): void {
		this.onCycleCompleteCallback?.();
	}

	private play(phase: "idle" | "walk"): void {
		if (!this.hasAnimationPhase(phase)) {
			return;
		}

		if (phase === "walk") {
			this.sprite.playWalk();
			return;
		}
		this.sprite.playIdle();
	}

	private hasAnimationPhase(phase: "idle" | "walk"): boolean {
		return this.config.animations.animations[phase] !== undefined;
	}
}
