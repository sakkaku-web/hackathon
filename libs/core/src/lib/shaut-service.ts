import { Coordinate, ShautUser } from "./core";

const ids = ['0', '1', '2']
const names = ['Max', 'Daniel', 'Florian'];
const coordinates: Coordinate[] = [
  { lat: 48.208492, long: 16.373755 },
  { lat: 48.209492, long: 16.373755 },
  { lat: 48.208492, long: 16.374755 },
];

export class ShautService {
  async getUserData(userId: string): Promise<ShautUser | null> {
    const idx = parseInt(userId);
    if (isNaN(idx) || idx < 0 || idx >= ids.length) {
      return null;
    }

    return {
      id: userId,
      name: names[idx] || 'Unknown',
      coordinate: coordinates[idx],
    };
  }

  async getNearbyUser(userId: string, radius: number): Promise<string[]> {
    if (radius <= 1) {
      return [];
    }

    const index = parseInt(userId);
    if (radius <= 5) {
      if (index === ids.length - 1) {
        return [ids[0]];
      }
      return [ids[index + 1]];
    }

    return ids.filter((v, i) => i !== index);
  }
}
