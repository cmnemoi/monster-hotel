import { CameraView } from "#phaser/domain/CameraView";
import { CAMERA_PADDING } from "#phaser/domain/GridConstants";
import { Rectangle } from "#phaser/domain/Rectangle";

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
			padding: CAMERA_PADDING,
		});

		this.camera.setZoom(view.zoom);
		this.camera.centerOn(view.center.x, view.center.y);
	}
}
