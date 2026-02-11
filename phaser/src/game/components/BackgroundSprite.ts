export class BackgroundSprite extends Phaser.GameObjects.Image {
	constructor(scene: Phaser.Scene) {
		super(scene, 0, 0, "bg");
		scene.add.existing(this);
		this.setOrigin(0.5, 0.5);
		this.setScrollFactor(0);
		this.setDepth(-1);
		this.resize();
	}

	resize() {
		const camera = this.scene.cameras.main;
		const { width, height } = this.scene.scale;
		this.setPosition(width / 2, height / 2);

		const sourceImage = this.texture.getSourceImage();
		const visibleWidth = width / camera.zoom;
		const visibleHeight = height / camera.zoom;
		const scaleX = visibleWidth / sourceImage.width;
		const scaleY = visibleHeight / sourceImage.height;
		this.setScale(Math.max(scaleX, scaleY));
	}
}
