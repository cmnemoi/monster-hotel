import StartGame from "./game/main";

declare global {
	interface Window {
		__PHASER_GAME__: Awaited<ReturnType<typeof StartGame>>;
	}
}

document.addEventListener("DOMContentLoaded", async () => {
	const game = await StartGame("game-container");
	window.__PHASER_GAME__ = game;
});
