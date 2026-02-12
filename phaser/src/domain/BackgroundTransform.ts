import type { Position } from "#phaser/domain/Position";

export class BackgroundTransform {
	private constructor(
		public readonly scale: number,
		public readonly position: Position,
	) {}

	static fitToViewport(
		screenWidth: number,
		screenHeight: number,
		imageWidth: number,
		cityHeight: number,
		cameraZoom: number,
	): BackgroundTransform {
		const viewportWidth = screenWidth / cameraZoom;
		const viewportHeight = screenHeight / cameraZoom;
		const scale = Math.max(
			viewportWidth / imageWidth,
			viewportHeight / cityHeight,
		);

		const x = (screenWidth - imageWidth * scale) / 2;
		const y = (screenHeight - cityHeight * scale) / 2;

		return new BackgroundTransform(scale, { x, y });
	}
}
