import type { Position } from "#phaser/domain/Position";

export class BackgroundTransform {
	readonly scale: number;
	readonly position: Position;

	private constructor({
		scale,
		position,
	}: { scale: number; position: Position }) {
		this.scale = scale;
		this.position = position;
	}

	static fitToViewport({
		screenWidth,
		screenHeight,
		imageWidth,
		cityHeight,
		cameraZoom,
	}: {
		screenWidth: number;
		screenHeight: number;
		imageWidth: number;
		cityHeight: number;
		cameraZoom: number;
	}): BackgroundTransform {
		const viewportWidth = screenWidth / cameraZoom;
		const viewportHeight = screenHeight / cameraZoom;
		const scale = Math.max(
			viewportWidth / imageWidth,
			viewportHeight / cityHeight,
		);

		const x = (screenWidth - imageWidth * scale) / 2;
		const y = (screenHeight - cityHeight * scale) / 2;

		return new BackgroundTransform({ scale, position: { x, y } });
	}
}
