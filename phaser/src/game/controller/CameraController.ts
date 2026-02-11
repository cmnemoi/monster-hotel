import { WORLD_PADDING_IN_PIXELS } from "../constants";

export class CameraController {
	private camera: Phaser.Cameras.Scene2D.Camera;

	constructor(scene: Phaser.Scene) {
		this.camera = scene.cameras.main;
	}

	public fitAndCenter(worldRect: Phaser.Geom.Rectangle) {
		const paddedRect = this.addPadding(worldRect, WORLD_PADDING_IN_PIXELS);

		const zoomX = this.camera.width / paddedRect.width;
		const zoomY = this.camera.height / paddedRect.height;
		const zoom = Math.min(zoomX, zoomY);

		this.camera.setZoom(zoom);
		this.camera.centerOn(paddedRect.centerX, paddedRect.centerY);
	}

	private addPadding(
		rect: Phaser.Geom.Rectangle,
		padding: number,
	): Phaser.Geom.Rectangle {
		const padded = Phaser.Geom.Rectangle.Clone(rect);
		padded.x -= padding;
		padded.y -= padding;
		padded.width += padding * 2;
		padded.height += padding * 2;
		return padded;
	}
}
