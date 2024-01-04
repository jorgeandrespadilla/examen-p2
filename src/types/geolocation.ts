import { Prisma } from "@prisma/client";

export type GeolocationInfo = Prisma.GeoreferenciaCiudadCreateInput; 

export interface GeolocationDetail {
    standard:  Standard;
    longt:     string;
    alt:       Alt;
    elevation: Elevation;
    latt:      string;
}

export interface Alt {
    loc: LOC;
}

export interface LOC {
    longt:       string;
    prov:        string;
    city:        string;
    countryname: string;
    postal:      string;
    region:      Elevation;
    latt:        string;
}

export interface Elevation {
}

export interface Standard {
    addresst:    Elevation;
    statename:   Elevation;
    city:        string;
    prov:        string;
    countryname: string;
    postal:      Elevation;
    confidence:  string;
}
