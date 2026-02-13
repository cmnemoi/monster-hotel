import { CameraView } from "#phaser/domain/CameraView";
import { Rectangle } from "#phaser/domain/Rectangle";
import { WORLD_PADDING_IN_PIXELS } from "../constants";

export class CameraController {
	private camera: Phaser.Cameras.Scene2D.Camera;

	constructor(scene: Phaser.Scene) {
		this.camera = scene.cameras.main;
	}

	public fitAndCenter(worldRectangle: Phaser.Geom.Rectangle) {
		const worldBounds = Rectangle.create({
			position: { x: worldRectangle.x, y: worldRectangle.y },
			width: worldRectangle.width,
			height: worldRectangle.height,
		});

		const view = CameraView.fitToWorldBounds({
			viewportWidth: this.camera.width,
			viewportHeight: this.camera.height,
			worldBounds,
			padding: WORLD_PADDING_IN_PIXELS,
		});

		this.camera.setZoom(view.zoom);
		this.camera.centerOn(view.center.x, view.center.y);
	}
}
