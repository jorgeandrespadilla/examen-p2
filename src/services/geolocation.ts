import { GeolocationDetail, GeolocationInfo, LOC } from "../types/geolocation";

export const getCityGeolocationInfo = async (city: string) => {
  const url = `https://geocode.xyz/${city}?json=1`;
  const response = await fetch(url);
  const data = await response.json() as any;
  if (!data || data.error) {
    return null;
  }
  const finalData = data as GeolocationDetail;
  if (Array.isArray(finalData.alt.loc)) {
    finalData.alt.loc = finalData.alt.loc[0];
  }
  const altLoc = finalData.alt.loc as LOC;
  return {
    ciudad: city,
    pais: altLoc.countryname,
    codigoPostal: altLoc.postal,
    latitud: parseFloat(altLoc.latt),
    longitud: parseFloat(altLoc.longt),
  } as GeolocationInfo;
}
