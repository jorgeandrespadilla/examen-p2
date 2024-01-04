import { GeolocationDetail } from "../types/geolocation";

export const getCityGeolocation = async (city: string) => {
  const url = `https://geocode.xyz/${city}?json=1`;
  const response = await fetch(url);
  const data = await response.json() as GeolocationDetail;
  return data;
}