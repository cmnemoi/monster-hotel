import type { Position } from "#phaser/domain/Position";
import type { Rectangle } from "#phaser/domain/Rectangle";

export class CameraView {
	private constructor(
		public readonly zoom: number,
		public readonly center: Position,
	) {}

	static fitToWorldBounds(
		viewportWidth: number,
		viewportHeight: number,
		worldBounds: Rectangle,
		padding: number,
	): CameraView {
		const padded = worldBounds.expand(padding);
		const zoomX = viewportWidth / padded.width;
		const zoomY = viewportHeight / padded.height;
		const zoom = Math.min(zoomX, zoomY);

		return new CameraView(zoom, padded.center);
	}
}
