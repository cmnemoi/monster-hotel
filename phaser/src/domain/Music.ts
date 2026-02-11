export interface Music {
	play(): void;
	pause(): void;
	onComplete(callback: () => void): void;
}
