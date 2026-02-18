import type { WorldPosition } from "#phaser/domain/Position";
import type { Rectangle } from "#phaser/domain/Rectangle";

export class CameraView {
	readonly zoom: number;
	readonly center: WorldPosition;

	private constructor({
		zoom,
		center,
	}: { zoom: number; center: WorldPosition }) {
		this.zoom = zoom;
		this.center = center;
	}

	static fitToWorldBounds({
		viewportWidth,
		viewportHeight,
		worldBounds,
		padding,
	}: {
		viewportWidth: number;
		viewportHeight: number;
		worldBounds: Rectangle;
		padding: number;
	}): CameraView {
		const padded = worldBounds.expand(padding);
		const zoomX = viewportWidth / padded.width;
		const zoomY = viewportHeight / padded.height;
		const zoom = Math.min(zoomX, zoomY);

		return new CameraView({ zoom, center: padded.center });
	}
}
