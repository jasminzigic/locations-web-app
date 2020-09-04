export interface City {
    id?: number;
    name: string;
}

export interface LocationDetails {
    id?: number;
    name: string;
    cityName: string;
    address: string;
    longitude: number;
    latitude: number;
}


export interface User {
    id: number;
    userName: string;
    password: string;
}