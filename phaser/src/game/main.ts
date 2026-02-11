import { Game } from "phaser";
import getHotel from "#phaser/gateways/in-memory/getHotel";
import { Boot } from "./scenes/Boot";
import { HotelScene } from "./scenes/HotelScene";
import { Preloader } from "./scenes/Preloader";

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: "game",
	width: 1280,
	height: 720,
	backgroundColor: "#000000",
	scale: {
		mode: Phaser.Scale.RESIZE,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	scene: [Boot, Preloader, HotelScene],
};

const StartGame = async (parent: string) => {
	const hotel = await getHotel("");

	const game = new Game({ ...config, parent });
	game.registry.set("hotel", hotel);

	return game;
};

export default StartGame;
