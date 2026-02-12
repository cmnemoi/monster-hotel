import { CameraView } from "#phaser/domain/CameraView";
import { Rectangle } from "#phaser/domain/Rectangle";
import { WORLD_PADDING_IN_PIXELS } from "../constants";

export class CameraController {
	private camera: Phaser.Cameras.Scene2D.Camera;

	constructor(scene: Phaser.Scene) {
		this.camera = scene.cameras.main;
	}

	public fitAndCenter(worldRectangle: Phaser.Geom.Rectangle) {
		const worldBounds = Rectangle.create(
			{ x: worldRectangle.x, y: worldRectangle.y },
			worldRectangle.width,
			worldRectangle.height,
		);

		const view = CameraView.fitToWorldBounds(
			this.camera.width,
			this.camera.height,
			worldBounds,
			WORLD_PADDING_IN_PIXELS,
		);

		this.camera.setZoom(view.zoom);
		this.camera.centerOn(view.center.x, view.center.y);
	}
}
