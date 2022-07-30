import { Coordinate, ShautUser } from "./core";

export const DEMO_USER_1 = '0';
export const DEMO_USER_2 = '1';
export const DEMO_USER_3 = '2';

const names = ['Max', 'Daniel', 'Florian'];
const coordinates: Coordinate[] = [
  { lat: 48.208492, long: 16.373755 },
  { lat: 48.209492, long: 16.373755 },
  { lat: 48.208492, long: 16.374755 },
];

export class ShautService {
  async getUserData(userId: string): Promise<ShautUser> {
    const idx = parseInt(userId);
    return {
      id: userId,
      name: names[idx] || 'Unknown',
      coordinate: coordinates[idx],
    };
  }

  async getNearbyUser(userId: string, radius: number): Promise<string[]> {
    if (radius < 2) {
      return [];
    }

    if (radius < 5) {
      return [DEMO_USER_2];
    }

    return [DEMO_USER_2, DEMO_USER_3];
  }
}
