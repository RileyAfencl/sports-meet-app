import { Platform } from 'react-native';

const localhost = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

/**
 * Base URL for the Rails API (no trailing slash).
 * Set EXPO_PUBLIC_API_URL when testing on a physical device, e.g.
 * EXPO_PUBLIC_API_URL=http://192.168.1.42:3000
 */
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL ?? `http://${localhost}:3000`;
