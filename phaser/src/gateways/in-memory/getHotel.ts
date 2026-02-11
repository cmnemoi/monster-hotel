import type { Hotel } from "#phaser/models";

export default async function getHotel(_userId: string): Promise<Hotel> {
	return {
		gold: 1_000,
		rooms: {
			room_1: {
				id: "room_1",
				position: { x: 0, y: 0 },
				client: {
					name: "client1",
					type: "poring",
					satisfaction: 15,
					likes: ["heat"],
					produces: ["cold"],
				},
			},
			room_2: {
				id: "room_2",
				position: { x: 0, y: 1 },
				client: {
					name: "client2",
					type: "bomber",
					satisfaction: 15,
					likes: ["cold"],
					produces: ["heat"],
				},
			},
			room_3: {
				id: "room_3",
				position: { x: 1, y: 0 },
				client: null,
			},
			room_4: {
				id: "room_4",
				position: { x: 1, y: 1 },
				client: null,
			},
		},
		clientQueue: [
			{
				name: "client3",
				type: "nice neighbour",
				likes: ["noise"],
				produces: ["cold"],
			},
			{
				name: "client4",
				type: "poring",
				likes: ["odor"],
				produces: ["heat"],
			},
		],
	};
}
