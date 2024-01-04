import { GeolocationDetail, GeolocationInfo } from "../types/geolocation";

export const getCityGeolocationInfo = async (city: string) => {
  const url = `https://geocode.xyz/${city}?json=1`;
  const response = await fetch(url);
  const data = await response.json() as GeolocationDetail;
  return {
    ciudad: city,
    pais: data.alt.loc.countryname,
    codigoPostal: data.alt.loc.postal,
    latitud: parseFloat(data.latt),
    longitud: parseFloat(data.longt),
  } as GeolocationInfo;
}
