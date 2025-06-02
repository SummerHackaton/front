import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

const isAndroid = Platform.OS === 'android';

export async function saveTokens(access: string, refresh: string) {
	if (!isAndroid) {
		localStorage.setItem(ACCESS_TOKEN, access);
		localStorage.setItem(REFRESH_TOKEN, refresh);
		return;
	}
	await SecureStore.setItemAsync(ACCESS_TOKEN, String(access));
	await SecureStore.setItemAsync(REFRESH_TOKEN, String(refresh));
}

export async function getAccessToken() {
const token = isAndroid
        ? await SecureStore.getItemAsync(ACCESS_TOKEN)
        : localStorage.getItem(ACCESS_TOKEN);
    console.log('Token recuperado:', token);
    return token;
}

export async function getRefreshToken() {
	if (!isAndroid)
		return localStorage.getItem(REFRESH_TOKEN);

  return await SecureStore.getItemAsync(REFRESH_TOKEN);
}

export async function clearTokens() {
	if (!isAndroid)
	{
		localStorage.removeItem(ACCESS_TOKEN);
		localStorage.removeItem(REFRESH_TOKEN);
		return;
	}
  await SecureStore.deleteItemAsync(ACCESS_TOKEN);
  await SecureStore.deleteItemAsync(REFRESH_TOKEN);
}
