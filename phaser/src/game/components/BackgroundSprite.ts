/**
 * Height in pixels of the visible city portion of the background image.
 * The rest of the image (below this height) is black and should not be visible.
 * Matches legacy value: mainBgHei = 1152.
 */
const CITY_HEIGHT_IN_PIXELS = 1152;

export class BackgroundSprite extends Phaser.GameObjects.Image {
	constructor(scene: Phaser.Scene) {
		super(scene, 0, 0, "bg");
		scene.add.existing(this);
		this.setOrigin(0, 0);
		this.setScrollFactor(0);
		this.setDepth(-1);
		this.resize();
	}

	resize() {
		const camera = this.scene.cameras.main;
		const { width, height } = this.scene.scale;

		const sourceImage = this.texture.getSourceImage();
		const viewportWidth = width / camera.zoom;
		const viewportHeight = height / camera.zoom;
		const scale = Math.max(
			viewportWidth / sourceImage.width,
			viewportHeight / CITY_HEIGHT_IN_PIXELS,
		);
		this.setScale(scale);

		this.x = (width - sourceImage.width * scale) / 2;
		this.y = (height - CITY_HEIGHT_IN_PIXELS * scale) / 2;
	}
}
