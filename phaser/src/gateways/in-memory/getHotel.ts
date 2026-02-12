import type { Hotel } from "#phaser/domain/Hotel";

export default async function getHotel(_userId: string): Promise<Hotel> {
	return {
		gold: 1_000,
		rooms: {
			lobby: {
				id: "lobby",
				type: "lobby",
				position: { x: 0, y: -1 },
				client: null,
			},
			room_1: {
				id: "room_1",
				type: "bedroom",
				position: { x: 0, y: 0 },
				client: {
					id: "client1",
					name: "client1",
					type: "poring",
					satisfaction: 15,
					likes: ["heat"],
					produces: ["cold"],
				},
			},
			room_2: {
				id: "room_2",
				type: "bedroom",
				position: { x: 0, y: 1 },
				client: {
					id: "client2",
					name: "client2",
					type: "bomber",
					satisfaction: 15,
					likes: ["cold"],
					produces: ["heat"],
				},
			},
			room_3: {
				id: "room_3",
				type: "bedroom",
				position: { x: 1, y: 0 },
				client: null,
			},
			room_4: {
				id: "room_4",
				type: "bedroom",
				position: { x: 1, y: 1 },
				client: null,
			},
		},
		clientQueue: [
			{
				id: "client3",
				name: "client3",
				type: "nice neighbour",
				likes: ["noise"],
				produces: ["cold"],
			},
			{
				id: "client4",
				name: "client4",
				type: "poring",
				likes: ["odor"],
				produces: ["heat"],
			},
		],
	};
}
