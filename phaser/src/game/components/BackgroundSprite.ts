import { BackgroundTransform } from "#phaser/domain/BackgroundTransform";

/**
 * Height in pixels of the visible city portion of the background image.
 * The rest of the image (below this height) is black and should not be visible.
 * Matches legacy value: mainBgHei = 1152.
 */
const CITY_HEIGHT_IN_PIXELS = 1152;

export class BackgroundSprite extends Phaser.GameObjects.Image {
	constructor(scene: Phaser.Scene) {
		super(scene, 0, 0, "bg");
		this.setOrigin(0, 0);
		this.setScrollFactor(0);
		this.setDepth(-1);
		this.resize();
	}

	resize() {
		const camera = this.scene.cameras.main;
		const { width, height } = this.scene.scale;
		const sourceImage = this.texture.getSourceImage();

		const transform = BackgroundTransform.fitToViewport({
			screenWidth: width,
			screenHeight: height,
			imageWidth: sourceImage.width,
			cityHeight: CITY_HEIGHT_IN_PIXELS,
			cameraZoom: camera.zoom,
		});

		this.setScale(transform.scale);
		this.x = transform.position.x;
		this.y = transform.position.y;
	}
}
