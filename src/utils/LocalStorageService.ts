export default class LocalStorageService {
	static getItem<T>(key: string): T | null {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : null;
	}

	static setItem<T>(key: string, value: T): void {
		localStorage.setItem(key, JSON.stringify(value));
	}

	static removeItem(key: string): void {
		localStorage.removeItem(key);
	}
}
